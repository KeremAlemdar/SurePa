
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyBFG7wJpKM6pOmOj9ooUKqYz5W7m9dp50U",
    authDomain: "surepa-5f05f.firebaseapp.com",
    projectId: "surepa-5f05f",
    storageBucket: "surepa-5f05f.appspot.com",
    messagingSenderId: "986641847385",
    appId: "1:986641847385:web:3df3a7e120148c70f0cd48"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export async function addUser(){
    try {
        const docRef = await addDoc(collection(db,"usersa"), {
            first: "Mehmet",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getUsers(){
    try {
        const querySnapshot = await getDocs(collection(db,"users"));
        querySnapshot.forEach((doc) => {
            const currentUser = {
                ...doc.data()
            };
            console.log(currentUser);
        })        
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}