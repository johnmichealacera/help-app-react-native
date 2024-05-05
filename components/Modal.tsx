import axios from 'axios';
import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
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
      closeModal();
    } catch (e) {
      console.error(e);
    }
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
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Contact #:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeContact}
              value={contactNumber}
              placeholder="Enter your contact number"
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
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Department:</Text>
            <Dropdown
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
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
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
    backgroundColor: 'white',
    padding: 16,
    width: 300,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CustomModal;
