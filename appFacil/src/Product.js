import React, { Component, useState } from 'react';
import {StyleSheet, Input, AsyncStorage, TextIn, View, ActivityIndicator, TextInput, Button, Text, Image, SafeAreaView, ScrollView} from 'react-native';

import {Query, gql, useQuery } from "@apollo/client";

import { useNavigation, useRoute } from '@react-navigation/core';

import styles from './style.js';

function Product(){
    const route = useRoute();
    let [idR, setidR] = useState(route.params.id);

    const {data, loading, error} = 
    useQuery(
        gql`
        query{
            oneProduct(id: ${idR}){
                id
                name
                description
            }
        }
        `
        );

        if (loading) return <ActivityIndicator color={"#cccccc"} size={"large"}></ActivityIndicator>
        if (error) return <Text> `Error! ${error.message}`; </Text>
        return(
        <ScrollView style={styles.scrollView}>
            {data.oneProduct.map(Product=>{
                return(
                    <View key={Product.id}>
                        <Text>{Product.name}</Text>
                        <Text>{Product.description}</Text>
                    </View>
                );
            })}                            
        </ScrollView>
        )
    }
  export default Product;