import { RootStackParamList } from "@/routes/app.routes";
import { CreatePostScreen } from "@/ui/screens/Post/Create";

import { NativeStackScreenProps } from "@react-navigation/native-stack"; 

// Definindo o tipo de props, usando o RootStackParamList
type Props = NativeStackScreenProps<RootStackParamList, "postCreate">;

// Componente responsável por criar o post
export default function CreatePost({}: Props) {
  return <CreatePostScreen />; 
}
