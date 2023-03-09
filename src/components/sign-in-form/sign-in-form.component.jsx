import { useState, useContext } from 'react';
import './sign-in-form.styles.scss';
import { UserContext } from '../../contexts/user.context';

import {
	createAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

	const { setCurrentUser, currentUser } = useContext(UserContext);
	// console.log("🚀SignInForm:", currentUser)
	

    const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

    const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			
			await signInAuthUserWithEmailAndPassword(email, password);
			
			// const { user } = await signInAuthUserWithEmailAndPassword(
			// 	email,
			// 	password
			// );

			// console.log(user)
			// console.log(typeof user)

			// NOTE => Apan ye kaam user context me kara hai jisse hame baar baar har jagah karne ki zaroorat na ho
			// setCurrentUser(user);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('incorrect password for email');
					break;
				case 'auth/user-not-found':
					alert('no user associated with this email');
					break;
				default:
					console.log(error);
			}
		}
	};

    // this way we can track multiple field in form
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

	const signWithGoogle = async () => {
		await signInWithGooglePopup();


		// const { user } = await signInWithGooglePopup();
		// await createUserDocumentFromAuth(user);

		// NOTE => Apan ye kaam user context me kara hai jisse hame baar baar har jagah karne ki zaroorat na ho
		// setCurrentUser(user);
	};

	return (
		<div className='sign-up-container'>
			<h2>Already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					id='sign-in-email'
					value={email}
				/>
				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					id='sign-in-password'
					value={password}
				/>

				<Button type='submit'>Sign In</Button>
				<br />

				{!currentUser ? (
					<Button
						buttonType='google'
						type='button'
						onClick={signWithGoogle}>
						Google Sign In
					</Button>
				) : null}

				<h1>User details {currentUser?.email}</h1>
			</form>
		</div>
	);
};
	

export default SignInForm;
