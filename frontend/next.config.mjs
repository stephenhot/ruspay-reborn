/** @type {import("next").NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				hostname: "cms",
				port: "8055",
				pathname: "/assets/*",
				protocol: "http",
			},
		],
	},
};

export default nextConfig;
