import React, { Component, useState, useEffect } from 'react';
import {StyleSheet, AsyncStorage,View, ActivityIndicator,TextInput, Button, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, FlatList, TouchableHighlight, RefreshControl} from 'react-native';
import { useNavigation } from '@react-navigation/native'

import {   
  useQuery,
  gql } from '@apollo/client';

import styles from './style.js';

function Categories(){
  const navigation = useNavigation(); 
  let  [isRefreshing, setisRefreshing] = useState(false);
  let {data : data2, loading: loading2, error: error2} = useQuery(
    gql`
      query {
        allCategories
        {
          id
          name
          img
        }
      }
    `
  );

  const onRefresh = () => {
    setisRefreshing(true);
    setTimeout(() => {
      console.log("REFRESJ");
      setisRefreshing(false);
    }, 2000);
  };


  if (loading2) return <ActivityIndicator color={"#cccccc"} size={"large"}></ActivityIndicator>
  if (error2) return <Text> `Error! ${error2}`; </Text>

  return(
    <View>
    <Text style={styles.mediumLabel}>Category</Text>
    <ScrollView refreshControl={
    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}/>} 
    horizontal={true} style={styles.scrollView}>
      {data2.allCategories.map(category=>{
        return(
          <TouchableOpacity key={category.id} style={{width:200, backgroundColor:"#CC3311", margin:5}} onPress={()=>navigation.navigate("FilterCategory", {search:1})}>
          <View key={category.id} >
            <Text style={styles.title001}>{category.name}</Text>
            <Image style={styles.categoryImage} source={{uri: category.img}}></Image>
          </View>
          </TouchableOpacity>
        );
      })}
        <View>
          <TouchableOpacity style={{ height:200 , backgroundColor:"#ccaaaa"}}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    
  );
}

function Recomends(){
  const navigation = useNavigation();
  let { data, loading, error} = useQuery(
    gql`
      query {
        allProducts(limit: 3, offset:0)
        {
          id
          name
          description
          image
        }
      }
    `
  );

    if (loading) return <ActivityIndicator color={"#cccccc"} size={"large"}></ActivityIndicator>
    if (error) return <Text> `Error! ${error.message}`; </Text>

    return(
      <View>
      <Text style={styles.mediumLabel}>Recomendados</Text>
      <ScrollView horizontal={true} style={styles.scrollView}>
      {data.allProducts.map(product=>{
        return(
          <TouchableOpacity onPress={()=>navigation.navigate("Product", {id:product.id})} key={product.id} style={{width:200, backgroundColor:"#CC3311", margin:5}}>
          <View key={product.id} >
            <Text>{product.image}</Text>
            <Text>{product.description}</Text>
          </View>
          </TouchableOpacity>
        );
      })}
        <View>
          <TouchableOpacity style={{ height:200 , backgroundColor:"#ccaaaa"}}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>
    );
}

function Menu(){
  const [searchText, setsearchText] = React.useState('');
  const navigation = useNavigation();
  return(
    <View>
      <TextInput value={searchText} onChangeText={(e)=>setsearchText(e)} placeholder={"Looking for..."}></TextInput>
      <View style={{flex:1, flexDirection:"row"}}>
        <TouchableOpacity style={styles.button0001}  onPress={()=>navigation.navigate('Filter',{search: searchText})}><Text style={{color: "#ffffff"}}>Search</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button0001} onPress={() => navigation.navigate('User')}><Text style={{color: "#ffffff"}}>Usuário</Text ></TouchableOpacity>
        <TouchableOpacity style={styles.button0001} onPress={() => navigation.navigate('Map')}><Text style={{color: "#ffffff"}}>Map</Text ></TouchableOpacity>
      </View>
    </View>
  );
}

export default function Home () { //Home Screen Component, it Render the main ENTRY PONIT <========
  return(
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Menu/>
      <Categories/>
      <Recomends/>
    </ScrollView>
  )
}