"use client"
import { getProductBySlug, getProducts } from '@/lib/api'
import { Product } from '@/types'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProductCard from '@/components/product/ProductCard'
import GetCarts from "@/actions/getCart"
import { Product as ProductType } from "@/types"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import ProductCardSkeleton from '@/components/product/ProductCardSkeleton'

const ProductDetailPage = () => {
    const params = useParams()
    const slug = params.slug as string
    const [product, setProduct] = useState<Product | null>(null)
    const [recentProducts, setRecentProducts] = useState<ProductType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        if (slug) {
            getProductBySlug(slug).then((data) => {
                setProduct(data.data?.[0] || null)
            }).catch((error) => {
                console.error('Error fetching product:', error)
                setProduct(null)
            }).finally(() => {
                setIsLoading(false)
            })
        }

        getProducts().then((data) => {
            // En fazla 6 ürün göster
            const filtered = data.data.map((p: ProductType) => p as ProductType).slice(0, 6)
            setRecentProducts(filtered)
        }).catch((error) => {
            console.error("Error fetching recent products:", error)
        })

    }, [slug])

   

    return (<>
        {isLoading ? (
            <div className="container mx-auto px-4 py-8">
                <ProductCardSkeleton />
            </div>
        ) : (
        <div className="max-w-md mx-auto px-4 py-8">
                <ProductCard product={product as Product} isDetail={true} />
            </div>
        )}

        {recentProducts.length > 0 && (
            <div className="mt-2 max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Son Ürünler</h2>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-4xl mx-auto"
                >
                    <CarouselContent>
                        {recentProducts.map((recentProduct: ProductType) => (
                            <CarouselItem key={recentProduct.id} className="md:basis-1/2 lg:basis-1/3">
                                <Link href={`/products/${recentProduct.slug}`}>
                                    <Card className="h-full">
                                        <CardContent className="flex flex-col items-center justify-center p-4">
                                            <div className="relative w-full h-48 mb-4">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${recentProduct.image.url}`}
                                                    alt={recentProduct.name}
                                                    fill
                                                    className="object-cover rounded-md"
                                                    unoptimized
                                                />
                                            </div>
                                            <p className="text-center font-semibold mb-2">{recentProduct.name}</p>
                                            <p className="text-center text-sm text-gray-500">{recentProduct.price} TL</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        )}

    </>
    )
}

export default ProductDetailPage