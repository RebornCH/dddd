import {
  Card,
  Text,
  BlockStack,
  InlineStack,
  Box,
  Icon,
} from "@shopify/polaris";
import {
  CheckCircleIcon,
  AppsIcon,
  ClockIcon,
  ArrowUpIcon,
} from "@shopify/polaris-icons";

interface KPIItemProps {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  trend?: { value: string; positive: boolean };
  bgColor: string;
  iconTone: "success" | "info" | "warning";
}

function KPIItem({ title, value, subtitle, icon, trend, bgColor, iconTone }: KPIItemProps) {
  return (
    <Card>
      <BlockStack gap="300">
        <InlineStack align="space-between" blockAlign="center">
          <Box
            background={bgColor as any}
            borderRadius="200"
            padding="200"
          >
            <Icon source={icon} tone={iconTone} />
          </Box>
          {trend && (
            <InlineStack gap="100" blockAlign="center">
              <Icon
                source={ArrowUpIcon}
                tone={trend.positive ? "success" : "critical"}
              />
              <Text as="span" variant="bodySm" tone={trend.positive ? "success" : "critical"} fontWeight="semibold">
                {trend.value}
              </Text>
            </InlineStack>
          )}
        </InlineStack>
        <BlockStack gap="050">
          <Text as="p" variant="heading2xl" fontWeight="bold">
            {value}
          </Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            {title}
          </Text>
        </BlockStack>
        <Box
          padding="100"
          background="bg-fill-secondary"
          borderRadius="100"
        >
          <Text as="p" variant="bodySm" alignment="center" tone="subdued">
            {subtitle}
          </Text>
        </Box>
      </BlockStack>
    </Card>
  );
}

export default function KPICards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
      <KPIItem
        title="Total Erasures Processed"
        value="1,247"
        subtitle="Last 30 days"
        icon={CheckCircleIcon}
        trend={{ value: "+23 this week", positive: true }}
        bgColor="bg-fill-success-secondary"
        iconTone="success"
      />
      <KPIItem
        title="Connected Third-Party Apps"
        value="5 / 5"
        subtitle="All apps active"
        icon={AppsIcon}
        bgColor="bg-fill-info-secondary"
        iconTone="info"
      />
      <KPIItem
        title="Average Sync Time"
        value="< 45s"
        subtitle="Across all integrations"
        icon={ClockIcon}
        trend={{ value: "-1.2s faster", positive: true }}
        bgColor="bg-fill-warning-secondary"
        iconTone="warning"
      />
    </div>
  );
}
