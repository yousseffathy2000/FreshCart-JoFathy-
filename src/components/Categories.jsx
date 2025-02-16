import axios from "axios";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Loading from "./Loading";

export default function Categories() {
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  async function getCategories() {
    setLoading(true);
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategoriesArr(data?.data || []);
      setErrMsg('');
      setLoading(false);
    } catch (error) {
      setErrMsg(error);
      setLoading(false);
    }
  }

  async function getSubcategories(categoryId, categoryName) {
    setSelectedCategoryId(categoryId); 
    setSelectedCategoryName(categoryName); 
    setLoading(true);
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
      setSubcategories(data?.data || []);
      setLoading(false);
    } catch (error) {
      setErrMsg(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Fresh Cart / Categories</title>
      </Helmet>

      <div className="container">
        {loading && <Loading />}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
            {categoriesArr.map((category) => (
              <div 
                key={category._id} 
                className="product shadow-xl cursor-pointer bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
                onClick={() => getSubcategories(category._id, category.name)}
              >
                <img className="w-full aspect-[4/3] object-cover rounded-t-lg h-[350px]" src={category?.image} alt={category?.name} />
                <div className="p-5">
                  <p className="mb-2 text-2xl font-bold tracking-tight text-green-500 text-center">
                    {category?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedCategoryId && (
          <div className="my-8">
            <h2 className="text-center text-green-500 my-5 text-3xl font-semibold">{selectedCategoryName} Subcategories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subcategories.length > 0 ? (
                subcategories.map((sub) => (
                  <div key={sub._id} className="p-4 bg-gray-100 rounded-lg shadow-md text-center product">
                    <p className="text-lg font-semibold text-gray-700">{sub.name}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No subcategories found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
