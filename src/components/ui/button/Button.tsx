import { FC } from 'react';

import { IButtonProps } from '../../../types/props.types';

const Button: FC<IButtonProps> = ({
	children,
	onClick,
	className,
	disabled,
}) => {
	return (
		<button
			className={`bg-[var(--blue-grey)] text-[var(--white)] text-[0.85rem] py-1 px-3.5 hover:cursor-pointer ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
