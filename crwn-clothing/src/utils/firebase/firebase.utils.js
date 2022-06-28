import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCzXbCk-BsvdWs7OusXiMTV_XMUWR71gSE",
  authDomain: "crwn-clothing-db-57ad2.firebaseapp.com",
  projectId: "crwn-clothing-db-57ad2",
  storageBucket: "crwn-clothing-db-57ad2.appspot.com",
  messagingSenderId: "760245213908",
  appId: "1:760245213908:web:eb15bbeb58505b61043941"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt
      })
    } catch (error){
      console.error('error creating user', error.message);
    }
  }
  return userDocRef;
}