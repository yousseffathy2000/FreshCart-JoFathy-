import { Children } from "react";
import { createContext, useState } from "react";

export const numWishItem = createContext(0);

export default function NumWishListContextProvider({children}) {
    let [wishListNum,setWishList] = useState(0);
    return <numWishItem.Provider value={{wishListNum,setWishList}}>
        {children}
    </numWishItem.Provider>
}
