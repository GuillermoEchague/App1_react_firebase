import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

  // Your web app's Firebase configuration
  const config = {
    apiKey: '<apiKey>',
    authDomain:'<authDomain>' ,
    projectId: '<projectId>',
    storageBucket: '<storageBucket>',
    messagingSenderId:'<messagingSenderId>' ,
    appId: '<appId>'
  };

  // Initialize Firebase
  firebase.initializeApp(config);

  export const createUserProfileDocument= async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exits) {
      const {displayName, email} = userAuth;
      const createAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
      return userRef;
  };

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;