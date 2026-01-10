import axios from 'axios';


export async function getCategories() {
    const response =  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`);
    return response.data;   
}

export async function getProducts() {
    const response =  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products?populate=*`);
    return response.data;   
}

export async function getProductBySlug(slug: string) {
    const response =  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products?filters[slug][$eq]=${slug}&populate=*`);
    return response.data;   
}

export async function getSliderImages() {
    const response =  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sliders?populate=*`);
    return response.data;   
}