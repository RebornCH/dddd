import { useState, useCallback } from "react";
import {
  Page,
  Layout,
  BlockStack,
  Card,
  Text,
  Badge,
  Button,
  Banner,
  Icon,
  Box,
  InlineStack,
} from "@shopify/polaris";
import {
  CheckCircleIcon,
  ShieldCheckMarkIcon,
  SettingsIcon,
  RefreshIcon,
} from "@shopify/polaris-icons";

import KPICards from "./components/KPICards";
import IntegrationsGrid from "./components/IntegrationsGrid";
import AuditTable from "./components/AuditTable";
import OnboardingWizard from "./components/OnboardingWizard";
import CertificateDrawer from "./components/CertificateDrawer";
import ToastManager from "./components/ToastManager";

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; message: string; status: "success" | "error" | "info" }[]>([]);
  const [integrationsConfigured, setIntegrationsConfigured] = useState(true);

  const addToast = useCallback((message: string, status: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, status }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleViewLog = useCallback((log: any) => {
    setSelectedLog(log);
    setDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false);
    setSelectedLog(null);
  }, []);

  return (
    <>
      <Page
        title=""
        primaryAction={
          <Button variant="primary" onClick={() => addToast("Manual sync triggered", "info")}>
            Run Manual Sync
          </Button>
        }
      >
        <Layout>
          {/* Header Section */}
          <Layout.Section>
            <Box paddingBlockEnd="400">
              <InlineStack align="space-between" blockAlign="center" wrap={false}>
                <BlockStack gap="100">
                  <InlineStack gap="200" blockAlign="center" wrap={false}>
                    <Box
                      background="bg-fill-success"
                      borderRadius="100"
                      padding="100"
                    >
                      <Icon source={ShieldCheckMarkIcon} tone="success" />
                    </Box>
                    <Text as="h1" variant="headingXl" fontWeight="bold">
                      PrivacySync
                    </Text>
                    <Badge tone="success" size="large">
                      GDPR / CCPA Auto-Shield: ACTIVE
                    </Badge>
                  </InlineStack>
                  <Text as="p" variant="bodyMd" tone="subdued">
                    Automated data erasure compliance across your entire Shopify app stack
                  </Text>
                </BlockStack>
                <InlineStack gap="200">
                  <Button
                    icon={RefreshIcon}
                    onClick={() => addToast("Dashboard refreshed", "success")}
                  >
                    Refresh
                  </Button>
                  <Button
                    icon={SettingsIcon}
                    onClick={() => setShowOnboarding(true)}
                  >
                    Setup Wizard
                  </Button>
                </InlineStack>
              </InlineStack>
            </Box>
          </Layout.Section>

          {/* Status Banner */}
          <Layout.Section>
            <Banner
              title="All systems operational"
              tone="success"
              icon={CheckCircleIcon}
            >
              <Text as="p" variant="bodySm">
                Last webhook processed 2 minutes ago. All 5 connected integrations are healthy and responding.
              </Text>
            </Banner>
          </Layout.Section>

          {/* KPI Cards */}
          <Layout.Section>
            <KPICards />
          </Layout.Section>

          {/* Integrations Grid */}
          <Layout.Section>
            <IntegrationsGrid
              addToast={addToast}
              configured={integrationsConfigured}
            />
          </Layout.Section>

          {/* Audit Table */}
          <Layout.Section>
            <AuditTable onViewLog={handleViewLog} />
          </Layout.Section>
        </Layout>
      </Page>

      {/* Onboarding Modal */}
      <OnboardingWizard
        open={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={() => {
          setShowOnboarding(false);
          setIntegrationsConfigured(true);
          addToast("Setup complete! All integrations configured.", "success");
        }}
      />

      {/* Certificate Drawer */}
      <CertificateDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        log={selectedLog}
      />

      {/* Toast Manager */}
      <ToastManager toasts={toasts} onRemove={removeToast} />
    </>
  );
}
