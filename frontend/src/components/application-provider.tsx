"use client";

import { createContext, useEffect, useState } from "react";
import { ApiDataType, ApplicationDataType, BankType, SellerType } from "@/types/application.type";
import { v4 } from "uuid";
import { toast } from "@/components/ui/use-toast";

export const ApplicationContext = createContext<any>({});

export default function ApplicationProvider({ children }: { children: React.ReactNode }) {
	const [apiData, setApiData] = useState<ApiDataType>({
		banks: [],
		quotes: [
			{
				id: "dollar-usd-quote",
				status: "published",
				sort: 0,
				logo: "170c0d8b-26ae-43b5-8c60-3c4b142de0fc",
				name: "Доллар США",
			},
		],
		sellers: [],
		exchangeRate: 90,
	});
	const [applicationData, setApplicationData] = useState<ApplicationDataType>({
		step: "init",
		bank: undefined,
		quote: {
			id: "dollar-usd-quote",
			status: "published",
			sort: 0,
			logo: "170c0d8b-26ae-43b5-8c60-3c4b142de0fc",
			name: "Доллар США",
		},
		seller: undefined,
		requisites: undefined,
		baseAssetAmount: 0,
		quoteAssetAmount: 0,
		exchangeRate: 0,
		orderId: undefined,
		receiptId: undefined,
	});

	// API Fetches
	useEffect(() => {
		fetch("/api/banks")
				.then((res) => {
					if (res.ok) {
						return res.json();
					}

					throw new Error(res.statusText);
				})
				.then((banks) => {
					fetch("/api/exchange-rate")
							.then((res) => res.json())
							.then((exchangeRate) => {
								setApiData({
									...apiData,
									banks,
									exchangeRate: parseFloat(exchangeRate),
								});
							})
							.catch(() => {
								toast({
									variant: "destructive",
									title: "Ошибка при выполнении операции",
									description: "Обновите страницу и попробуйте снова",
								});
							});
				});
	}, []);
	useEffect(() => {
		if (applicationData.bank) {
			fetch("/api/sellers", {
				method: "POST",
				body: JSON.stringify({ bank: applicationData.bank.id }),
			})
					.then((res) => {
						if (res.ok) {
							return res.json();
						}

						throw new Error(res.statusText);
					})
					.then((res) => {
						setApiData({
							...apiData,
							sellers: res,
						});
					})
					.catch(() => {
						toast({
							variant: "destructive",
							title: "Ошибка при выполнении операции",
							description: "Обновите страницу и попробуйте снова",
						});
					});
		}
	}, [applicationData.bank]);
	useEffect(() => {
		if (applicationData.seller) {
			fetch("/api/requisites", {
				method: "POST",
				body: JSON.stringify({ seller: applicationData.seller.id }),
			})
					.then((res) => {
						if (res.ok) {
							return res.json();
						}

						throw new Error(res.statusText);
					})
					.then((res) => {
						setApplicationData({
							...applicationData,
							requisites: res,
						});
					})
					.catch(() => {
						toast({
							variant: "destructive",
							title: "Ошибка при выполнении операции",
							description: "Обновите страницу и попробуйте снова",
						});
					});
		}
	}, [applicationData.seller]);

	// Steps Logic
	const chooseBank = (bank: BankType) => {
		setApplicationData({
			...applicationData,
			step: "sellers",
			bank,
		});
	};
	const chooseSeller = (seller: SellerType, exchangeRate: number) => {
		setApplicationData({
			...applicationData,
			step: "form",
			exchangeRate,
			seller,
		});
	};
	const setBaseAssetAmount = (baseAssetAmount: number | string) => {
		setApplicationData({
			...applicationData,
			baseAssetAmount: +baseAssetAmount,
			quoteAssetAmount: +baseAssetAmount / applicationData.exchangeRate,
		});
	};
	const setQuoteAssetAmount = (quoteAssetAmount: number | string) => {
		setApplicationData({
			...applicationData,
			quoteAssetAmount: +quoteAssetAmount,
			baseAssetAmount: +quoteAssetAmount * applicationData.exchangeRate,
		});
	};
	const stepPayment = () => {
		setApplicationData({
			...applicationData,
			step: "payment",
		});
	};
	const stepReceipt = () => {
		createOrder();
	};
	const createOrder = () => {
		fetch("/api/order", {
			method: "POST",
			body: JSON.stringify({
				exchangeRate: applicationData.exchangeRate,
				baseAmount: applicationData.baseAssetAmount,
				quoteAmount: applicationData.quoteAssetAmount,
			}),
		})
				.then((res) => {
					if (res.ok) {
						return res.json();
					}

					throw new Error(res.statusText);
				})
				.then((res) => {
					setApplicationData({
						...applicationData,
						step: "receipt",
						orderId: res.id,
					});
				})
				.catch(() => {
					toast({
						variant: "destructive",
						title: "Ошибка при выполнении операции",
						description: "Обновите страницу и попробуйте снова",
					});
				});
	};
	const uploadOrderReceipt = async (receipt: any) => {
		const orderReceipt = new FormData();
		orderReceipt.append("folder", "cdb5337f-d7bc-41d2-b6ef-09fc5fa95455");
		orderReceipt.append("title", v4());
		orderReceipt.append("file", receipt);

		return fetch("/api/order/receipt", {
			method: "POST",
			body: orderReceipt,
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}

			throw new Error(res.statusText);
		})
				.then((data) => {
					setApplicationData({
						...applicationData,
						receiptId: data,
					});

					fetch("/api/order/assign-receipt", {
						method: "POST",
						body: JSON.stringify({ orderId: applicationData.orderId, receiptId: data }),
					}).then(res => {
						if (res.ok) {
							return res.json();
						}

						throw new Error(res.statusText);
					})
							.then(() => {
								setApplicationData({
									step: "init",
									bank: undefined,
									quote: {
										id: "dollar-usd-quote",
										status: "published",
										sort: 0,
										logo: "170c0d8b-26ae-43b5-8c60-3c4b142de0fc",
										name: "Доллар США",
									},
									seller: undefined,
									requisites: undefined,
									baseAssetAmount: 0,
									quoteAssetAmount: 0,
									exchangeRate: 0,
									orderId: undefined,
									receiptId: undefined,
								});

								toast({
									title: `Ордер создан #${ applicationData.orderId?.slice(0, 8) }`,
									description: "Ожидайте проверки оператора, после этого Ваш баланс будет пополнен",
								});
							})
							.catch(() => {
								toast({
									variant: "destructive",
									title: "Ошибка при выполнении операции",
									description: "Обновите страницу и попробуйте снова",
								});
							});
				})
				.catch(() => {
					toast({
						variant: "destructive",
						title: "Ошибка при выполнении операции",
						description: "Обновите страницу и попробуйте снова",
					});
				});
	};

	return (
			<ApplicationContext.Provider
					value={ {
						apiData,
						applicationData,
						chooseBank,
						chooseSeller,
						setBaseAssetAmount,
						setQuoteAssetAmount,
						stepPayment,
						stepReceipt,
						uploadOrderReceipt,
					} }>
				{ children }
			</ApplicationContext.Provider>
	);
}