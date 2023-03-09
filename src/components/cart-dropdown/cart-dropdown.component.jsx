import { useContext } from 'react';
import './cart-dropdown.styles.scss';
import Button from '../button/button.component'
import { CartItemsContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';

import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
	const { cartItems } = useContext(CartItemsContext); 
	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate('/checkout')
	}

	// const mappingOverCart = () => {
	// 	return {
	// 		cart.map((item) => {
	// 				return (
	// 					<div className='cart-items'>
	// 						<img src={item.imageUrl} alt='' />
	// 						<span>{item.name}</span>
	// 						<span>{item.quantity}</span>
	// 					</div>
	// 				)
	// 		})
	// 	}
	// }
	// console.log(cart)

//   return (
// 		<div className='cart-dropdown-container'>
// 			{/* {mappingOverCart} */}
// 			{cart.map((item) => {
// 				console.log(item)
// 				return (
// 					<div key={item.id} className='cart-items'>
// 						{/* <img src={item.imageUrl} alt='' /> */}
// 						<span>{item.name}</span>
// 						<span>{item.quantity}</span>
// 					</div>
// 				);
// 			})}

// 			<Button>GO TO CHECKOUT</Button>
// 		</div>
//   );


  return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.length ? (
					cartItems.map((cartItem) => (
						<CartItem key={cartItem.id} cartItem={cartItem} />
					))
				) : (
					<span className='empty-message'>Your cart is empty</span>
				)}
			</div>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</div>
  );
}

export default CartDropdown;