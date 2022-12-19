import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';


const firebaseApp = initializeApp({
  apiKey: "AIzaSyCtCKWZcIMh_eLXnbGToSr2ItoWXEI7I_Y",
  authDomain: "miuassc.firebaseapp.com",
  databaseURL: "https://miuassc-default-rtdb.firebaseio.com",
  projectId: "miuassc",
  storageBucket: "miuassc.appspot.com",
  messagingSenderId: "783175994078",
  appId: "1:783175994078:web:a6da7eca9e194648c9104f"
});

const app = initializeApp(firebaseApp);
export const auth = getAuth(app);