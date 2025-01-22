import { initializeApp,getApps,getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAep0biibfTZIPjQzXl_fyLAyoDPNA5ZyM",
  authDomain: "ai-notion-clone-88897.firebaseapp.com",
  projectId: "ai-notion-clone-88897",
  storageBucket: "ai-notion-clone-88897.firebasestorage.app",
  messagingSenderId: "968233374487",
  appId: "1:968233374487:web:ebf3f650f7d6dc872d9d52",
  measurementId: "G-M2KVTD8NZX"
};

const app=getApps().length===0?initializeApp(firebaseConfig):getApp();
const db=getFirestore(app);

export {db};
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);