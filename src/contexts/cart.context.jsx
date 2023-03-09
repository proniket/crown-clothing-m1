import { createContext, useEffect, useState } from 'react';

export const CartItemsContext = createContext({
	cartItems: [],
	iscartItemsOpen: false,
	setIscartItemsOpen: () => null,
	toggleIsCartOpen: () => null,
	addProductToCartItems: () => null,
	removeItemFromCart: () => null,
	cartCount: 0,
	setCartCount: () => null,
	cartTotalPrice: 0,
});

const updatecartItems = (cartItems, product) => {
    // console.log('starting updatecartItems')
    // console.log(cartItems)
    // Check product exist in cartItems or not 
    const isProductExistIncartItems = cartItems?.find((item) => item.id === product.id )

    // const existingCartItem = cartItems.find(
	// 	(cartItem) => cartItem.id === productToAdd.id
	// );

    console.log(isProductExistIncartItems)

    // If exist update the quantity by 1
    if(isProductExistIncartItems) {
        return cartItems.map((item) => 
            item.id === product.id
				? { ...item, quantity: item.quantity + 1 }
				: item
        )
    }
    // return the updated cartItems array
    // return [{...product, quantity: 1}]
    return [...cartItems, { ...product, quantity: 1 }];
}


export const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeProduct = (cartItems, productId) => {
	return cartItems.filter((cartItem) => cartItem.id !== productId);
};

export const decrementCartItem = (cartItems, productToRemove) => {
	// const existingCartItem = cartItems.find(
	// 	(cartItem) => cartItem.id === productToAdd.id
	// );

	if (productToRemove.quantity === 1) {
		// return cartItems.filter(
		// 	(cartItem) => cartItem.id !== productToRemove.id
		// );
		return removeProduct(cartItems, productToRemove.id);
	}

	return cartItems.map((cartItem) =>
		cartItem.id === productToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
	
	// return [...cartItems, { ...productToAdd, quantity: 1 }];

};

export const CartItemsContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotalPrice, setCartTotalPrice] = useState(0);
    
    const toggleIsCartOpen = () => {
		console.log('calling toggling');
		setIsCartOpen(!isCartOpen);
	};

	const totalProductsInCart = () => {
		return cartItems.reduce((acc, curr) => {
			console.log(curr.quantity)
			acc += curr.quantity
			return acc;
		}, 0)
	}

	// const totalPriceOfCart = () => {
	// 	return cartItems.reduce(
	// 		(total, cartItem) => total + cartItem.quantity * cartItem.price,
	// 		0
	// 	);
	//};

	//  const newCartTotal = cartItems.reduce(
    //   (total, cartItem) => total + cartItem.quantity * cartItem.price,
    //   0
    // );

	useEffect(() => {
		const totalProductsCount = totalProductsInCart();
		setCartCount(totalProductsCount);
	}, [cartItems]);

	useEffect(() => {
		// const totalProductsPrice = totalPriceOfCart();
		const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0);
		setCartTotalPrice(newCartTotal);
	}, [cartItems]);
	



    // const addProductTocartItems = (product) => {
    //     console.log('calling updatecartItems Function')
    //     // const newcartItems = updatecartItems(cartItems, product)
    //     // setcartItems(newcartItems);
    //     setcartItems(updatecartItems(cartItems, product));
    // }

     const addItemToCart = (product) =>
			setCartItems(updatecartItems(cartItems, product));
    //  const addItemToCart = (product) =>
	// 		setCartItems(addCartItem(cartItems, product));


	const decrementItemFromCart = (product) =>
		setCartItems(decrementCartItem(cartItems, product));


	const removeItemFromCart = (productId) =>
		setCartItems(removeProduct(cartItems, productId));
    
    const value = {
		cartItems,
		isCartOpen,
		cartCount,
		cartTotalPrice,
		toggleIsCartOpen,
		addItemToCart,
		decrementItemFromCart,
		removeItemFromCart,
	};

    return (
		<CartItemsContext.Provider value={value}>{children}</CartItemsContext.Provider>
	);
}