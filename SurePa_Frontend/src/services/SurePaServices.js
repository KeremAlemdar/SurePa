import firebase from "firebase";

// Initialize Firebase
export const auth = firebase.getAuth();

export const fbRegister = (email, pass) => {
    return auth.createUserWithEmailAndPassword(auth, email, pass);
};

export const fbLogin = (email, pass) => {
    return auth.signInWithEmailAndPassword(auth, email, pass);
};


