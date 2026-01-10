import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

const ProductCard = ({ product,isDetail }: { product: Product,isDetail: boolean }) => {
    return (
        <Card key={product.id}>
            <CardHeader className="flex-shrink-0">
                <CardTitle className="flex justify-center">{product.name}</CardTitle>
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image.url}`}
                    alt={product.name}
                    width={200}
                    height={250}
                    unoptimized
                   className="object-cover w-48 h-48"
                />
            </CardHeader>
            <CardDescription className="text-sm text-gray-500 flex justify-center">{product.description}</CardDescription>
          

            <CardFooter className="flex items-center justify-center">
            { isDetail ? <Button variant="outline" className=" text-black-500">{product.price} TL</Button> : 
                <Button asChild>
                    <Link href={`/products/${product.slug}`}>İncele</Link>
                </Button>}
            </CardFooter>
            <p className="text-sm text-gray-500 flex justify-center"> {product.stock != 0 ? product.stock + ' adet kaldı' : 'Bu ürün stokta yok'}</p>
        </Card>
    )
}

export default ProductCard