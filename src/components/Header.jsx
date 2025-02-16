import Slider from "react-slick";
import slider1 from '../assets/images/slider-image-1.jpeg'
import slider2 from '../assets/images/slider-image-2.jpeg'
import slider3 from '../assets/images/slider-image-3.jpeg'
import blog1 from '../assets/images/blog-img-1.jpeg'
import blog2 from '../assets/images/blog-img-2.jpeg'




export default function Header() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1500,
    arrows:false
  };
  return (
    <header className="my-5 hidden md:block">
      <div className="container flex">
        <div className="w-2/3">
          <Slider {...settings}>
            <img src={slider1} alt="" className="h-[500px] object-cover"></img>
            <img src={slider2} alt="" className="h-[500px] object-cover"></img>
            <img src={slider3} alt="" className="h-[500px] object-cover"></img>
          </Slider>
        </div>
        <div className="w-1/3">
        <img src={blog1} alt="" className="h-[250px] object-cover"></img>
        <img src={blog2} alt="" className="h-[250px] object-cover"></img>
        </div>
      </div>
    </header>
  )
}
