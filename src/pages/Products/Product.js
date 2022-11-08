import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import ProductCard from '../../components/ProductCard/ProductCard';
import {getProducts} from '../../apiCalls';

const Products = ({navigation}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    getProducts()
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleProductSelect = id => {
    navigation.navigate('DETAİLS', {id});
  };

  const renderProduct = ({item}) => (
    <ProductCard product={item} onSelect={() => handleProductSelect(item.id)} />
  );

  return <FlatList data={data} renderItem={renderProduct} />;
};

export default Products;
