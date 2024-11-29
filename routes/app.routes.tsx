import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@/app/screens/Home";
import Login from "@/app/screens/Login";
import Post from "@/app/screens/Post";
import Admin from "@/app/screens/AdminView";
import ListTeacherView from "@/app/screens/TeachersList";
import ListStudentView from "@/app/screens/StudentsList";
import CreateStudentView from "@/app/screens/StudentCreate";
import EditPost from "@/app/screens/PostEdit";
import CreateTeacherView from "@/app/screens/TeacherCreate";
import CreatePost from "@/app/screens/PostCreate";

export type RootStackParamList = {
  home: undefined;
  admin: undefined;
  teacherList: undefined;
  teacherCreate: undefined;
  studentList: undefined;
  studentCreate: undefined;
  login: undefined;
  post: { postId: string };
  postUpdate: { postId: string };
  postCreate: undefined; 
};

export function AppRoutes() {
  const { Navigator, Screen } =
    createNativeStackNavigator<RootStackParamList>();

  return (
    <Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="post" component={Post} />
      <Screen name="login" component={Login} />

      {/* Post Admin Views */}
      <Screen name="admin" component={Admin} />
      <Screen name="postCreate" component={CreatePost} />
      <Screen name="postUpdate" component={EditPost} />

      {/* Teacher Views */}
      <Screen name="teacherList" component={ListTeacherView} />
      <Screen name="teacherCreate" component={CreateTeacherView} />

      {/* Student Views */}
      <Screen name="studentList" component={ListStudentView} />
      <Screen name="studentCreate" component={CreateStudentView} />
    </Navigator>
  );
}
