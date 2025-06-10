import { routes } from "@/config/routes";
import Link from "next/link"; 
import { ClassifiedWithImages } from "@/config/types";  
import  Image  from 'next/image';
import { HTMLParser } from "@/components/shared/html-parser"; // Adjust the import path as needed

interface ClassifiedCardProps {
    classified: ClassifiedWithImages; 
}

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
            </div>
        </div>
      </div> 
    ); 
}