import { Box, View } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useCallback, useState } from "react";
import { PostInterface } from "@/types";
import getPublicPosts from "@/api/getPosts";
import PublicPostPreview from "@/components/PublicPostPreview";
import List from "@/components/List";
import SearchBar from "@/components/SearchBar";
import { useFocusEffect } from "@react-navigation/native";
import getPublicPostsByKeyword from "@/api/getPostsByKeyword";
import { InterfaceList } from "@/types/apiPatterns";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

// todo: handle keyword
export function HomeScreen() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const requestPosts = getPublicPosts(page);
  const getByKeyword = getPublicPostsByKeyword(keyword, page);

  const handleKeyword = async (t: string) => {
    setKeyword(t);
  };

  const clearKeyword = async (t: string) => {
    setKeyword("");
  };

  const handleSubmit = async () => {
    let data: InterfaceList<PostInterface> | undefined;

    if (!!keyword || keyword !== "") {
      data = await getByKeyword.submit();
    } else {
      data = await requestPosts.submit();
    }

    if (!data) return;
    const updateList = posts.length >= 0 ? data.data : [...posts, ...data.data];
    setPosts(updateList);
    setMaxPages(Math.ceil(data.totalItems / data.itemsPerPage));
  };

  useFocusEffect(
    useCallback(() => {
      handleSubmit();
    }, [page, keyword])
  );

  return (
    <BaseTemplate>
      <View className="pt-8">
        <Box className="w-full mb-6">
          <SearchBar onSearch={handleKeyword} onClear={clearKeyword} />
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
