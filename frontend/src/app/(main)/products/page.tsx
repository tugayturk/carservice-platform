"use client"

import { useEffect, useState } from 'react'
import { getProducts } from '@/lib/api'
import { Product } from '@/types'
import ProductCard from '@/components/product/ProductCard'

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.data)
    })
  }, [])

      return ( 
        <div className="container mx-auto px-1 py-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        { products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} isDetail={false} />
        ))
      ) : (
        <div>No products found</div>
        )}  
        </div>
      </div>
    )
  }

export default ProductsPage
