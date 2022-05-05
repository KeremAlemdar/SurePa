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

export const addMedicine = async (patientId, medicineName, type, doseCount, perDay, times, startDate, endDate) => {
    const collection = db.collection("users").doc(patientId).collection("medicines");
    const timeDiff = endDate.getTime() - startDate.getTime();
    const days = Math.round(timeDiff / (1000 * 60 * 60 * 24));
    await collection.doc(medicineName).set({
        name: medicineName,
        numberOfDose: doseCount,
        type: type,
        perDay: perDay,
        startDate: startDate,
        endDate: endDate,
        numOfDays: days,
    });
    const timesArr = [];
    await times.forEach((time) => {
        timesArr.push(time);
    });
    const usages = [];
    for (let i = 0; i < perDay; i++) {
        usages[i] = false;
    }
    console.log(usages);
    const tempDay = new Date(startDate);
    for (let i = 0; i < days; i++) {
        tempDay.setDate(startDate.getDate() + i);
        const formattedDate = tempDay.getFullYear() + "-" + (tempDay.getMonth() + 1) + "-" + tempDay.getDate();
        collection.doc(medicineName).collection("usage").doc(`day${i + 1}`).set({
            day: formattedDate,
            perDay: perDay,
            doses: usages,
            times: timesArr,
            dayValue: i + 1
        });
    }
    return true;
};

export const addActivity = (patientId, name, duration) => {
    // db.collection("medicines").doc(selectedMedicine.id).collection("medicines").
    db.collection("users").doc(patientId).collection("activities").doc(name).set({
        name: name,
        duration: duration,
    })
};

export const deleteMedicine = (patientId, selectedMedicine) => {
    db.collection("users").doc(patientId).collection("medicines").doc(selectedMedicine).delete().then(() => {
        return ("Document successfully deleted!");
    }).catch((error) => {
        return ("Error removing document: ", error);
    });
};

export const acceptNotification = (patientId, row) => {
    db.collection("users").doc(patientId).collection("medicines")
        .doc(row.name).collection('usage').doc(`day${row.dayValue}`)
        .onSnapshot(documentSnapshot => {
            const { doses } = documentSnapshot.data();
            doses[row.id] = true;
            db.collection("users").doc(patientId).collection("medicines")
                .doc(row.name).collection('usage').doc(`day${row.dayValue}`)
                .update({
                    doses: doses,
                });
        });
    db.collection("users").doc(patientId).collection("medicines").doc(row.name).update({
        numberOfDose: row.numberOfDose - 1,
    });
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
    const now = new Date();
    let count = 0;
    const formattedDate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    return new Promise((resolve, reject) => {
        returnPatientMedicines(uid).then((medicines) => {
            medicines.forEach(async (medicine) => {
                await db.collection("users").doc(uid).collection('medicines').doc(medicine.name)
                    .collection('usage').where('day', '==', formattedDate)
                    .get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            data.push({
                                name: medicine.name,
                                perDay: medicine.perDay,
                                times: doc.data().times,
                                usage: doc.data().doses,
                                dayValue: doc.data().dayValue,
                                numberOfDose: medicine.numberOfDose,
                            });
                        });
                        count++;
                    });
                if (count === medicines.length) {
                    resolve(data);
                }
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

export const getPatients = () => {
    const { uid } = auth.currentUser;
    const arr = [];
    return new Promise((resolve, reject) => {
        db.collection("users").doc(uid).collection("patients").get().then((querySnapshot) => {
            querySnapshot.docs.map(doc => {
                returnPatient(doc.data().uid).then((patient) => {
                    arr.push(patient);
                }).catch((error) => {
                    reject(error);
                })
            });
            resolve(arr);
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

export const addBloodSugar = (props) => {
    const { uid } = auth.currentUser;
    return new Promise((resolve, reject) => {
        db.collection("users").doc(uid).collection("bloodSugar").doc().set({
            ...props,
            uid: uid
        }).then(() => {
            resolve("success");
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

export const getReportData = () => {
    const { uid } = auth.currentUser;
    const data = [];
    const now = new Date();
    let count = 0;
    return new Promise((resolve, reject) => {
        returnPatientMedicines(uid).then((medicines) => {
            medicines.forEach(async (medicine) => {
                await db.collection("users").doc(uid).collection('medicines').doc(medicine.name)
                    .collection('usage')
                    .get().then((querySnapshot) => {

                        querySnapshot.forEach((doc) => {
                            data.push({
                                name: medicine.name,
                                perDay: medicine.perDay,
                                times: doc.data().times,
                                usage: doc.data().doses,
                                dayValue: doc.data().dayValue,
                                numberOfDose: medicine.numberOfDose, // remainin
                            });
                        });

                        count++;
                    });

                if (count === medicines.length) {
                    resolve(data);
                }
            });
        });
    });
};

