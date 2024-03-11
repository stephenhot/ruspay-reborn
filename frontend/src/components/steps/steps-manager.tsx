"use client";

import { useContext } from "react";
import { ApplicationContext } from "@/components/application-provider";
import StepInit from "@/components/steps/step-init";
import StepSellers from "@/components/steps/step-sellers";
import StepForm from "@/components/steps/step-form";
import StepPayment from "@/components/steps/step-payment";
import StepReceipt from "@/components/steps/step-receipt";

export default function StepsManager() {
	const { applicationData } = useContext(ApplicationContext);

	return (
			<>
				{ applicationData.step === "init" && <StepInit/> }
				{ applicationData.step === "sellers" && <StepSellers/> }
				{ applicationData.step === "form" && <StepForm/> }
				{ applicationData.step === "payment" && <StepPayment/> }
				{ applicationData.step === "receipt" && <StepReceipt/> }
			</>
	);
}