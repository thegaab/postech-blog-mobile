import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@/app/screens/Home";
import Post from "@/app/screens/Post";
import Login from "@/app/screens/Login";
import Admin from "@/app/screens/AdminView";
import EditPost from "@/app/screens/PostEdit";
import ListStudentView from "@/app/screens/StudentsList";
import CreateStudentView from "@/app/screens/StudentCreate";
import ListTeacherView from "@/app/screens/TeachersList";
import CreateTeacherView from "@/app/screens/TeacherCreate";

export type RootStackParamList = {
  home: undefined;
  admin: undefined;
  login: undefined;
  teacherList: undefined;
  createTeacher: undefined;
  studentList: undefined;
  createStudent: undefined;
  post: { postId: string };
  postUpdate: { postId: string };
};

export function AppRoutes() {
  const { Navigator, Screen } =
    createNativeStackNavigator<RootStackParamList>();

  return (
    <Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="admin" component={Admin} />
      <Screen name="login" component={Login} />

      {/* TEACHER VIEWS */}
      <Screen name="teacherList" component={ListTeacherView} />
      <Screen name="createTeacher" component={CreateTeacherView} />

      {/* STUDENT VIEWS */}
      <Screen name="studentList" component={ListStudentView} />
      <Screen name="createStudent" component={CreateStudentView} />

      {/* POST VIEWS */}
      <Screen name="post" component={Post} />
      <Screen name="postUpdate" component={EditPost} />
    </Navigator>
  );
}
