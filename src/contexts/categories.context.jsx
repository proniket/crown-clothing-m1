import { createContext, useEffect, useState } from 'react';
// import PRODUCTS from '../shop-data.json';
import SHOP_DATA from '../shop-data.js';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

// Initital Values
// export const ProductsContext = createContext({
//     products: [],
//     // setProducts: () => null,
// });
export const CategoriesContext = createContext({
	categoriesMap: {},
	// categoriesMap: [],
	// setProducts: () => null,
});


export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	// NOTE => Isko ek hi baar run karna hai nahi toh ye firebase me jaa ke baar baar categories docs create karega
	// Typically ye waala kaam backend me hota hai naa ki frontend me but to see that how its done in fierbase isiliye ye kiya hai
	// useEffect(() => {
	//   addCollectionAndDocuments('categories', SHOP_DATA)
	// }, [])

	// Get Categories and Documents
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
			console.log(categoryMap);
			setCategoriesMap(categoryMap);
		};
		getCategoriesMap();
	}, []);

	// const value={ products, setProducts }
	const value = { categoriesMap };

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};