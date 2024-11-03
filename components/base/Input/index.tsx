import { Entypo } from "@expo/vector-icons";
import {
  Input as BaseInput,
  IInputProps,
  Button,
  FormControl,
} from "native-base";
import { useState } from "react";

interface InputProps extends IInputProps {
  label?: string;
  name: string;
  helpText?: string;
}

const Input = ({
  label,
  name,
  type = "text",
  helpText,
  ...props
}: InputProps) => {
  const [hideValue, setHideValue] = useState<boolean>(
    type === "password" ? true : false
  );

  const HideIcon = () => {
    return hideValue ? (
      <Entypo name="eye" size={20} color="white" />
    ) : (
      <Entypo name="eye-with-line" size={20} color="white" />
    );
  };

  const handleShow = () => {
    setHideValue(!hideValue);
  };

  return (
    <FormControl className="flex flex-col items-start w-full bg-transparent">
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <BaseInput
        {...props}
        className="w-full"
        type={hideValue ? type : "text"}
        InputRightElement={
          type === "password" ? (
            <Button
              size="xs"
              rounded="none"
              colorScheme="primary"
              w="1/8"
              h="full"
              onPress={handleShow}
            >
              <HideIcon />
            </Button>
          ) : (
            <></>
          )
        }
        _dark={{
          backgroundColor: "warmGray.700",
          _focus: {
            borderColor: "primary.500",
            borderWidth: "2",
          },
        }}
      />
    </FormControl>
  );
};

export default Input;
