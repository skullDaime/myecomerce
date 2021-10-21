import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import MapView, { Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps'

function Map() {
    const [GOOGLE_API_KEY] = useState('AIzaSyC0XPTUgmnEOd0k3nGQdgT0EXrQ9c27ut8');
    const [coordinates, setcoordinates] = useState([
      {
        latitude: -17.855688,
        longitude: -40.328165,
      }, 
      {
        latitude: -17.855687,
        longitude: -40.328166,
      },
    ]);
    return (
        <MapView
          style={{width:400, height:400}}
          initialRegion={{
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0121,
          }}>

          <Marker coordinate={coordinates[0]} />
          <Marker coordinate={coordinates[1]} />
        </MapView>
    );
  };

export default Map;