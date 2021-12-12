// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6PQNm4RUJXWlxvHHKRMCyBc3BSobiEHQ",
    authDomain: "surepa-c0702.firebaseapp.com",
    projectId: "surepa-c0702",
    storageBucket: "surepa-c0702.appspot.com",
    messagingSenderId: "493588688249",
    appId: "1:493588688249:web:51ba795cc5b9bc581a93a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const fbRegister = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
      /*  .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });*/
};

export const fbLogin = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
};
