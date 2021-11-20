/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, useDisclosure } from "@chakra-ui/react";
import { Route, Switch, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import Header from "./components/header";
import Discussion from "./pages/discussion";
import DiscussionPage from "./pages/discussionListPage";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import { useEffect } from "react";
import { getAccessToken } from "./utils/token";
import { useDispatch } from "react-redux";
import { logout } from "./actions/actions";

function App() {
  const location = useLocation();
  const token = getAccessToken();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutUser = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (token) {
      const decodedToken: any = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logoutUser();
    }
  }, [location]);
  return (
    <Flex width="100vw" height="100vh" direction="column" overflow="hidden">
      <Header onOpen={onOpen} />
      <Flex flex={1} direction="column" overflow="scroll">
        <Switch>
          <Route path="/sign-in" exact>
            <SignIn />
          </Route>
          <Route path="/sign-up" exact>
            <SignUp />
          </Route>
          <Route path="/discussion">
            <Discussion />
          </Route>
          <Route path="/" exact>
            <DiscussionPage isOpen={isOpen} onClose={onClose} />
          </Route>
        </Switch>
      </Flex>
    </Flex>
  );
}

export default App;
