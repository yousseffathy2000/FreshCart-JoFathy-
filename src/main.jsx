import { createRoot } from 'react-dom/client'
import './index.css'
import '../node_modules/flowbite/dist/flowbite.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserTokenProvider from './components/Context/UserToken.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import NumberItemContextProvider from './components/Context/NumberCartContext.jsx'
import NumWishListContextProvider from './components/Context/NumWishList.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <NumWishListContextProvider>
    <NumberItemContextProvider>
        <QueryClientProvider client={queryClient}>
            <UserTokenProvider>
                <Toaster></Toaster>
                <App />
            </UserTokenProvider>
        </QueryClientProvider>
    </NumberItemContextProvider>
    </NumWishListContextProvider>
)
