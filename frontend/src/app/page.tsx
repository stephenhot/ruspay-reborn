"use client";

import Header from "@/components/header";
import AssetsCarousel from "@/components/assets/assets-carousel";
import AssetsList from "@/components/assets/assets-list";
import StepsManager from "@/components/steps/steps-manager";
import { useContext } from "react";
import { ApplicationContext } from "@/components/application-provider";

export default function Home() {
	const { apiData } = useContext(ApplicationContext);

	return (
			<>
				<Header/>

				<main className={ "space-y-10 lg:container-app lg:grid lg:grid-cols-2 lg:space-y-0 lg:gap-10" }>
					<section className={ "space-y-6 lg:grid lg:grid-cols-2 lg:space-y-0 lg:gap-10" }>
						<section className={ "container-app lg:w-full lg:px-0" }>
							<h2 className={ "font-bold mb-1.5 lg:mb-3" }>
								Отдаёте
							</h2>

							<AssetsCarousel assets={ apiData.banks }/>
							<AssetsList assets={ apiData.banks }/>
						</section>

						<section className={ "container-app lg:w-full lg:px-0" }>
							<h2 className={ "font-bold mb-1.5 lg:mb-3" }>
								Получаете
							</h2>

							<AssetsCarousel assets={ apiData.quotes }/>
							<AssetsList assets={ apiData.quotes }/>
						</section>
					</section>

					<section className={ "container-app lg:w-full lg:px-0" }>
						<StepsManager/>
					</section>
				</main>
			</>
	);
}
