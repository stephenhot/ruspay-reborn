import { createDirectus, readItems, rest } from "@directus/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const data = await req.json();
	const { seller } = data;

	if (seller) {
		try {
			const client = createDirectus("http://cms:8055").with(rest());

			const data = await client.request(
					readItems("requisites", {
						filter: {
							seller: {
								sellers_id: {
									"_in": seller,
								},
							},
						},
					}),
			);

			return NextResponse.json(data[0]);
		} catch (error) {
			return NextResponse.json({
				message: `Failed to fetch data from API: ${ JSON.stringify(error, null, 2) }`,
			});
		}
	} else {
		return NextResponse.json({
			message: "Select seller",
		});
	}
}