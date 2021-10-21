import { useState } from 'react';

import * as React from 'react';
import Home from './Home';
import Filter from './Filter';
import User from './User';
import Product from './Product';
import Map from './Map';
/*import Product from './Product';
import Filter from './Filter';
import Address from './Address';
import PaymentOpt from './PaymentOpt';
import Review from './review';
import User from './User';*/

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//export const client = new ApolloClient({ uri: 'http://192.168.0.105:4000/'});

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: 'http://192.168.0.105:4000/',
  cache: new InMemoryCache()
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={"Home"} component={Home} />
          <Stack.Screen name={"Filter"} component={Filter} />
          <Stack.Screen name={"User"} component={User}></Stack.Screen>
          <Stack.Screen name={"Product"} component={Product}></Stack.Screen>
          <Stack.Screen name={"Map"} component={Map}/>
        </Stack.Navigator>
      </NavigationContainer>
      </ApolloProvider>
  );
}

export default App;