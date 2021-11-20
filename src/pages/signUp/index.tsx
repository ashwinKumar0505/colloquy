import { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
  Flex,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import PasswordField from "../../components/passwordField";
import { validatePassword, validateEmail } from "../../utils/validations";
import { useDispatch } from "react-redux";
import { authentication } from "../../actions/actions";
import { useSignUp } from "../../queries/mutation";

type TFormData = {
  name: string;
  email: string;
  password: string;
};

const initialFormData: TFormData = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [formData, setFormData] = useState<TFormData>(initialFormData);
  const [showErrors, setShowErrors] = useState(false);
  const history = useHistory();
  const toast = useToast();
  const dispatch = useDispatch();

  const showToast = (
    status: "error" | "success" | "warning",
    message: string
  ) => {
    toast({
      title: message,
      status,
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const onSuccess = (data: any) => {
    if (data) {
      dispatch(
        authentication({
          userName: data.result.userName,
          isUserAuthenticated: true,
          token: data.token,
          userId: data.result._id,
        })
      );
      showToast("success", "Sign Up Successful");
      history.push("/");
    }
  };
  const onError = (err: any) => {
    showToast("warning", err.response.data.message);
  };

  const { mutate } = useSignUp(onSuccess, onError);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!validateEmail(email) || !validatePassword(password)) {
      setShowErrors(true);
    } else {
      mutate(formData);
    }
  };

  return (
    <Flex
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Stack align={"center"} mb={10}>
        <Heading fontSize={"4xl"}>SIGN UP</Heading>
      </Stack>
      <Box
        maxW={"lg"}
        boxShadow="0 0 10px rgba(0,0,0,0.1)"
        width="600px"
        bg="white"
        borderRadius="md"
        m={3}
        p={8}
      >
        <Box>
          <form onSubmit={submitHandler}>
            <Box>
              <Stack spacing={4} mb={8}>
                <FormControl>
                  <FormLabel>Your Name</FormLabel>
                  <Input
                    placeholder="Enter Your Name"
                    id="name"
                    isRequired
                    onChange={(e) =>
                      handleInputChange(e.target.id, e.target.value)
                    }
                  />
                </FormControl>
                <FormControl
                  isInvalid={showErrors && !validateEmail(formData.email)}
                >
                  <FormLabel>Email address</FormLabel>
                  <Input
                    placeholder="Enter Email Address"
                    type="email"
                    id="email"
                    isRequired
                    onChange={(e) =>
                      handleInputChange(e.target.id, e.target.value)
                    }
                  />
                  <FormErrorMessage>
                    Please Enter a proper email Format
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={showErrors && !validatePassword(formData.password)}
                >
                  <FormLabel>Password</FormLabel>
                  <PasswordField
                    placeholder="Enter Password"
                    id="password"
                    isRequired
                    onChange={(e) =>
                      handleInputChange(e.target.id, e.target.value)
                    }
                  />
                  <FormErrorMessage>
                    Password must have Minimum six characters, at least one
                    letter and one number
                  </FormErrorMessage>
                </FormControl>
              </Stack>

              <Stack mt={7}>
                <Button type="submit" colorScheme="primary" mb={2}>
                  SIGN UP
                </Button>
              </Stack>
            </Box>
          </form>
        </Box>
        <Text mt={4} fontSize="14px" textAlign="center">
          Existing User?{" "}
          <Link
            onClick={() => history.push("/sign-in")}
            textDecor="underline"
            color="primary.700"
            fontWeight="semibold"
          >
            SIGN IN
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignUp;
