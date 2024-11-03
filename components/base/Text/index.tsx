import { Text as BaseText, ITextProps } from "native-base";
import { ReactNode } from "react";

interface TextProps extends ITextProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export default function Text({
  children,
  className,
  color = "white",
  ...props
}: TextProps) {
  return (
    <BaseText
      {...props}
      className={className}
      _dark={{
        color: color,
      }}
    >
      {children}
    </BaseText>
  );
}
