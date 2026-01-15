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
import addToCart from "@/actions/addToCart"
import useCartQuantityStore from "@/hooks/useCartQuantity"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const ProductCard = ({ product, isDetail }: { product: Product, isDetail: boolean }) => {

    const { cartQuantity, setCartQuantity } = useCartQuantityStore()

    const handleAddToCart = async () => {
        const jwt = localStorage.getItem('jwt')
        const userStr = localStorage.getItem('user')
        if (jwt && userStr) {
            const user = JSON.parse(userStr)
            const data = {
                productId: product.id,
                quantity: 1,
                price: product.price,
                user: user.username
            }
            await addToCart(data, jwt)
            setCartQuantity(cartQuantity + 1)
        }
    }

    return ( 
        <div >
        <Card key={product.id}>
            <CardHeader className="flex-shrink-0 items-center justify-center">
                <CardTitle className="flex justify-center">{product.name}</CardTitle>
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image.url}`}
                    alt={product.name}
                    width={200}
                    height={250}
                    unoptimized
                    className="object-cover w-48 h-48"
                    loading="eager"
                />
            </CardHeader>
            <CardDescription className="text-sm text-gray-500 flex justify-center">{product.description}</CardDescription>

            <CardFooter className="flex items-center justify-center">
                {isDetail ?

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button disabled={product.stock == 0} variant="destructive">{product.price} TL</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Sepete Eklemek mi İstiyorsunuz?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Sepetinize gidip satın almanızı tamamlayabilirsiniz.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Hayır</AlertDialogCancel>
                                <AlertDialogAction onClick={handleAddToCart}>Evet</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    :
                    <Button asChild>
                        <Link href={`/products/${product.slug}`}>İncele</Link>
                    </Button>}
            </CardFooter>
            <p className="text-sm text-gray-500 flex justify-center"> {product.stock != 0 ? product.stock + ' adet kaldı' : 'Bu ürün stokta yok'}</p>
        </Card>
    </div>
)
}

export default ProductCard