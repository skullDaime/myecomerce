import React, { Component, useEffect } from 'react';
import {StyleSheet, View, ActivityIndicator, TextInput, Button, Text, Image, SafeAreaView, ScrollView} from 'react-native';

import { useRoute } from '@react-navigation/core';

import { useQuery, gql } from '@apollo/client';

import styles from './style.js';
function Filter(){
    let route = useRoute();
    let {search} = route.params;
    //const [query, setquery] = React.useState(search);

    const {data, loading, error} = useQuery(
        gql`
            query{
                filterMultiplyProductKey(key: "${search}"){
                    id
                    name
                    description
                    }
                }
            `
        );

    if (loading) return <Text> 'Loading...'; </Text>
    if (error) return <ActivityIndicator color={"#cccccc"} size={"large"}></ActivityIndicator>

    return(
        <View>
            {data.filterMultiplyProductKey.map(product=>{
                <View style={{backgroundColor:"#ffcc33", width:20}} key={product.id}>
                    <Text>{product.name}</Text>
                    <Text>{product.description}</Text>
                </View>
            })}
        </View>
    )
}

export default Filter;