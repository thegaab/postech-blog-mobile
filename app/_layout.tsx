import { Routes } from "@/routes";
import { NativeBaseProvider } from "native-base";
import "../constants/global.css";
import { customTheme } from "@/constants/theme";

export default function RootLayout() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Routes />
    </NativeBaseProvider>
  );
}
