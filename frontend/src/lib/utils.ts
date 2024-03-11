import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatNumber(number: number | string) {
	const formatter = new Intl.NumberFormat("ru-RU", {
		style: "decimal",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return formatter.format(+number);
}

export function formatRequisites(requisites: string) {
	requisites = requisites.replaceAll(/\D/g, "");

	if (requisites.length === 16) {
		const groups = requisites.match(/(\d{1,4})/g);

		if (!groups) {
			return requisites;
		}

		return groups.join(" ");
	}

	if (requisites.length === 11) {
		requisites = requisites[0] === "+" ? requisites : `+${ requisites }`;

		// '+7 (123) 456-79-01'
		return `${ requisites.slice(0, 2) } (${ requisites.slice(2, 5) }) ${ requisites.slice(5, 8) }-${ requisites.slice(8, 10) }-${ requisites.slice(10) }`;
	}
}
