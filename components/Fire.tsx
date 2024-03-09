import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Fire() {
  function onPress() {
    Alert.alert('Need help with fire department?');
  }

  const [data, setData] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://help-app-backend.onrender.com/fire',
      );

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://www.shutterstock.com/image-vector/fire-department-emblem-st-florian-600w-1670841109.jpg',
        }}
      />
      <Text style={styles.paragraph}>{data}</Text>
      <Button
        onPress={onPress}
        title="The fire department is here!"
        color="#841584"
        accessibilityLabel="Learn more about fire department"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
