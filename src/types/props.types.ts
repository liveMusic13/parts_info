import { ChangeEvent, PropsWithChildren } from 'react';

import {
	IFullInfo,
	IJs,
	IPrPartsResponse,
	ITd,
	IVolnaPartsDetailResponse,
} from './request.types';

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
	data_prPart: IPrPartsResponse[];
	data: IFullInfo;
	data_partsDetail: IVolnaPartsDetailResponse[];
}

export interface IInfoProps {
	title: string;
	value: string | number | boolean;
	classNameText?: string;
}

export interface IPanelTargetProps {
	dataButtons: { id: number; title: string }[];
	activeButton: string;
	handleClick: (arg: string) => void;
}

export interface IOtherInfoProps {
	data_detail: IFullInfo;
	data_partsDetail: IVolnaPartsDetailResponse[];
	data_prPart: IPrPartsResponse[];
}

export interface IDescriptionProps {
	data_detail: IFullInfo;
}

export interface IDescriptionDetailProps {
	data_partsDetail?: IVolnaPartsDetailResponse[];
	data_prPart?: IPrPartsResponse[];
}

export interface ICroseCodeProps {
	isTecDoc: boolean;
}

export interface IAdditionalInfoProps {
	id: number | undefined;
	image: string;
}
