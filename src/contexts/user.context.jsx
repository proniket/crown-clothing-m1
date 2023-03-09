import { createContext, useState, useEffect } from 'react';
import { auth, createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';


// this stores the initial value of context
export const UserContext = createContext({
    currentUser: 'mike',
    setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // Jabhi bhi component mount hoga uske turant baad apan ye useEffect run karnenge and onAuthStateChangedListner se ye pata karenge ki user jo hai woh authenticated hai ki nahi 
    // Agar user authenticate nahi hai toh user => null return karega and authenticate hai toh user => authObj return karega
    // And phir hum 'null/authObj' ko currentUser state me store kar denge

    // Benefits => Iska ye hai ki apne ko user jab SignIn/SignUp karega toh usko track karke usko user object ko context me har jagah jaa ke store karna nahi padega
    
    useEffect(() => {
        console.log(auth)
        const unsubscribe = onAuthStateChangedListener((user) => {
			// Ye condition SignInWithGoogle ke liye kaam aayega jissme agar user create nahi hua hai toh uska DocRef and SnapShot create karenge
			// And don't worry agar userDocRef create hua hai toh uska userSanpshot create nahi karenge
			if (user) {
				createUserDocumentFromAuth(user);
			}

			// Apan idhari listner ki help se listen karke user ki auth value to context me store kar denge
			setCurrentUser(user);
		});

        return unsubscribe;
        
    }, []);

    const value = { currentUser, setCurrentUser }

    

    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}