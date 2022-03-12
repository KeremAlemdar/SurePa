import firebase from 'firebase';
import { addPatient } from './PatientController';

const firebaseConfig = {
    apiKey: "AIzaSyBFG7wJpKM6pOmOj9ooUKqYz5W7m9dp50U",
    authDomain: "surepa-5f05f.firebaseapp.com",
    databaseURL: "https://surepa-5f05f-default-rtdb.firebaseio.com",
    projectId: "surepa-5f05f",
    storageBucket: "surepa-5f05f.appspot.com",
    messagingSenderId: "986641847385",
    appId: "1:986641847385:web:3df3a7e120148c70f0cd48"
};

let firebaseApp;
if (firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    firebase.firestore().settings({ experimentalForceLongPolling: true });
}

export const auth = firebase.auth();

export const fbRegister = (email, pass, name) => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, pass).then(userCredential => {
            addPatient({ email: email, name: name }).then(() => {
                resolve(userCredential);
            }).catch(error => {
                reject(error);
            });
        }).catch(error => {
            reject(error);
        });
    });
};

export const fbLogin = (email, pass) => {
    return auth.signInWithEmailAndPassword(email, pass);
};


export default firebaseApp;
export const db = firebase.firestore();