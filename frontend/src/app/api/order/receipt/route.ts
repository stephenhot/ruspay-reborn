import { createDirectus, rest, uploadFiles } from "@directus/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const orderReceipt = await req.formData();

	try {
		const client = createDirectus("http://cms:8055").with(rest());
		const data = await client.request(uploadFiles(orderReceipt));

		const { id } = data;

		return NextResponse.json(id);
	} catch (error) {
		return NextResponse.json({
			message: `Failed to create order: ${ JSON.stringify(error, null, 2) }`,
		});
	}
}