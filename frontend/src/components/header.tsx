import Image from "next/image";

export default function Header() {
	return (
			<header className={ "py-6 lg:py-8" }>
				<div className={ "container-app lg:flex lg:items-center lg:justify-between" }>
					<div className={ "grid grid-cols-2 items-center gap-x-10 lg:flex" }>
						<Image className={ "w-10/12 lg:h-8 lg:w-auto" } src={ "/logo-sbp.svg" } alt={ "Логотип" } width={ 120 } height={ 60 }/>

						<div className={ "flex flex-col items-end text-right space-y-2 lg:space-y-1" }>
							<p className={ "text-[10px] whitespace-nowrap -mt-6 text-muted-foreground" }>
								Официальный партнер
							</p>

							<Image className={ "block w-10/12 lg:w-auto lg:h-7" } src={ "/commex-logo.svg" } alt={ "Логотип" } width={ 120 }
							       height={ 32 }/>
						</div>
					</div>

					<div className={ "mt-4 lg:mt-0" }>
						<p className={ "text-xs font-bold text-muted-foreground" }>
							© 2024 Система быстрых платежей. АО «НСПК»
						</p>
					</div>
				</div>
			</header>
	);
}