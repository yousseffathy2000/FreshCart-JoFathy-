import axios from 'axios';
import { useEffect, useState } from 'react';
import Slider from "react-slick";

export default function CategoriesSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false
    };
    const [categoriesArr, setCategoriesArr] = useState([]);
    async function getCategories() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setCategoriesArr(data.data);
    }
    useEffect(() => {
        getCategories();
    })
    return (
        <div className='container my-10  hidden md:block'>
            <Slider {...settings}>
                {categoriesArr.map(category => <CategorieItem key={category._id} category={category}></CategorieItem>)}
            </Slider>
        </div>
    )

    function CategorieItem({ category }) {
        return <div className=' hidden md:block'>
            <img src={category.image} alt={category.slug} className='h-[200px] object-cover'></img>
        </div>
    }
}
