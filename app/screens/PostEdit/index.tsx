import { RootStackParamList } from "@/routes/app.routes";
import { EditPostScreen } from "@/ui/screens/Post/Edit";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "postUpdate">;

export default function EditPost({ route }: Props) {
  const { postId } = route.params;
  return <EditPostScreen postId={postId} />;
}
