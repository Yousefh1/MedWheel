// // src/utils/firestoreUtils.js
// import { db } from '../Components/firebaseConfig';
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";

// // Collection references
// const medicationsCollection = collection(db, "medications");
// const patientsCollection = collection(db, "patients");

// // Medication CRUD functions

// export const addMedication = async (medication) => {
//   const docRef = await addDoc(medicationsCollection, medication);
//   return docRef;
// };

// export const subscribeToMedications = (callback) => {
//   return onSnapshot(medicationsCollection, (snapshot) => {
//     const meds = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     callback(meds);
//   });
// };

// export const updateMedication = async (id, updatedData) => {
//   const medicationDoc = doc(db, "medications", id);
//   await updateDoc(medicationDoc, updatedData);
// };

// export const deleteMedication = async (id) => {
//   const medicationDoc = doc(db, "medications", id);
//   await deleteDoc(medicationDoc);
// };

// // Patient CRUD functions

// export const addPatient = async (patientData) => {
//   await addDoc(patientsCollection, {
//     ...patientData,
//     createdAt: serverTimestamp(),
//   });
// };

// export const subscribeToPatients = (callback) => {
//   return onSnapshot(patientsCollection, (snapshot) => {
//     const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     callback(patients);
//   });
// };

// export const updatePatient = async (id, updatedData) => {
//   const patientDoc = doc(db, "patients", id);
//   await updateDoc(patientDoc, updatedData);
// };

// export const deletePatient = async (id) => {
//   const patientDoc = doc(db, "patients", id);
//   await deleteDoc(patientDoc);
// };

// src/utils/firestoreUtils.js
import { db } from '../Components/firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp, query, where } from "firebase/firestore";

// Collection references
const medicationsCollection = collection(db, "medications");
const patientsCollection = collection(db, "patients");

// Add a new medication linked to a specific patient
export const addMedication = async (medication, patientId) => {
  const docRef = await addDoc(medicationsCollection, {
    ...medication,
    patientId, // Link to specific patient
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id, ...medication };
};

// Add a new patient
export const addPatient = async (patientData) => {
  await addDoc(patientsCollection, {
    ...patientData,
    createdAt: serverTimestamp(),
  });
};

// Subscribe to medications for a specific patient (with real-time updates)
export const subscribeToMedicationsForPatient = (patientId, callback) => {
  const q = query(medicationsCollection, where("patientId", "==", patientId));
  return onSnapshot(q, (snapshot) => {
    const meds = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(meds);
  });
};

// Subscribe to all patients (with real-time updates)
export const subscribeToPatients = (callback) => {
  return onSnapshot(patientsCollection, (snapshot) => {
    const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(patients);
  });
};

// Update a medication
export const updateMedication = async (id, updatedData) => {
  const medicationDoc = doc(db, "medications", id);
  await updateDoc(medicationDoc, updatedData);
};

// Delete a medication
export const deleteMedication = async (id) => {
  const medicationDoc = doc(db, "medications", id);
  await deleteDoc(medicationDoc);
};
