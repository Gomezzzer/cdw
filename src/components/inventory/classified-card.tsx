import { routes } from "@/config/routes";
import Link from "next/link"; 
import { ClassifiedWithImages } from "@/config/types";  
import  Image  from 'next/image';
interface ClassifiedCardProps {
    classified: ClassifiedWithImages; 
}

export const ClassifiedCard = (props: ClassifiedCardProps) => {
const { classified } = props;

     return (
      <div className="bg-white relative rounded-md shadow-md overflow-hiddem flex flex-col">
        <div className="aspect-3/2 relative">
            <Link href={routes.singleClassified("slug")}>
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
      </div> 
    ); 
}