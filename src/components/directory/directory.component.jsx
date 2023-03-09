import './directory.style.scss';
import DirectoryItem from '../directory-item/directory-item.component';

const Directory = ({ categories }) => {
	return (
		<div className='directory-container'>
			{/* {categories.map(({ title, id }) => (
        <div key={id} className='category-container'>
    <div className='background-image' />
            <h2>{title}</h2>
            <p>Shop Now</p>
        </div>
    ))} */}

			{/* {categoriesList} */}

			{categories.map((category) => (
				<DirectoryItem key={category.id} category={category} />
			))}
		</div>
	);
};

export default Directory;
