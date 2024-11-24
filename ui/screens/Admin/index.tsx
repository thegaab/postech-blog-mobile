import { Box, View, Text } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useEffect, useState } from "react";
import { PostInterface } from "@/types";
import PublicPostPreview from "@/components/PublicPostPreview";
import List from "@/components/List";
import SearchBar from "@/components/SearchBar";
import getTeacherPosts from "@/api/getTeacherPosts";
import { useSessionContext } from "@/ui/providers/authProvider";
import { useNavigate } from "@/ui/navigation";

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
      <View className="bg-slate-900 py-8">
        <Box className="w-full mb-6">
          <Text>Bem vindo Professor {user.name}</Text>
          <SearchBar onSearch={handleKeyword} />
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
