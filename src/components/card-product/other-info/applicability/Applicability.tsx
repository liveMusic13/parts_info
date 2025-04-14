import { FC, useEffect, useState } from 'react';

import { useSubstitute } from '../../../../hooks/requests/useSubstitute';
import {
	useNameForDetailInfoStore,
	useSearchStore,
} from '../../../../store/store';
import { IApplicabilityGroup } from '../../../../types/state.types';
import Loader from '../../../ui/loader/Loader';

const Applicability: FC = () => {
	const [viewGroup, setViewGroup] = useState<IApplicabilityGroup[]>([]);
	const valueSearch = useSearchStore(store => store.valueSearch);
	const nameDetailInfo = useNameForDetailInfoStore(
		store => store.nameDetailInfo,
	);

	const { data, isLoading, isSuccess } = useSubstitute(
		nameDetailInfo,
		valueSearch,
	);

	useEffect(() => {
		if (isSuccess && data) {
			const formattedData = data.Models.map(el => ({
				name: el.ModelName,
				isView: false,
				arr_group: el.Substitutes.map(elem => ({
					description: elem.Modification.description,
					isView: false,
				})),
			}));

			setViewGroup(formattedData);
		}
	}, [isSuccess, data]);

	useEffect(() => console.log(viewGroup), [viewGroup]);

	const handleViewGroup = (name: string) =>
		setViewGroup(prev =>
			prev.map(el => {
				if (name === el.name) {
					return {
						...el,
						isView: !el.isView,
					};
				} else {
					return el;
				}
			}),
		);
	const handleViewModel = (modelName: string, name: string) => {
		setViewGroup(prev =>
			prev.map(el => {
				if (modelName === el.name) {
					return {
						...el,
						arr_group: el.arr_group.map(elem => {
							if (elem.description === name) {
								return {
									description: elem.description,
									isView: !elem.isView,
								};
							} else {
								return elem;
							}
						}),
					};
				} else {
					return el;
				}
			}),
		);
	};

	return (
		<div className='mt-5'>
			{isLoading && <Loader />}
			{isSuccess &&
				data?.Models.map((el, ind) => {
					const isOpen = viewGroup[ind]?.isView;
					const openStyle = isOpen ? 'rotate-90' : '';

					return (
						<div key={ind}>
							<div
								onClick={() => handleViewGroup(el.ModelName)}
								className='flex gap-1 items-center border-y-1 border-gray-300 py-2.5 px-1.5 bg-gray-200 hover:cursor-pointer group'
							>
								<img
									src='/images/icons/arrow.svg'
									alt='arrow'
									className={`w-3.5 h-3.5 group-hover:w-4 group-hover:h-4 transition-all duration-300 ${openStyle}`}
								/>
								<span className='font-bold group-hover:text-xl group-hover:text-[var(--red)] transition-all duration-300'>
									{el.ModelName}
									<span className='text-[0.7rem] opacity-20 ml-1.5'>
										({el.ModelId})
									</span>
								</span>
							</div>

							{el.Substitutes.map((elem, index) => {
								const viewStyle = isOpen
									? 'h-auto opacity-100'
									: 'h-0 opacity-0 !p-0 !border-0';
								const isOpenModel = viewGroup[ind]?.arr_group[index].isView;
								const openModelStyle = isOpenModel ? 'rotate-90' : '';
								const openModelBg = isOpenModel ? 'bg-gray-100' : '';

								return (
									<div key={index}>
										<div
											className={`flex gap-1 items-center border-y-1 border-gray-300 py-2.5 px-1.5 ${viewStyle} transition-all duration-300 ease-in-out hover:cursor-pointer group ${openModelBg}`}
											onClick={() =>
												handleViewModel(
													el.ModelName,
													elem.Modification.description,
												)
											}
										>
											<img
												src='/images/icons/arrow.svg'
												alt='arrow'
												className={`w-3.5 h-3.5 group-hover:w-4 group-hover:h-4 transition-all duration-300  ${openModelStyle}`}
											/>
											<span className='group-hover:font-bold group-hover:text-xl group-hover:text-[var(--red)] transition-all duration-300 flex gap-1.5'>
												{elem.Modification.description},
												<span>
													{elem.Type}, {elem.Name}
												</span>
												<span>({elem.Modification.construction_interval})</span>
											</span>
										</div>
										{isOpenModel &&
											elem.Attributes.map((atr, i) => (
												<div
													key={i}
													className='border-y-1 border-gray-300 py-2.5 w-full text-center'
												>
													<span className='font-bold mr-2'>{atr.Title}: </span>
													{atr.Value}
												</div>
											))}
									</div>
								);
							})}
						</div>
					);
				})}
		</div>
	);
};

export default Applicability;
