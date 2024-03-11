export type StepsType = "init" | "sellers" | "form" | "payment" | "receipt"

export type ExchangeRateType = {
	id: string
	value: number
}

export type BankType = {
	id: string
	status: "published" | "draft"
	sort: number
	logo: string
	name: string
}

export type SellerType = {
	id: number
	sort: number
	nickname: string
	rating: number
	deals: number
	dealsDone: number
	balance: number
	banks: BankType
	minLimit: number
	maxLimit: number
}

export type RequisitesType = {
	id: string
	type: "qrCode"
	qrCode: string
	bank: BankType
	seller: SellerType
} | {
	id: string
	type: "phone" | "card"
	recipientName: string
	recipientNumber: string
	bank: BankType
	seller: SellerType
}

export type ApiDataType = {
	banks?: BankType[],
	quotes?: BankType[],
	sellers?: SellerType[],
	exchangeRate?: number,
}

export type ApplicationDataType = {
	step: StepsType,
	bank?: BankType,
	quote?: BankType,
	seller?: SellerType,
	requisites?: RequisitesType,
	baseAssetAmount: number,
	quoteAssetAmount: number,
	exchangeRate: number,
	orderId?: string,
	receiptId?: string,
}