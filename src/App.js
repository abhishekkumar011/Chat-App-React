import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react";
import Message from "./components/Message";
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { app } from './firebase'
import { useEffect, useState } from "react";

const auth = getAuth(app);

const loginHandler = () => {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
}

const logoutHandler = () => {
    signOut(auth);
}

function App() {

    const [user, setUser] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            setUser(data);
        })

        return () => {
            unsubscribe()
        };
    }, []);
    

    return (
        <div>
            <Box bg={'blackAlpha.900'}>
                {
                    user ? (
                        <Container h={'100vh'} w={'sm'} bg={'white'}>
                            <VStack h={'full'} py={3}>
                                <Button onClick={logoutHandler} size={'sm'} fontSize={'sm'} colorScheme={'red'} w={'full'}>
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
                    ) :
                        <VStack h={'100vh'} justifyContent={'center'}>
                            <Button onClick={loginHandler} size={'sm'} fontSize={'sm'} fontWeight={'semibold'} colorScheme={'blue'}>Sign in With Google</Button>
                        </VStack>
                }
            </Box>
        </div>
    );
}

export default App;
