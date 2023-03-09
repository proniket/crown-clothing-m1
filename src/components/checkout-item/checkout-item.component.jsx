
import { useContext } from 'react';

import { CartItemsContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;

	// const { clearItemFromCart, addItemToCart, removeItemToCart } =
	// 	useContext(CartContext);

		 const {
				cartItems,
				addItemToCart,
				decrementItemFromCart,
				removeItemFromCart,
			} = useContext(CartItemsContext);

	const clearItemHandler = () => removeItemFromCart(cartItem.id);
	const addItemHandler = () => addItemToCart(cartItem);
	const removeItemHandler = () => decrementItemFromCart(cartItem);

	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img src={imageUrl} alt={`${name}`} />
			</div>
			<span className='name'> {name} </span>
			<span className='quantity'>
				<div className='arrow' onClick={removeItemHandler}>
					&#10094;
				</div>
				<span className='value'>{quantity}</span>
				<div className='arrow' onClick={addItemHandler}>
					&#10095;
				</div>
			</span>
			<span className='price'> {price}</span>
			<div className='remove-button' onClick={clearItemHandler}>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;