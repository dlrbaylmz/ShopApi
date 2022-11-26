import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import styles from './ProductCard.style';

const ProductCard = ({ product, onSelect }) => {
  //product isimli property alındı
  return (
    //feedback tıklama efecti var opaklık yok
    //onpress seçildiği anda işlem yap 
    <TouchableWithoutFeedback onPress={onSelect}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: product.image }}
        />
        <View style={styles.body_container}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>{product.price}0 ₺</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

}

export default ProductCard;