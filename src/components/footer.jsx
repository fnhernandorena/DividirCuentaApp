import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';


const Enlace = () => {
    const url = 'https://fnhernandorena.000webhostapp.com';
  
    const abrirEnlace = async () => {
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error(`No se puede abrir el enlace: ${url}`);
      }
    };
  
    return (
      <View style={styles.views}>
        <TouchableOpacity onPress={abrirEnlace} style={styles.container}>
          <Text style={styles.content}>
            Visita nuestro sitio web
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

 const styles = StyleSheet.create({
    views:{
        flex: 1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
container:{
    backgroundColor: "rgba(100, 100, 100, 0.3)",
    paddingHorizontal:50,
    paddingVertical:15,
    marginBottom:20,
    borderRadius:100,
    height:45,
},
content:{
    color:'#fff',
},
 } );
  
  export default Enlace;
  