import AssetItem from "@/components/assets/asset-item";
import { BankType } from "@/types/application.type";
import AssetItemSkelet from "@/components/assets/asset-item-skelet";

export default function AssetsList({ assets }: { assets: BankType[] }) {
	return (
			<div className={ "hidden lg:block space-y-4" }>
				{
						assets.length <= 0 && (
								<>
									<AssetItemSkelet/>
									<AssetItemSkelet/>
									<AssetItemSkelet/>
									<AssetItemSkelet/>
									<AssetItemSkelet/>
								</>
						)
				}

				{ assets.length > 0 && assets.map(asset => (
						<AssetItem asset={ asset } key={ asset.id }/>
				)) }
			</div>
	);
}