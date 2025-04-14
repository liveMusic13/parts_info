export interface IApplicabilityGroup {
	isView: boolean;
	name: string;
	arr_group: {
		description: string;
		isView: boolean;
	}[];
}
