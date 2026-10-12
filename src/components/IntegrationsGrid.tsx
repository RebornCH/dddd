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
  Modal,
  Checkbox,
} from "@shopify/polaris";

interface Integration {
  id: string;
  name: string;
  category: string;
  status: "connected" | "action_required" | "not_configured";
  apiKey: string;
  lastSynced: string;
  enabled: boolean;
  color: string;
}

const initialIntegrations: Integration[] = [
  {
    id: "klaviyo",
    name: "Klaviyo",
    category: "Email Marketing",
    status: "connected",
    apiKey: "pk_live_••••••••3a91",
    lastSynced: "2 hours ago",
    enabled: true,
    color: "#1FCC6B",
  },
  {
    id: "gorgias",
    name: "Gorgias",
    category: "Help Desk",
    status: "connected",
    apiKey: "gorg_••••••••f82c",
    lastSynced: "2 hours ago",
    enabled: true,
    color: "#6B4EFF",
  },
  {
    id: "recharge",
    name: "ReCharge",
    category: "Subscriptions",
    status: "connected",
    apiKey: "rc_••••••••7b42",
    lastSynced: "3 hours ago",
    enabled: true,
    color: "#FF6B35",
  },
  {
    id: "smile",
    name: "Smile.io",
    category: "Loyalty",
    status: "action_required",
    apiKey: "Not configured",
    lastSynced: "Never",
    enabled: false,
    color: "#FFB800",
  },
  {
    id: "yotpo",
    name: "Yotpo",
    category: "Reviews",
    status: "connected",
    apiKey: "ytp_••••••••9d1e",
    lastSynced: "1 hour ago",
    enabled: true,
    color: "#2196F3",
  },
  {
    id: "attentive",
    name: "Attentive",
    category: "SMS Marketing",
    status: "connected",
    apiKey: "att_••••••••4c7f",
    lastSynced: "2 hours ago",
    enabled: true,
    color: "#00C4B3",
  },
];

interface Props {
  addToast: (message: string, status: "success" | "error" | "info") => void;
  configured: boolean;
}

