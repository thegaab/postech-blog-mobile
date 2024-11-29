import { Box, View, Button } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useEffect, useState } from "react";
import { PostInterface } from "@/types";
import getPublicPosts from "@/api/getPosts";
import PublicPostPreview from "@/components/PublicPostPreview";
import List from "@/components/List";
import SearchBar from "@/components/SearchBar";
import { useSessionContext } from "@/ui/providers/authProvider";
import { useNavigate } from "@/ui/navigation";

// todo: handle keyword
export function HomeScreen() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const { isLogged } = useSessionContext(); 
  const requestPosts = getPublicPosts(page); 
  const navigate = useNavigate(); 

  // Função para lidar com as palavras-chave no filtro de busca
  const handleKeyword = (t: string) => {
    setKeyword(t);
    setPage(1);
  };

  // Função que envia a requisição para obter posts
  const handleSubmit = async () => {
    const data = await requestPosts.submit();

    if (!data || !data.data) return;

    const updateList = posts.length >= 0 ? data.data : [...posts, ...data.data];
    setPosts(updateList);
    setMaxPages(Math.ceil(data.totalItems / data.itemsPerPage));
  };

  useEffect(() => {
    handleSubmit();
  }, [page]);

  return (
    <BaseTemplate>
      <View className="pt-8">
        <Box className="w-full mb-6">
          <SearchBar onSearch={handleKeyword} /> {/* Barra de pesquisa */}
        </Box>

        {/* Botão de "Criar Novo Post" que só aparece se o usuário estiver logado */}
        <Box>
          {isLogged && (
            <Button
              onPress={() => navigate.to("postCreate")}
              className="mt-4"
            >
              Criar Novo Post
            </Button>
          )}
        </Box>

        {/* Lista de posts */}
        <Box className="w-full p-2 mb-6">
          <List
            items={posts}
            isLoading={requestPosts.loading}
            component={PublicPostPreview} 
            currentPage={page} 
            totalPages={maxPages} 
            nextPage={() => setPage(page + 1)} // Função para ir para a próxima página
          />
        </Box>
      </View>
    </BaseTemplate>
  );
}
