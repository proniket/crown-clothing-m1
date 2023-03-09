import { useContext } from 'react';

import { CartItemsContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
	const { cartItems, cartTotalPrice } = useContext(CartItemsContext);

	return (
		<div className='checkout-container'>
			<div className='checkout-header'>
				<div className='header-block'>
					<span>Product</span>
				</div>
				<div className='header-block'>
					<span>Description</span>
				</div>
				<div className='header-block'>
					<span>Quantity</span>
				</div>
				<div className='header-block'>
					<span>Price</span>
				</div>
				<div className='header-block'>
					<span>Remove</span>
				</div>
			</div>
			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}
			<div className='total'>TOTAL: ${cartTotalPrice}</div>
		</div>
	);
};

export default Checkout;

// import './checkout.styles.scss';

// import { useContext } from 'react';
// import { CartItemsContext, removeProduct } from '../../contexts/cart.context';

// const Checkout = () => {
//     const {
// 		cartItems,
// 		addItemToCart,
// 		decrementItemFromCart,
// 		removeItemFromCart,
// 	} = useContext(CartItemsContext);

//     return (
//     <div>
//         <h1>I am the checkout page</h1>
//         <div>
//             {
//                 cartItems.map((cartItem) => {
//                     const { id, name, price, imageUrl, quantity} = cartItem;

//                   return (
// 						<div key={id}>
// 							<h2>{name}</h2>
// 							<span>{quantity}</span>
// 							<br />
// 							<span onClick={() => addItemToCart(cartItem)}>
// 								increment
// 							</span>
// 							<br />
// 							<span
// 								onClick={() => decrementItemFromCart(cartItem)}>
// 								decrement
// 							</span>
// 							<br />
// 							<span
// 								onClick={() => removeItemFromCart(cartItem.id)}>
// 								X
// 							</span>
// 						</div>
// 					);
//                 })
//             }
//         </div>
//     </div>
//   )
// }

// export default Checkout;
