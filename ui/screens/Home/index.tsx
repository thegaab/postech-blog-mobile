import { Box, View } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useEffect, useState } from "react";
import { PostInterface } from "@/types";
import getPublicPosts from "@/api/getPosts";
import PublicPostPreview from "@/components/PublicPostPreview";
import List from "@/components/List";
import SearchBar from "@/components/SearchBar";

// todo: handle keyword
export function HomeScreen() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const requestPosts = getPublicPosts(page);

  const handleKeyword = (t: string) => {
    setKeyword(t);
    setPage(1);
  };

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
          <SearchBar onSearch={handleKeyword} />
        </Box>
        <Box className="w-full p-2 mb-6">
          <List
            items={posts}
            isLoading={requestPosts.loading}
            component={PublicPostPreview}
            currentPage={page}
            totalPages={maxPages}
            nextPage={() => setPage(page + 1)}
          />
        </Box>
      </View>
    </BaseTemplate>
  );
}
