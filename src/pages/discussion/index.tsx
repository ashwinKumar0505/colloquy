import {
  Box,
  Heading,
  Text,
  Flex,
  Avatar,
  Button,
  Image,
  useDisclosure,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ReplyFormModel from "../../components/replyFormModel";
import emptyRecords from "../../images/emptyRecords.svg";
import { useGetReplies } from "../../queries/query";
import { getIsUserAuthenticated } from "../../selectors";

type TReply = {
  personName: string;
  reply: string;
};

const EmptyReplies = ({ isFetching }: { isFetching: boolean }) => {
  return (
    <Flex
      border="1px solid #E2E8F0"
      alignItems="center"
      p={5}
      mb={5}
      justifyContent="center"
      flexDirection="column"
      borderRadius="md"
    >
      {isFetching ? (
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Spinner size="md" mb={4} />
          <Text fontSize="18px" fontWeight="semibold">
            Loading Replies ...
          </Text>
        </Flex>
      ) : (
        <Box>
          <Image src={emptyRecords} width="350px" height="350px" mb={2} />
          <Text fontSize-="20px" fontWeight="600">
            No Replies Added Yet
          </Text>
        </Box>
      )}
    </Flex>
  );
};

const Discussion = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [replies, setReplies] = useState<TReply[]>([]);
  const isUserAuthenticated = useSelector(getIsUserAuthenticated);
  const toast = useToast();

  const { state } = location;
  const { discussion } = state as any;
  const {
    creatorName,
    title,
    description,
    _id: discussionId,
    createdAt,
  } = discussion as {
    creatorName: string;
    createdAt: string;
    title: string;
    description: string;
    _id: string;
  };

  const { data, refetch, isFetching } = useGetReplies(discussionId);

  useEffect(() => {
    if (data) setReplies(data);
  }, [data]);

  const addReplyClickHandler = () => {
    if (isUserAuthenticated) {
      onOpen();
    } else {
      toast({
        title: "You need to Sign In to add your replies",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Box p={10}>
      <ReplyFormModel
        isOpen={isOpen}
        onClose={onClose}
        discussionId={discussionId}
        refetch={refetch}
      />
      <Heading mb={6}>{title}</Heading>
      <Flex
        py={4}
        borderTop="1px solid #E2E8F0"
        borderBottom="1px solid #E2E8F0"
        alignItems="center"
      >
        <Avatar name={creatorName} mr={4} />
        <Box>
          <Text fontSize="18px" fontWeight="600">
            {creatorName}
          </Text>
          <Text color="blackAlpha.500" fontSize="14px">
            Published on{" "}
            <Box as="span" fontWeight="600">
              {" "}
              {createdAt}
            </Box>
          </Text>
        </Box>
      </Flex>
      <Text lineHeight="30px" mb={5} mt={5} fontWeight="500">
        {description}
      </Text>
      <Flex
        border="1px solid #E2E8F0"
        alignItems="center"
        p={5}
        mb={5}
        justifyContent="space-between"
        borderRadius="md"
      >
        <Text fontWeight="600">Replies({replies.length})</Text>
        <Button
          colorScheme="primary"
          variant="outline"
          onClick={addReplyClickHandler}
        >
          Add a Reply
        </Button>
      </Flex>
      <Box>
        {replies.length > 0 ? (
          replies.map((reply) => (
            <Flex border="1px solid #E2E8F0" p={5} mb={5} borderRadius="md">
              <Avatar name={reply.personName} mr={4} />
              <Box>
                <Text fontSize="18px" fontWeight="600" mb={3}>
                  {reply.personName}
                </Text>
                <Text color="blackAlpha.700" fontWeight="500" fontSize="14px">
                  {reply.reply}
                </Text>
              </Box>
            </Flex>
          ))
        ) : (
          <EmptyReplies isFetching={isFetching} />
        )}
      </Box>
    </Box>
  );
};

export default Discussion;
