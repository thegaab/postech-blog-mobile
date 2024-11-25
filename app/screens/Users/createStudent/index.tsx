import { RootStackParamList } from "@/routes/app.routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CreateStudentScreen from "@/ui/screens/Users/CreateStudent";

type Props = NativeStackScreenProps<RootStackParamList, "createStudent">;

export default function CreateStudent({ navigation }: Props) {
  return <CreateStudentScreen />;
}