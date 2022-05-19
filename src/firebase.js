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
else {
    firebaseConfig = {
        apiKey: "AIzaSyCtBe168nb-2A2SbbPoane7jIZeGFkQhWc",
        authDomain: "propex-production.firebaseapp.com",
        projectId: "propex-production",
        storageBucket: "propex-production.appspot.com",
        messagingSenderId: "949602528985",
        appId: "1:949602528985:web:979ef1e79d424efba958c8"
      };
    console.log("Production credentials applied.");
}
const app = initializeApp(firebaseConfig);

const auth = getAuth();
if (process.env.NODE_ENV === "development")
    connectAuthEmulator(auth, "http://localhost:9099");


export { app, auth };

