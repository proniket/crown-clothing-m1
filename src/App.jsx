import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';


// const Navigation = () => {
// 	return (
// 		<div>
// 			<h1>I'm Navigation Bar</h1>
// 			<Outlet />
// 		</div>
// 	)
// }

function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='shop/*' element={<Shop />} />
				<Route path='auth' element={<Authentication />} />
				<Route path='checkout' element={<Checkout />} />
			</Route>
		</Routes>
	);
}

export default App;

// import { useState, useEffect, useCallback, memo } from 'react';
// import Directory from './components/directory/directory.component';
// import { Routes, Route } from 'react-router-dom';

// import Home from './routes/home/home.component'
// // import Navigation from './routes/navigation/navigation.component';
// // import SignIn from './routes/sign-in/sign-in.component';

// // const categories = [
// // 	{
// // 		id: 1,
// // 		title: 'hats',
// // 		imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
// // 	},
// // 	{
// // 		id: 2,
// // 		title: 'jackets',
// // 		imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
// // 	},
// // 	{
// // 		id: 3,
// // 		title: 'sneakers',
// // 		imageUrl: 'https://picsum.photos/seed/picsum/200/300',
// // 	},
// // 	{
// // 		id: 4,
// // 		title: 'womens',
// // 		imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
// // 	},
// // 	{
// // 		id: 5,
// // 		title: 'mens',
// // 		imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
// // 	},
// // ];

// function App() {
// //   const [categoriesList, setcategoriesList] = useState(null);

// //   useEffect(() => {
// // 		const categoriesListMap = categories.map(({ title, id, imageUrl }) => (
// // 			<div key={id} className='category-container'>
// // 				{console.log('category list render')}
// // 				<div
// // 					className='background-image'
// // 					style={{ backgroundImage: `url(${imageUrl})` }}
// // 				/>
// // 				<div className='category-body-container'>
// // 					<h2>{title}</h2>
// // 					<p>Shop Now</p>
// // 				</div>
// // 			</div>
// // 		));
// // 		setcategoriesList(categoriesListMap);
// //   }, [categories]);

// 	return (
// 		<Routes>
// 			<Route index path='/home' element={<Home />} />
// 			{/* <Route path='/' element={<Navigation />}>
// 				<Route path='shop' element={<Shop />} />
// 				<Route path='sign-in' element={<SignIn />} />
// 			</Route> */}
// 		</Routes>
// 	);

// //   return <Directory categories={categories} />;
// }

// export default App;
