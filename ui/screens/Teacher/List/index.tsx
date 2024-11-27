import getTeachers from "@/api/getTeachers";
import List from "@/components/List";
import TeacherPreview from "@/components/TeacherPreview";
import { Teacher } from "@/types";
import { useNavigate } from "@/ui/navigation";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { Box, Button, Heading, View } from "native-base";
import { useEffect, useState } from "react";

export function ListTeacherScreen() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const navigate = useNavigate();

  const requestTeachers = getTeachers(page);

  const handleSubmit = async () => {
    const data = await requestTeachers.submit();

    if (!data || !data.data) return;

    const updateList =
      teachers.length <= 0 ? data.data : [...teachers, ...data.data];
    setTeachers(updateList);
    setMaxPages(Math.ceil(data.totalItems / data.itemsPerPage));
  };

  useEffect(() => {
    handleSubmit();
  }, [page]);

  return (
    <BaseTemplate>
      <View className="pt-6">
        <Box className="w-full">
          <Box className="mb-3">
            <Heading size={"lg"}>Professores</Heading>
            {/* trocar para enviar para tela de criação de professores */}
            <Button onPress={() => navigate.to("teacherList")}>
              Criar novo professor
            </Button>
          </Box>
        </Box>
      </View>
      <View className="pt-8">
        <Box className="w-full p-2 mb-6">
          <List
            items={teachers}
            isLoading={requestTeachers.loading}
            component={TeacherPreview}
            currentPage={page}
            totalPages={maxPages}
            nextPage={() => setPage(page + 1)}
          />
        </Box>
      </View>
    </BaseTemplate>
  );
}
