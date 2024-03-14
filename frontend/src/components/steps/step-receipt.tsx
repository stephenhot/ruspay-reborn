"use client";

import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { ApplicationContext } from "@/components/application-provider";
import { cn } from "@/lib/utils";

export default function StepReceipt() {
	const [isLoading, setIsLoading] = useState(false);
	const { uploadOrderReceipt, applicationData } = useContext(ApplicationContext);

	return (
			<div className={ "border-2 border-dashed border-muted rounded p-4" }>
				<div className={ "mb-4" }>
					<h3 className={ "text-sm font-bold" }>
						Подтверждение платежа
					</h3>
				</div>

				<div className={ cn(
						isLoading ? "opacity-50 pointer-events-none cursor-not-allowed" : "",
						applicationData.receiptId ? "pointer-events-none" : "",
						"space-y-5 cursor-pointer",
				) }>
					<div className={ "bg-muted relative p-3 py-5 rounded text-center flex items-center justify-center flex-col" }>
						<svg className={ "w-8 h-8 mb-2" } width="35" height="30" viewBox="0 0 35 30" fill="none"
						     xmlns="http://www.w3.org/2000/svg">
							<path
									d="M3.70312 23.5195C2.56641 23.5195 1.88672 22.8398 1.88672 21.6914V20.9766L5.48438 17.8359C6 17.3789 6.5625 17.1445 7.07812 17.1445C7.65234 17.1445 8.25 17.3789 8.76562 17.8594L11.0039 19.875L16.6055 14.9062C17.1797 14.3906 17.8242 14.1562 18.4922 14.1562C19.1367 14.1562 19.8047 14.4023 20.3555 14.918L25.7461 19.9102V21.7148C25.7461 22.8398 25.0547 23.5195 23.9414 23.5195H3.70312ZM8.78906 14.9062C7.19531 14.9062 5.89453 13.6055 5.89453 12.0117C5.89453 10.4297 7.19531 9.11719 8.78906 9.11719C10.3711 9.11719 11.6719 10.4297 11.6719 12.0117C11.6719 13.6055 10.3711 14.9062 8.78906 14.9062ZM3.67969 25.3945H23.9531C26.4141 25.3945 27.6328 24.1875 27.6328 21.7734V7.45312C27.6328 5.03906 26.4141 3.82031 23.9531 3.82031H3.67969C1.23047 3.82031 0 5.03906 0 7.45312V21.7734C0 24.1875 1.23047 25.3945 3.67969 25.3945Z"
									fill="black" className={ "fill-primary" }/>
							<path
									d="M26.707 29.2148C30.8203 29.2148 34.2539 25.7812 34.2539 21.668C34.2539 17.5195 30.8438 14.1094 26.707 14.1094C22.5586 14.1094 19.1484 17.5195 19.1484 21.668C19.1484 25.8164 22.5469 29.2148 26.707 29.2148Z"
									fill="white" className={ "fill-background" }/>
							<path
									d="M26.707 27.6211C29.9297 27.6211 32.6602 24.9141 32.6602 21.668C32.6602 18.3984 29.9648 15.7148 26.707 15.7148C23.4375 15.7148 20.7539 18.3984 20.7539 21.668C20.7539 24.9375 23.4375 27.6211 26.707 27.6211Z"
									fill="black" className={ "fill-primary" }/>
							<path
									d="M26.719 25.418C26.5197 25.418 26.3557 25.3477 26.1564 25.1484L23.133 22.3242C22.9455 22.1719 22.8752 22.0078 22.8635 21.7734C22.84 21.375 23.1682 21.082 23.5783 21.082C23.7775 21.0703 23.9768 21.1758 24.1174 21.3281L25.2307 22.4531L26.0041 23.2383L25.9455 21.75V18.6328C25.9455 18.2227 26.2971 17.8828 26.719 17.8828C27.1408 17.8828 27.4924 18.2227 27.4924 18.6328V21.75L27.4338 23.2383L28.1955 22.4531L29.3205 21.3281C29.4611 21.1758 29.6486 21.0938 29.8479 21.082C30.258 21.0586 30.5627 21.375 30.5627 21.7734C30.5627 21.9961 30.4807 22.1719 30.3049 22.3242L27.2697 25.1484C27.0705 25.3242 26.9182 25.418 26.719 25.418Z"
									fill="white" className={ "fill-background" }/>
						</svg>

						<h3 className={ "font-bold mb-1" }>
							Кликните для загрузки
						</h3>

						<p className={ "text-xs text-muted-foreground max-w-xs" }>
							Можно загрузить только документы формата: PNG, JPG, PDF (Макс. размер: 4МБ)
						</p>

						<form>
							<input className={ "absolute top-0 left-0 w-full h-full opacity-0" } accept={ "image/*, application/pdf" }
							       title={ "" } name={ "file" } type={ "file" }
							       onChange={ (e) => {
								       if (e.target.files) {
									       setIsLoading(true);
									       uploadOrderReceipt(e.target.files[0]).then(() => setIsLoading(false));
								       }
							       } }/>
						</form>
					</div>

					<div className={ "flex items-center justify-between" }>
						<Button variant={ "ghost" } type={ "button" }>
							Отменить
						</Button>

						<Button variant={ "default" } type={ "button" }>
							Загрузить
						</Button>
					</div>
				</div>
			</div>
	);
}