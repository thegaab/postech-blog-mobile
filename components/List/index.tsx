import { Box, Button, Divider, FlatList, Spinner } from "native-base";
import Text from "../base/Text";
import { ReactElement } from "react";
import { useNavigate } from "@/ui/navigation";

interface Identifiable {
  id: string;
}

interface ListProps<T extends Identifiable> {
  items: T[];
  isLoading: boolean;
  customHeader?: ReactElement;
  component: React.FC<{ item: T }>;
  emptyListComponent?: ReactElement;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
}

const List = <T extends Identifiable>({
  items,
  isLoading,
  component: Component,
  customHeader,
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
        renderItem={({ item, index }) => (
          <Box className="w-full my-1" key={`${item.id}-${index}`}>
            <Component item={item} />
          </Box>
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListHeaderComponent={!!customHeader ? customHeader : undefined}
        ListEmptyComponent={
          !isLoading
            ? emptyListComponent ?? (
                <Text key="empty">
                  Não encontramos resultados para essa busca
                </Text>
              )
            : null
        }
        ListFooterComponent={
          <Box className="mt-8">
            {isLoading && (
              <Box
                key="loading"
                className="mx-auto flex flex-row items-center justify-center gap-2"
              >
                <Spinner size="sm" /> <Text>Loading ...</Text>
              </Box>
            )}
            {currentPage !== totalPages && (
              <Box
                key="action"
                className="flex flex-row w-full justify-center px-4 pb-8 gap-4"
              >
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
              <Box className="w-1/3 mx-auto">
                <Divider />
              </Box>
            )}
          </Box>
        }
      />
    </Box>
  );
};

export default List;
