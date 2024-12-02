import { Alert, Box, Spinner, View } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useCallback, useEffect, useState } from "react";
import { PostInterface } from "@/types";
import getPublicPosts from "@/api/getPosts";
import PublicPostPreview from "@/components/PublicPostPreview";
import List from "@/components/List";
import SearchBar from "@/components/SearchBar";
import { useFocusEffect } from "@react-navigation/native";
import getPublicPostsByKeyword from "@/api/getPostsByKeyword";

// todo: handle keyword
export function HomeScreen() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const requestPosts = getPublicPosts(page);
  const getByKeyword = getPublicPostsByKeyword(keyword, page);
  
  
  const handleKeyword = async (t:string) => {
    
    const dataByKeyword = await getByKeyword.submit();
    console.log(getByKeyword.submit());
    console.log(getByKeyword.loading);
    console.log(getByKeyword.err);
    

    if (!dataByKeyword || !dataByKeyword.data) return;
    const updateListKeyword = posts.length >= 0 ? dataByKeyword.data : [...posts, ...dataByKeyword.data];
    setPosts(updateListKeyword);
    setKeyword(t);
    setPage(1);

  /*   if(!dataByKeyword){
      const postFound = posts.filter(post => post.keyWords.includes(t));
      console.log(postFound);
      setPosts(postFound);
    } */
      //const postFound = dataByKeyword.data.filter(post => post.keyWords.includes(t));
   

  };

  const handleSubmit = async () => {
    const data = await requestPosts.submit();

    if (!data || !data.data) return;
    //console.log(data.data);
    const updateList = posts.length >= 0 ? data.data : [...posts, ...data.data];
    setPosts(updateList);
    setMaxPages(Math.ceil(data.totalItems / data.itemsPerPage));
  };

   useFocusEffect(
    useCallback(() => {
      handleSubmit();
    }, [page])
  ); 


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
