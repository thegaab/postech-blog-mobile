import { RootStackParamList } from "@/routes/app.routes";
import { EditStudentScreen } from "@/ui/screens/Student/edit";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "studentEdit">;

export default function EditStudent({ route }: Props) {
  const { studentId } = route.params;
  return <EditStudentScreen studentId={studentId} />;
}