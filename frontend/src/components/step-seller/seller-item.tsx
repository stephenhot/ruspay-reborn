"use client";

import { SellerType } from "@/types/application.type";
import { useContext } from "react";
import { ApplicationContext } from "@/components/application-provider";
import { formatNumber } from "@/lib/utils";

export default function SellerItem({ seller }: { seller: SellerType }) {
	const { apiData, chooseSeller } = useContext(ApplicationContext);

	const calculateExchangeRate = (): number => {
		return apiData.exchangeRate + ((apiData.exchangeRate / 100) * (seller.id / 2));
	};

	return (
			<div
					className={ "relative border rounded p-3 border-muted cursor-pointer select-none hover:border-muted-foreground" }
					onClick={ () => {
						chooseSeller(seller, calculateExchangeRate());
					} }>
				<svg className={ "absolute w-5 h-5 top-2 right-2" } width="28" height="28" viewBox="0 0 28 28" fill="none"
				     xmlns="http://www.w3.org/2000/svg">
					<path className={ "text-primary" }
					      d="M13.5859 25.6602C13.7734 25.6602 14.0664 25.5898 14.3594 25.4375C21.0273 21.9453 23.1719 20.1992 23.1719 15.9922V7.15625C23.1719 5.94922 22.6562 5.5625 21.6719 5.15234C20.3008 4.58984 15.918 2.99609 14.5586 2.52734C14.2422 2.42188 13.9141 2.36328 13.5859 2.36328C13.2578 2.36328 12.9297 2.43359 12.625 2.52734C11.2539 2.97266 6.87109 4.60156 5.5 5.15234C4.52734 5.55078 4 5.94922 4 7.15625V15.9922C4 20.1992 6.26172 21.7461 12.8125 25.4375C13.1172 25.6016 13.3984 25.6602 13.5859 25.6602Z"
					      fill="currentColor"/>
					<path className={ "text-background" } fill="currentColor"
					      d="M9.22656 18.3594V13.5547C9.22656 12.6992 9.57812 12.2773 10.2813 12.2305V10.8125C10.2813 8.58594 11.6172 7.08594 13.5859 7.08594C15.5547 7.08594 16.8906 8.58594 16.8906 10.8125V12.2305C17.5938 12.2773 17.9453 12.6992 17.9453 13.5547V18.3594C17.9453 19.2617 17.5469 19.6836 16.7148 19.6836H10.457C9.625 19.6836 9.22656 19.2617 9.22656 18.3594ZM11.5469 12.2188H15.625V10.6719C15.625 9.25391 14.8047 8.31641 13.5859 8.31641C12.3672 8.31641 11.5469 9.25391 11.5469 10.6719V12.2188Z"/>
				</svg>

				<div className={ "h-full flex flex-col" }>
					<h3 className={ "font-bold" }>
						{ seller.nickname }
					</h3>

					<div className={ "flex-grow mt-2" }>
						<div className={ "text-xs text-muted-foreground flex items-start flex-wrap gap-x-2" }>
							<p>
								Сделок: { seller.deals }
							</p>

							<p>
								Завершено: { formatNumber(seller.dealsDone / seller.deals * 100) }%
							</p>

							<p>
								Рейтинг: { formatNumber(seller.rating) }%
							</p>
						</div>
					</div>

					<div className={ "my-4" }>
						<h2 className={ "text-2xl font-bold" }>
							{ formatNumber(calculateExchangeRate()) } <span className={ "text-sm" }>₽</span>
						</h2>
					</div>

					<div className={ "text-xs text-muted-foreground flex items-center flex-wrap gap-x-2 gap-y-1" }>
						<p className={ "w-full" }>
							Баланс: ${ formatNumber(seller.balance) }
						</p>

						<p>
							Мин: ${ formatNumber(seller.minLimit) }
						</p>

						<p>
							Макс: ${ formatNumber(seller.maxLimit) }
						</p>
					</div>
				</div>
			</div>
	);
}