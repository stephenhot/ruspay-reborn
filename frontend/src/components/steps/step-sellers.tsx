"use client";

import SellerItem from "@/components/step-seller/seller-item";
import { useContext } from "react";
import { ApplicationContext } from "@/components/application-provider";
import { SellerType } from "@/types/application.type";
import SellerItemSkelet from "@/components/step-seller/seller-item-skelet";

export default function StepSellers() {
	const { apiData } = useContext(ApplicationContext);
	const { sellers } = apiData;

	return (
			<div className={ "border-2 border-dashed border-muted rounded p-4" }>
				<div className={ "mb-4" }>
					<h3 className={ "text-sm font-bold" }>
						Выберите продавца
					</h3>
				</div>

				<div className={ "grid grid-cols-1 gap-4 lg:grid-cols-2" }>
					{
							sellers.length <= 0 && (
									<>
										<SellerItemSkelet/>
										<SellerItemSkelet/>
										<SellerItemSkelet/>
										<SellerItemSkelet/>
										<SellerItemSkelet/>
									</>
							)
					}

					{
							sellers.length > 0 && sellers.map((seller: SellerType) => (
									<SellerItem key={ seller.id } seller={ seller }/>
							))
					}
				</div>
			</div>
	);
}