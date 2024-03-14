import { createDirectus, readItems, rest } from "@directus/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const data = await req.json();
	const { bank } = data;

	if (bank) {
		try {
			const client = createDirectus("http://cms:8055").with(rest());

			const data = await client.request(
					readItems("sellers", {
						filter: {
							banks: {
								banks_id: {
									"_in": bank,
								},
							},
						},
					}),
			);

			return NextResponse.json(data);
		} catch (error) {
			return NextResponse.json({
				message: `Failed to fetch data from API: ${ JSON.stringify(error, null, 2) }`,
			}, {
				status: 400,
			});
		}
	} else {
		return NextResponse.json({
			message: "Select bank",
		});
	}
}