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
			{/* <div className='navigation'> */}
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrownLogo className='logo' />
				</LogoContainer>
				{/* <Link className='logo-container' to='/'>
					<CrownLogo className='logo' />
				</Link> */}
				{/* <div className='nav-links-container'> */}
				<NavLinks>
					<NavLink className='nav-link' to='/shop'>
						SHOP
					</NavLink>
					{/* <Link className='nav-link' to='/shop'>
						SHOP
					</Link> */}
					{currentUser ? (
						<NavLink as='span' onClick={signOutUser}>
							{/* <a href='#'>SIGN OUT</a> */}
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to='/auth'>
							SIGN IN
						</NavLink>
						// <Link className='nav-link' to='/auth'>
						// 	SIGN IN
						// </Link>
					)}
					<CartIcon />
				{/* </div> */}
				</NavLinks>
				{isCartOpen && <CartDropdown />}
				{/* </div> */}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
