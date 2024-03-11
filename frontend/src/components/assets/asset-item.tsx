"use client";

import { useContext } from "react";
import { ApplicationContext } from "@/components/application-provider";
import { BankType } from "@/types/application.type";
import Image from "next/image";

export default function AssetItem({ asset }: { asset: BankType }) {
	const { chooseBank, applicationData } = useContext(ApplicationContext);

	const isActive = (): boolean => {
		return applicationData.bank?.id === asset.id || applicationData.quote?.id === asset.id;
	};

	return (
			<div
					className={ "relative border rounded pl-3 pr-8 lg:px-3 py-2 flex items-center border-muted space-x-3 min-w-40 cursor-pointer" }
					onClick={ () => {
						if (asset.id !== "dollar-usd-quote") {
							chooseBank(asset);
						}
					} }>
				<div className={ "w-8 h-8 bg-muted-foreground rounded flex items-center justify-center overflow-hidden p-1" }>
					<Image className={ "w-auto h-auto object-contain object-center rounded" }
					       src={ `http://cms:8055/assets/${ asset.logo }` }
					       alt={ "Bank logo" } width={ 32 } height={ 32 }/>
				</div>

				{
						isActive() && (
								<svg className={ "absolute w-4 h-4 top-1 right-1 lg:top-2 lg:right-2 text-primary" } width="28" height="28" viewBox="0 0 28 28"
								     fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill="currentColor"
									      d="M13.9531 25.9062C20.4922 25.9062 25.9062 20.4805 25.9062 13.9531C25.9062 7.41406 20.4805 2 13.9414 2C7.41406 2 2 7.41406 2 13.9531C2 20.4805 7.42578 25.9062 13.9531 25.9062Z"/>
									<path className={ "text-background" } fill={ "currentColor" }
									      d="M12.6406 19.6836C12.2422 19.6836 11.9141 19.5195 11.6094 19.1094L8.66797 15.5C8.49219 15.2656 8.38672 15.0078 8.38672 14.7383C8.38672 14.2109 8.79688 13.7773 9.32422 13.7773C9.66406 13.7773 9.92188 13.8828 10.2148 14.2695L12.5938 17.3398L17.5977 9.30078C17.8203 8.94922 18.125 8.76172 18.4297 8.76172C18.9453 8.76172 19.4258 9.11328 19.4258 9.66406C19.4258 9.92188 19.2734 10.1914 19.1328 10.4375L13.625 19.1094C13.3789 19.4961 13.0391 19.6836 12.6406 19.6836Z"/>
								</svg>
						)
				}

				<div className={ "space-y-1" }>
					<p className={ "text-sm font-bold leading-none" }>
						{ asset.name }
					</p>
				</div>
			</div>
	);
}