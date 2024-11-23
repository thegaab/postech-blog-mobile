import { Box } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useEffect, useState } from "react";
import { PostInterface } from "@/types";
import Text from "@/components/base/Text";
import getPublicOnePost from "@/api/getPost";

interface PostScreenProps {
  postId: string;
}

export function PostScreen({ postId }: PostScreenProps) {
  const [post, setPost] = useState<PostInterface | undefined>();

  const requestPosts = getPublicOnePost(postId);

  const getPosts = async () => {
    const postData: PostInterface = await requestPosts.submit();

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
          <Box className="px-4">
            <Text className="pb-4 text-4xl">{post?.title}</Text>
            <Text className="text-wrap text-justify">{post?.text}</Text>
          </Box>
        )}
      </Box>
    </BaseTemplate>
  );
}
