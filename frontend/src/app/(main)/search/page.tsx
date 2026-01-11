'use client'
import ProductCard from '@/components/product/ProductCard';
import { getProductsBySearch } from '@/lib/api';
import { Product } from '@/types';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SearchPage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('search');
    const [products, setProducts] = useState<Product[]>([]);
  
    useEffect(() => {
    if(search) {
        getProductsBySearch(search as string).then((data) => {
                setProducts(data.data);
            });
        }
    }, [search]);


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map((product) => (
            <ProductCard key={product.id} product={product} isDetail={false} />
        ))}
    </div>
  )
}

export default SearchPage