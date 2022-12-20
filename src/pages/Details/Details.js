import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {getProductDetails} from '../../apiCalls';
import styles from './Details.style';

const Details = ({route}) => {
  //stack yapısının altındaki route ile parametre erişimi
  // params: Metotların değişken sayıda parametre almasına imkan veren bir anahtar kelimedir
  //route:erişim sağlayarak yönetilebilirliği ve erişim kolaylığı sağlamasıdır.
  const {id} = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // useEffectte saveData fonksiyonunu çağırıyoruz.
    saveData();
  }, []);

  const saveData = async key => {
    key = `${id}+p`;
    // storage'den veriyi çekelim
    let item = await AsyncStorage.getItem(key);
    console.log('item => ', item);
    if (item == null) {
      // storage'den gelen item null ise gidip istek atalım
      getProductDetails(id)
        .then(async res => {
          console.log('resdata ', res.data);
          // gelen datayı resData'ya eşitleyelim
          const resData = res.data;

          // anlık süre oluşturalım. şu anın 30 saniye sonrası olmak üzere
          const expiration = Date.now() + 30 * 1000; // 30 sn

          // itemData diye obje oluşturup içine resDatayı ve expiration'u verelim
          const itemData = {resData, expiration};
          console.log('itemData ', itemData);

          // item datayı storage'e kaydetmek için stringfy yapalım
          const jsonValue = JSON.stringify(itemData);
          console.log('jsonValue ', jsonValue);

          setData(resData);

          setLoading(false);

          // storage'e kaydedelim
          await AsyncStorage.setItem(key, jsonValue);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      // item null değilse demek ki storage'den veri geldi

      // gelen veriyi parse edip objeye dönüştürelim (nData isminde)
      let nData = JSON.parse(item);

      if (nData.expiration < Date.now()) {
        //nData'nın içindeki tarih şu andan önceyse yeni veri çekmeliyiz
        getProductDetails(id)
          .then(async res => {
            // yeni veri çekme işlemleri
            const resData = res.data;
            // yeni expiration tarihi
            const expiration = Date.now() + 30 * 1000;
            const newStorageData = {resData, expiration};

            const jsonValue = JSON.stringify(newStorageData);

            setData(resData);

            setLoading(false);

            // storage'deki önceki veriyi (expiration'u eski olanı) silelim
            await AsyncStorage.removeItem(key);

            // yeni çektiğimiz veri ve yeni oluşturduğumuz expiration ile tekrar kaydedelim
            await AsyncStorage.setItem(key, jsonValue);

            console.log('yeni veri çekildi.', jsonValue);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      } else {
        // expiration süresi dolmadıysa bir şey yapmaya gerek
        console.log('yeni veri çekilmedi');

        // storage'den gelen datayı state'teki data'ya veriyoruz bu kadar.
        setData(nData.resData);
        setLoading(false);
      }
    }
  };

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
        <Image style={styles.image} source={{uri: data.image}} />
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
