import { FC, useCallback, useState } from 'react';

import { otherInfoButtons } from '../../../data/panel.data';
import { IOtherInfoProps } from '../../../types/props.types';
import PanelTarget from '../../ui/panel-target/PanelTarget';

import Applicability from './applicability/Applicability';
import Description from './description/Description';
import DescriptionDetail from './description/DescriptionDetail';
import Substitutes from './substitutes/Substitutes';

const OtherInfo: FC<IOtherInfoProps> = ({
	data_detail,
	data_partsDetail,
	data_prPart,
}) => {
	const [activeButton, setActiveButton] = useState<string>('Описание');

	const handleClick = useCallback(
		(but: string) => {
			setActiveButton(but);
		},
		[activeButton],
	);

	return (
		<div className='mt-5 bg-[var(--white)] p-5 rounded-xl w-4/5 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.08)]'>
			<PanelTarget
				activeButton={activeButton}
				handleClick={handleClick}
				dataButtons={otherInfoButtons}
			/>
			{activeButton === 'Описание' && (
				<>
					<Description data_detail={data_detail} />
					{data_partsDetail.length > 0 && (
						<>
							<hr />
							<DescriptionDetail data_partsDetail={data_partsDetail} />
						</>
					)}
					<hr />
					<DescriptionDetail data_prPart={data_prPart} />
				</>
			)}
			{activeButton === 'Аналоги' && <Substitutes />}
			{activeButton === 'Применимость' && <Applicability />}
		</div>
	);
};

export default OtherInfo;
