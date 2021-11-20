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
import { useAddReply } from "../../queries/mutation";
import { getUserName } from "../../selectors";

const ReplyFormModel = ({
  isOpen,
  onClose,
  discussionId,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  discussionId: string;
  refetch: () => void;
}) => {
  const [reply, setReply] = useState("");
  const userName = useSelector(getUserName);
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
    showToast("success", "Your reply had been added successfully");
    onClose();
    refetch();
  };

  const onError = () => {
    showToast("error", "Error in adding the reply. Please Try again");
  };

  const { mutate } = useAddReply(onSuccess, onError);

  const submitHandler = (e: any) => {
    e.preventDefault();
    mutate({
      personName: userName,
      discussionId,
      reply,
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <form onSubmit={submitHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="1px solid #E2E8F0">
            Reply Message
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={8}>
            <Box mb={5}>
              <Text mb={2} fontWeight="semibold">
                Your Reply
              </Text>
              <Textarea
                variant="flushed"
                minH={32}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                isRequired={true}
              />
            </Box>
          </ModalBody>

          <ModalFooter borderTop="1px solid #E2E8F0">
            <Button colorScheme="primary" mr={3} type="submit">
              Add Reply
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

export default ReplyFormModel;
