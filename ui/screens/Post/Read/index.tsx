import { Box, Button } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useEffect, useState } from "react";
import { PostInterface } from "@/types";
import Text from "@/components/base/Text";
import getPublicOnePost from "@/api/getPost";
import { useNavigation } from "@react-navigation/native";
import { useNavigate } from "@/ui/navigation";
import { useSessionContext } from "@/ui/providers/authProvider";

interface PostScreenProps {
  postId: string;
}

export function PostScreen({ postId }: PostScreenProps) {
  const [post, setPost] = useState<PostInterface | undefined>();
  const navigate = useNavigate();
  const { isLogged } = useSessionContext();

  const requestPosts = getPublicOnePost(postId);

  const getPosts = async () => {
    const postData: PostInterface = await requestPosts.submit();
    //console.log("ta retornando:",postData)

    setPost(postData);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <BaseTemplate>
      <Box className="pt-8">
        {requestPosts.loading && <Text>Loading...</Text>}

        {!requestPosts.loading && !post && (
          <Text>Não encontramos esse post</Text>
        )}
        {!requestPosts.loading && post && (
          <Box>
            <Text fontWeight="bold" fontSize="xl" mb={4}>
              {post.title}
            </Text>
            <Box>
              <Text fontSize="sm" color="gray.500" mb={4}>
                Autor: {post.authorName}
              </Text>
              
            </Box>

            <Text fontSize="md" mb={2}>
              {post?.text}
            </Text>

            <Button onPress={()=> navigate.to("home")} colorScheme="blue" marginBottom={2}>
              Voltar
            </Button>

            {isLogged && (
                <Button
                  onPress={() => navigate.to("postUpdate", { postId: post.id })}>
                  Editar
                </Button>
              )}

            
          </Box>
        )}
      </Box>
    </BaseTemplate>
  );
}
