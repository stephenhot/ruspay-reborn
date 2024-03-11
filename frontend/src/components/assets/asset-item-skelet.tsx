export default function AssetItemSkelet() {
	return (
			<div
					className={ "border rounded px-3 py-2 text-transparent animate-pulse flex items-center border-muted space-x-3 min-w-40 select-none pointer-events-none" }>
				<div className={ "w-8 h-8 bg-muted-foreground rounded" }>

				</div>

				<div className={ "space-y-1" }>
					<p className={ "text-sm bg-muted leading-none rounded font-bold" }>
						Asset Name
					</p>

					<p className={ "text-xs bg-muted leading-none rounded font-semibold" }>
						RUB
					</p>
				</div>
			</div>
	);
}