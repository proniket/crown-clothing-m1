import { useContext } from 'react';
import Button from '../button/button.component.jsx';
import './product-card.component.jsx';
import './product-card.styles.scss';

import { CartItemsContext } from '../../contexts/cart.context.jsx';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartItemsContext);

  const addThisToCart = (product) => {
    console.log(' calling aaaaaaaaaaaaadiing product')
		addItemToCart(product);
  };

  return (
		<div className='product-card-container'>
			<img src={imageUrl} alt={`${name}`} />
			<div className='footer'>
				<span className='name'>{name}</span>
				<span className='price'>{price}</span>
			</div>
			<Button buttonType='inverted' onClick={() => addThisToCart(product)}>
				Add to card
			</Button>
		</div>
  );
  }

export default ProductCard;

// onClick = { addProductToCart };