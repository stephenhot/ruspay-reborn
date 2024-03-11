"use client";

import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { useContext } from "react";
import { ApplicationContext } from "@/components/application-provider";

export default function StepForm() {
	const { applicationData, setBaseAssetAmount, setQuoteAssetAmount, stepPayment } = useContext(ApplicationContext);

	return (
			<div className={ "border-2 border-dashed border-muted rounded p-4" }>
				<div className={ "mb-4" }>
					<h3 className={ "text-sm font-bold" }>
						Данные о платеже
					</h3>
				</div>

				<div className={ "space-y-5" }>
					<div className={ "bg-muted p-3 rounded text-xs" }>
						<p>
							Заявка обрабатывается оператором в ручном режиме
						</p>
					</div>

					<form className={ "lg:grid lg:grid-cols-3" } action="">
						<label className={ "block space-y-1" } htmlFor="baseAssetInput">
							<p className={ "text-xs" }>
								Вы отдаете
							</p>

							<div className={ "relative" }>
								<p className={ "absolute top-1/2 right-3 text-muted-foreground -translate-y-1/2 leading-none" }>
									₽
								</p>

								<input className={ "w-full bg-muted placeholder:text-muted-foreground rounded px-4 py-2 pr-8" }
								       type="number" value={ applicationData.baseAssetAmount } id={ "baseAssetInput" }
								       onChange={ (e) => setBaseAssetAmount(e.target.value) }/>
							</div>

							<div className={ "h-6 text-xs text-muted-foreground lg:h-8" }>
								<p>
									Мин: { formatNumber(applicationData.seller.minLimit * applicationData.exchangeRate) }₽
								</p>

								<p>
									Макс: { formatNumber(applicationData.seller.maxLimit * applicationData.exchangeRate) }₽
								</p>
							</div>
						</label>

						<div className={ "-mt-6 -mb-5 flex flex-col items-center lg:my-0 lg:flex-row lg:-mt-4" }>
							<div
									className={ "h-10 flex-grow border-r-2 border-dashed border-muted lg:border-x-0 lg:w-10 lg:h-px lg:border-t-2" }></div>

							<h2 className={ "text-center text-2xl whitespace-nowrap font-bold my-2 lg:my-0 lg:mx-2 lg:text-xl" }>
								{ formatNumber(applicationData.exchangeRate) } <span className={ "text-sm lg:text-xs" }>₽</span>
							</h2>

							<div
									className={ "h-10 w-2 flex-grow border-x-2 border-dashed border-muted lg:border-x-0 lg:h-3 lg:w-10 lg:border-y-2" }></div>
						</div>

						<label className={ "block space-y-1" } htmlFor="quoteAssetAmount">
							<p className={ "text-xs" }>
								Получаете
							</p>

							<div className={ "relative" }>
								<p className={ "absolute top-1/2 right-3 text-muted-foreground -translate-y-1/2 leading-none" }>
									$
								</p>

								<input className={ "w-full bg-muted placeholder:text-muted-foreground rounded px-4 py-2 pr-8" }
								       type="number" value={ applicationData.quoteAssetAmount } id={ "quoteAssetAmount" }
								       onChange={ (e) => setQuoteAssetAmount(e.target.value) }/>
							</div>

							<div className={ "h-6 text-xs text-muted-foreground lg:h-8" }>
								<p>
									Мин: { formatNumber(applicationData.seller.minLimit) }$
								</p>

								<p>
									Макс: { formatNumber(applicationData.seller.maxLimit) }$
								</p>
							</div>
						</label>
					</form>

					<div className={ "flex items-center justify-between" }>
						<Button variant={ "ghost" } type={ "button" }>
							Назад
						</Button>

						<Button variant={ "default" } type={ "button" } onClick={ () => stepPayment() }>
							Далее
						</Button>
					</div>
				</div>
			</div>
	);
}