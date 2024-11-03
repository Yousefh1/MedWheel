
# MedWheel - Medical Dispensing System

MedWheel is a web-based application designed to assist caregivers and pharmacists in managing and dispensing medications for patients with specific dosage and timing requirements. The system provides an intuitive dashboard where caregivers can add patients, manage medications specific to each patient, and set up schedules to ensure timely and accurate medication dispensing. This application also integrates with Firebase to store and manage patient data, and the ultimate goal is to connect the system with a physical Arduino-based machine to dispense medications as scheduled.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Firebase Configuration](#firebase-configuration)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication**: Secure login and logout using Firebase Authentication (with options for email/password and Google sign-in).
- **Patient Management**: Add, view, edit, and delete patient profiles including their name, age, and medical history.
- **Medication Management**: Assign medications to specific patients with detailed information such as name, dosage, unit, and schedule.
- **Real-Time Updates**: Real-time medication tracking with Firebase Firestore, enabling immediate updates and accurate monitoring.
- **Audit Logs**: Track changes to medication records to maintain a reliable history of edits and deletions.
- **Patient-Specific Medications**: Separate medication schedules for each patient, allowing caregivers to efficiently manage each patient’s unique medication needs.
- **Dashboard Interface**: A clean and organized dashboard with sections for patients, medications, and navigation.

---

## Demo

You can view a live version of this project [here](#) (link your live demo if available).

---

## Tech Stack

- **Frontend**: React, React Bootstrap, Vite
- **Backend/Database**: Firebase Firestore for real-time data management
- **Authentication**: Firebase Authentication (email/password and Google sign-in)
- **Hosting**: Firebase Hosting (optional)

---

## Setup and Installation

### Prerequisites

- [Node.js and npm](https://nodejs.org/en/download/)
- [Firebase account](https://firebase.google.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/MedWheel.git
   cd MedWheel
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Firebase Setup**:
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable **Authentication** (choose email/password and Google).
   - Set up **Firestore** and create two collections: `patients` and `medications`.
   - Enable **Hosting** if deploying through Firebase Hosting.

4. **Add Firebase configuration**:
   - In `src/Components/firebaseConfig.js`, add your Firebase project’s configuration details:
   ```javascript
   import { initializeApp } from "firebase/app";
   import { getAuth, GoogleAuthProvider } from "firebase/auth";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-auth-domain",
       projectId: "your-project-id",
       storageBucket: "your-storage-bucket",
       messagingSenderId: "your-messaging-sender-id",
       appId: "your-app-id",
       measurementId: "your-measurement-id"
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const googleProvider = new GoogleAuthProvider();
   export const db = getFirestore(app);
   ```

5. **Run the application**:
   ```bash
   npm run dev
   ```

   Visit `http://localhost:5173/` in your browser to view the app.

---

## Usage

### User Authentication

1. Go to the **Login** page to sign in with an email and password or with Google.
2. After logging in, you’ll be directed to the main dashboard where you can manage patients and medications.

### Managing Patients

- **Add a Patient**: Click the `+ Add Patient` button to enter details (name, age, medical history).
- **Edit Patient**: Click the "Edit" button next to a patient to update details.
- **Delete Patient**: Remove a patient by clicking "Delete" next to their entry.

### Managing Medications

- **Select a Patient**: Choose a patient from the dropdown to view or manage their medications.
- **Add Medication**: Click the `+ Add Medication` button and enter the medication name, dosage, unit, and schedule.
- **Edit Medication**: Click "Edit" next to a medication to modify the information.
- **Delete Medication**: Remove a medication by clicking "Delete" next to its entry.

### Logging Out

Click the **Log Out** button in the navbar to safely log out of the application.

---

## Firebase Configuration

1. **Authentication**: Set up email/password and Google sign-in providers in the Firebase Console under the **Authentication** section.
2. **Firestore Database**: Create two collections:
   - `patients`: Stores patient information (name, age, medical history).
   - `medications`: Stores medication details, linked to patients by `patientId`.
3. **Firestore Security Rules** (optional):
   Update your security rules to allow authenticated read and write access:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

---

## Project Structure

```
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── Components
│   │   ├── AuthContext.js         # Authentication context provider
│   │   ├── AdminDashboard.jsx     # Main admin dashboard for caregivers
│   │   ├── firebaseConfig.js      # Firebase configuration
│   │   └── ...
│   ├── utils
│   │   └── firestoreUtils.js      # Firestore CRUD operations
│   ├── App.jsx                    # Main application entry point
│   ├── index.css                  # Global CSS
│   └── main.jsx                   # Vite entry file
└── README.md
```

---

## Future Enhancements

- **Medication Notifications**: Implement notifications to alert caregivers or patients when it’s time for medication.
- **API Integration**: Connect the system with an external API or hardware (e.g., Arduino) to automate medication dispensing.
- **Data Analytics**: Add analytics to monitor medication adherence and generate reports.
- **Enhanced Security**: Implement more granular Firebase security rules to protect sensitive patient data.
- **Offline Access**: Add offline access for caregivers to view and manage patient data without an internet connection.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature-branch
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Add a new feature"
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature-branch
   ```
5. **Create a pull request**

---

## License

This project is licensed under the MIT License.

---

Thank you for using MedWheel! Let us know if you have questions or feedback.
