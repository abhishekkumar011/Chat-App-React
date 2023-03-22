import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react";
import Message from "./components/Message";
import { app } from './firebase'
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore'

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
}

const logoutHandler = () => {
    signOut(auth);
}



function App() {
    const [user, setUser] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const divForScroll = useRef(null);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setMessage('')
            await addDoc(collection(db, "Messages"), {
                text: message,
                uid: user.uid,
                uri: user.photoURL,
                createdAt: serverTimestamp()
            })
            divForScroll.current.scrollIntoView({ behavior: "smooth" })
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            setUser(data);
        })

        const unsubscribeForMessage = onSnapshot(q, (snap) => {
            setMessages(snap.docs.map((item) => {
                const id = item.id;
                return { id, ...item.data() };
            }))
        })

        return () => {
            unsubscribe()
            unsubscribeForMessage()
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

                                <VStack h={'full'} w={'full'} overflowY="auto" css={{"&::-webkit-scrollbar":{
                                    display: 'none'
                                }}}>
                                    {messages.map((item) => (
                                        <Message key={item.id} user={item.uid === user.uid ? "me" : "other"} text={item.text} uri={item.uri} />
                                    ))}
                                    <div ref={divForScroll}></div>
                                </VStack>

                                <form onSubmit={submitHandler} style={{ width: "100%" }}>
                                    <HStack>
                                        <Input value={message} onChange={(e) => setMessage(e.target.value)} size={'sm'} placeholder={'Enter a Message...'} />
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
