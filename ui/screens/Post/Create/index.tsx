import { Box, Button, Input } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useState, useEffect } from "react";
import createPost from "@/api/createPost";
import Text from "@/components/base/Text";
import { useNavigate } from "@/ui/navigation";
import { getToken } from "@/ui/services/storage";
import { TeacherAuth } from "@/types/apiResponse";

export function CreatePostScreen() {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [keyWords, setKeywords] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [teacherId, setTeacherId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherId = async () => {
      try {
        const auth: TeacherAuth = await getToken();
        if (auth?.user?.id) {
          setTeacherId(auth.user.id);
        } else {
          console.error("Teacher ID não encontrado no objeto user.");
        }
      } catch (error) {
        console.error("Erro ao carregar o Teacher ID:", error);
      }
    };

    fetchTeacherId(); 
  }, []);

  const submitCreatePost = async () => {
    if (!teacherId) {
      console.error("Teacher ID não está carregado.");
      setHasError(true);
      return;
    }

    setSaving(true);
    setHasError(false);

    try {
      // Chama a função createPost passando os dados
      const newPost = await createPost({
        title: postTitle,
        text: postContent,
        keyWords: keyWords.split(",").map((word) => word.trim()),
        teacherId, 
      }).submit();

      // Após criar o post, navega para a página do post
      navigate.to("post", { postId: newPost.id });
    } catch (error) {
      console.error("Erro ao criar o post:", error);
      setHasError(true);
    } finally {
      setSaving(false);
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
          isLoading={saving}
          isDisabled={saving || !postTitle || !postContent}
          className="mt-4"
        >
          Criar Post
        </Button>

        {hasError && (
          <Text className="text-red-500 mt-4">
            Ocorreu um erro ao criar o post. Tente novamente.
          </Text>
        )}
      </Box>
    </BaseTemplate>
  );
}
