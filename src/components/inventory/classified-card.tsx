import { routes } from "@/config/routes";
import Link from "next/link"; 
import { Classified, Prisma } from '@prisma/client';  
import  Image  from 'next/image';

type ClassifiedfieldWithImages = Prisma.ClassifiedGetPayload<{
    include: {
        images: true;
    };
}>

interface ClassifiedCardProps {
    classified: ClassifiedfieldWithImages; 
}

export const ClassifiedCard = (props: ClassifiedCardProps) => {
const { classified } = props;

     return (
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
     </div>
    ); 
}