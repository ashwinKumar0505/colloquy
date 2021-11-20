import { Avatar } from "@chakra-ui/avatar";
import { Box, Heading, Text, Flex, Spinner, Icon } from "@chakra-ui/react";
import { FaRegCommentDots } from "react-icons/fa";
import { useHistory } from "react-router";
import DiscussionForumModel from "../../components/discussionFormModal";
import { useGetAllDiscussions } from "../../queries/query";

type TDiscussion = {
  creatorName: string;
  createdAt: string;
  title: string;
  description: string;
  _id: string;
  replies: {
    personName: string;
  }[];
};

const DiscussionPage = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data, isFetching, refetch } = useGetAllDiscussions();
  const history = useHistory();

  const discussionClickHandler = (discussion: TDiscussion) => {
    const { title } = discussion;
    history.push({
      pathname: `/discussion/${title}`,
      state: { discussion },
    });
  };

  return (
    <Box py={5} px={10} width="100%" height="100%">
      <DiscussionForumModel
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
      />

      <Heading fontSize="28px" mb={6}>
        All Discussions
      </Heading>

      {isFetching && (
        <Flex
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Flex direction="column" alignItems="center" justifyContent="center">
            <Spinner size="xl" mb={4} />
            <Text fontSize="18px" fontWeight="semibold">
              Loading Discussions ...
            </Text>
          </Flex>
        </Flex>
      )}
      {data &&
        data.map((discussion: TDiscussion) => {
          return (
            <Box
              py={8}
              borderTop="1px solid #EDF2F7"
              borderBottom="1px solid #EDF2F7"
              key={discussion._id}
            >
              <Flex mb={4} alignItems="center">
                <Avatar name={discussion.creatorName} size="sm" mr={2} />
                <Box>
                  <Text fontSize="14px" fontWeight="semibold">
                    {discussion.creatorName}
                  </Text>
                  <Text fontSize="12px" color="blackAlpha.600">
                    {discussion.createdAt}
                  </Text>
                </Box>
              </Flex>
              <Heading
                fontSize="20px"
                fontWeight="semibold"
                mb={2}
                _hover={{ color: "primary.500" }}
                cursor="pointer"
                onClick={() => discussionClickHandler(discussion)}
              >
                {discussion.title}
              </Heading>
              <Text fontSize="14px">{discussion.description}</Text>
              <Flex mt={5}>
                <Icon as={FaRegCommentDots} fontSize="xl" mr={2} />
                <Text
                  fontSize="14px"
                  fontWeight="semibold"
                  color="blackAlpha.800"
                >
                  {discussion.replies.length} Replies
                </Text>
              </Flex>
            </Box>
          );
        })}
    </Box>
  );
};

export default DiscussionPage;
