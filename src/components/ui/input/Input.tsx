import { FC } from 'react';

import { IInputProps } from '../../../types/props.types';
import Button from '../button/Button';

const Input: FC<IInputProps> = ({
	placeholder,
	className,
	value,
	onChange,
	classNameInput,
	classNameImage,
	isButton,
	onClickButton,
}) => {
	return (
		<div
			className={`flex border-1 border-[var(--blue-grey)] rounded-[0.428rem] min-w-xl h-14 ${className}`}
		>
			<input
				placeholder={placeholder}
				type='text'
				className={`grow-1 rounded-[0.428rem] outline-0 pl-2.5 ${classNameInput}`}
				value={value}
				onChange={onChange}
				onKeyDown={e => {
					//HELP: Если нажат Enter и есть кнопка — вызываем onClickButton
					if (e.code === 'Enter' && isButton && onClickButton) {
						onClickButton();
					}
				}}
			/>
			{isButton && (
				<Button
					onClick={onClickButton}
					className={`w-14 h-full flex items-center justify-center rounded-br-[4px] ${classNameImage}`}
				>
					<img
						src='/images/icons/search.svg'
						alt='search'
						className='w-5 h-5'
					/>
				</Button>
			)}
		</div>
	);
};

export default Input;
