import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@/app/screens/Home";
import Login from "@/app/screens/Login";
import Post from "@/app/screens/Post";
import Admin from "@/app/screens/AdminView";
import ListTeacherView from "@/app/screens/TeachersList";
import ListStudentView from "@/app/screens/StudentsList";
import CreateStudentView from "@/app/screens/StudentCreate";

export type RootStackParamList = {
  home: undefined;
  admin: undefined;
  teacherList: undefined;
  studentList: undefined;
  studentCreate: undefined;
  login: undefined;
  post: { postId: string };
};

export function AppRoutes() {
  const { Navigator, Screen } =
    createNativeStackNavigator<RootStackParamList>();

  return (
    <Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="admin" component={Admin} />
      <Screen name="teacherList" component={ListTeacherView} />
      <Screen name="studentList" component={ListStudentView} />
      <Screen name="studentCreate" component={CreateStudentView} />
      <Screen name="post" component={Post} />
      <Screen name="login" component={Login} />
    </Navigator>
  );
}
