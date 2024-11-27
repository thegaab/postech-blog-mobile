import { useEffect, useState } from "react";
import { PostInterface } from "@/types";
import { useNavigate } from "@/ui/navigation";
import { useSessionContext } from "@/ui/providers/authProvider";

import BaseTemplate from "@/ui/templates/BaseTemplate";
import { Box, Button, Spinner } from "native-base";
import Text from "@/components/base/Text";
import getPublicOnePost from "@/api/getPost";

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

    setPost(postData);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleGoBack = () => {
    navigate.back();
  };

  return (
    <BaseTemplate>
      <Box className="pt-8">
        {requestPosts.loading && (
          <Box>
            <Spinner
              className="mx-auto flex flex-row items-center justify-center gap-2"
              size="sm"
            />{" "}
            <Text>Loading ...</Text>
          </Box>
        )}

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

            <Button onPress={handleGoBack} colorScheme="blue" marginBottom={2}>
              Voltar
            </Button>

            {isLogged && (
              <Button
                onPress={() => navigate.to("postUpdate", { postId: post.id })}
              >
                Editar
              </Button>
            )}
          </Box>
        )}
      </Box>
    </BaseTemplate>
  );
}
