import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/app.routes";

type PageName = keyof RootStackParamList;

export const useNavigate = () => {
  const navigation = useNavigation();

  function goToPage(screenName: PageName, options?: Record<string, any>) {
    const params = [screenName, options] as unknown as never;
    return navigation.navigate(...params);
  }

  return {
    to: goToPage,
    back: navigation.goBack,
  };
};
