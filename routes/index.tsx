import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { AllProviders } from "@/ui/providers";

export function Routes() {
  return (
    <NavigationContainer independent={true}>
      <AllProviders>
        <AppRoutes />
      </AllProviders>
    </NavigationContainer>
  );
}
