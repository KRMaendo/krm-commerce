import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyC7Cu1VoIxSaS9izmaAh4xv6drXPgOYymw",
  
    authDomain: "krm-commerce.firebaseapp.com",
  
    databaseURL: "https://krm-commerce.firebaseio.com",
  
    projectId: "krm-commerce",
  
    storageBucket: "krm-commerce.appspot.com",
  
    messagingSenderId: "329649929671",
  
    appId: "1:329649929671:web:22d6f36cb563ee0e762de2",
  
    measurementId: "G-9SCP92ZWMZ"
  
  };

  
  const app = initializeApp(firebaseConfig);

  const db = getFirestore();

  export const createUserProfileDocument = async ( userAuth, additionalData ) => {
    if(!userAuth) return;
    
    const userRef = doc(db, 'users', userAuth.uid);

    const snapShot = await getDoc(userRef);

    if(!snapShot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await setDoc(userRef, {
          displayName, 
          email,
          createdAt,
          ...additionalData
        });
      }
      catch(error) {
        console.error(`error creating user: ${ error }`);
      }
    }
    
    return userRef;
  }

  export const auth = getAuth();
  export const provider = new GoogleAuthProvider();
  provider.setCustomParameters({'prompt': 'select_account'});

  export const signInWithGoogle = () => (signInWithPopup(auth, provider));