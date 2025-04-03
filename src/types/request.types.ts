export interface IApiResponse<T> {
	status: number;
	data: T;
}

export interface ITd {
	dataversion: number;
	description: string;
	hasnewversionarticles: boolean;
	id: number;
	matchcode: string;
	nbrofarticles: number;
}

export interface IJs {
	address: string;
	domain: string;
	existId: string;
	existName: string;
	id: number;
	marketPrefix: string;
	name: string;
	prefix: string;
	rating: string;
	realid: string;
	tecdocSupplierId: string;
	www: string;
}

export interface ISuppliersResponse {
	suppliersFromJs: IJs[];
	suppliersFromTd: ITd[];
}

export interface IDetailAttribute {
	id: number;
	datasupplierarticlenumber: string;
	description: string;
	displaytitle: string;
	displayvalue: string;
	supplierid: number;
}

export interface IArticleSchema {
	ArticleStateDisplayValue: string;
	DataSupplierArticleNumber: string;
	Description: string;
	FlagAccessory: boolean;
	FlagMaterialCertification: boolean;
	FlagRemanufactured: boolean;
	FlagSelfServicePacking: boolean;
	FoundString: string;
	HasAxle: boolean;
	HasCVManuID: boolean;
	HasCommercialVehicle: boolean;
	HasEngine: boolean;
	HasLinkitems: boolean;
	HasMotorbike: boolean;
	HasPassengerCar: boolean;
	IsValid: boolean;
	LotSize1: number;
	LotSize2: number;
	NormalizedDescription: string;
	PackingUnit: number;
	QuantityPerPackingUnit: number;
	supplierId: number;
}

export interface IArticleEan {
	datasupplierarticlenumber: string;
	ean: string;
	supplierid: number;
}

export interface IFullInfo {
	article_ean: IArticleEan | null;
	article_schema: IArticleSchema | null;
	detail_attribute: IDetailAttribute[];
	img_urls: string[];
	normalized_article: string;
	supplier_from_jc: IJs;
	supplier_from_td: ITd;
}

export interface IEtPartResponse {
	id: number;
	producerId: number;
	oldId: number;
	code: string;
	longcode: string;
	weight: number;
	name: string;
	description: string;
	V: number;
	sessionid: number;
	nochangeflag: boolean;
	accepted: boolean;
	deleted: boolean;
	rating: number;
	old: boolean;
	dead: boolean;
}
