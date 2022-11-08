import { useEffect,useState } from "react";
import axios from "axios";

function useFetch(url){
    const [error,setError] = useState(null);
    const [data,setData] = useState([]);

    const fetchData = async() => {
        try{
            const{data:responseData} = await axios.get(url='https://fakestoreapi.com/products');
            setData(responseData);
        }
        catch(err){
            console.log = setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    },[]);


    return{error,data};
}

export default useFetch;