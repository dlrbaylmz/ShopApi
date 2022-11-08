import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Products from './pages/Products/Product';
import Details from './pages/Details/Details';


const Stack = createNativeStackNavigator();


const App = () => {
  return(
   
   <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name='SHOPPİNG' component={Products} 
         options={{title: "DiySHOP", headerStyle:{backgroundColor:'#b2b2b2'} , headerTitleStyle:{color: 'white'}, }}/>
         <Stack.Screen name='DETAİLS' component={Details} 
          options={{title: "DiyDETAİLS", headerStyle:{backgroundColor:'#cdcdcd'} , headerTitleStyle:{color: 'white'}, headerTintColor:'white'}}/>
      </Stack.Navigator>
   </NavigationContainer>
  )
  
   };
export default App;