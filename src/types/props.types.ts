import { CSSProperties, ChangeEvent, PropsWithChildren } from 'react';

import { IFullInfo, IJs, ITd } from './request.types';

export interface IInputProps {
	style?: CSSProperties;
	styleInput?: CSSProperties;
	styleImage?: CSSProperties;
	placeholder?: string;
	value?: string;
	isButton?: boolean;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onClickButton?: () => void;
}

export interface IButtonProps extends PropsWithChildren {
	style?: CSSProperties;
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
