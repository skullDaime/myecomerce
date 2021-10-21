import React from 'react';
import {StyleSheet, Input, TextIn, View, FlatList, ActivityIndicator, RadioButton, TextInput, Button, Text, Image, SafeAreaView, ScrollView} from 'react-native';

import styles from './style.js';

import { useQuery, gql } from '@apollo/client';

function User(){
    const {data, loading, error} = useQuery(
        gql`
            query {
                oneUser(id: 1)
                {
                    id
                    name
                    nick
                    email
                }
            }
        `
    );
    
    if(loading){return(<ActivityIndicator size="large" color="$ffcc33"></ActivityIndicator>)};
    if(error){return <Text>Erro</Text>}

    return(
        <ScrollView style={styles.scrollView}>
            {data.oneUser.map(datas=>{
                return(
                <View key={datas.id}>
                    <Text>{datas.name}</Text>
                    <Text>{datas.nick}</Text>
                    <Text>{datas.email}</Text>
                </View>
                );
            })}
        </ScrollView>
        );
    }
  export default User;