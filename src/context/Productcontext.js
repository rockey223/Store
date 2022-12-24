import { useEffect,createContext,useContext } from "react";
import axios from "axios";
import { useReducer } from "react";
import reducer from "../reducer/Productreducer";
const AppContext = createContext();

const API="https://api.pujakaitem.com/api/products";

const initialState={
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
}

const AppProvider=({children})=>{


    const[state, dispatch]=useReducer(reducer, initialState);


    const getProducts=async (url)=>{
        dispatch({type:"SET_LOADING"});
        try{
            const response = await axios.get(url);
        const products = await response.data;
        dispatch({type:"SET_API_DATA",payload:products});
        }
        catch(error){
            dispatch({type:"API_ERROR"});
        }
        
    };

    // my second api call for  single product
    const getSingleProduct=async(url)=>{
        dispatch({type:"SET_SINGLE_LOADING"});
        try{
            const response = await axios.get(url);
            const singleProduct = await response.data;
            dispatch({type:"SET_SINGLE_PRODUCT",payload: singleProduct});
        }
        catch(error){
            dispatch({type:"SET_SINGLE_ERROR"});
        }
    }


    useEffect(()=>{
        getProducts(API);
    },[]);



    return<AppContext.Provider value={{...state, getSingleProduct}}>
        {children}
    </AppContext.Provider>
}


//custom Hook
const useProductContext=()=>{
    return  useContext(AppContext);
}

export {AppProvider, AppContext,useProductContext};