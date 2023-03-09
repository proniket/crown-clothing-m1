import { useState, useContext } from 'react';

import './sign-up-form.styles.scss';

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { UserContext } from '../../contexts/user.context';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

	const { setCurrentUser, currentUser } = useContext(UserContext);
	// console.log(
	// 	'🚀SignUpsForm ~ ̥:',
	// 	currentUser
	// );

	// console.log('SignUp Form')
	

    const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

    const handleSubmit = async (event) => {
		event.preventDefault();
        // console.log(displayName)

		if (password !== confirmPassword) {
			alert('passwords do not match');
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			await createUserDocumentFromAuth(user, { displayName });

			// NOTE => Apan ye kaam user context me kara hai jisse hame baar baar har jagah karne ki zaroorat na ho
			// setCurrentUser(user);
			
			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			} else {
				console.log('user creation encountered an error', error);
			}
		}
	};

    // this way we can track multiple field in form
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					type='text'
					required
					onChange={handleChange}
					name='displayName'
					id='displayName'
					value={displayName}
				/>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					id='sign-up-email'
					value={email}
				/>
				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					id='sign-up-password'
					value={password}
				/>
				<FormInput
					label='Confirm Password'
					type='password'
					required
					onChange={handleChange}
					name='confirmPassword'
					id='confirm-password'
					value={confirmPassword}
				/>

				<h1>User details {currentUser?.email}</h1>

				<Button buttonType='google' type='submit'>Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
