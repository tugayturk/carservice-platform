"use client"
import { getProductBySlug } from '@/lib/api'
import { Product } from '@/types'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProductCard from '@/components/product/ProductCard'

const ProductDetailPage = () => {
    const params = useParams()
    const slug = params.slug as string
    const [product, setProduct] = useState<Product | null>(null)

    console.log('slug:', slug)
   
    useEffect(() => {
        if (slug) {
            getProductBySlug(slug).then((data) => {
                setProduct(data.data?.[0] || null)
            }).catch((error) => {
                console.error('Error fetching product:', error)
                setProduct(null)
            })
        }
    }, [slug])

    if (!product) {
        return <div>Product not found</div>
    }
    if (!product) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>
    }

    return (
        <div className="max-w-md mx-auto px-4 py-8">
           <ProductCard product={product} isDetail={true} />
        </div>
    )
}

export default ProductDetailPage