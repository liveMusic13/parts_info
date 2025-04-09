import { FC, useCallback, useEffect, useState } from 'react';

import { otherInfoButtons } from '../../../data/panel.data';
import { IOtherInfoProps } from '../../../types/props.types';
import PanelTarget from '../../ui/panel-target/PanelTarget';

import Description from './description/Description';
import Substitutes from './substitutes/Substitutes';

const OtherInfo: FC<IOtherInfoProps> = ({ data_detail }) => {
	const [activeButton, setActiveButton] = useState<string>('Описание');

	const handleClick = useCallback(
		(but: string) => {
			setActiveButton(but);
		},
		[activeButton],
	);

	useEffect(
		() =>
			console.log('activeButton', activeButton, activeButton === 'Заменники'),
		[activeButton],
	);

	return (
		<div className='mt-5 bg-[var(--white)] p-5 rounded-xl w-full shadow-[0px_0px_6px_0px_rgba(0,0,0,0.08)]'>
			<PanelTarget
				activeButton={activeButton}
				handleClick={handleClick}
				dataButtons={otherInfoButtons}
			/>
			{activeButton === 'Описание' && <Description data_detail={data_detail} />}
			{activeButton === 'Заменники' && <Substitutes />}
		</div>
	);
};

export default OtherInfo;
