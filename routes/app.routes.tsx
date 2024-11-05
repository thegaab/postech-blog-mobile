import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@/app/screens/Home";
import Login from "@/app/screens/Login";
import Post from "@/app/screens/Post";

export type RootStackParamList = {
  home: undefined;
  login: undefined;
  post: { postId: string };
};

export function AppRoutes() {
  const { Navigator, Screen } =
    createNativeStackNavigator<RootStackParamList>();

  return (
    <Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="post" component={Post} />
      <Screen name="login" component={Login} />
    </Navigator>
  );
}
