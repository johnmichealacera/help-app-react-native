import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Department from './components/Department';
import CustomModal from './components/Modal';
interface SelectedTabProps {
  selectedTab: string;
}

const SelectedTab: React.FC<SelectedTabProps> = ({selectedTab}) => {
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    setResetKey(prevKey => prevKey + 1);
  }, [selectedTab]);

  switch (selectedTab) {
    case 'A':
      return <Department key={resetKey} department="hospital" />;
    case 'B':
      return <Department key={resetKey} department="fire" />;
    case 'C':
      return <Department key={resetKey} department="police" />;
    case 'D':
      return <Department key={resetKey} department="MDRRMO" />;
    case 'E':
      return <Department key={resetKey} department="PCG" />;
    default:
      return <Department key={resetKey} department="hospital" />;
  }
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('');
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text style={styles.titleHeading}>Socorro Community Help App</Text>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.tabStyle}>
            <Button title="Hospital" onPress={() => setSelectedTab('A')} />
            <Button title="Fire" onPress={() => setSelectedTab('B')} />
            <Button title="Police" onPress={() => setSelectedTab('C')} />
            <Button title="MDRRMO" onPress={() => setSelectedTab('D')} />
            <Button title="PCG" onPress={() => setSelectedTab('E')} />
          </View>
          <SelectedTab selectedTab={selectedTab} />
          <View
            style={{backgroundColor: isDarkMode ? Colors.black : Colors.white}}>
            <Button
              title="Submit Report"
              onPress={() => setModalVisible(true)}
            />
            <CustomModal modalVisible={modalVisible} closeModal={closeModal} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  tabStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleHeading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
