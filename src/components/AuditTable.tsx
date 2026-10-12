import { useState } from "react";
import {
  Card,
  Text,
  BlockStack,
  InlineStack,
  Box,
  Badge,
  Button,
  TextField,
  Select,
  IndexTable,
  Tooltip,
} from "@shopify/polaris";
import {
  SearchIcon,
  ExportIcon,
  ViewIcon,
  LockIcon,
} from "@shopify/polaris-icons";

interface AuditLog {
  id: string;
  timestamp: string;
  fullTimestamp: string;
  customerHash: string;
  triggerSource: string;
  status: "SUCCESS" | "PARTIAL_FAILURE" | "FAILED" | "PROCESSING";
  apps: { name: string; status: "success" | "pending" | "failed" }[];
  duration: string;
}

const mockLogs: AuditLog[] = [
  {
    id: "log-001",
    timestamp: "2 min ago",
    fullTimestamp: "2024-03-15T14:32:01.000Z",
    customerHash: "a8f9...31c2",
    triggerSource: "Shopify Webhook",
    status: "SUCCESS",
    apps: [
      { name: "Klaviyo", status: "success" },
      { name: "Gorgias", status: "success" },
      { name: "ReCharge", status: "success" },
    ],
    duration: "4.2s",
  },
  {
    id: "log-002",
    timestamp: "18 min ago",
    fullTimestamp: "2024-03-15T14:14:22.000Z",
    customerHash: "b7e4...c23a",
    triggerSource: "Shopify Webhook",
    status: "SUCCESS",
    apps: [
      { name: "Klaviyo", status: "success" },
      { name: "Smile.io", status: "success" },
      { name: "Yotpo", status: "success" },
    ],
    duration: "12.8s",
  },
  {
    id: "log-003",
    timestamp: "1 hr ago",
    fullTimestamp: "2024-03-15T13:05:22.000Z",
    customerHash: "c9d3...f45b",
    triggerSource: "Shopify Webhook",
    status: "PARTIAL_FAILURE",
    apps: [
      { name: "Klaviyo", status: "success" },
      { name: "Gorgias", status: "failed" },
    ],
    duration: "45.1s",
  },
  {
    id: "log-004",
    timestamp: "3 hrs ago",
    fullTimestamp: "2024-03-15T11:47:10.000Z",
    customerHash: "d2f8...a67e",
    triggerSource: "Shopify Webhook",
    status: "SUCCESS",
    apps: [
      { name: "Klaviyo", status: "success" },
      { name: "ReCharge", status: "success" },
      { name: "Attentive", status: "success" },
    ],
    duration: "6.7s",
  },
  {
    id: "log-005",
    timestamp: "5 hrs ago",
    fullTimestamp: "2024-03-15T09:22:33.000Z",
    customerHash: "e5a1...b82f",
    triggerSource: "Shopify Webhook",
    status: "FAILED",
    apps: [{ name: "Klaviyo", status: "failed" }],
    duration: "1h 15m",
  },
  {
    id: "log-006",
    timestamp: "Just now",
    fullTimestamp: "2024-03-15T14:34:08.000Z",
    customerHash: "f3b7...c94d",
    triggerSource: "Shopify Webhook",
    status: "PROCESSING",
    apps: [
      { name: "Klaviyo", status: "pending" },
      { name: "Gorgias", status: "pending" },
      { name: "ReCharge", status: "pending" },
      { name: "Smile.io", status: "pending" },
    ],
    duration: "—",
  },
];

interface Props {
  onViewLog: (log: AuditLog) => void;
}

