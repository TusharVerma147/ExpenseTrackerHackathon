import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

import {Icons} from '../../assets';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <View style={styles.headerparent}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={Icons.user} style={styles.account} />
          </TouchableOpacity>

          <Text style={styles.user}>Hii! User</Text>
        </View>
        <View style={styles.search}>
          <Image
            source={Icons.search}
            style={{height: 20, width: 20, tintColor: 'white'}}
          />
          <TextInput
            placeholder="Search"
            style={{padding: 15, fontSize: 15, color: 'white', flex: 1}}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.mainview}>
          <View style={styles.expenseview}>
            <Image style={styles.ban1} source={Icons.ban1} />
            <Text style={styles.track}>Track your expenses</Text>
            <TouchableOpacity
              style={styles.enable}
              onPress={() => navigation.navigate('Expense')}>
              <Text style={styles.enabletext}>Continue</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.expenseview}>
            <Image style={styles.ban1} source={Icons.ban2} />
            <Text style={styles.track}>Manage your Salary</Text>
            <TouchableOpacity
              style={styles.enable1}
              onPress={() => navigation.navigate('Income')}>
              <Text style={styles.enabletext}>Activate</Text>
            </TouchableOpacity>
          </View>
        </View>
 
      </ScrollView>
    </SafeAreaView>
  );
};



export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
    //  backgroundColor:'black'
  },
  headerparent: {
    paddingTop: 10,
    gap: 10,
  },

  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  account: {
    height: 40,
    width: 40,
    tintColor: 'white',
  },
  search: {
    marginHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'grey',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  mainview: {
    paddingHorizontal: 10,
  },
  expenseview: {
    height: 450,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'grey',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  track: {
    color: 'white',
    fontWeight: '600',
    fontSize: 30,
    alignSelf: 'center',
  },
  ban1: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  enable: {
    marginHorizontal: 10,
    backgroundColor: '#8fcaf8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 20,
    paddingVertical: 10,
    marginHorizontal: 120,
  },
  enable1: {
    marginHorizontal: 10,
    backgroundColor: '#c6e1a7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 20,
    paddingVertical: 10,
    marginHorizontal: 150,
  },
  enabletext: {
    fontWeight: '700',
    fontSize: 16,
  },
  user: {
    color: 'white',
    fontWeight: '800',
    fontSize: 24,
    textAlign: 'center',
    marginLeft:10
  },
});
