import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import AssetItem from "@/components/assets/asset-item";
import { BankType } from "@/types/application.type";
import AssetItemSkelet from "@/components/assets/asset-item-skelet";

export default function AssetsCarousel({ assets }: { assets: BankType[] | [] }) {
	return (
			<Carousel className={ "-mx-4 lg:hidden" } opts={ {
				dragFree: true,
			} }>
				<CarouselContent className={ "select-none" }>
					{
							assets.length <= 0 && (
									<>
										<CarouselItem>
											<AssetItemSkelet/>
										</CarouselItem>

										<CarouselItem>
											<AssetItemSkelet/>
										</CarouselItem>

										<CarouselItem>
											<AssetItemSkelet/>
										</CarouselItem>

										<CarouselItem>
											<AssetItemSkelet/>
										</CarouselItem>
									</>
							)
					}

					{
							assets.length > 0 && assets.map(asset => (
									<CarouselItem key={ asset.id }>
										<AssetItem asset={ asset }/>
									</CarouselItem>
							))
					}
				</CarouselContent>
			</Carousel>
	);
}