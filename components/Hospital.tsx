import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Hospital() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://help-app-backend.onrender.com/hospital',
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
          uri: 'https://w7.pngwing.com/pngs/537/385/png-transparent-health-care-hospital-clinic-emergency-department-health-products-text-logo-sign.png',
        }}
      />
      <Text style={styles.paragraph}>{data}</Text>
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
