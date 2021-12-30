import {
  initializeApp, getApps, FirebaseOptions, deleteApp,
} from 'firebase/app';
import {
  getAuth,
  GithubAuthProvider,
  onIdTokenChanged,
  signOut,
  signInWithRedirect,
  reauthenticateWithCredential,
  deleteUser,
  getRedirectResult,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (getApps().length < 1) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();
const database = getFirestore();
const githubProvider = new GithubAuthProvider();

const authParams = {
  auth,
  githubProvider,
  onIdTokenChanged,
  signOut,
  signInWithRedirect,
  GithubAuthProvider,
  reauthenticateWithCredential,
  deleteApp,
  deleteUser,
  getRedirectResult,
};
const dataParams = {
  database,
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
};

export { authParams, dataParams };
