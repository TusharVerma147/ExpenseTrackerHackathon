import {View, Text, StyleSheet, StatusBar, Image, Dimensions} from 'react-native';
import React, { useEffect } from 'react';

import {Icons} from '../../assets';


import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Splash = ({navigation}) => {

   useEffect(()=>{
    setTimeout(()=>{
   AsyncStorage.getItem('key').then((result)=>{
    if(result){
        navigation.replace('Home')
    }
    else{
        navigation.replace('Home')
    }
   }).catch((err)=>{
      console.log(err)
   });
    },2000)
   },[]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image style={styles.splashicon} source={Icons.expensify} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1dc376',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashicon: {
    width: 200,
    height: 200,
    resizeMode:'contain'
  },
});
