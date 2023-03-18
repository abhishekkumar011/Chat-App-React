import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react";

function App() {
    return (
        <div>
            <Box bg={'blackAlpha.900'}>
                <Container h={'100vh'} w={'sm'} bg={'white'}>
                    <VStack h={'full'} py={3}>
                        <Button fontSize={'sm'} colorScheme={'red'} w={'full'}>
                            Logout
                        </Button>

                        <VStack h={'full'} w={'full'} ></VStack>

                        <form style={{width: "100%"}}> 
                            <HStack> 
                                <Input placeholder={'Enter a Message...'}/>
                                <Button fontSize={'sm'} colorScheme={"purple"} type={'submit'}>Send</Button>
                            </HStack>
                        </form>
                    </VStack>
                </Container>
            </Box>
        </div>
    );
}

export default App;
