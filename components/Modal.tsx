import axios from 'axios';
import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

interface CustomModalProps {
  modalVisible: boolean;
  closeModal: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  modalVisible,
  closeModal,
}) => {
  const [name, setName] = useState('');
  const [contactNumber, setContact] = useState('');
  const [description, setDescription] = useState('');

  const onChangeName = (inputName: string) => {
    setName(inputName);
  };

  const onChangeContact = (inputContact: string) => {
    setContact(inputContact);
  };

  const onChangeDescription = (inputDescription: string) => {
    setDescription(inputDescription);
  };

  const data = [
    {label: 'Fire', value: 'fire'},
    {label: 'Hospital', value: 'hospital'},
    {label: 'Police', value: 'police'},
    {label: 'MDRRMO', value: 'MDRRMO'},
    {label: 'PCG', value: 'PCG'},
  ];
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!name || !description || !selectedDepartment || !contactNumber) {
        throw new Error('Missing or empty required fields');
      }
      const reportData = {
        name,
        description,
        department: selectedDepartment,
        contactNumber,
      };
      await axios.post(
        'https://help-app-backend.onrender.com/reports',
        reportData,
      );
      setName('');
      setContact('');
      setDescription('');
      setSelectedDepartment('');
      Alert.alert('Success', 'Report submitted successfully');
      closeModal();
    } catch (e: any) {
      Alert.alert('Error', `Failed to submit report: ${e.message}`);
    }
  };

  const renderDropdownItem = (item: any) => {
    return (
      <View style={styles.dropdownItem}>
        <Text style={styles.dropdownItemText}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeading}>Create Report Form</Text>

          <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeName}
              value={name}
              placeholder="Enter your name"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Contact #:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeContact}
              value={contactNumber}
              placeholder="Enter your contact number"
              placeholderTextColor="gray"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.textArea}
              onChangeText={onChangeDescription}
              value={description}
              placeholder="Enter report description"
              placeholderTextColor="gray"
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Department:</Text>
            <Dropdown
              // eslint-disable-next-line react-native/no-inline-styles
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={selectedDepartment}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSelectedDepartment(item.value);
                setIsFocus(false);
              }}
              renderItem={renderDropdownItem}
            />
          </View>

          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                closeModal();
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonSubmit]}
              onPress={handleSubmit}>
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#333',
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
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'white',
  },
  textArea: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    color: 'white',
  },
  picker: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonSubmit: {
    backgroundColor: '#4CAF50',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    padding: 16,
    width: 300,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#555',
    color: 'white',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#333',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'white',
    backgroundColor: '#444',
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: '#333',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    fontSize: 16,
    color: 'white',
  },
});

export default CustomModal;
