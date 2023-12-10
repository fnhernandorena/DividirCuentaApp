import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import BodyCalculate from './src/components/maths';
import Enlace from './src/components/footer';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.valid}>
        <Text style={styles.title}>Dividir Cuenta</Text>
        <View> 
           <Text style={styles.textbody}>
          Quien no esta cansado de juntarse con amigos, hacer las compras por
          separado y no saber cuanto se gastó ni cuanto se deben pagar entre si?</Text>
          <Text style={styles.textbody}>
            Con esta app nunca mas va a haber un problema de este tipo.
          </Text> 
          </View>
        <BodyCalculate style={styles.calculator} />
        <Enlace />
        <StatusBar style='auto'/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  valid: {
    paddingTop: Platform.OS === "android" && 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    backgroundColor: '#48e',
    fontSize: 25,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 50,
    color: 'white',
    marginVertical: 25,
  },
  textbody: {
    fontSize: 20,
    color: 'white',
    paddingHorizontal:15,
  },

});
