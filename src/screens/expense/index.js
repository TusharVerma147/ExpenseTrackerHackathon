import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    TextInput,
    FlatList,
    Alert,
    Image
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { Calendar } from 'react-native-calendars';
  import CustomButton from '../../components/customButton';
  import { Icons } from '../../assets';
  
  const width = Dimensions.get('window').width;
  
  const Expense = ({ navigation }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [category, setCategory] = useState('');
    const [categoryModal, setCategoryModal] = useState(false);
    const [amount, setAmount] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
  
    const data = ['Food', 'Transport', 'Shopping', 'Education', 'Others'];
  
    useEffect(() => {
      const loadExpenses = async () => {
        try {
          const existingExpenses = await AsyncStorage.getItem('expenses');
          if (existingExpenses) {
            setExpenses(JSON.parse(existingExpenses));
          }
        } catch (error) {
          console.error(error);
        }
      };
      loadExpenses();
    }, []);
  
    const handleCategorySelect = (item) => {
      setCategory(item);
      setCategoryModal(false);
    };
  
    const handlelist = () => {
      setCategoryModal(!categoryModal);
    };
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleAddExpense = async () => {
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        Alert.alert('Invalid Amount', 'Please enter a valid amount greater than zero.');
        return;
      }
  
      const expense = {
        category,
        date: selectedDate,
        amount: parseFloat(amount),
      };
  
      try {
        const existingExpenses = await AsyncStorage.getItem('expenses');
        const expensesList = existingExpenses ? JSON.parse(existingExpenses) : [];
        if (editingIndex !== null) {
 
          expensesList[editingIndex] = expense;
        } else {
          
          expensesList.push(expense);
        }
        await AsyncStorage.setItem('expenses', JSON.stringify(expensesList));
        setExpenses(expensesList);
        Alert.alert('Success', editingIndex !== null ? 'Expense updated successfully!' : 'Expense added successfully!');
        resetForm();
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to save expense. Please try again.');
      }
    };
  
    const resetForm = () => {
      setCategory('');
      setSelectedDate('');
      setAmount('');
      setEditingIndex(null);
    };
  
    const handleDeleteExpense = async (index) => {
      const updatedExpenses = expenses.filter((_, i) => i !== index);
      try {
        await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        setExpenses(updatedExpenses);
        Alert.alert('Success', 'Expense deleted successfully!');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to delete expense. Please try again.');
      }
    };
  
    const handleEditExpense = (index) => {
      const expense = expenses[index];
      setCategory(expense.category);
      setSelectedDate(expense.date);
      setAmount(expense.amount.toString());
      setEditingIndex(index);
    };
  
    const totalIncome = expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
  
        <View style={styles.headerparent}>
          <View style={styles.header}>
            <Text style={styles.track1}>Manage your Expenses</Text>
          </View>
        </View>
  
        <ScrollView style={styles.content}>
          <View style={styles.selectview}>
            <Text style={styles.select}>Select Category -:</Text>
            <View style={styles.search}>
              <TouchableOpacity onPress={handlelist}>
                <Image
                  source={Icons.menu}
                  style={{ height: 20, width: 20, tintColor: 'black' }}
                />
              </TouchableOpacity>
  
              <TextInput
                placeholder="Category"
                value={category}
                style={{ padding: 15, fontSize: 15, color: 'black', flex: 1 }}
                editable={false}
              />
            </View>
            {categoryModal && (
              <View style={styles.listContainer}>
                <FlatList
                  data={data}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleCategorySelect(item)}>
                      <Text style={styles.data}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            <Text style={styles.select}>Select Date -:</Text>
            <View style={styles.search}>
              <TouchableOpacity onPress={showDatePicker}>
                <Image
                  source={Icons.calendar}
                  style={{ height: 20, width: 20, tintColor: 'black' }}
                />
              </TouchableOpacity>
              {isDatePickerVisible && (
                <Calendar
                  onDayPress={day => {
                    setSelectedDate(day.dateString);
                    setDatePickerVisibility(false);
                  }}
                  markedDates={{
                    [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                  }}
                />
              )}
              <TextInput
                placeholder="Date"
                style={{ padding: 15, fontSize: 15, color: 'black' }}
                value={selectedDate}
                editable={false}
              />
            </View>
            <Text style={styles.select}>Income to be added -:</Text>
            <View style={styles.search}>
              <TouchableOpacity>
                <Image
                  source={Icons.money}
                  style={{ height: 30, width: 30, tintColor: 'black' }}
                />
              </TouchableOpacity>
              <TextInput
                placeholder="Amount"
                style={{ padding: 15, fontSize: 15, color: 'black', flex: 1 }}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={{ paddingHorizontal: 130 }}>
            <CustomButton
              title={editingIndex !== null ? "Update" : "Add"}
              onPress={handleAddExpense}
              style={{ marginTop: 20 }}
              textStyle={{ fontWeight: '700' }}
              borderRadius={50}
              backgroundColor={'#c6e1a7'}
              textColor='black'
            />
          </View>
          {expenses.length > 0 && (
            <View style={styles.expenseListContainer}>
              <Text style={styles.expenseListTitle}>Added Expenses:</Text>
              <FlatList
                data={expenses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.expenseItem}>
                    <Text style={styles.expenseText}>Category: {item.category}</Text>
                    <Text style={styles.expenseText}>Date: {item.date}</Text>
                    <Text style={styles.expenseText}>Amount: ₹{item.amount.toFixed(2)}</Text>
                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity onPress={() => handleEditExpense(index)}>
                        <Text style={styles.editText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDeleteExpense(index)}>
                        <Text style={styles.deleteText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Expenses: ₹{totalIncome}</Text>
          </View>
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#292929',
    },
    headerparent: {
      backgroundColor: '#292929',
      paddingTop: 80,
      paddingBottom: 20,
    },
    header: {
      alignItems: 'center',
    },
    track1: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    content: {
      padding: 20,
    },
    selectview: {
      marginBottom: 20,
    },
    select: {
      color: 'white',
      fontSize: 20,
      marginBottom: 5,
      fontWeight: '700',
    },
    search: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 20,
    },
    listContainer: {
      maxHeight: 150,
      backgroundColor: '#fff',
      borderRadius: 5,
      marginTop: 5,
    },
    data: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    expenseListContainer: {
      marginBottom: 20,
      marginTop:20
    },
    expenseListTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 10,
    },
    expenseItem: {
      backgroundColor: '#c6e1a7',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    expenseText: {
      color: 'black',
      fontSize: 16,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    editText: {
      color: '#007BFF',
      fontSize: 16,
      fontWeight: '700',
    },
    deleteText: {
      color: '#FF0000',
      fontSize: 16,
      fontWeight: '700',
    },
    totalContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    totalText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '700',
    },
  });
  
  export default Expense;
  