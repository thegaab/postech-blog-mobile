import { Box, Button, Heading } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useEffect, useState } from "react";
import { Teacher } from "@/types";
import Text from "@/components/base/Text";
import { Alert } from "react-native";
import updatePost from "@/api/updatePost";
import { useNavigate } from "@/ui/navigation";
import Input from "@/components/base/Input";
import getOneTeacher from "@/api/getTeacher";
import updateTeacher from "@/api/updateTeacher";
import updateTeacherPassword from "@/api/updateTeacherPassword";

interface PostScreenProps {
  teacherId: string;
}

export function EditTeacherScreen({ teacherId }: PostScreenProps) {
  const [name, setName] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const requestCurrentData = getOneTeacher(teacherId);
  const requestUpdateData = updateTeacher(teacherId, {
    name: name,
    username: username,
  });
  const updatePassword = updateTeacherPassword(teacherId, {
    password,
  });

  const getTeacherContent = async () => {
    const teacher: Teacher = await requestCurrentData.submit();

    setName(teacher.name);
    setUsername(teacher.username);
  };

  // atualiza os dados
  const submitUpdateData = async () => {
    const updatedTeacher = await requestUpdateData.submit();

    if (updatedTeacher) {
      Alert.alert("Professor atualizado com sucesso!");
    } else {
      Alert.alert("Não foi possível atualizar o professor no momento");
    }
  };

  // atualiza a senha
  const submitUpdatePassword = async () => {
    const updatedPassword = await updatePassword.submit();
    console.log(updatedPassword);

    if (updatedPassword) {
      Alert.alert("Senha atualizada com sucesso!");
    } else {
      Alert.alert("Não foi possível atualizar a senha no momento");
    }
  };

  useEffect(() => {
    if (name === undefined && username === undefined) {
      getTeacherContent();
    }
  }, []);

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
          Atualizar <Text className="text-primary-700">Professor</Text>
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
            name="username"
            label="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            className="mb-2"
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            fontSize="lg"
          />
          <Button
            onPress={submitUpdateData}
            isLoading={requestUpdateData.loading}
            isDisabled={requestUpdateData.loading || !name || !username}
            className="mt-10"
          >
            Salvar alterações
          </Button>
        </Box>
        <Box>
          <Heading size={"md"} className="mb-4">
            Alterar senha
          </Heading>
          <Input
            label="Nova senha"
            name="password"
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            className="mb-4"
            fontSize="lg"
          />
          <Button
            onPress={submitUpdatePassword}
            isLoading={updatePassword.loading}
            isDisabled={updatePassword.loading || !password || password === ""}
            className="mt-10"
          >
            Salvar nova senha
          </Button>
        </Box>
      </Box>
    </BaseTemplate>
  );
}
