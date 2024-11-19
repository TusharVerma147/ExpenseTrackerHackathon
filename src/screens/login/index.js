import {View, Text, StatusBar, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import {Icons} from '../../assets';
import CustomButton from '../../components/customButton';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const Login = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View style={styles.top}>

          <Image style={styles.symbol} source={Icons.expensify} />

        </View>
        <View style={styles.bottom}>
          <CustomButton
            icon={Icons.google}
            title="SignIn with Google"
            onPress={''}
            textStyle={{fontWeight: '700'}}
            borderRadius={50}
            backgroundColor='#14223a'
            textColor='white'
          />
          <CustomButton
            title="Continue"
            onPress={() => navigation.navigate('Home')}
            style={{marginTop: 20}}
            textStyle={{fontWeight: '700'}}
            borderRadius={50}
            backgroundColor={'darkgreen'}
            textColor='white'
          />
          <View style={styles.footer}>
            <Text style={styles.bytext}>By continuing, you agree to our</Text>
            <View style={styles.policy}>
              <Text style={styles.termstext}>Terms of Use</Text>
              <Text style={styles.andtext}>&</Text>
              <Text style={styles.termstext}>Privacy Policy</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1dc376',
    paddingTop:100
  },
  symbol: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode:'contain'
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop:'30%'
  },
  bottom: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 150,
    paddingHorizontal:30
  },
  policy: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footer: {
    margin: 30,
  },
  bytext: {
    color: 'darkgreen',
    textAlign: 'center',
    fontSize:20,
    fontWeight: '500',
  },
  termstext: {
    color: 'darkgreen',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  andtext: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 3,
  },
});
