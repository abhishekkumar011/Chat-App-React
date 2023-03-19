import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react";
import Message from "./components/Message";

function App() {
    return (
        <div>
            <Box bg={'blackAlpha.900'}>
                <Container h={'100vh'} w={'sm'} bg={'white'}>
                    <VStack h={'full'} py={3}>
                        <Button size={'sm'} fontSize={'sm'} colorScheme={'red'} w={'full'}>
                            Logout
                        </Button>

                        <VStack h={'full'} w={'full'} overflowY="auto">
                            <Message text={'sample message'} />
                            <Message user="me" text={'sample message'} />
                        </VStack>

                        <form style={{ width: "100%" }}>
                            <HStack>
                                <Input size={'sm'} placeholder={'Enter a Message...'} />
                                <Button size={'sm'} fontSize={'sm'} colorScheme={"purple"} type={'submit'}>Send</Button>
                            </HStack>
                        </form>
                    </VStack>
                </Container>
            </Box>
        </div>
    );
}

export default App;
