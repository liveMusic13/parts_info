import { FC } from 'react';

import { IInputProps } from '../../../types/props.types';
import Button from '../button/Button';

import styles from './Input.module.scss';

const Input: FC<IInputProps> = ({
	placeholder,
	style,
	value,
	onChange,
	styleInput,
	styleImage,
	isButton,
	onClickButton,
}) => {
	return (
		<div className={styles.block__input} style={style}>
			<input
				style={styleInput}
				placeholder={placeholder}
				type='text'
				className={styles.input}
				value={value}
				onChange={onChange}
			/>
			{isButton && (
				<Button onClick={onClickButton}>
					<img
						style={styleImage}
						src='/images/icons/search.svg'
						alt='search'
						className={styles.img}
					/>
				</Button>
			)}
		</div>
	);
};

export default Input;
