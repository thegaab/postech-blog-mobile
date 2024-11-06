import { Box, Button, FlatList, Heading } from "native-base";
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
  prevPage: () => void;
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
  prevPage,
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
          !isLoading ? (
            emptyListComponent ?? (
              <Text>Não encontramos resultados para essa busca</Text>
            )
          ) : (
            <></>
          )
        }
        ListFooterComponent={
          totalPages > 1 ? (
            <>
              {isLoading && <Box className="mt-3">Loading ...</Box>}
              <Box className="flex flex-row w-full justify-between px-4 pb-8 gap-4 mt-8">
                <Button
                  variant="subtle"
                  className="w-2/5"
                  colorScheme="tertiary"
                  onPress={prevPage}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <Button
                  variant="subtle"
                  className="w-2/5"
                  colorScheme="tertiary"
                  onPress={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                </Button>
              </Box>
            </>
          ) : (
            <></>
          )
        }
      />
    </Box>
  );
};

export default List;
