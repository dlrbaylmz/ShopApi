import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList,Text} from 'react-native';
import ProductCard from '../../components/ProductCard/ProductCard';
import {getProducts} from '../../apiCalls';

const Products = ({navigation}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    getProducts()
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleProductSelect = id => {
    navigation.navigate('DETAİLS', {id});
  };

  const renderProduct = ({item}) => (
    <ProductCard product={item} onSelect={() => handleProductSelect(item.id)} />
  );

  if(loading){
    return <ActivityIndicator 
    style={{textAlign:'center', textTransform:'uppercase', marginTop:350}}
     size='large'/>
    }

  if(error){
    return <Text 
    style={{color:'red', fontWeight:'bold',textAlign:'center', textTransform:'uppercase', marginTop:350}} 
    >{error}</Text>
  }


  return <FlatList data={data} renderItem={renderProduct} />;
};

export default Products;