import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Police() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://help-app-backend.onrender.com/police',
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
          uri: 'https://images-platform.99static.com//g_uKQ2EAEVayJc4-FsVZqWqSJ-k=/313x176:974x837/fit-in/500x500/projects-files/105/10503/1050361/b3313396-fb21-4890-bbb2-ded65e0e2092.png',
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
