import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// NOTE: In a real deployment, these would come from environment variables.
// For this demo, we use a placeholder config. The UI will gracefully handle auth failures
// if the config is invalid, allowing the AI features to still be demonstrated in "Guest Mode"
// or prompting the user to supply config.
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDummyKey",
  authDomain: "stay-safe-demo.firebaseapp.com",
  projectId: "stay-safe-demo",
  storageBucket: "stay-safe-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:dummy"
};

let app;
let auth;
let db;
let provider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  provider = new GoogleAuthProvider();
} catch (e) {
  console.warn("Firebase initialization failed (likely missing valid config). App will run in demo mode.");
}

export const signInWithGoogle = async () => {
  if (!auth) throw new Error("Firebase not configured");
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // Persist user data to Firestore
    if (db) {
        await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            lastLogin: new Date()
        }, { merge: true });
    }
    return user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logout = () => {
  if (!auth) return;
  return signOut(auth);
};

export { auth, db };