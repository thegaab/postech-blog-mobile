import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@/app/screens/Home";
import Login from "@/app/screens/Login";
import Post from "@/app/screens/Post";
import Admin from "@/app/screens/AdminView";
import CreateStudent from "@/app/screens/Users/createStudent";
import CreateTeacher from "@/app/screens/Users/createTeacher";
import ListTeacherView from "@/app/screens/TeachersList";
import ListStudentView from "@/app/screens/StudentsList";

export type RootStackParamList = {
  home: undefined;
  admin: undefined;
  teacherList: undefined;
  studentList: undefined;
  login: undefined;
  post: { postId: string };
  createStudent: undefined;
  createTeacher: undefined;
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
      <Screen name="post" component={Post} />
      <Screen name="login" component={Login} />
      <Screen name="createStudent" component={CreateStudent} />
      <Screen name="createTeacher" component={CreateTeacher} />
    </Navigator>
  );
}
