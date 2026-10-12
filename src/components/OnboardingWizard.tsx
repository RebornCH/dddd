import { useState } from "react";
import {
  Modal,
  Text,
  BlockStack,
  InlineStack,
  Box,
  Button,
  Badge,
  Banner,
} from "@shopify/polaris";
import {
  CheckCircleIcon,
  AppsIcon,
  ShieldCheckMarkIcon,
} from "@shopify/polaris-icons";

interface Props {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const steps = [
  {
    title: "Connect Your Apps",
    description: "Link your third-party apps (Klaviyo, Gorgias, ReCharge, etc.) with their API keys.",
    icon: AppsIcon,
    detail: "API keys are encrypted with AES-256 and never stored in plaintext.",
  },
  {
    title: "Configure Erasure Rules",
    description: "Set which apps should receive automatic deletion requests when a customer opts out.",
    icon: ShieldCheckMarkIcon,
    detail: "You can enable/disable individual integrations at any time.",
  },
  {
    title: "Compliance Ready",
    description: "PrivacySync will automatically handle all incoming GDPR/CCPA erasure webhooks.",
    icon: CheckCircleIcon,
    detail: "You'll receive audit reports and failure alerts automatically.",
  },
];

export default function OnboardingWizard({ open, onClose, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete();
      setCurrentStep(0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Setup Wizard — 3 Steps to Full GDPR Compliance"
      primaryAction={{
        content: currentStep === steps.length - 1 ? "Complete Setup" : "Next Step",
        onAction: handleNext,
      }}
      secondaryActions={[
        ...(currentStep > 0
          ? [{ content: "Back", onAction: handleBack }]
          : []),
        { content: "Cancel", onAction: onClose },
      ]}
    >
      <Modal.Section>
        <BlockStack gap="400">
          {/* Progress indicator */}
          <InlineStack gap="200" align="center">
            {steps.map((_, index) => (
              <div
                key={index}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: index <= currentStep ? "#107c41" : "#e4e5e7",
                }}
              />
            ))}
          </InlineStack>

          {/* Step content */}
          <Box padding="400" background="bg-surface-secondary" borderRadius="200">
            <BlockStack gap="300">
              <InlineStack gap="200" blockAlign="center">
                <Box
                  background="bg-fill-success-secondary"
                  borderRadius="200"
                  padding="200"
                >
                  <span style={{ fontSize: "24px" }}>
                    {currentStep === 0 ? "🔗" : currentStep === 1 ? "⚙️" : "✅"}
                  </span>
                </Box>
                <BlockStack gap="100">
                  <InlineStack gap="200" blockAlign="center">
                    <Text as="h3" variant="headingMd" fontWeight="semibold">
                      Step {currentStep + 1}: {step.title}
                    </Text>
                    <Badge tone="info" size="small">
                      {`${currentStep + 1} of ${steps.length}`}
                    </Badge>
                  </InlineStack>
                  <Text as="p" variant="bodyMd" tone="subdued">
                    {step.description}
                  </Text>
                </BlockStack>
              </InlineStack>

              <Banner tone="info" icon={step.icon}>
                <Text as="p" variant="bodySm">
                  {step.detail}
                </Text>
              </Banner>
            </BlockStack>
          </Box>

          {/* Time estimate */}
          <InlineStack align="center">
            <Text as="p" variant="bodySm" tone="subdued">
              Estimated time: ~2 minutes
            </Text>
          </InlineStack>
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}
