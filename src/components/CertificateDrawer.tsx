import {
  Text,
  BlockStack,
  InlineStack,
  Box,
  Badge,
  Button,
  Divider,
  Banner,
} from "@shopify/polaris";
import {
  ExportIcon,
  CheckCircleIcon,
  LockIcon,
  ClockIcon,
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

interface Props {
  open: boolean;
  onClose: () => void;
  log: AuditLog | null;
}

const mockExecutionLog = {
  webhook_id: "wh_8f3a2b1c4d5e",
  shop_domain: "mystore.myshopify.com",
  customer_email_hash: "a8f9c3d2e1b4...31c2",
  received_at: "2024-03-15T14:32:01.000Z",
  processed_at: "2024-03-15T14:32:05.200Z",
  integrations: [
    {
      name: "Klaviyo",
      endpoint: "POST https://a.klaviyo.com/api/data-privacy-erasure-tasks/",
      status: 200,
      response_time: "1.2s",
      success: true,
    },
    {
      name: "Gorgias",
      endpoint: "DELETE https://mystore.gorgias.com/api/customers/12345",
      status: 200,
      response_time: "0.8s",
      success: true,
    },
    {
      name: "ReCharge",
      endpoint: "POST https://rechargeapps.com/v1/customers/anonimizer",
      status: 200,
      response_time: "2.1s",
      success: true,
    },
  ],
  total_duration: "4.2s",
  retry_count: 0,
  final_status: "SUCCESS",
};

export default function CertificateDrawer({ open, onClose, log }: Props) {
  if (!open || !log) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "520px",
        maxWidth: "100vw",
        backgroundColor: "var(--p-color-bg-surface)",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
        zIndex: 1000,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--p-color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          backgroundColor: "var(--p-color-bg-surface)",
          zIndex: 1,
        }}
      >
        <BlockStack gap="100">
          <Text as="h2" variant="headingMd" fontWeight="semibold">
            GDPR Compliance Certificate
          </Text>
          <Text as="p" variant="bodyXs" tone="subdued">
            Log ID: {log.id}
          </Text>
        </BlockStack>
        <Button onClick={onClose} variant="plain" size="slim">
          ✕ Close
        </Button>
      </div>

      {/* Content */}
      <div style={{ padding: "24px", flex: 1 }}>
        <BlockStack gap="400">
          {/* Certificate Header */}
          <Box
            padding="400"
            borderRadius="200"
            borderColor="border"
            background="bg-fill-success-secondary"
          >
            <BlockStack gap="200" align="center">
              <span style={{ fontSize: "32px" }}>🛡️</span>
              <Text as="h3" variant="headingMd" fontWeight="bold" alignment="center">
                Data Erasure Compliance Certificate
              </Text>
              <Text as="p" variant="bodySm" alignment="center" tone="subdued">
                This certifies that a customer data erasure request was processed in compliance with GDPR Article 17 and CCPA §1798.105.
              </Text>
            </BlockStack>
          </Box>

          {/* Request Details */}
          <div
            style={{
              border: "1px solid var(--p-color-border)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--p-color-border)", backgroundColor: "var(--p-color-bg-surface-secondary)" }}>
              <Text as="p" variant="bodySm" fontWeight="semibold">
                Request Details
              </Text>
            </div>
            <div style={{ padding: "16px" }}>
              <BlockStack gap="200">
                <InlineStack align="space-between">
                  <Text as="span" variant="bodySm" tone="subdued">Customer Identifier</Text>
                  <InlineStack gap="100" blockAlign="center">
                    <span style={{ fontSize: "12px" }}>🔒</span>
                    <span style={{ fontFamily: "monospace", fontSize: "13px" }}>{log.customerHash}</span>
                  </InlineStack>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text as="span" variant="bodySm" tone="subdued">Trigger Source</Text>
                  <Badge tone="info" size="small">{log.triggerSource}</Badge>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text as="span" variant="bodySm" tone="subdued">Received At</Text>
                  <span style={{ fontFamily: "monospace", fontSize: "13px" }}>{log.fullTimestamp}</span>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text as="span" variant="bodySm" tone="subdued">Completed At</Text>
                  <span style={{ fontFamily: "monospace", fontSize: "13px" }}>
                    {log.status === "PROCESSING" ? "In progress..." : log.fullTimestamp}
                  </span>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text as="span" variant="bodySm" tone="subdued">Total Duration</Text>
                  <span style={{ fontFamily: "monospace", fontSize: "13px" }}>{log.duration}</span>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text as="span" variant="bodySm" tone="subdued">Final Status</Text>
                  <Badge
                    tone={log.status === "SUCCESS" ? "success" : log.status === "FAILED" ? "critical" : "warning"}
                    size="small"
                  >
                    {log.status.replace("_", " ")}
                  </Badge>
                </InlineStack>
              </BlockStack>
            </div>
          </div>

          {/* Execution Log */}
          <div
            style={{
              border: "1px solid var(--p-color-border)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--p-color-border)", backgroundColor: "var(--p-color-bg-surface-secondary)" }}>
              <Text as="p" variant="bodySm" fontWeight="semibold">
                Raw Execution Log (JSON)
              </Text>
            </div>
            <div style={{ padding: "16px" }}>
              <pre
                style={{
                  backgroundColor: "#1a1a2e",
                  color: "#e0e0e0",
                  padding: "16px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  overflow: "auto",
                  maxHeight: "300px",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {JSON.stringify(mockExecutionLog, null, 2)}
              </pre>
            </div>
          </div>

          {/* Downstream Results */}
          <div
            style={{
              border: "1px solid var(--p-color-border)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--p-color-border)", backgroundColor: "var(--p-color-bg-surface-secondary)" }}>
              <Text as="p" variant="bodySm" fontWeight="semibold">
                Downstream Integration Results
              </Text>
            </div>
            <div style={{ padding: "16px" }}>
              <BlockStack gap="200">
                {log.apps.map((app) => (
                  <InlineStack key={app.name} align="space-between" blockAlign="center">
                    <Text as="span" variant="bodySm">{app.name}</Text>
                    <Badge
                      tone={app.status === "success" ? "success" : app.status === "failed" ? "critical" : "warning"}
                      size="small"
                    >
                      {app.status === "success" ? "✓ Erased" : app.status === "failed" ? "✗ Failed" : "⏳ Pending"}
                    </Badge>
                  </InlineStack>
                ))}
              </BlockStack>
            </div>
          </div>

          {/* Legal Notice */}
          <Banner tone="info">
            <Text as="p" variant="bodySm">
              This certificate can be presented to GDPR supervisory authorities or CCPA enforcement agencies as proof of compliant data erasure processing. All customer PII is represented as SHA-256 hashes to maintain privacy.
            </Text>
          </Banner>
        </BlockStack>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid var(--p-color-border)",
          backgroundColor: "var(--p-color-bg-surface)",
          position: "sticky",
          bottom: 0,
        }}
      >
        <InlineStack gap="200" align="end">
          <Button onClick={onClose}>Close</Button>
          <Button icon={ExportIcon} variant="primary">
            Download PDF Certificate
          </Button>
        </InlineStack>
      </div>
    </div>
  );
}
