// import './category-item.style.scss'
import './directory-item.style.scss';

const DirectoryItem = ({ category }) => {
	const { title, imageUrl } = category;

	return (
		<div className='directory-item-container'>
			{/* {console.log('category list render')} */}
			<div
				className='background-image'
				style={{ backgroundImage: `url(${imageUrl})` }}
			/>
			<div className='body'>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</div>
	);
};

export default DirectoryItem;

