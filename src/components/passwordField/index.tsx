import {
  Input,
  InputProps,
  InputGroup,
  Icon,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const PasswordField: React.FC<InputProps> = ({ ...rest }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        type={show ? "text" : "password"}
        placeholder="Enter password"
        {...rest}
      />
      <InputRightElement>
        <Icon
          as={show ? AiFillEye : AiFillEyeInvisible}
          color="gray.500"
          onClick={handleClick}
          cursor="pointer"
          _hover={{ color: "gray.800" }}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordField;
