import { Box, Button, Divider, FlatList, Heading } from "native-base";
import Text from "../base/Text";
import { ReactElement, useState } from "react";
import { useNavigate } from "@/ui/navigation";
import SearchBar from "../SearchBar";

interface Identifiable {
  id: string;
}

interface ListProps<T extends Identifiable> {
  items: T[];
  isLoading: boolean;
  searchFunc?: () => void;
  searchTerm?: string;
  onChangeSearchTerm?: (s: string) => void;
  component: React.FC<{ item: T }>;
  emptyListComponent?: ReactElement;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
}

const List = <T extends Identifiable>({
  items,
  isLoading,
  searchFunc,
  searchTerm = "",
  onChangeSearchTerm,
  component: Component,
  emptyListComponent,
  currentPage,
  totalPages,
  nextPage,
}: ListProps<T>): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Box className="w-full">
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Box className="w-full my-1" key={item.id}>
            <Component item={item} />
          </Box>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          !!searchFunc && !!onChangeSearchTerm ? (
            <Box className="w-full mb-8">
              <SearchBar value={searchTerm} onChange={onChangeSearchTerm} />
            </Box>
          ) : (
            <Heading className="mb-6">Let's learn</Heading>
          )
        }
        ListEmptyComponent={
          !isLoading
            ? emptyListComponent ?? (
                <Text>Não encontramos resultados para essa busca</Text>
              )
            : null
        }
        ListFooterComponent={
          <>
            {isLoading && <Box className="mt-3 mx-auto">Loading ...</Box>}
            {currentPage !== totalPages && (
              <Box className="flex flex-row w-full justify-center px-4 pb-8 gap-4 mt-8">
                <Button
                  variant="subtle"
                  className="w-3/4"
                  colorScheme="tertiary"
                  onPress={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Ver mais
                </Button>
              </Box>
            )}
            {!isLoading && currentPage === totalPages && (
              <Box className="mt-6 w-1/3 mx-auto">
                <Divider />
              </Box>
            )}
          </>
        }
      />
    </Box>
  );
};

export default List;
