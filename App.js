/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Button, TextInput } from 'react-native-windows';

const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // To keep state of textBox for saving it into async
  const [state, setState] = useState();

  // To store all added values into async-storage
  const [stateData, setStateData] = useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // To keep string value from textBox
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', state)
    } catch (e) {
      // saving error
      console.error(e);
    }
  }

  // To keep object from textBox
  const storeDataObj = async (value) => {
    try {
      setStateData([...stateData, state]);
      const jsonValue = JSON.stringify(stateData)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
      console.error(e);
    }
  }

  // To retrieve string value from async-storage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        // value previously stored
        setStateData([...stateData, value]);
      }
    } catch (e) {
      // error reading value
      console.error(e);
    }
  }

  // To retrieve object from async-storage
  const getDataObj = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      console.log(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
      console.error(e);
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="HP technical task:">
          </Section>
          {/* textBot for getting input from user */}
          <TextInput onChangeText={setState} value={state}></TextInput>
          <View style={{marginTop: 20}}>
            {/* to save given input into async-storage */}
            <Button title='Save data' onPress={storeDataObj}></Button>
            <Button title='Get data on console' onPress={getDataObj}></Button>
          </View>
          <View style={{marginTop: 20}}>
            <ScrollView>{stateData.map((value, index) => <Text style={styles.dataSet} key={index}>{value}</Text>)}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  dataSet: {
    fontSize: 16,
    color: 'blue', 
    fontWeight: 'bold', 
    textAlign: 'center'
  }
});

export default App;
