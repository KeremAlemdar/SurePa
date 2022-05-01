import { auth, db } from "./DbCon";

export const returnPatient = async (patientId) => {
    return new Promise((resolve, reject) => {
        var docRef = db.collection("users").doc(patientId);
        docRef.onSnapshot(documentSnapshot => {
            resolve(documentSnapshot.data());
        });
        // docRef.get().then((doc) => {
        //     if (doc.exists) {
        //         resolve(doc.data());
        //     } else {
        //         reject("No such document!");
        //     }
        // });
    });
};

export const returnPatientMedicines = (patientId) => {
    return new Promise((resolve, reject) => {
        db.collection("users").doc(patientId).collection("medicines").get().then((querySnapshot) => {
            resolve(querySnapshot.docs.map(doc => doc.data()));
        })
    });
};

export const addMedicine = async (patientId, medicineName, type, doseCount, perDay, times) => {
    const collection = db.collection("users").doc(patientId).collection("medicines");
    await collection.doc(medicineName).set({
        name: medicineName,
        numberOfDose: doseCount,
        type: type,
        perDay: perDay,
    });
    await times.forEach((time, id) => {
        collection.doc(medicineName).collection("times").doc(`time${id + 1}`).set({
            time: time,
        });
    });
    return true;
};

export const addActivity = (patientId, name, duration) => {
    // db.collection("medicines").doc(selectedMedicine.id).collection("medicines").
    db.collection("users").doc(patientId).collection("activities").doc(name).set({
        name: name,
        duration: duration,
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
        return ("Document successfully deleted!");
    }).catch((error) => {
        return ("Error removing document: ", error);
    });
};

//yeni fonksiyon
export const createNotification = (patientId) => {
    db.collection("users").doc(patientId).collection("notifications").doc().set({
        status: "waiting",
        description: "yeni notification"
    })
};

export const getNotifications = () => {
    const { uid } = auth.currentUser;
    const data = [];
    let index = 0;
    const now = new Date();
    return new Promise((resolve, reject) => {
        returnPatientMedicines(uid).then((medicines) => {
            medicines.forEach(async (medicine) => {
                await db.collection("users").doc(uid).collection('medicines').
                    doc(medicine.name).collection('times').
                    get().then((querySnapshot) => {
                        querySnapshot.docs.forEach(doc => {
                        const pillTime = new Date();
                            const hour = doc.data().time.split(":")[0];
                            const minute = doc.data().time.split(":")[1];
                            pillTime.setHours(hour, minute, 0, 0);
                            const pillStat = now.getTime() < pillTime.getTime() ? "waiting" : "expired";
                            data.push({
                                name: medicine.name,
                                ...doc.data(),
                                status: pillStat 
                            });
                        });
                        index++;
                    });
                if (index == medicines.length)
                    resolve(data);
            });
        });
    });
};

export const sendInvitation = async (careGiverMail) => {
    return new Promise((resolve, reject) => {
        db.collection("users").where("email", "==", careGiverMail).get().then((querySnapshot) => {
            if (querySnapshot.docs[0]) {
                const targetId = querySnapshot.docs[0].id;
                const { uid } = auth.currentUser;
                returnPatient(uid).then(async (patient) => {
                    db.collection("users").doc(targetId).collection("invitations").doc(uid).set({
                        ...patient,
                        status: "waiting",
                    }).then(() => {
                        resolve("success");
                    }).catch((error) => {
                        reject(error);
                    });
                });
            } else {
                reject('User not found!!');
            }
        }).catch((error) => {
            reject(error);
        });
    });
};

export const getInviations = () => {
    return new Promise((resolve, reject) => {
        const { uid } = auth.currentUser;
        const returnArr = [];
        db.collection("users").doc(uid).collection("invitations").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().status === "waiting") {
                    returnArr.push(doc.data());
                }
            });
            resolve(returnArr);
        }).catch((error) => {
            reject(error);
        });
    });
};

