import { Helmet } from "react-helmet";
import FeaturedProducts from "./FeaturedProducts";

export default function Products() {
  return (
    <div className="my-10">
      <Helmet>
        <title>Fresh Cart / Products</title>
      </Helmet>
        <FeaturedProducts></FeaturedProducts>
    </div>
  )
}
