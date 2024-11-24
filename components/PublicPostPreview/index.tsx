import { Box, Button, Heading } from "native-base";
import Text from "../base/Text";
import { useNavigate } from "@/ui/navigation";
import { PostInterface } from "@/types";
import { useSessionContext } from "@/ui/providers/authProvider";

interface PublicPostsPreviewProps {
  item: PostInterface;
}

export default function PublicPostPreview({ item }: PublicPostsPreviewProps) {
  const navigate = useNavigate();
  const { isLogged } = useSessionContext();

  return (
    <Box className="rounded-lg px-1.5 py-3 bg-stone-600">
      <Box className="w-full flex flex-col justify-center items-center">
        <Box className="w-full mb-4">
          <Heading className="w-3/4 mb-2">{item.title}</Heading>
          <Text>Prof. {item.authorName}</Text>
        </Box>
        <Box className="w-full flex flex-row justify-end gap-2">
          <Button
            onPress={() => navigate.to("post", { postId: item.id })}
            className="w-1/4"
          >
            Ler
          </Button>
          {isLogged && (
            <Button
              onPress={() => navigate.to("postUpdate", { postId: item.id })}
              className="w-1/4"
            >
              Editar
            </Button>
          )}
          {/* {isLogged && (
            <Button onPress={}>
              Excluir
            </Button>
          )} */}
        </Box>
      </Box>
    </Box>
  );
}
