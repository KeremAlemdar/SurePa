import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBFG7wJpKM6pOmOj9ooUKqYz5W7m9dp50U",
    authDomain: "surepa-5f05f.firebaseapp.com",
    databaseURL: "https://surepa-5f05f-default-rtdb.firebaseio.com",
    projectId: "surepa-5f05f",
    storageBucket: "surepa-5f05f.appspot.com",
    messagingSenderId: "986641847385",
    appId: "1:986641847385:web:3df3a7e120148c70f0cd48"
};

if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().settings({ experimentalForceLongPolling: true });
}

export const db = firebase.firestore();