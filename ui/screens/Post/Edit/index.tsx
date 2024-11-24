import { Box } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useEffect, useState } from "react";
import { PostInterface } from "@/types";
import Text from "@/components/base/Text";
import updatePost from "@/api/updatePost";
import getPublicOnePost from "@/api/getPost";

interface PostScreenProps {
  postId: string;
}

export function EditPostScreen({ postId }: PostScreenProps) {
  const [postTitle, setPostTitle] = useState<string | undefined>(undefined);
  const [postContent, setPostContent] = useState<string | undefined>(undefined);

  // no input pegue as keywords separadas por vírgula
  const [keyWords, setKeywords] = useState<string | undefined>(undefined);

  const requestPosts = getPublicOnePost(postId);
  const requestUpdatePosts = updatePost(postId, {
    title: postTitle,
    text: postContent,
    keyWords: keyWords?.split(",").map((word) => word.trim()), // TESTAR: isso deveria transformar a string separada por virgulas em um array de strings sem espaços
  });

  const getPostContent = async () => {
    const postData: PostInterface = await requestPosts.submit();

    setPostTitle(postData.title);
    setPostContent(postData.text);
    // transforma o array de keywords em uma string separada por virgulas
    setKeywords(postData.keyWords.join(", "));
  };

  // para enviar a atualização
  const submitUpdate = async () => {
    const updatedPost = await requestUpdatePosts.submit();

    console.log(updatedPost);
    // depois que validar que deu certo o update, retorne para a página de ler o post que foi editado
    // usar o useNavigate criado no repositório
    // para referência olhar o MenuItem no componente Menu
  };

  useEffect(() => {
    if (postTitle === undefined && postContent === undefined) {
      getPostContent();
    }
  }, []);

  return (
    <BaseTemplate>
      <Box className="pt-8">
        <Text>
          Edição de <Text className="text-primary-700">post</Text>
        </Text>

        {/* Incluir aqui os inputs para edição */}
      </Box>
    </BaseTemplate>
  );
}
