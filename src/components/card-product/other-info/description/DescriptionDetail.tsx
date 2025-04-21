import { FC } from 'react';

import { IDescriptionDetailProps } from '../../../../types/props.types';
import Info from '../../info/Info';

const DescriptionDetail: FC<IDescriptionDetailProps> = ({
	data_partsDetail,
	data_prPart,
}) => {
	return (
		<div className='my-5 max-w-2/3 flex flex-col gap-2.5'>
			{data_partsDetail &&
				data_partsDetail[0]?.attributes.map((el, ind) => (
					<Info key={ind} title={el.Title} value={el.Value} />
				))}
			{data_prPart &&
				data_prPart[0]?.attributes.map((el, ind) => (
					<Info key={ind} title={el.name} value={el.value} />
				))}
		</div>
	);
};

export default DescriptionDetail;
