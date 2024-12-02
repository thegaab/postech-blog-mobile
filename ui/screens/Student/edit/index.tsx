import { Box, Button, Heading } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useCallback, useState } from "react";
import { Student } from "@/types";
import Text from "@/components/base/Text";
import { Alert } from "react-native";
import { useNavigate } from "@/ui/navigation";
import Input from "@/components/base/Input";
import getOneStudent from "@/api/getStudents";
import updateStudent from "@/api/updateStudent";
import { useFocusEffect } from "@react-navigation/native";
import { useSessionContext } from "@/ui/providers/authProvider";

interface StudentScreenProps {
  studentId: string;
}

export function EditStudentScreen({ studentId }: StudentScreenProps) {
  const [name, setName] = useState<string | undefined>(undefined);
  const [grades, setGrades] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const requestCurrentData = getOneStudent(studentId);
  const requestUpdateData = updateStudent(studentId, {
    name: name,
    grades: grades ? grades.split(",").map(Number) : undefined,
  });

  const getStudentContent = async () => {
    const student: Student = await requestCurrentData.submit();

    setName(student.name);
    setGrades(student.grades.join(", "));
  };

  const submitUpdateData = async () => {
    const updatedStudent = await requestUpdateData.submit();

    if (updatedStudent) {
      Alert.alert("Estudante atualizado com sucesso!");
    } else {
      Alert.alert("Não foi possível atualizar o estudante no momento");
    }
  };

  const { authenticate } = useSessionContext();

  useFocusEffect(
    useCallback(() => {
      authenticate();
      getStudentContent();
    }, [])
  );

  return (
    <BaseTemplate>
      <Box className="pt-8">
        <Button
          onPress={() => navigate.back()}
          className="mb-2 self-start"
          variant="link"
        >
          Voltar
        </Button>

        <Heading className="mb-8">
          Atualizar <Text className="text-primary-700">Estudante</Text>
        </Heading>

        <Box className="mb-8">
          <Heading size={"md"} className="mb-4">
            Atualizar dados
          </Heading>
          <Input
            name="name"
            label="Nome"
            value={name}
            onChangeText={(text) => setName(text)}
            className="mb-2"
            fontSize="lg"
          />
          <Input
            name="grades"
            label="Notas"
            value={grades}
            onChangeText={(text) => setGrades(text)}
            className="mb-2"
            placeholder="Separe as notas por vírgula (ex: 8.5, 9.0)"
            fontSize="lg"
          />
          <Button
            onPress={submitUpdateData}
            isLoading={requestUpdateData.loading}
            isDisabled={requestUpdateData.loading || !name || !grades}
            className="mt-10"
          >
            Salvar alterações
          </Button>
        </Box>
      </Box>
    </BaseTemplate>
  );
}
