import { FC, useEffect, useRef, useState } from 'react';

import { IPanelTargetProps } from '../../../types/props.types';

import styles from './PanelTarget.module.scss';

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
		<div className={styles.block__buttons}>
			{dataButtons.map((but, index) => (
				<button
					key={but.id}
					ref={el => {
						//HELP: Инициализация массива при необходимости
						if (!buttonRefs.current) buttonRefs.current = [];
						buttonRefs.current[index] = el;
					}}
					className={
						activeButton === but.title ? styles.activeButton : styles.button
					}
					onClick={() => handleClick(but.title)}
				>
					{but.title}
				</button>
			))}
			<div
				className={styles.target__line}
				style={{
					width: `${lineStyle.width}px`,
					left: `${lineStyle.left}px`,
				}}
			></div>
		</div>
	);
};

export default PanelTarget;
