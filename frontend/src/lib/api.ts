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

export async function getCategoryProductsByFilter(filter: string) {
    const response =  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products?filters[category][slug][$eq]=${filter}&populate=*`);
    return response.data;   
}

export async function getProductsBySearch(search: string) {
    const response =  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products?filters[name][$containsi]=${search}&populate=*`);
    return response.data;   
}

export async function updateStock(id: string, data: any) {
    const response =  await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${id}`, {data});
    return response.data;   
}