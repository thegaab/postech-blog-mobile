import deleteTeacher from "@/api/deleteTeacher";
import { Teacher } from "@/types";
import { useNavigate } from "@/ui/navigation";
import { Box, Button, Heading, Text } from "native-base";

interface TeacherPreviewProps {
  item: Teacher;
}

export default function TeacherPreview({ item }: TeacherPreviewProps) {
  const navigate = useNavigate();
  const deleteRequest = deleteTeacher(item.id);

  return (
    <Box className="rounded-lg px-1.5 py-3 bg-stone-600">
      <Box className="w-full flex flex-row justify-between items-start">
        <Box>
          <Text className="mb-2">username: {item.username}</Text>
          <Heading>{item.name}</Heading>
        </Box>
        <Box className="flex flex-col gap-1">
          <Button
            colorScheme="tertiary"
            // onPress={() => navigate.to("teacherEdit", { teacherId: item.id })}
          >
            Editar
          </Button>
          <Button colorScheme="danger" onPress={deleteRequest.submit}>
            Deletar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
