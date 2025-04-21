export interface IApiResponse<T> {
	status: number;
	data: T;
}

export interface ITd {
	dataversion: number;
	description: string;
	description_two?: string;
	hasnewversionarticles: boolean;
	id: number;
	matchcode: string;
	nbrofarticles: number;
	img: string;
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
	tecdocSupplierId: number;
	www: string;
	img: string;
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

export interface ISpecifications {
	['Диаметр [мм]']: string;
	['Ширина [мм]']: string;
}

export interface IReplacement {
	article: string;
	brand: string;
	delivery: string;
	image: string;
	price: string | null;
	quantity: string | null;
}

export interface IVolnaPartsResponse {
	images: string[];
	name: string;
	replacements: IReplacement[];
	specifications: ISpecifications;
}

export interface IManufacturer {
	canbedisplayed: boolean;
	description: string;
	fulldescription: string;
	haslink: boolean;
	id: number;
	isaxle: boolean;
	iscommercialvehicle: boolean;
	isengine: boolean;
	ismotorbike: boolean;
	ispassengercar: boolean;
	istransporter: boolean;
	isvgl: boolean;
	matchcode: string;
}

export interface ISupplier {
	dataversion: number;
	description: string;
	hasnewversionarticles: boolean;
	id: number;
	matchcode: string;
	nbrofarticles: number;
}

export interface ITecDocCrossResponse {
	IsAdditive: boolean;
	OENbr: string;
	datasupplierarticlenumber: string;
	supplierid: number;
	manufacturerId: number;
	manufacturer: IManufacturer;
	supplier: ISupplier;
}

export interface IEtProducerRequest {
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

export interface IJSSCrossRequest {
	cr_by: string;
	cr_bycode: string;
	cr_cross: string;
	cr_crosscode: string;
	cr_date: string;
	cr_deleted: string;
	cr_id: string;
	cr_ismainnew: string;
	cr_maincode: string;
	cr_session_id: string;
	cr_verity: string;
	et_producer: IEtProducerRequest;
}

export interface IAttributes {
	Title: string;
	Value: string;
}

export interface IModification {
	construction_interval: string;
	description: string;
}

export interface ISubstitutes {
	Name: string;
	Type: string;
	Attributes: IAttributes[];
	Modification: IModification;
	ModelId: number;
}

export interface IModels {
	ModelId: number;
	ModelName: string;
	Substitutes: ISubstitutes[];
}

export interface ISubstituteResponse {
	SubstitutesCount: number;
	Models: IModels[];
}

export interface ISuppliersByIdResponse {
	addresstype: string | null;
	addresstypeid: string | null;
	city1: string | null;
	city2: string | null;
	countrycode: string | null;
	email: string | null;
	fax: string | null;
	homepage: string | null;
	name1: string | null;
	name2: string | null;
	postalcodecity: string | null;
	postalcodepob: string | null;
	postalcodewholesaler: string | null;
	postalcountrycode: string | null;
	postofficebox: string | null;
	street1: string | null;
	street2: string | null;
	supplierid: number | null;
	telephone: string | null;
}

export interface IAttributesPrParts {
	name: string;
	value: string;
}

export interface IPrPartsResponse {
	article: string;
	brand: string;
	Vendor_Code: string;
	images: string[];
	attributes: IAttributesPrParts[];
	Vendor_Category_Name: string;
	OEM_Code: string;
	OEM_Mark: string;
	models: string[];
}

export interface IAttributesDetail {
	Title: string;
	Value: string;
}

export interface INumbersDetail {
	number: string;
	search_link: string;
}

export interface ICrossNumbers {
	manufacturer: string;
	numbers: INumbersDetail[];
}

export interface IVolnaPartsDetailResponse {
	name: string;
	images: string[];
	attributes: IAttributesDetail[];
	characteristics: IAttributesDetail[];
	manufacturer_image: string;
	cross_numbers: ICrossNumbers[];
}
