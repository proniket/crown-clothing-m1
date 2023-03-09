import { useContext, Fragment } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';
// import './shop.styles.scss';

const CategoriesPreview = () => {
	const { categoriesMap } = useContext(CategoriesContext);
	console.log(categoriesMap);

	// return (
	// 	// <div className='products-container'>
	// 	// 	{categoriesMap?.map((category) => (
	// 	// 		<ProductCard key={category.id} product={category} />
	// 	// 	))}
	// 	// </div>
	// 	<div className='shop-container'>
	// 		{Object.keys(categoriesMap).map((title) => {
	// 			const products = categoriesMap[title];
	// 			return (
	// 				// <div key={title} className='product-wrapper'>
	// 				// 	<h2>{title}</h2>
	// 				// 	<div className='products-container'>
	// 				// 		{categoriesMap[title]?.map((category) => (
	// 				// 			<ProductCard
	// 				// 				key={category.id}
	// 				// 				product={category}
	// 				// 			/>
	// 				// 		))}
	// 				// 	</div>
	// 				// </div>

	// 				<CategoryPreview
	// 					key={title}
	// 					title={title}
	// 					products={products}
	// 				/>
	// 			);
	// 		})}
	// 	</div>
	// );

    return (
		<Fragment>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];
				return (
					<CategoryPreview
						key={title}
						title={title}
						products={products}
					/>
				);
			})}
		</Fragment>
	);
};

export default CategoriesPreview;
