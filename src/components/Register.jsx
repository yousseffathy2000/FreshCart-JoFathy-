import axios from "axios"
import { useFormik } from "formik"
import { useContext } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { userToken } from "./Context/UserToken";
import { Helmet } from "react-helmet";

export default function Register() {
  let {setLogin} = useContext(userToken)
  let [errMsg,setErrMsg] = useState('');
  let [loading,setLoading] = useState(false);
  let navigate = useNavigate()

  async function handleRegister(values){
    setLoading(true)
    try {
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
      console.log(data)
      if(data.message === 'success'){
        localStorage.setItem('token',data.token)
        setLogin(data.token)
        navigate('/cart')
      }
      setLoading(false)
      setErrMsg('')
    } catch (error) {
      setErrMsg('Email Already Exist !')
      console.log(error?.response?.data)
      setLoading(false)
    }
  }

  let validationSchema = Yup.object().shape({
    name:Yup.string().min(2,'Too Short !').max(8,'Too Long !').required('This Field is Required !'),
    email:Yup.string().required('This Field is Required !').email('Email Not Valid !'),
    password:Yup.string().required('This Field is Required !').matches(/^[A-Z][a-z0-9]{2,5}$/, 'Password is Not Valid'),
    rePassword:Yup.string().oneOf([Yup.ref('password')], 'Password is not match').required('This Field is Required !'),
    phone:Yup.string().required('This Field is Required !').matches(/^(01)[0-25][0-9]{8}$/, 'Number is Not Valid')
  })

  let formik = useFormik({
    initialValues:{
      name: '',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema,
    onSubmit:handleRegister
  })
  
  return (
    <div className='container'>
      <Helmet>
        <title>Fresh Cart / Register</title>
      </Helmet>
      <h2 className='my-8 text-2xl font-semibold text-green-color'>Register Now :</h2>
    <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
        {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.name}</span>
        </div> : ''}
        <label htmlFor="name" className="peer-focus:font-medium absolute textذ1ذ-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
      </div>

    <div className="relative z-0 w-full mb-5 group">
      <input type="email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.email}</span>
        </div> : ''}

        {errMsg ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{errMsg}</span>
        </div> : ''}
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
    </div>

    <div className="relative z-0 w-full mb-5 group">
      <input type="password" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange}  id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.password}</span>
        </div> : ''}
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    </div>

    <div className="relative z-0 w-full mb-5 group">
      <input type="password" onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange}  id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.rePassword}</span>
        </div> : ''}
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
    </div>

      <div className="relative z-0 w-full mb-5 group">
        <input type="tel" onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
        {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.phone}</span>
        </div> : ''}
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
      </div>

    <button type="submit" className="ml-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {loading ? <i className="fa-solid fa-spinner text-white animate-spin"></i> : 'Register'}
    </button>
    </form>
    </div>
  )
}
