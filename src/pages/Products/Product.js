import React from "react";
import {FlatList} from "react-native";
import Config from "react-native-config";
import useFetch from "../../hooks/useFetch/useFetch";
import ProductCard from '../../components/ProductCard/ProductCard';



const Products =({navigation}) => {
    const {data} = useFetch(Config.API_URL);

    const handleProductSelect = id =>{
        navigation.navigate("DETAİLS", {id});
    }

    const renderProduct =({item}) =>(
         <ProductCard product={item} onSelect={() => handleProductSelect(item.id)}/>
    );


    return(
           <FlatList data={data} renderItem={renderProduct}/>
    );
};

export default Products;