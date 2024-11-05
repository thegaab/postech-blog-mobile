import { Box, Button } from "native-base";
import Text from "../base/Text";
import { useNavigate } from "@/ui/navigation";
import { PostInterface } from "@/types";

interface PublicPostsPreviewProps {
  post: PostInterface;
}

export default function PublicPostPreview({ post }: PublicPostsPreviewProps) {
  const navigate = useNavigate();

  return (
    <Box className="rounded-lg px-1.5 py-3 bg-stone-600">
      <Box className="w-full flex flex-row justify-between items-center">
        <Text className="w-3/4">{post.title}</Text>
        <Button onPress={() => navigate.to("post", { postId: post.id })}>
          Ler
        </Button>
      </Box>
    </Box>
  );
}
