import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Textarea,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateDiscussion } from "../../queries/mutation";
import { getUserId, getUserName } from "../../selectors";

const DiscussionForum = ({
  isOpen,
  onClose,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const userName = useSelector(getUserName);
  const userId = useSelector(getUserId);
  const toast = useToast();

  const showToast = (status: "error" | "success", message: string) => {
    toast({
      title: message,
      status,
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

 

  const onSuccess = () => {
    showToast("success", "Your discussion had been created successfully");
    onClose();
    refetch();
  };

  const onError = () => {
    showToast("error", "Error in creating the discussion. Please Try again");
  };

  const { mutate } = useCreateDiscussion(onSuccess, onError);

  const submitHandler = (e: any) => {
    e.preventDefault();
    mutate({
      userId,
      creatorName: userName,
      title,
      description,
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <form onSubmit={submitHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="1px solid #E2E8F0">
            Create Your Discussion
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={8}>
            <Box mb={5}>
              <Text mb={2} fontWeight="semibold">
                Title
              </Text>
              <Textarea
                variant="flushed"
                minH={16}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isRequired={true}
              />
            </Box>
            <Box mb={5}>
              <Text mb={2} fontWeight="semibold">
                Description
              </Text>
              <Textarea
                variant="flushed"
                minH={32}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isRequired={true}
              />
            </Box>
          </ModalBody>

          <ModalFooter borderTop="1px solid #E2E8F0">
            <Button colorScheme="primary" mr={3} type="submit">
              Create
            </Button>
            <Button
              colorScheme="primary"
              mr={3}
              onClick={onClose}
              variant="outline"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default DiscussionForum;
