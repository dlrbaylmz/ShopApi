import React,{useEffect,useState} from "react";
import {Text ,Image, View, ScrollView} from "react-native";
import Config from "react-native-config";
import { getProductDetails } from "../../apiCalls";
import useFetch from "../../hooks/useFetch/useFetch";
import styles from './Details.style';


const Details = ({route}) => {
    const {id} = route.params;
  //  const {data} = useFetch (`${Config.API_URL}/${id}`);

  const [data,setData] = useState(() => {
    getProductDetails(id).then(res => {
        return res.data;
    })
    .catch(err => console.log(err))
  });


    useEffect(()=> {
        // console.log(`${Config.API_URL}/${id}`);
        console.log(data);
        // const {veri} = useFetch (`${Config.API_URL}/${id}`);
        // console.log(veri);
        getProductDetails(id).then(res => {
            setData(res.data);
        })
        .catch(err => console.log(err))
    },[])


    return(

        <ScrollView>
            <Text> hello</Text>
        {/* <View style={styles.container}> 
            <Image 
            style={styles.image}
            source={{uri:data?.image}}
            />
         <View style={styles.body_container}>
           <Text style={styles.title}>{data?.title}</Text>
            <Text style={styles.desc}>{data?.description}</Text>
           <Text style={styles.category}>Category: {data?.category}</Text>
           <Text style={styles.category}>Rating: {data?.rating}</Text>
            <Text style={styles.price}>Price: {data?.price}00 ₺</Text>
         </View>
        </View> */}
        </ScrollView>
    );
};

export default Details;