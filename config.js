import firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyBEo7aJx9pYFXJlKGfXO_NCaN4pDwBoz50",
  authDomain: "e-library-d43bd.firebaseapp.com",
  projectId: "e-library-d43bd",
  storageBucket: "e-library-d43bd.appspot.com",
  messagingSenderId: "381233711331",
  appId: "1:381233711331:web:5560a13057f21ba05c9dd6"
};
  
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
