import { useContext } from 'react';
import ShoppingBagIcon from '../../assets/shopping-bag-icon';
// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { CartItemsContext } from '../../contexts/cart.context';


const CartIcon = () => {
	const { toggleIsCartOpen, cartCount } = useContext(CartItemsContext);
	console.log('cartCount',cartCount)

	return (
		<div className='cart-icon-container' onClick={toggleIsCartOpen}>
			<ShoppingBagIcon className='shopping-icon' />
			<span className='item-count'>{cartCount}</span>
		</div>
	);
};

export default CartIcon;

// onClick = { toggleIsCartOpen };