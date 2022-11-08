import React, {useEffect, useState} from 'react';
import {Text, Image, View, ScrollView} from 'react-native';
import {getProductDetails} from '../../apiCalls';
import styles from './Details.style';

const Details = ({route}) => {
  const {id} = route.params;
  const [data, setData] = useState({});

  useEffect(() => {
    getProductDetails(id)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: data.image}} />
        <View style={styles.body_container}>
          <Text style={styles.title}>{data?.title}</Text>
          <Text style={styles.desc}>{data?.description}</Text>
          <Text style={styles.category}>Category: {data?.category}</Text>
          <Text style={styles.category}>Rating: {data?.rating?.rate}</Text>
          <Text style={styles.price}>Price: {data?.price}00 ₺</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;
