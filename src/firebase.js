import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC5PauU8Tuooxbi_L7TavrYcQm49BMT4mo",
  authDomain: "chat-app-aa8f1.firebaseapp.com",
  projectId: "chat-app-aa8f1",
  storageBucket: "chat-app-aa8f1.appspot.com",
  messagingSenderId: "228453613867",
  appId: "1:228453613867:web:1742c3314272c2590f056e"
};

export const app = initializeApp(firebaseConfig);