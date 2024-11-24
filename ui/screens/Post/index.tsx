import { Box, Button } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useEffect, useState } from "react";
import { PostInterface } from "@/types";
import Text from "@/components/base/Text";
import getPublicOnePost from "@/api/getPost";
import { useNavigation } from "@react-navigation/native";

interface PostScreenProps {
  postId: string;
}

export function PostScreen({ postId }: PostScreenProps) {
  const [post, setPost] = useState<PostInterface | undefined>();
  const navigation = useNavigation();

  const requestPosts = getPublicOnePost(postId);

  const getPosts = async () => {
    const postData: PostInterface = await requestPosts.submit();
    //console.log("ta retornando:",postData)

    setPost(postData);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  }

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
              {post?.title}
            </Text>

            <Text fontSize="md" mb={2}>
               {post?.text} 
            </Text>

            <Text fontSize="sm" color="gray.500" mb={4}>
              Autor: {post?.authorName}
            </Text>

            <Button onPress={handleGoBack} colorScheme="blue">
              Voltar
            </Button>
          </Box>
        )}
      </Box>
    </BaseTemplate>
  );
}
