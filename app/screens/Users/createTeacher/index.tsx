import { RootStackParamList } from "@/routes/app.routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CreateTeacherScreen from "@/ui/screens/Users/CreateTeacher";

type Props = NativeStackScreenProps<RootStackParamList, "createTeacher">;

export default function CreateTeacher({ navigation }: Props) {
  return <CreateTeacherScreen />;
}