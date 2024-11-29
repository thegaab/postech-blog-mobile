import { RootStackParamList } from "@/routes/app.routes";
import { EditTeacherScreen } from "@/ui/screens/Teacher/Edit";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "teacherEdit">;

export default function EditTeacher({ route }: Props) {
  const { teacherId } = route.params;
  return <EditTeacherScreen teacherId={teacherId} />;
}
