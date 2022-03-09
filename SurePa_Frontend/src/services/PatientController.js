import { db } from "./DbCon";

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
        return("Document successfully deleted!");
    }).catch((error) => {
        return("Error removing document: ", error);
    });
};
export const acceptNotification = (notificationId) => {
};
export const cancelNotification = (notificationId) => {
};
export const addCaregiver = (caregiverId) => {
};
export const deleteCaregiver = (caregiverId) => {
};