export default function IntegrationsGrid({ addToast, configured }: Props) {
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [apiKeyValue, setApiKeyValue] = useState("");
  const [disconnectModal, setDisconnectModal] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, enabled: !i.enabled } : i))
    );
    const integration = integrations.find((i) => i.id === id);
    addToast(
      `${integration?.name} ${!integration?.enabled ? "enabled" : "disabled"}`,
      "success"
    );
  };

  const handleSaveKey = () => {
    if (!editingId) return;
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === editingId
          ? { ...i, apiKey: `••••${apiKeyValue.slice(-4) || "••••"}`, status: "connected" as const, enabled: true }
          : i
      )
    );
    const integration = integrations.find((i) => i.id === editingId);
    addToast(`${integration?.name} integration connected successfully`, "success");
    setEditingId(null);
    setApiKeyValue("");
  };

  const handleDisconnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, apiKey: "Not configured", status: "not_configured" as const, enabled: false }
          : i
      )
    );
    const integration = integrations.find((i) => i.id === id);
    addToast(`${integration?.name} disconnected`, "info");
    setDisconnectModal(null);
  };

  const getStatusBadge = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return <Badge tone="success" size="small">Connected</Badge>;
      case "action_required":
        return <Badge tone="warning" size="small">Action Required</Badge>;
      case "not_configured":
        return <Badge tone="info" size="small">Not Configured</Badge>;
    }
  };

  return (
    <>
      <Card>
        <BlockStack gap="400">
          <InlineStack align="space-between" blockAlign="center">
            <BlockStack gap="100">
              <Text as="h2" variant="headingMd" fontWeight="semibold">
                Active Integrations
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Manage your connected third-party apps for automated data erasure
              </Text>
            </BlockStack>
            <Badge tone="info" size="medium">
              {`${integrations.filter((i) => i.status === "connected").length} / ${integrations.length} Active`}
            </Badge>
          </InlineStack>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
            {integrations.map((integration) => (
              <div
                key={integration.id}
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid var(--p-color-border)",
                  backgroundColor: "var(--p-color-bg-surface-secondary)",
                }}
              >
                <BlockStack gap="300">
                  {/* Header */}
                  <InlineStack align="space-between" blockAlign="center">
                    <InlineStack gap="200" blockAlign="center">
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: integration.color + "20",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          fontWeight: 700,
                          color: integration.color,
                          border: `1px solid ${integration.color}40`,
                        }}
                      >
                        {integration.name[0]}
                      </div>
                      <BlockStack gap="050">
                        <Text as="p" variant="bodyMd" fontWeight="semibold">
                          {integration.name}
                        </Text>
                        <Text as="p" variant="bodyXs" tone="subdued">
                          {integration.category}
                        </Text>
                      </BlockStack>
                    </InlineStack>
                    {getStatusBadge(integration.status)}
                  </InlineStack>

                  {/* API Key */}
                  <div
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      backgroundColor: "var(--p-color-bg-surface)",
                      border: "1px solid var(--p-color-border)",
                    }}
                  >
                    <InlineStack align="space-between" blockAlign="center">
                      <span style={{ fontFamily: "monospace", fontSize: "13px", color: "#6b7280" }}>
                        {integration.apiKey}
                      </span>
                      <Button
                        variant="plain"
                        size="slim"
                        onClick={() => {
                          setEditingId(integration.id);
                          setApiKeyValue("");
                        }}
                      >
                        Edit
                      </Button>
                    </InlineStack>
                  </div>

                  {/* Footer */}
                  <InlineStack align="space-between" blockAlign="center">
                    <Text as="p" variant="bodyXs" tone="subdued">
                      Last synced: {integration.lastSynced}
                    </Text>
                    <InlineStack gap="200" blockAlign="center">
                      <Button
                        variant="plain"
                        tone="critical"
                        size="slim"
                        onClick={() => setDisconnectModal(integration.id)}
                      >
                        Disconnect
                      </Button>
                      <Checkbox
                        label=""
                        labelHidden
                        checked={integration.enabled}
                        onChange={() => handleToggle(integration.id)}
                      />
                    </InlineStack>
                  </InlineStack>
                </BlockStack>
              </div>
            ))}
          </div>
        </BlockStack>
      </Card>

      {/* Edit API Key Modal */}
      <Modal
        open={!!editingId}
        onClose={() => setEditingId(null)}
        title={`Configure ${integrations.find((i) => i.id === editingId)?.name} API Key`}
        primaryAction={{
          content: "Save & Connect",
          onAction: handleSaveKey,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => setEditingId(null),
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            <Text as="p" variant="bodyMd" tone="subdued">
              Enter your API key to enable automated data erasure for this integration.
              Your key is encrypted at rest with AES-256.
            </Text>
            <TextField
              label="API Key"
              value={apiKeyValue}
              onChange={setApiKeyValue}
              type="password"
              autoComplete="off"
              placeholder="pk_live_xxxxxxxxxxxx"
              helpText="Your key is stored encrypted and never exposed in logs."
            />
          </BlockStack>
        </Modal.Section>
      </Modal>

      {/* Disconnect Confirmation Modal */}
      <Modal
        open={!!disconnectModal}
        onClose={() => setDisconnectModal(null)}
        title="Disconnect Integration"
        primaryAction={{
          content: "Disconnect",
          destructive: true,
          onAction: () => disconnectModal && handleDisconnect(disconnectModal),
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => setDisconnectModal(null),
          },
        ]}
      >
        <Modal.Section>
          <Text as="p" variant="bodyMd">
            Are you sure you want to disconnect{" "}
            <Text as="span" fontWeight="semibold">
              {integrations.find((i) => i.id === disconnectModal)?.name}
            </Text>
            ? Data erasure requests will no longer be sent to this service until reconnected.
          </Text>
        </Modal.Section>
      </Modal>
    </>
  );
}
