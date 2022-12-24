import { useReducer,useEffect, createContext, useContext  } from "react";

import reducer from "../reducer/filter_reducer";
import {useProductContext} from "./Productcontext";




const FilterContext = createContext();

    const initialState={
        filter_products: [],
        all_products:[],
        grid_view: true,
        sorting_value: "lowest",
    }


export const FilterContextProvider = ({children})=>{
    const {products}=useProductContext();

    const[state, dispatch]=useReducer(reducer,initialState);

    // to set grid view
    const setGridView=()=>{
        return dispatch({type:"SET_GRID_VIEW"});
    }


    const setListView=()=>{
        return dispatch({type:"SET_List_VIEW"});
    }


    // sorting function
    const sorting=(event)=>{
        let userValue=event.target.value;
        dispatch({type:"GET_SORT_VALUE", payload: userValue});
    }

    // to sort filter
    useEffect(()=>{
        dispatch({type:"SORTING_PRODUCTS"})
    },[state.sorting_value])



    useEffect(()=>{
        dispatch({type:"LOAD_FILTER_PRODUCTS",payload: products});
    },[products]);



 return(<FilterContext.Provider value={{...state, setGridView, setListView, sorting}}>
    {children}
 </FilterContext.Provider>);
};


export const useFilterContext=()=>{
    return useContext(FilterContext);
};