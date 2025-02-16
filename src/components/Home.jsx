import FeaturedProducts from "./FeaturedProducts";
import Header from "./Header";
import { Helmet } from "react-helmet";
import CategoriesSlider from "./CategoriesSlider";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Fresh Cart / Home</title>
      </Helmet>
      <Header></Header>
      <CategoriesSlider></CategoriesSlider>
      <FeaturedProducts></FeaturedProducts>
    </div>
  )
}
