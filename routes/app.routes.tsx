import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@/app/screens/Home";
import Login from "@/app/screens/Login";

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="login" component={Login} />
    </Navigator>
  );
}
