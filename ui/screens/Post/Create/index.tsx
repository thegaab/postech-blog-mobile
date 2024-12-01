import { Box, Button, Input, Spinner } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useState, useCallback } from "react";
import createPost from "@/api/createPost";
import Text from "@/components/base/Text";
import { useNavigate } from "@/ui/navigation";
import { useSessionContext } from "@/ui/providers/authProvider";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export function CreatePostScreen() {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [keyWords, setKeywords] = useState<string>("");

  const { user, authenticate } = useSessionContext();

  const navigate = useNavigate();

  const createRequest = createPost({
    title: postTitle,
    text: postContent,
    keyWords: keyWords?.split(",").map((word) => word.trim()),
    teacherId: user?.id,
  });

  useFocusEffect(
    useCallback(() => {
      authenticate();
    }, [])
  );

  const submitCreatePost = async () => {
    if (!user) {
      return;
    }

    const newPost = await createRequest.submit();

    if (newPost && newPost.id) {
      navigate.to("post", { postId: newPost.id });
    } else {
      Alert.alert(
        "Não foi possível criar o post no momento, tente novamente mais tarde"
      );
      navigate.to("admin");
    }
  };

  return (
    <BaseTemplate>
      <Box className="pt-8">
        <Text className="text-xl font-bold mb-4">Criar novo post</Text>

        <Input
          placeholder="Título"
          value={postTitle}
          onChangeText={(text) => setPostTitle(text)}
          className="mb-4"
        />

        <Input
          placeholder="Conteúdo"
          value={postContent}
          onChangeText={(text) => setPostContent(text)}
          className="mb-4"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Input
          placeholder="Palavras-chave (separadas por vírgulas)"
          value={keyWords}
          onChangeText={(text) => setKeywords(text)}
          className="mb-4"
        />

        <Button
          onPress={submitCreatePost}
          isLoading={createRequest.loading}
          isDisabled={createRequest.loading || !postTitle || !postContent}
          className="mt-4"
        >
          {createRequest.loading ? <Spinner /> : "Criar Post"}
        </Button>
      </Box>
    </BaseTemplate>
  );
}
