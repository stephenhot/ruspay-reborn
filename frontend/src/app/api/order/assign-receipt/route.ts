import { createDirectus, rest, updateItem } from "@directus/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { orderId, receiptId } = await req.json();

	try {
		const client = createDirectus("http://cms:8055").with(rest());
		const data = await client.request(
				updateItem("orders", orderId, {
					receipt: receiptId,
				}),
		);

		return NextResponse.json({ ...data });
	} catch (error) {
		return NextResponse.json({
			message: `Failed to assign receipt: ${ JSON.stringify(error, null, 2) }`,
		}, {
			status: 400,
		});
	}
}