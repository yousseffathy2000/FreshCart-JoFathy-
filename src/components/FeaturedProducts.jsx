import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductItems from './ProductItems';
import Loading from './Loading';

export default function FeaturedProducts() {
    const [productsArr, setProductsArr] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    async function getProducts() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
            setProductsArr(data.data);
            setErrMsg('');
            setLoading(true);
        } catch (error) {
            setErrMsg(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    const filteredProducts = productsArr.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.price.toString().includes(searchTerm) || 
        product.ratingsAverage.toString().includes(searchTerm) 
    );

    if (errMsg) {
        return <h2>{errMsg}</h2>;
    }

    return (
        <div className='container'>
            <div className='mb-4'>
                <input
                    type="text"
                    placeholder="Search by title, category, price, or rating..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                />
            </div>
            <div className='flex flex-wrap'>
                {loading ? (
                    filteredProducts.length ? (
                        filteredProducts.map(product => (
                            <ProductItems key={product.id} product={product} />
                        ))
                    ) : (
                        <p className='m-auto text-2xl my-3 text-green-500'>No Products Found</p>
                    )
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
}