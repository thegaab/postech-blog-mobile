import { Box, View, Text, Button } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useCallback, useEffect, useState } from "react";
import { PostInterface } from "@/types";
import PublicPostPreview from "@/components/PublicPostPreview";
import List from "@/components/List";
import SearchBar from "@/components/SearchBar";
import getTeacherPosts from "@/api/getTeacherPosts";
import { useSessionContext } from "@/ui/providers/authProvider";
import { useNavigate } from "@/ui/navigation";
import { useFocusEffect } from "@react-navigation/native";
import getPublicPostsByKeyword from "@/api/getPostsByKeyword";
import { InterfaceList } from "@/types/apiPatterns";

// TODO: handle keyword
export function AdminScreen() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const navigate = useNavigate();
  const { user } = useSessionContext();

  if (!user || !user.id) {
    navigate.to("login");
    return (
      <BaseTemplate>
        <View className="flex justify-center items-center text-center">
          Faça seu login primeiro. Redirecionando...
        </View>
      </BaseTemplate>
    );
  }

  const requestPosts = getTeacherPosts(user.id, page);
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
  const { authenticate } = useSessionContext();

  useFocusEffect(
    useCallback(() => {
      authenticate();
      handleSubmit();
    }, [page, keyword])
  );

  return (
    <BaseTemplate>
      <View className="pt-6">
        <Box className="w-full mb-6">
          <Box className="mb-3">
            <Text>Bem vindo</Text>
            <Text className="">Professor {user.name}</Text>
          </Box>
          <Button onPress={() => navigate.to("postCreate")} className="my-2">
            Novo post
          </Button>
        </Box>
        <Box>
          <SearchBar onSearch={handleKeyword} onClear={clearKeyword} />
        </Box>
      </View>
      <View className="pt-8">
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
