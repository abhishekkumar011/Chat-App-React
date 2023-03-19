import { Avatar, HStack, Text } from "@chakra-ui/react";
import React from "react";

const Message = ({ text, uri, user = "other" }) => {
  return (
    <HStack
      alignSelf={user=== "me" ? 'flex-end' : 'flex-start'}
      borderRadius={"base"}
      px={user==='me' ? '4': '2'}
      py={2}
      bg={"gray.100"}
    >
      {
        user=== "other" && <Avatar size={'xs'} src={uri} />
      }  
      <Text fontSize={"xs"}>{text}</Text>
      {
        user==="me" && <Avatar size={'xs'} src={uri}/>
      }
    </HStack>
  );
};

export default Message;
