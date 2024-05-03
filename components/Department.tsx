import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Button, Text} from 'react-native';
import axios from 'axios';
import fireImage from '../public/fire.png';
import policeImage from '../public/police.png';
import hospitalImage from '../public/hospital.png';

const Department = ({department}: {department: string}) => {
  const [data, setData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://help-app-backend.onrender.com/announcements/${department}`,
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    setCurrentIndex(0);
  }, [department]);

  const onNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const onPrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1,
    );
  };

  const getImageForDepartment = (departmentImage: string) => {
    switch (departmentImage) {
      case 'fire':
        return fireImage;
      case 'police':
        return policeImage;
      case 'hospital':
        return hospitalImage;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.tinyLogo}
          source={getImageForDepartment(department)}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{data[currentIndex]?.subject}</Text>
        <Text style={styles.date}>{data[currentIndex]?.date}</Text>
        <Text style={styles.description}>
          {data[currentIndex]?.description}
        </Text>
        <View style={styles.buttonContainer}>
          <Button onPress={onPrevious} title="Previous" />
          <Button onPress={onNext} title="Next" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },
});

export default Department;
