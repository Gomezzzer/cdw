import { routes } from "@/config/routes";
import Link from "next/link"; 
import { ClassifiedWithImages, MultiStepFormEnum } from "@/config/types";  
import  Image  from 'next/image';
import { HTMLParser } from "@/components/shared/html-parser"; // Adjust the import path as needed
import { GaugeCircle, Cog, Fuel, Paintbrush2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FavouriteButton } from "./favorite-button";

/* Removed local MultiStepFormEnum definition; now imported from "@/config/types" */

interface ClassifiedCardProps {
    classified: ClassifiedWithImages; 
}

function formatNumber(
    num: number | null,
    options?: Intl.NumberFormatOptions,
) {
    if (!num) return '0';

    return new Intl.NumberFormat("en-GB", options).format(num);
}
// Add this enum definition if not already imported from elsewhere
// Remove local OdoUnit enum and use the Prisma one
import { $Enums } from "@prisma/client";

function formatOdometerUnit(unit: $Enums.OdoUnit) {
    return unit === $Enums.OdoUnit.MILES ? "mi" : "km";
}
 
function formatTransmission(transmission: $Enums.Transmission) {
    return transmission === $Enums.Transmission.AUTOMATIC ? "Automatic" : "Manual";
}  

function formatFuelType(fuelType: $Enums.FuelType) {
    switch (fuelType) {
        case $Enums.FuelType.PETROL:
            return "Petrol";
        case $Enums.FuelType.DIESEL:
            return "Diesel";
        case $Enums.FuelType.ELECTRIC:
            return "Electric";
        case $Enums.FuelType.HYBRID:
            return "Hybrid";
        default:
            return "Unknown";
    }   
}

function formatColour(colour: $Enums.Colour) {
    switch (colour) {
        case $Enums.Colour.RED:
            return "Red";
        case $Enums.Colour.BLUE:
            return "Blue";
        case $Enums.Colour.GREEN:
            return "Green";
        case $Enums.Colour.BLACK:
            return "Black";
        case $Enums.Colour.WHITE:
            return "White";
        case $Enums.Colour.SILVER:
            return "Silver";
        case $Enums.Colour.YELLOW:
            return "Yellow";
        case $Enums.Colour.GREY:
            return "Gray";
        case $Enums.Colour.ORANGE:
            return "Orange";
        case $Enums.Colour.PURPLE:
            return "Purple";
        case $Enums.Colour.PINK:
            return "Pink";
        default:
            return "Unknown";
    }
}
  
const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
	return [
		{
			id: "odoReading",
			icon: <GaugeCircle className="w-4 h-4" />,
			value: `${formatNumber(classified.odoReading)} ${formatOdometerUnit(classified.odoUnit)}`,
		},
		{
			id: "transmission",
			icon: <Cog className="w-4 h-4" />,
			value: classified?.transmission
				? formatTransmission(classified?.transmission)
				: null,
		},
		{
			id: "fuelType",
			icon: <Fuel className="w-4 h-4" />,
			value: classified?.fuelType ? formatFuelType(classified.fuelType) : null,
		},
		{
			id: "colour",
			icon: <Paintbrush2 className="w-4 h-4" />,
			value: classified?.colour ? formatColour(classified.colour) : null,
		},
	];
};

export const ClassifiedCard = (props: ClassifiedCardProps) => {
const { classified } = props;

     return (
      <div className="bg-white relative rounded-md shadow-md overflow-hiddem flex flex-col">
        <div className="aspect-3/2 relative">
            <Link href={routes.singleClassified("classified.slug")}>
            <Image 
                placeholder="blur"
                blurDataURL={classified.images[0]?.blurhash}
                src={classified.images[0]?.src}
                alt={classified.images[0]?.alt}
                className="object-cover rounded-t-md"
                fill={true}
                quality={25} 
            />   
            </Link>
            <FavouriteButton />
            <div className="absolute top-2.5 right-3.5 bg-primary text-slate-50 font-bold px-2 py-1 rounded">
              <p className="text-xs lg:text-base xl:text-lg font-semibold">
                    {classified.price} 
              </p>
			</div>
        </div>
        <div className="p-4 flex flex-col space-y-3">
            <div>
             <Link href={routes.singleClassified(classified.slug)}
			   className="text-sm md:text-base lg:text-lg font-semibold line-clamp-1 transition-colors hover:text-primary"
              >
                {classified.title}
            </Link>
            {classified?.description && (
                <div className="text-xs md:text-sm xl:text-base text-gray-500 line-clamp-2">
                    <HTMLParser html={classified.description} />
                    &nbsp;{" "}
                    {/* Used for equal spacing across each card in the grid */}
                </div>
            )}
            <ul className="text-xs md:text-sm text-gray-600 xl:flex grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-4 items-center justify-between w-full">
                {getKeyClassifiedInfo(classified)
                    .filter((v) => v.value)
                    .map(({ id, icon, value }) => (
                        <li
                            key={id}
                            className="font-semibold flex xl:flex-col items-center gap-x-1.5"
                        >
                            {icon} {value}
                        </li>
                    ))}
            </ul>
        </div>
        <div className="mt-4 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:gap-x-2 w-full">
							<Button
								className="flex-1 transition-colors hover:border-white hover:bg-primary hover:text-white py-2 lg:py-2.5 h-full text-xs md:text-sm xl:text-base"
								asChild
								variant="outline"
								size="sm"
							>
								<Link
									href={routes.reserve(
										classified.slug,
										MultiStepFormEnum.WELCOME,
									)}
								>
									Reserve
								</Link>
							</Button>
							<Button
								className="flex-1 py-2 lg:py-2.5 h-full text-xs md:text-sm xl:text-base"
								asChild
								size="sm"
							>
								<Link href={routes.singleClassified(classified.slug)}>
									View Details
								</Link>
							</Button>
						</div>
        </div>
      </div> 
    ); 
}
