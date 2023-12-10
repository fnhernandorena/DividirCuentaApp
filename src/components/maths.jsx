import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";

const BodyCalculate = () => {
  const [results, setResults] = useState([]);
  const [numberOfDivs, setNumberOfDivs] = useState("");
  const [debts, setDebts] = useState([]);
  const [resultVisible, setResultVisible] = useState(false);

  const createDivs = () => {
    const inputValue = parseInt(numberOfDivs);

    if (inputValue < 2 || isNaN(inputValue)) {
      Alert.alert(
        "Error",
        "Invalid input. Please enter a number greater than or equal to 2.",
        [{ text: "OK" }]
      );
    } else {
      setResultVisible(false);
      setDebts([]);

      const newDivs = [];

      for (let i = 0; i < inputValue; i++) {
        newDivs.push({
          name: "",
          expense: 0,
        });
      }

      setDebts(newDivs);
      setResultVisible(true);
    }
  };

  const handleNameChange = (index, text) => {
    const updatedDebts = [...debts];
    updatedDebts[index] = {
      ...updatedDebts[index],
      name: text,
    };
    setDebts(updatedDebts);
  };

  const handleExpenseChange = (index, text) => {
    const updatedDebts = [...debts];
    updatedDebts[index] = {
      ...updatedDebts[index],
      expense: parseFloat(text) || 0,
    };
    setDebts(updatedDebts);
  };

  const calculateDebts = () => {
    if (debts.some((debtor) => debtor.name.trim() === "")) {
      Alert.alert(
        "Error",
        "Please enter a name for each person before calculating debts.",
        [{ text: "OK" }]
      );
      return;
    }
  
    const totalExpenses = debts.reduce(
      (total, debtor) => total + debtor.expense,
      0
    );
    
    const averageExpense = (totalExpenses / debts.length);
  
    const debtsResult = debts.map((debtor) => ({
      name: debtor.name,
      debt: averageExpense - debtor.expense,
    }));
  
    const newResults = [];
  
    while (debtsResult.some((debtor) => debtor.debt < 0)) {
      debtsResult.forEach((debtor) => {
        if (debtor.debt < 0) {
          debtsResult.forEach((creditor) => {
            if (creditor.debt > 0) {
              const amount = Math.min(Math.abs(debtor.debt), creditor.debt);
              newResults.push(
                ` ${creditor.name} debe pagar $${amount.toFixed(2)} a ${
                  debtor.name
                }`
              );
              debtor.debt += amount;
              creditor.debt -= amount;
            }
          });
        }
      });
    }
  
    setResults(newResults);
  };
  
  
  
  

  const removeDivs = () => {
    setResultVisible(false);
    setNumberOfDivs("");
    setDebts([]);
    setResults([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Ingrse la cantidad de personas"
          keyboardType="numeric"
          onChangeText={(text) => setNumberOfDivs(text)}
          value={numberOfDivs}
          placeholderTextColor="#48e"
        />
        <TouchableOpacity style={styles.button} onPress={createDivs}>
          <Text style={{ color: "white" }}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={removeDivs}>
          <Text style={{ color: "white" }}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      {debts.length > 0 && (
        <View>
          {debts.map((debtor, index) => (
            <View key={index} style={styles.mainDiv}>
              <TextInput
                style={styles.subDiv1}
                placeholder={`Persona ${index + 1}`}
                placeholderTextColor="#48e"
                onChangeText={(text) => handleNameChange(index, text)}
              />
              <TextInput
                style={styles.subDiv2}
                placeholder="0"
                keyboardType="numeric"
                placeholderTextColor="#48e"
                onChangeText={(text) => handleExpenseChange(index, text)}
              />
            </View>
          ))}
          {resultVisible && (
            <>
              <TouchableOpacity style={styles.button} onPress={calculateDebts}>
                <Text style={{ color: "white" }}>Calcular</Text>
              </TouchableOpacity>
              {results.length > 0 && (
                <View>
                  <Text style={styles.result}>Resultados:</Text>
                  {results.map((result, index) => (
                    <Text style={styles.answers} key={index}>
                      {" "}
                      {index + 1}){result}
                    </Text>
                  ))}
                </View>
              )}
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    paddingBottom:80,
  },
  input: {
    height: 60,
    borderColor: "#48e",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    width: 300,
    color: "#fff",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#48e",
    padding: 10,
    marginBottom: 10,
    borderRadius: 30,
  },
  mainDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: 300,
  },
  subDiv1: {
    marginRight: 10,
    width: 200,
    color: "#fff",
    borderColor: "#48e",
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
  },
  subDiv2: {
    flex: 1,
    color: "#fff",
    borderColor: "#48e",
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
  },
  answers: {
    fontSize: 20,
    color: "#fff",
    margin: 2,
  },
  result: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#48e",
    marginBottom: 10,
  },
});

export default BodyCalculate;
