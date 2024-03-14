import { createDirectus, readItems, rest } from "@directus/sdk";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const client = createDirectus("http://cms:8055").with(rest());

		const data = await client.request(
				readItems("banks"),
		);

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({
			message: `Failed to fetch data from API: ${ JSON.stringify(error, null, 2) }`,
		}, {
			status: 400,
		});
	}
}