import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
       backgroundColor:'white',
       borderWidth:0.4,
       bordercolor:'#bdbdbd',
       margin:10,
       flexDirection: 'row',
       borderTopLeftRadius: 20 ,

    },
    image:{
        width:100,
        minHeight:100,
        resizeMode: 'contain',
    
    },
    body_container:{
        flex:1,
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: 'white',

    },
    title:{
        fontWeight:'bold',
        fontSize:20,
       
    },
    price:{
        textAlign:'right',
        fontSize: 18,
        fontStyle:'italic',

    },

}) ;