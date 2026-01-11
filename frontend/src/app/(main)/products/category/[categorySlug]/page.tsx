'use client'
import { getCategoryProductsByFilter } from '@/lib/api'
import React, { useEffect, useState } from 'react'
import { Product as ProductType } from '@/types'
import ProductCard from '@/components/product/ProductCard'
import { useParams } from 'next/navigation'

const ProductCategoryPage = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  const { categorySlug } = useParams()

  useEffect(() => {
    getCategoryProductsByFilter(categorySlug as string).then((data) => {
      setProducts(data.data)
    })
  }, [categorySlug])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map((product) => (
            <ProductCard key={product.id} product={product} isDetail={false} />
        ))}
    </div>
  )
}

export default ProductCategoryPage