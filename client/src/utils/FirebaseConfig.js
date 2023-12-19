import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpGXI3lJDPkLd3y__JJt0HmQ0yTrmgZnY",
  authDomain: "whatsapp-clone-a107d.firebaseapp.com",
  projectId: "whatsapp-clone-a107d",
  storageBucket: "whatsapp-clone-a107d.appspot.com",
  messagingSenderId: "694226872799",
  appId: "1:694226872799:web:c060aed8b6506f5cc9fc6a",
  measurementId: "G-ZYV376DWME",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
