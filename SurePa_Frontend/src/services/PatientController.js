import { auth, db } from "./DbCon";

export const returnPatient = (patientId) => {
    console.log(patientId);
    var docRef = db.collection("users").doc(patientId);
    docRef.get().then((doc) => {
        if (doc.exists) {
            return doc.data();
        } else {
            return "No such document!";
        }
    })
};
export const returnPatientMedicines = (patientId) => {
    const patientRef = db.collection("users").doc(patientId).collection("medicines").get().then((querySnapshot) => {
        return (querySnapshot.docs.map(doc => doc.data()));
    })
};
// export const addMedicine = (patientId, medicineId, dailyAmount, numberOfPills, date) => {
export const addMedicine = (patientId, name, numberOfDose, doseData) => {
    // db.collection("medicines").doc(selectedMedicine.id).collection("medicines").
    db.collection("users").doc(patientId).collection("medicines").doc(name).set({
        name: name,
        numberOfDose: numberOfDose,
        ...doseData
    })
};
export const deleteMedicine = (patientId, medicineId) => {
    db.collection("users").doc(patientId).collection("medicines").doc(medicineId).delete().then(() => {
        return ("Document successfully deleted!");
    }).catch((error) => {
        return ("Error removing document: ", error);
    });
};
export const acceptNotification = (patientId, notificationId) => {
    db.collection("users").doc(patientId).collection("notifications").doc(notificationId).update({
        status: "accepted"
    })
};
export const cancelNotification = (patientId, notificationId) => {
    db.collection("users").doc(patientId).collection("notifications").doc(notificationId).update({
        status: "cancelled"
    })
};
//yeni fonksiyon
export const deleteNotification = (patientId, notificationId) => {
    db.collection("users").doc(patientId).collection("notifications").doc(notificationId).delete().then(() => {
        return("Document successfully deleted!");
    }).catch((error) => {
        return("Error removing document: ", error);
    });
};
//yeni fonksiyon
export const createNotification = (patientId) => {
    db.collection("users").doc(patientId).collection("notifications").doc().set({
        status: "waiting",
        description: "yeni notification"
    })
};
export const addCaregiver = (careGiverMail) => {
    db.collection("users").where("email", "==", careGiverMail).get().then((querySnapshot) => {
        if(querySnapshot.docs[0]){
            const{uid} = auth.currentUser;
            db.collection("users").doc(uid).collection("caregivers").doc(querySnapshot.docs[0].id).set({
                ...querySnapshot.docs[0].data()
            }).catch((error) => {
                console.log("Error adding document: ", error);
            });
        } else {
            console.log('failed');
        }
    });
};

export const getCaregivers = () => {
    const{uid} = auth.currentUser;
    return new Promise((resolve, reject) => {
        db.collection("users").doc(uid).collection("caregivers").get().then((querySnapshot) => {
            resolve(querySnapshot.docs.map(doc => doc.data()));
        }).catch((error) => {
            reject(error);
        });
    });
};

export const deleteCaregiver = (caregiverId) => {
};