"use client";

import { formatRequisites } from "@/lib/utils";
import { useContext } from "react";
import { ApplicationContext } from "@/components/application-provider";
import Image from "next/image";

export default function RequisitesManager() {
	const { applicationData } = useContext(ApplicationContext);
	const { requisites } = applicationData;

	if (requisites.type === "qrCode") {
		return (
				<Image className={ "ml-auto mr-0 object-contain object-center w-32 h-32" } alt={ "" } width={ 128 } height={ 128 }
				       src={ `http://cms:8055/assets/${ requisites.qrCode }` }/>
		);
	}

	if (requisites.type === "card" || requisites.type === "phone") {
		return (
				<>
					<p>
						{ formatRequisites(requisites.recipientNumber) }
					</p>

					<p>
						{ requisites.recipientName }
					</p>
				</>
		);
	}

	return (
			<p>
				{ JSON.stringify(requisites, null, 2) }
			</p>
	);
}