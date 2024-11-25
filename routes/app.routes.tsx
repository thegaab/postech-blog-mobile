import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@/app/screens/Home";
import Login from "@/app/screens/Login";
import Post from "@/app/screens/Post";
import Admin from "@/app/screens/AdminView";
import CreateStudent from "@/app/screens/Users/createStudent"

export type RootStackParamList = {
  home: undefined;
  admin: undefined;
  login: undefined;
  post: { postId: string };
  createStudent: undefined;
};

export function AppRoutes() {
  const { Navigator, Screen } =
    createNativeStackNavigator<RootStackParamList>();

  return (
    <Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="admin" component={Admin} />
      <Screen name="post" component={Post} />
      <Screen name="login" component={Login} />
      <Screen name="createStudent" component={CreateStudent}/>
    </Navigator>
  );
}
