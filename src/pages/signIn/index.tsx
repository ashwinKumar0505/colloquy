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
} from "@chakra-ui/react";
import PasswordField from "../../components/passwordField";
import { useSignIn } from "../../queries/mutation";
import { useDispatch } from "react-redux";
import { authentication } from "../../actions/actions";

type TFormData = {
  email: string;
  password: string;
};

const initialFormData: TFormData = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formData, setFormData] = useState<TFormData>(initialFormData);
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
      showToast("success", "You have been Signed in Successful");
      history.push("/");
    }
  };
  const onError = (err: any) => {
    showToast("error", err.response.data.message);
  };

  const { mutate } = useSignIn(onSuccess, onError);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
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
        <Heading fontSize={"4xl"}>SIGN IN</Heading>
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
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter Email Address"
                    id="email"
                    isRequired
                    onChange={(e) =>
                      handleInputChange(e.target.id, e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <PasswordField
                    id="password"
                    isRequired
                    onChange={(e) =>
                      handleInputChange(e.target.id, e.target.value)
                    }
                  />
                </FormControl>
              </Stack>

              <Stack mt={7}>
                <Button type="submit" colorScheme="primary" mb={2}>
                  SIGN IN
                </Button>
              </Stack>
            </Box>
          </form>
        </Box>
        <Text mt={4} fontSize="14px" textAlign="center">
          Don't have an account?{" "}
          <Link
            onClick={() => history.push("/sign-up")}
            textDecor="underline"
            color="primary.700"
            fontWeight="semibold"
          >
            SIGN UP
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignIn;
