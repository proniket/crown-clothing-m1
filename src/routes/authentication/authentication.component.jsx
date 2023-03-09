import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
	auth,
	signInWithGooglePopup,
	signInWithGoogleRedirect,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {
  // useEffect(async () => {
  //     const response = await getRedirectResult(auth);
  //     console.log(response)
  // }, [])
  
  // In this case we are using google Redirect signin method so it will redirect the user to google login page so when the redirect happen then our react app will unmount from the dom and then after signin when it will redirect again to the website then the react app will not know about the redirect result.
  // So we will run useEffect when the app mount after the redirect to get back the result of the redirect and if we get the response then we will store the user data into our firebase database.
  useEffect(() => {
		async function googleRedirect()  {
			 const response = await getRedirectResult(auth); // the auth is the only way we get to know wheather the user is authenticated or not.
				// console.log(response);
        if(response) {
          const userDocRef = await createUserDocumentFromAuth(response.user)
        }
		} 
    googleRedirect();
  }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        // console.log(response);
       const userDocRef = await createUserDocumentFromAuth(user);
      //  console.log("🚀 ~ file: sign-in.component.jsx:13 ~ logGoogleUser ~ ̥:", userDocRef)    
    }

    const logGoogleRedirect = async () => {
      const { user } = await signInWithGoogleRedirect();
      // console.log("🚀 ~ file: sign-in.component.jsx:19 ~ logGoogleRedirect ~ ̥:", user)
    }

  return (
		<div className='auth-container'>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign in with google popup</button>
			<button onClick={signInWithGoogleRedirect}>
				Sign in with google redirect
			</button>
			<div className='user-auth-container'>
				<SignInForm />
				<SignUpForm />
			</div>
		</div>
  );
}

export default Authentication;