import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBFG7wJpKM6pOmOj9ooUKqYz5W7m9dp50U",
    authDomain: "surepa-5f05f.firebaseapp.com",
    projectId: "surepa-5f05f",
    storageBucket: "surepa-5f05f.appspot.com",
    messagingSenderId: "986641847385",
    appId: "1:986641847385:web:3df3a7e120148c70f0cd48",
};

// Initialize Firebase
export const auth = getAuth();

export const fbRegister = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
};

export const fbLogin = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
};

// export const getData = async () => {
//     const querySnapshot = await getDocs(collection(db, "users"));
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//     });
//     return querySnapshot;
// }

// try {
//     const docRef = await addDoc(collection(db, "users"), {
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
