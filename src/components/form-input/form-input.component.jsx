import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
  return (
		<div className='group'>
			<input {...otherProps} className='form-input' />
			{label && (
				<label htmlFor={otherProps.id} className='form-input-label'>
					{label}
				</label>
			)}
		</div>
  );
}

export default FormInput