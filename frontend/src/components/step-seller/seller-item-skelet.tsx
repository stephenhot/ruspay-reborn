export default function SellerItemSkelet() {
	return (
			<div
					className={ "border animate-pulse text-transparent rounded p-3 border-muted cursor-pointer select-none pointer-events-none" }>
				<div>
					<h3 className={ "font-bold leading-none bg-muted text-transparent rounded" }>
						Seller Name
					</h3>

					<div className={ "mt-2 text-xs flex items-center flex-wrap gap-x-2 gap-y-1" }>
						<p className={ "leading-none bg-muted rounded" }>
							Deals Count
						</p>

						<p className={ "leading-none bg-muted rounded" }>
							Deals Done
						</p>

						<p className={ "leading-none bg-muted rounded" }>
							Rating
						</p>
					</div>

					<div className={ "my-4" }>
						<h2 className={ "text-2xl bg-muted rounded leading-none font-bold" }>
							ExRate
						</h2>
					</div>

					<div className={ "mt-2 text-xs flex items-center flex-wrap gap-x-2 gap-y-1" }>
						<p className={ "leading-none bg-muted rounded" }>
							Reserve
						</p>

						<p className={ "leading-none bg-muted rounded" }>
							Limit Min
						</p>

						<p className={ "leading-none bg-muted rounded" }>
							Limit Max
						</p>
					</div>
				</div>
			</div>
	);
}