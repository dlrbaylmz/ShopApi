import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text } from 'react-native';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getProducts} from '../../apiCalls';


const Products = ({ navigation }) => {
  //useState ve UseEffect çağırıldı

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); //loading yok iken true
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const _onRefresh = () => { // bu fonksiyon refresh olduğunda çalışıcak ve scroll oluşucak
    setRefreshing(true);
    setTimeout(() => {  // settimeout ile scrollun süresini belirler yoksa sonsuza kadar scroll olur
      setRefreshing(false);
    }, 2000);
  }

  useEffect(() => {
    getProducts() //axiostan alınan verilere istek atma
      .then(res => { //promise(zincir) yapısı
        setData(res.data); //dönen cevap state içinde set edildi
        setLoading(false);  //loading vrsa false
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  //navigation metodu idli ürün
  const handleProductSelect =id => {
    navigation.navigate('DETAİLS', { id }); //onselect seçildiği an detaylar sayfasına git
  };

  const renderProduct = ({ item }) => (
    <ProductCard product={item} onSelect={() => handleProductSelect(item.id)} />
  );

  if (loading) { //loading olunca 
    return <ActivityIndicator
      style={{ textAlign: 'center', textTransform: 'uppercase', marginTop: 350 }}
      size='large' />
  }

  if (error) { //error olunca mesaj verir
    return <Text
      style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', marginTop: 350 }}
    >{error}</Text>
  }


  return <FlatList data={data} renderItem={renderProduct} keyExtractor={item => item.id}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />} />;
  //refreshControl scroll edince spin ayarlar
  //keyExtractor flatlist ekranda yokken veriyi silip geri getirir
  //verileri çekip ekranda gösterme 
  //renderItem datayı alır içindeki function ı render(tetikleme) eder
};



export default Products;