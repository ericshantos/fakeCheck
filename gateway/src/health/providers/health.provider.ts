import { Provider } from "@nestjs/common";
import { CheckInternetProvider } from "@health/providers/check-internet.provider";
import { InspectorProvider } from "@health/providers/inspectors.provider";
import { ChecksystemResourceProvider } from "@health/providers/check-system-resources.provider";

export const HealthProvider: Provider[] = [
    ...CheckInternetProvider,
    ...InspectorProvider,
    ...ChecksystemResourceProvider
];