export const acceptInvitation = (patientId) => {
    const { uid } = auth.currentUser;
    return new Promise((resolve, reject) => {
        db.collection("users").doc(uid).collection("invitations").doc(patientId).update({
            status: "accepted"
        }).then(() => {
            returnPatient(uid).then(async (caregiver) => {
                db.collection("users").doc(patientId).collection("caregivers").doc(uid).set({
                    ...caregiver
                }).then(() => {
                    resolve("success");
                }).catch((error) => {
                    reject(error);
                });
                db.collection("users").doc(uid).collection("patients").doc(patientId).set({
                    uid: patientId
                }).then(() => {
                    resolve("success");
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        }).catch((error) => {
            return ("Error updating document: ", error);
        });
    });
};

export const denyInvitation = (patientId) => {
    const { uid } = auth.currentUser;
    return new Promise((resolve, reject) => {
        db.collection("users").doc(uid).collection("invitations").doc(patientId).update({
            status: "denied"
        }).then(() => {
            resolve("success");
        }).catch((error) => {
            reject(error);
        });
    });
};

export const getCaregivers = () => {
    const { uid } = auth.currentUser;
    return new Promise((resolve, reject) => {
        db.collection("users").doc(uid).collection("caregivers").get().then((querySnapshot) => {
            resolve(querySnapshot.docs.map(doc => doc.data()));
        }).catch((error) => {
            reject(error);
        });
    });
};

export const deleteCaregiver = (caregiverId) => {
    const { uid } = auth.currentUser;
    return new Promise((resolve, reject) => {
        db.collection("users").doc(uid).collection("caregivers").doc(caregiverId).delete().then(() => {
            db.collection("users").doc(caregiverId).collection("invitations").doc(uid).update({
                status: "cancelled"
            }).then(() => {
                resolve("success");
            }).catch((error) => {
                reject(error);
            });
        }).catch((error) => {
            reject(error);
        });
    });
};

export const addPatient = (props) => {
    console.log(props);
    const { uid } = auth.currentUser;
    return new Promise((resolve, reject) => {
        db.collection("users").doc(uid).set({
            ...props,
            uid: uid
        }).then(() => {
            resolve("success");
        }).catch((error) => {
            reject(error);
        });
    });
};

export const getMeetings = () => {
    const { uid } = auth.currentUser;
    return new Promise((resolve, reject) => {
        db.collection("users").doc(uid).collection("meetings").get().then((querySnapshot) => {
            resolve(querySnapshot.docs.map(doc => doc.data()));
        }).catch((error) => {
            reject(error);
        });
    });
};

export const addMeeting = (props) => {
    const { uid } = auth.currentUser;
    return new Promise((resolve, reject) => {
        db.collection("users").doc(uid).collection("meetings").doc().set({
            ...props,
            uid: uid
        }).then(() => {
            resolve("success");
        }).catch((error) => {
            reject(error);
        });
    });
};

export const getContacts = () => {
    const { uid } = auth.currentUser;
    return new Promise((resolve, reject) => {
        db.collection("users").doc(uid).collection("contacts").get().then((querySnapshot) => {
            resolve(querySnapshot.docs.map(doc => doc.data()));
        }).catch((error) => {
            reject(error);
        });
    });
};

export const getWeekReport = () => {
    const mockData = {
        "username": "Kaan Bebiş",
        "age": 31,
        "date": "01.05.2021",
        "weekNo": 6,
        "medicines": {
            "Metoprolol": {
                "remaining": 5,
                "usage": {
                    "01.05.2021": [true, false],
                    "02.05.2021": [true, true],
                    "03.05.2021": [true, false],
                    "04.05.2021": [false, false],
                    "05.05.2021": [true, true],
                    "06.05.2021": [true, true],
                    "07.05.2021": [true, true],
                }
            },
            "Sulphamazetine": {
                "remaining": 10,
                "usage": {
                    "01.05.2021": [true],
                    "02.05.2021": [true],
                    "03.05.2021": [false],
                    "04.05.2021": [false],
                    "05.05.2021": [true],
                    "06.05.2021": [false],
                    "07.05.2021": [true],
                }
            }
        }
    }
    return mockData;
}

