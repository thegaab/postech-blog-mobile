import { Box, Button, Heading } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useCallback, useState } from "react";
import { PostInterface } from "@/types";
import Text from "@/components/base/Text";
import { Alert } from "react-native";
import updatePost from "@/api/updatePost";
import getPublicOnePost from "@/api/getPost";
import { useNavigate } from "@/ui/navigation";
import Input from "@/components/base/Input";
import { useFocusEffect } from "@react-navigation/native";
import { useSessionContext } from "@/ui/providers/authProvider";

interface PostScreenProps {
  postId: string;
}

export function EditPostScreen({ postId }: PostScreenProps) {
  const [postTitle, setPostTitle] = useState<string | undefined>(undefined);
  const [postContent, setPostContent] = useState<string | undefined>(undefined);

  // no input pegue as keywords separadas por vírgula
  const [keyWords, setKeywords] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const requestPosts = getPublicOnePost(postId);
  const requestUpdatePosts = updatePost(postId, {
    title: postTitle,
    text: postContent,
    keyWords: keyWords?.split(",").map((word) => word.trim()),
  });

  const getPostContent = async () => {
    const postData: PostInterface = await requestPosts.submit();

    setPostTitle(postData.title);
    setPostContent(postData.text);
    setKeywords(postData.keyWords.join(", "));
  };

  // para enviar a atualização
  const submitUpdate = async () => {
    const updatedPost = await requestUpdatePosts.submit();
    console.log(updatedPost);

    if (updatedPost) {
      Alert.alert("Post atualizado com sucesso!");
      navigate.to("post", { postId });
    } else {
      Alert.alert("Não foi possível atualizar o post no momento");
    }
  };

  const { authenticate } = useSessionContext();

  useFocusEffect(
    useCallback(() => {
      authenticate();
      getPostContent();
    }, [])
  );

  return (
    <BaseTemplate>
      <Box className="pt-8">
        <Button
          onPress={() => navigate.back()}
          className="mb-2 self-start"
          variant="link"
        >
          Voltar
        </Button>

        <Heading className="mb-6">
          Edição de <Text className="text-primary-700">post</Text>
        </Heading>

        {/* Input para o título */}
        <Input
          name="title"
          placeholder="Título"
          value={postTitle}
          onChangeText={(text) => setPostTitle(text)}
          className="mb-4"
          fontSize="lg"
        />
        {/* Input para o conteúdo */}
        <Input
          name="text"
          placeholder="Conteúdo"
          value={postContent}
          onChangeText={(text) => setPostContent(text)}
          className="mb-4"
          multiline
          numberOfLines={8}
          textAlignVertical="top"
          fontSize="lg"
        />
        {/* Input para as keywords */}
        <Input
          name="keywords"
          placeholder="Palavras-chave (separadas por vírgulas)"
          value={keyWords}
          onChangeText={(text) => setKeywords(text)}
          className="mb-4"
          fontSize="lg"
        />
        {/* Botão para salvar */}
        <Button
          onPress={submitUpdate}
          isLoading={requestUpdatePosts.loading}
          isDisabled={requestUpdatePosts.loading || !postTitle || !postContent}
          className="mt-10"
        >
          Salvar alterações
        </Button>
      </Box>
    </BaseTemplate>
  );
}
