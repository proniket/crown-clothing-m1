import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlF0rAq3qNgw3QDuAUk1koWiGZAbNbsmY",
  authDomain: "crown-clothing-db-a9673.firebaseapp.com",
  projectId: "crown-clothing-db-a9673",
  storageBucket: "crown-clothing-db-a9673.appspot.com",
  messagingSenderId: "1014306048656",
  appId: "1:1014306048656:web:2f73b99797c4846bc66615"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// Adding categories to firestore
// Ye method se apan apna jo data hai i.e collection of all categories object ko firebase pe send karenge programitically
// Nahi toh hume khud se saare data ko firestore database me add karna padta
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
    console.log('done');
}


// get categories data from firestore
// NOTE => we are isolating this third party library method by our custom function so that if any implementation changed in their side will not affects our codebase directly
export const getCategoriesAndDocuments = async() => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSanpshot) => {
        const { title, items } = docSanpshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);  // ref of the doc that we have created
    console.log(userDocRef)

	const userSnapshot = await getDoc(userDocRef); // the snapshot allows us to check wheather the instance of that exist in the database or not
    // console.log(userSnapshot)
    console.log(userSnapshot.exists())


    // if user data not exists
    // create / set the document with the data from userAuth in my collection
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        } catch(error) {
            console.log('error creating the user'
            , error.message)
        }
    }
    
    
    // if user data exists
    return userDocRef;
} 

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => await signOut(auth);


// onAuthStateChanged will listen to the user wheather the user is autthenticated or not through the auth object 
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