export default function AuditTable({ onViewLog }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [selectedResources, setSelectedResources] = useState<string[]>([]);

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.customerHash.includes(searchTerm) || log.id.includes(searchTerm);
    const matchesFilter = filterStatus === "ALL" || log.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: AuditLog["status"]) => {
    switch (status) {
      case "SUCCESS":
        return <Badge tone="success" size="small">Success</Badge>;
      case "PARTIAL_FAILURE":
        return <Badge tone="warning" size="small">Partial</Badge>;
      case "FAILED":
        return <Badge tone="critical" size="small">Failed</Badge>;
      case "PROCESSING":
        return <Badge tone="info" size="small">Processing</Badge>;
    }
  };

  const getAppStatusIcon = (status: "success" | "pending" | "failed") => {
    switch (status) {
      case "success":
        return "✓";
      case "pending":
        return "⏳";
      case "failed":
        return "✗";
    }
  };

  const getAppStatusColor = (status: "success" | "pending" | "failed") => {
    switch (status) {
      case "success":
        return "#107c41";
      case "pending":
        return "#b25900";
      case "failed":
        return "#c5280c";
    }
  };

  const handleSelectionChange = (
    selectionType: any,
    _selected: boolean,
    selection?: any
  ) => {
    if (selectionType === "All" || selectionType === "Page") {
      setSelectedResources(_selected ? filteredLogs.map((l) => l.id) : []);
    } else if (typeof selection === "string") {
      if (_selected) {
        setSelectedResources((prev) => [...prev, selection]);
      } else {
        setSelectedResources((prev) => prev.filter((id) => id !== selection));
      }
    }
  };

  const rowMarkup = filteredLogs.map((log, index) => (
    <IndexTable.Row
      id={log.id}
      key={log.id}
      selected={selectedResources.includes(log.id)}
      position={index}
    >
      <IndexTable.Cell>
        <Tooltip content={log.fullTimestamp} preferredPosition="below">
          <span style={{ fontFamily: "monospace", fontSize: "13px" }}>
            {log.timestamp}
          </span>
        </Tooltip>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <InlineStack gap="100" blockAlign="center">
          <span style={{ color: "#6b7280" }}>🔒</span>
          <span style={{ fontFamily: "monospace", fontSize: "13px" }}>
            {log.customerHash}
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(log.customerHash)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              fontSize: "11px",
            }}
            title="Copy hash"
          >
            📋
          </button>
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Badge tone="info" size="small">
          {log.triggerSource}
        </Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <InlineStack gap="100" wrap={false}>
          {log.apps.map((app) => (
            <span
              key={app.name}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                backgroundColor: getAppStatusColor(app.status) + "15",
                color: getAppStatusColor(app.status),
                fontWeight: 500,
                border: `1px solid ${getAppStatusColor(app.status)}30`,
              }}
            >
              <span>{getAppStatusIcon(app.status)}</span>
              <span>{app.name}</span>
            </span>
          ))}
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <span style={{ fontFamily: "monospace", fontSize: "13px" }}>
          {log.duration}
        </span>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <InlineStack gap="100">
          <Button
            variant="plain"
            size="slim"
            icon={ViewIcon}
            onClick={() => onViewLog(log)}
          >
            View
          </Button>
          <Button variant="plain" size="slim" icon={ExportIcon}>
            Cert
          </Button>
        </InlineStack>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center" wrap={false}>
          <BlockStack gap="100">
            <Text as="h2" variant="headingMd" fontWeight="semibold">
              Live Audit Trail
            </Text>
            <Text as="p" variant="bodySm" tone="subdued">
              Immutable compliance logs with SHA-256 hashed customer identifiers
            </Text>
          </BlockStack>
          <Button icon={ExportIcon} variant="primary">
            Export CSV for GDPR Auditor
          </Button>
        </InlineStack>

        {/* Filters */}
        <InlineStack gap="200" wrap={false}>
          <div style={{ flex: 1, maxWidth: "300px" }}>
            <TextField
              label=""
              labelHidden
              placeholder="Search by hash or ID..."
              value={searchTerm}
              onChange={setSearchTerm}
              prefix={<SearchIcon />}
              autoComplete="off"
            />
          </div>
          <div style={{ width: "180px" }}>
            <Select
              label=""
              labelHidden
              options={[
                { label: "All Status", value: "ALL" },
                { label: "Success", value: "SUCCESS" },
                { label: "Partial Failure", value: "PARTIAL_FAILURE" },
                { label: "Failed", value: "FAILED" },
                { label: "Processing", value: "PROCESSING" },
              ]}
              value={filterStatus}
              onChange={setFilterStatus}
            />
          </div>
        </InlineStack>

        {/* Table */}
        <IndexTable
          resourceName={{ singular: "erasure log", plural: "erasure logs" }}
          itemCount={filteredLogs.length}
          selectedItemsCount={selectedResources.length}
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Timestamp" },
            { title: "Customer Hash" },
            { title: "Trigger Source" },
            { title: "Downstream Status" },
            { title: "Duration" },
            { title: "Actions" },
          ]}
        >
          {rowMarkup}
        </IndexTable>

        {filteredLogs.length === 0 && (
          <Box padding="600">
            <Text as="p" variant="bodyMd" alignment="center" tone="subdued">
              No erasure logs match your search criteria.
            </Text>
          </Box>
        )}
      </BlockStack>
    </Card>
  );
}
