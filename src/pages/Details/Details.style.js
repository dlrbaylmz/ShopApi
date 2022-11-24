import { StyleSheet,Dimensions } from "react-native";

const deviceSize= Dimensions.get('window');

export default StyleSheet.create({

container:{
    flex:1,
},
image:{
    width: deviceSize.width, //ekranın yatay tamamını kaplar
    height: deviceSize.height/3, //ekranın boydan 3de 1 in kaplar
    resizeMode:'contain',
    backgroundColor:'white',

},
body_container:{
    padding:10,

},
title:{
    fontWeight:'bold',
    fontSize:30,

},
desc:{
    fontStyle:'italic',
    marginVertical:5,
    fontSize:16,

},
price:{
    fontWeight:'bold',
    fontSize:21,
    textAlign:'right',
    marginTop:20,

},
category:{
    fontSize: 15,
    fontWeight:'bold',
    fontStyle: 'italic',

},
button_container:{
    flex:1,
    backgroundColor: '#a08e70',
    padding:10,
    alignItems:'center',
    borderRadius:10,
    marginTop:40
  },

  button_title:{
    flex:1,
    fontSize:20,
    fontWeight:'bold',
    color: 'white',
  },

});

