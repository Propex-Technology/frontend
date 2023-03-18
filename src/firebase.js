import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator} from "firebase/auth";

let firebaseConfig;
if (process.env.NODE_ENV !== "production") {
    firebaseConfig = {
        apiKey: "AIzaSyDf9TXE-HDZxyDqFUYpKJyTFJ5YaohXMoI",
        authDomain: "propex-staging.firebaseapp.com",
        projectId: "propex-staging",
        storageBucket: "propex-staging.appspot.com",
        messagingSenderId: "745309283718",
        appId: "1:745309283718:web:78b367dd83a12ea7f0b807"
    };
}
// TODO: change for production project+branch, this is still staging project
else {
    firebaseConfig = {
        apiKey: "AIzaSyDf9TXE-HDZxyDqFUYpKJyTFJ5YaohXMoI",
        authDomain: "propex-staging.firebaseapp.com",
        projectId: "propex-staging",
        storageBucket: "propex-staging.appspot.com",
        messagingSenderId: "745309283718",
        appId: "1:745309283718:web:78b367dd83a12ea7f0b807"
    };
}
const app = initializeApp(firebaseConfig);

const auth = getAuth();
if (process.env.NODE_ENV === "development")
    connectAuthEmulator(auth, "http://localhost:9099");


export { app, auth };

