import { ChangeEvent, PropsWithChildren } from 'react';

import { IFullInfo, IJs, ITd } from './request.types';

export interface IInputProps {
	className?: string;
	classNameInput?: string;
	classNameImage?: string;
	placeholder?: string;
	value?: string;
	isButton?: boolean;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onClickButton?: () => void;
}

export interface IButtonProps extends PropsWithChildren {
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
}

export interface ISuppliersProps {
	data: IJs[] | ITd[];
	title: string;
}

export interface ISliderImageProps {
	arrImage: string[];
}

export interface IInfoProps {
	title: string;
	value: string | number | boolean;
}

export interface IPanelTargetProps {
	dataButtons: { id: number; title: string }[];
	activeButton: string;
	handleClick: (arg: string) => void;
}

export interface IOtherInfoProps {
	data_detail: IFullInfo;
}

export interface IDescriptionProps {
	data_detail: IFullInfo;
}

export interface ICroseCodeProps {
	isTecDoc: boolean;
}

export interface IAdditionalInfoProps {
	id: number | undefined;
}
