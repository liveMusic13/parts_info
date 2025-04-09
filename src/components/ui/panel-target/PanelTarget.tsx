import { FC, useEffect, useRef, useState } from 'react';

import { IPanelTargetProps } from '../../../types/props.types';

const PanelTarget: FC<IPanelTargetProps> = ({
	dataButtons,
	activeButton,
	handleClick,
}) => {
	const [lineStyle, setLineStyle] = useState({ width: 0, left: 0 });
	const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

	useEffect(() => {
		//HELP: Найти активную кнопку и обновить положение и ширину линии
		const activeIndex = dataButtons.findIndex(
			but => but.title === activeButton,
		);

		if (buttonRefs.current) {
			if (activeIndex !== -1 && buttonRefs.current[activeIndex]) {
				const button = buttonRefs.current[activeIndex];
				const buttonRect = button.getBoundingClientRect();
				setLineStyle({
					width: buttonRect.width,
					left: button.offsetLeft,
				});
			}
		}
	}, [activeButton, dataButtons]);

	return (
		<div className='h-10 rounded-xl relative flex items-center gap-6'>
			{dataButtons.map((but, index) => (
				<button
					key={but.id}
					ref={el => {
						//HELP: Инициализация массива при необходимости
						if (!buttonRefs.current) buttonRefs.current = [];
						buttonRefs.current[index] = el;
					}}
					className='bg-transparent h-full py-2 hover:cursor-pointer'
					onClick={() => handleClick(but.title)}
				>
					{but.title}
				</button>
			))}
			<div
				className='bg-[var(--red)] absolute bottom-0 h-0.5 rounded-tl-2xl transition-[left_0.2s_ease-in-out,_width_0.2s_ease-in-out]'
				style={{
					width: `${lineStyle.width}px`,
					left: `${lineStyle.left}px`,
				}}
			></div>
		</div>
	);
};

export default PanelTarget;
