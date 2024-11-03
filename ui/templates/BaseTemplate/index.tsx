import { ReactNode } from "react";
import { Box } from "native-base";
import Header from "@/components/Header";
interface BaseTemplateProps {
  children: ReactNode;
}

const BaseTemplate = ({ children }: BaseTemplateProps) => {
  return (
    <Box className="w-full overflow-hidden" safeAreaTop>
      <Header />
      <Box className="px-1.5 bg-stone-700 h-full">{children}</Box>
    </Box>
  );
};

export default BaseTemplate;
