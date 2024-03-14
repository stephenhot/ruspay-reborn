import { createDirectus, createItem, rest } from "@directus/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const order = await req.json();

	try {
		const client = createDirectus("http://cms:8055").with(rest());

		const data = await client.request(
				createItem("orders", order),
		);

		return NextResponse.json({ ...data });
	} catch (error) {
		return NextResponse.json({
			message: `Failed to create order: ${ JSON.stringify(error, null, 2) }`,
		}, {
			status: 400
		});
	}
}