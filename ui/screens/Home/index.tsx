import { Box, View } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useEffect, useState } from "react";
import { InterfaceList } from "@/types/apiPatterns";
import { PostInterface } from "@/types";
import getPublicPosts from "@/api/getPosts";
import PublicPostPreview from "@/components/PublicPostPreview";
import List from "@/components/List";

export function HomeScreen() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const requestPosts = getPublicPosts(page);

  const getPosts = async () => {
    const listData: InterfaceList<PostInterface> = await requestPosts.submit();

    setPosts([...posts, ...listData.data]);
    setMaxPages(Math.ceil(listData.totalItems / listData.itemsPerPage));
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  return (
    <BaseTemplate>
      <View className="pt-8">
        <Box className="w-full p-2 mb-6">
          <List
            items={posts}
            isLoading={requestPosts.loading}
            component={PublicPostPreview}
            currentPage={page}
            totalPages={maxPages}
            prevPage={() => setPage(page - 1)}
            nextPage={() => setPage(page + 1)}
          />
        </Box>
      </View>
    </BaseTemplate>
  );
}
