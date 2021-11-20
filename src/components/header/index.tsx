import { Avatar } from "@chakra-ui/avatar";
import { Button, Menu, MenuItem, MenuButton, MenuList } from "@chakra-ui/react";
import { Flex, Heading } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getIsUserAuthenticated, getUserName } from "../../selectors/index";
import { logout } from "../../actions/actions";

const Header = ({ onOpen }: { onOpen?: () => void }) => {
  const history = useHistory();
  const isUserAuthenticated = useSelector(getIsUserAuthenticated);
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <Flex
      boxShadow="md"
      px={8}
      py={4}
      justifyContent="space-between"
      width="100%"
    >
      <Heading cursor="pointer" onClick={() => history.push("/")}>
        COLLOQUY
      </Heading>
      {isUserAuthenticated && (
        <Flex alignItems="center">
          <Button mr={10} colorScheme="primary" onClick={onOpen}>
            Create a discussion
          </Button>
          <Menu>
            <MenuButton>
              <Avatar name={userName} size="sm" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
      {!isUserAuthenticated && (
        <Flex>
          <Button
            mr={2}
            colorScheme="primary"
            onClick={() => history.push("/sign-in")}
          >
            SIGN IN
          </Button>
          <Button
            colorScheme="primary"
            variant="outline"
            onClick={() => history.push("/sign-up")}
          >
            SIGN UP
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
