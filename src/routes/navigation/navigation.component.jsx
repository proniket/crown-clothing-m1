import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import  CrownLogo  from '../../assets/crown'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';

// import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { auth, signOutAuthUser } from '../../utils/firebase/firebase.utils';

import { UserContext } from '../../contexts/user.context';
import { CartItemsContext } from '../../contexts/cart.context';

import './navigation.styles';
// import './navigation.style.scss';
// import '../navigation/navigation.style.scss';

import {
	NavigationContainer,
	NavLinks,
	NavLink,
	LogoContainer,
} from './navigation.styles';

const Navigation = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartItemsContext);

	const signOutUser = async () => {
		
		console.log('signing out')
		try {
			await signOutAuthUser();
			setCurrentUser(null);
		} catch (error) {
			console.log(error.message)
		}
		
	}

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrownLogo className='logo' />
				</LogoContainer>
				<NavLinks>
					<NavLink className='nav-link' to='/shop'>
						SHOP
					</NavLink>
					{currentUser ? (
						<NavLink as='span' onClick={signOutUser}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to='/auth'>
							SIGN IN
						</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
