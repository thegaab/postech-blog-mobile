import { Box, Button } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useEffect, useState } from "react";
import { InterfaceList } from "@/types/apiPatterns";
import { PostInterface } from "@/types";
import getPublicPosts from "@/api/getPosts";
import SearchBar from "@/components/SearchBar";
import Text from "@/components/base/Text";
import PublicPostPreview from "@/components/PublicPostPreview";

export function HomeScreen() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [page, setPage] = useState(1); // para implementar paginação
  const [maxPages, setMaxPages] = useState(1); // para implementar paginação

  const requestPosts = getPublicPosts(page);

  const getPosts = async () => {
    const listData: InterfaceList<PostInterface> = await requestPosts.submit();

    setPosts(listData.data);
    setMaxPages(Math.round(listData.totalItems / listData.itemsPerPage));
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  return (
    <BaseTemplate>
      <Box className="pt-8">
        <Box className="w-full mb-8">
          <SearchBar />
        </Box>
        <Box className="w-full p-2 mb-6">
          {requestPosts.loading && (
            <Text className="w-full text-center">Loading...</Text>
          )}
          {!requestPosts.loading && posts.length === 0 && (
            <Text>Sem posts no momento</Text>
          )}
          {!requestPosts.loading &&
            posts.length >= 1 &&
            posts.map((post) => (
              <Box key={post.id} className="w-full my-2">
                <PublicPostPreview post={post} />
              </Box>
            ))}
        </Box>
        <Box className="w-full flex flex-row justify-center gap-2">
          <Button
            colorScheme="tertiary"
            disabled={page <= 1}
            onPress={() => setPage(page - 1)}
          >
            Página anterior
          </Button>
          <Button
            colorScheme="tertiary"
            disabled={page === maxPages}
            onPress={() => setPage(page - 1)}
          >
            Próxima Página
          </Button>
        </Box>
      </Box>
    </BaseTemplate>
  );
}
