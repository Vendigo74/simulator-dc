export interface IMarketingPack {
	_id: string | number;
	id?: string | number;
	category: string;
	subCategory: string;
	leaderAction?: string;
	reason?: string;
	actions: IMarketingAction[];
}

interface IActionItem {
	one: boolean;
	two: boolean;
	three: boolean;
	four: boolean;
	id?: number;
}

export interface Iobject {
	one?: string | number;
	two?: string | number;
	three?: string | number;
	four?: string | number;
	descriptionOne?: string | number;
	descriptionTwo?: string | number;
	descriptionThree?: string | number;
	descriptionFour?: string | number;
	default?: number;
	newValue?: number;
	border?: number;

	description?: string;
	value?: number | string;
}

export interface IMarketingAction {
	_id: string | number;
	id?: string | number;
	idCategory?: number;
	name: string[];
	price: Iobject | number[];
	rent: Iobject | number[];
	forEachEmployee?: Iobject | number[];
	impact: Kpi;
	preparationPrice?: Iobject | number[];
	lock?: any;
	action?: any;
	lvl?: number;
	count?: any;
	technician?: any;
	month?: number;
}

export interface IitemWithLvl {
	item: IMarketingAction;
	lvl: number;
}

export interface Kpi {
	efficiency?: Iobject;
	efficiencyReception?: Iobject ;
	efficiencyReceptionEthernet?: Iobject ;
	efficiencyReceptionTradeInNA?: Iobject ;
	efficiencyReceptionTradeIn?: Iobject ;
	efficiencySales?: Iobject ;

	traffic?: Iobject ;
	trafficForEvaluation?: Iobject ;
	trafficForEvaluationVisit?: Iobject ;
	trafficForEvaluationEthernet?: Iobject ;
	trafficForEvaluationCalls?: Iobject ;
	trafficForSales?: Iobject ;
	trafficForSalesVisit?: Iobject ;
	trafficForSalesEthernet?: Iobject ;
	trafficForSale?: Iobject ;
	trafficForSalesCalls?: Iobject ;

	profitToTrade?: Iobject ;
	spendingOnMarketing?: Iobject ;
	margin?: Iobject ;
	salesValue?: Iobject ;
	receptionValue?: Iobject ;
}

export interface MarketingState {
	marketing: IMarketingPack[];
	kpi: Kpi;
	effect: any;
	marketingActive: any;

	status?: "idle" | "loading" | "failed";
}
