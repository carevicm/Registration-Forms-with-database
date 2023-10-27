// Import necessary functions and SDKs
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeuCeOSK0b9b57JSIyx2GqKEX9D_c66DU",
  authDomain: "registration-forms-861cb.firebaseapp.com",
  projectId: "registration-forms-861cb",
  storageBucket: "registration-forms-861cb.appspot.com",
  messagingSenderId: "846724027718",
  appId: "1:846724027718:web:95a9a3ebcefd36216a0147",
  measurementId: "G-EZ29ZVK2CL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// import { getAnalytics } from "firebase/analytics";

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the auth object so you can use it in other parts of your app
export { auth };
