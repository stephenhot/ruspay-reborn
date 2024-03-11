"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { ApplicationContext } from "@/components/application-provider";
import { formatNumber, formatRequisites } from "@/lib/utils";
import dayjs from "dayjs";
import RequisitesManager from "@/components/step-payment/requisites-manager";

export default function StepPayment() {
	const { applicationData, stepReceipt } = useContext(ApplicationContext);

	return (
			<div className={ "border-2 border-dashed border-muted rounded p-4" }>
				<div className={ "mb-4" }>
					<h3 className={ "text-sm font-bold" }>
						Данные о платеже
					</h3>
				</div>

				<div className={ "space-y-5" }>
					<div className={ "space-y-2" }>
						<div className={ "bg-muted flex items-start space-x-2 p-3 rounded text-xs" }>
							<p className={ "w-full" }>
								{ applicationData.bank.name } хранит валюту продавца на эскроу-аккаунте
							</p>

							<svg className={ "w-4 h-4 flex-shrink-0" } width="28" height="28" viewBox="0 0 28 28" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_2124_89100)">
									<path className={ "fill-primary" }
									      d="M8.63672 24.9922H19.3594C21.082 24.9922 21.9961 24.0547 21.9961 22.2031V14.1289C21.9961 12.2773 21.082 11.3516 19.3594 11.3516H8.63672C6.91406 11.3516 6 12.2773 6 14.1289V22.2031C6 24.0547 6.91406 24.9922 8.63672 24.9922ZM8.05078 12.2539H9.91406V8.29297C9.91406 5.33984 11.8008 3.76953 13.9922 3.76953C16.1836 3.76953 18.0938 5.33984 18.0938 8.29297V12.2539H19.9453V8.55078C19.9453 4.14453 17.0625 2 13.9922 2C10.9336 2 8.05078 4.14453 8.05078 8.55078V12.2539Z"/>
								</g>
								<defs>
									<clipPath id="clip0_2124_89100">
										<rect width="15.9961" height="23.6133" fill="white" transform="translate(6 2)"/>
									</clipPath>
								</defs>
							</svg>
						</div>

						<div className={ "bg-muted flex items-start space-x-2 p-3 rounded text-xs" }>
							<p className={ "w-full" }>
								Продавец проверен { applicationData.bank.name }
							</p>

							<svg className={ "w-4 h-4 flex-shrink-0" } width="28" height="28" viewBox="0 0 28 28" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_2124_89100)">
									<path className={ "fill-primary" }
									      d="M8.63672 24.9922H19.3594C21.082 24.9922 21.9961 24.0547 21.9961 22.2031V14.1289C21.9961 12.2773 21.082 11.3516 19.3594 11.3516H8.63672C6.91406 11.3516 6 12.2773 6 14.1289V22.2031C6 24.0547 6.91406 24.9922 8.63672 24.9922ZM8.05078 12.2539H9.91406V8.29297C9.91406 5.33984 11.8008 3.76953 13.9922 3.76953C16.1836 3.76953 18.0938 5.33984 18.0938 8.29297V12.2539H19.9453V8.55078C19.9453 4.14453 17.0625 2 13.9922 2C10.9336 2 8.05078 4.14453 8.05078 8.55078V12.2539Z"/>
								</g>
								<defs>
									<clipPath id="clip0_2124_89100">
										<rect width="15.9961" height="23.6133" fill="white" transform="translate(6 2)"/>
									</clipPath>
								</defs>
							</svg>
						</div>
					</div>

					<div>
						<p className={ "text-sm text-center" }>
							Ордер создан, оплатите его в отведённое время
						</p>
					</div>

					<div className={ "bg-muted p-3 space-y-4 rounded text-xs lg:text-sm" }>
						<div className={ "grid grid-cols-2 items-center" }>
							<p>
								Реквизиты:
							</p>

							<div className={ "text-right space-y-1" }>
								<RequisitesManager/>
							</div>
						</div>

						<div className={ "grid grid-cols-2 items-center" }>
							<p>
								Сумма перевода:
							</p>

							<div className={ "text-right" }>
								<p>
									{ formatNumber(applicationData.baseAssetAmount) } ₽
								</p>
							</div>
						</div>

						<div className={ "grid grid-cols-2 items-center" }>
							<p>
								Банк получателя:
							</p>

							<div className={ "text-right flex items-center justify-end space-x-2" }>
								<Image className={ "object-contain object-center" }
								       src={ `http://cms:8055/assets/${ applicationData.bank.logo }` }
								       alt={ "Bank logo" } width={ 32 } height={ 32 }/>

								<p>
									{ applicationData.bank.name }
								</p>
							</div>
						</div>

						<div className={ "grid grid-cols-2 items-center" }>
							<p>
								Создан:
							</p>

							<div className={ "text-right" }>
								<p>
									{ dayjs().format("HH:mm") }
								</p>
							</div>
						</div>

						<div className={ "grid grid-cols-2 items-center" }>
							<p>
								Действителен:
							</p>

							<div className={ "text-right" }>
								<p>
									{ dayjs().add(30, "minutes").format("HH:mm") }
								</p>
							</div>
						</div>
					</div>

					<div className={ "bg-muted p-3 rounded text-xs" }>
						<p>
							После перевода средств, нажмите кнопку &quot;Оплачено, далее&quot;
						</p>
					</div>

					<div className={ "flex items-center justify-between" }>
						<Button variant={ "ghost" } type={ "button" }>
							Отменить
						</Button>

						<Button variant={ "default" } type={ "button" } onClick={ () => stepReceipt() }>
							Оплачено, далее
						</Button>
					</div>
				</div>
			</div>
	);
}