import { RootStackParamList } from "@/routes/app.routes";
import { PostScreen } from "@/ui/screens/Post/Read";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "post">;

export default function Post({ route }: Props) {
  const { postId } = route.params;
  return <PostScreen postId={postId} />;
}
