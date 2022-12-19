import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getProductDetails } from '../../apiCalls';
import styles from './Details.style';

const Details = ({ route }) => {
  //stack yapısının altındaki route ile parametre erişimi
  // params: Metotların değişken sayıda parametre almasına imkan veren bir anahtar kelimedir
  //route:erişim sağlayarak yönetilebilirliği ve erişim kolaylığı sağlamasıdır.
  const { id } = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // useEffectte saveData fonksiyonunu çağırıyoruz.
    saveData();
  }, []);


  const saveData = async (key) => {
    key = (`${id}+p`);
    let item = await AsyncStorage.getItem(key);
    // önce AsyncStorage'den item çekiyoruz.
    if (item == null) {
      // null ise gidip istek atıyoruz.
      getProductDetails(id)
      .then (async res => {
        console.log('resdata ',res.data );
         // veriyi JSON formatında string'e dönüştürelim
        const jsonValue = JSON.stringify(res.data);
        // expiration time'ını ayarlayalım
        const expiration = Date.now() + 30 * 1000; // 30 sn 
        setData(res.data);
        setLoading(false);
        await AsyncStorage.setItem(key,jsonValue,expiration);
        // istekten dönen res datayı AsyncStorage'e kaydediyoruz.
       
      })
      .catch (err => {
        setError(err.message);
        setLoading(false);
      });
    }else {
      // eğer item null değilse AsyncStorage' de vardır demek.
      let nData = JSON.parse(item);
       // stringify ile çekerken stringi geri objeye parse ile dönüştürüyoruz.
      setLoading(false);
      // tekrar objeye dönüştürdüğümüz datayı setDataya veriyoruz.
      setData(nData);
      console.log('nData ', nData);
    
    if (nData.expiration < Date.now()) {
      // expiration time geçmiş ise veriyi silip tekrardan
      await AsyncStorage.removeItem(nData);
      return saveData();
    }
    else {
      // expiration time geçmemiş ise veriyi geri dönelim
      return nData;
    }
    
  }}

  if (loading) {
    return (
      <ActivityIndicator
        style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          marginTop: 350,
        }}
        size="large"
      />
    );
  }

  if (error) {
    //denemek için apicallsda axios.gette configi boz
    return (
      <Text
        style={{
          color: 'red',
          fontWeight: 'bold',
          textAlign: 'center',
          textTransform: 'uppercase',
          marginTop: 350,
        }}>
        {error}
      </Text>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: data.image }} />
        <View style={styles.body_container}>
          <Text style={styles.title}>{data?.title}</Text>
          <Text style={styles.desc}>{data?.description}</Text>
          <Text style={styles.category}>Category: {data?.category}</Text>
          <Text style={styles.category}>Rating: {data?.rating?.rate}</Text>
          <Text style={styles.price}>Price: {data?.price}00 ₺</Text>
          <TouchableOpacity
            style={styles.button_container}
            onPress={() => Alert.alert('Sepete eklendi.')}>
            <Text style={styles.button_title}>Satın al </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;
