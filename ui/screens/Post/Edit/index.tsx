import { Box, Button } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useEffect, useState } from "react";
import { PostInterface } from "@/types";
import Text from "@/components/base/Text";
import updatePost from "@/api/updatePost";
import getPublicOnePost from "@/api/getPost";
import { useNavigate } from "@/ui/navigation";
import Input from "@/components/base/Input";

interface PostScreenProps {
  postId: string;
}

export function EditPostScreen({ postId }: PostScreenProps) {
  const [postTitle, setPostTitle] = useState<string | undefined>(undefined);
  const [postContent, setPostContent] = useState<string | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);

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
      setError(false);
      console.log("Post atualizado com sucesso!");
      navigate.to("post", { postId });
    } else {
      console.log("Não foi possível atualizar o post");
      setError(true);
    }
  };

  useEffect(() => {
    setError(false);
    if (postTitle === undefined && postContent === undefined) {
      getPostContent();
    }
  }, []);

  return (
    <BaseTemplate>
      <Box className="pt-8">
        <Button
          onPress={() => navigate.back()}
          className="mb-6 self-start"
          variant="link"
        >
          Voltar
        </Button>

        <Text>
          Edição de <Text className="text-primary-700">post</Text>
        </Text>

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
          className="mt-4"
        >
          Salvar alterações
        </Button>
      </Box>
    </BaseTemplate>
  );
}
