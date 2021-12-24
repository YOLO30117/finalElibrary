import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import db from '../config';
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      allTransactions: [],
      lastVisibleTransaction: null,
      search: '',
    }
  }
  componentDidMount = async () => {
    // const query = await db.collection("transaction").get();
    // query.docs.map((doc) => {
    //   this.setState({
    //     allTransactions: [...this.state.allTransactions, doc.data()],
    //   })
    // })
  }
  fetchMoreTransactions = async () => {
    var text = this.state.search.toUpperCase();
    var enteredtext = text.split('');
    if (enteredtext[0].toUpperCase() === 'B') {
      const t = await db
        .collection('transaction')
        .where('bookId', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();


      t.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    } else if (enteredtext[0].toUpperCase() === 'S') {
      const t = await db
        .collection('transaction')
        .where('studentId', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();
      t.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    }


      // const query = await db.collection("transaction").startAfter(this.state.lastVisibleTransaction).limit(10).get();
      // query.docs.map((doc) => {
      //     this.setState({
      //         allTransactions: [...this.state.allTransactions, doc.data()],
      //         lastVisibleTransaction: doc,

      //     })
      // })
    }
    searchTransactions = async (txt1) => { // bk001
      var enteredtext = txt1.split("")  
      if (enteredtext[0].toUpperCase() ==='B'){
        const t = await db
          .collection("transaction")
          .where("bookId", "==", txt1)
          .get()

        t.docs.map((doc) => {
          this.setState({
            allTransactions: [...this.state.allTransactions, doc.data()],
            lastVisibleTransaction: doc,
          });
        });
      }
      else if (enteredtext[0].toUpperCase() === 'S') {
        const t = await db
          .collection("transaction")
          .where("studentId", "==", txt1)
          .get()
        // ... is called spread operator
        t.docs.map((doc) => {
          this.setState({
            allTransactions: [...this.state.allTransactions, doc.data()],
            lastVisibleTransaction: doc,
          });
        });
      }
    }


    render() {
      return (
        <SafeAreaProvider>
          <View style={styles.container}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.bar}
                placeholder={"Enter book or student ID"}
                onChangeText={(txt) => {
                  this.setState({
                    search: txt,
                  })
                }}
              />

              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => this.searchTransactions(this.state.search)}>
                <Text> Search </Text>
              </TouchableOpacity>

            </View>

            <FlatList
              data={this.state.allTransactions}
              renderItem={({ item }) => (
                <View style={{ borderWidth: 2, borderColor: 'coral', padding: 12, margin: 10 }}>
                  <Text> {"Book Id : " + item.bookId}</Text>
                  <Text> {"Student Id : " + item.studentId}</Text>
                  <Text> {"Transaction Type : " + item.transactionType}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this.fetchMoreTransactions}
              onEndReachedThreshold={0.7}

            />
            {/*
          <ScrollView>
            {this.state.allTransactions.map((  t , index) => {
              return (
                <View key={index} style={{ borderWidth: 2, borderColor: 'coral', padding: 12, margin: 10 }}>
                  <Text> {"Book Id : " + t.bookId}</Text>
                  <Text> {"Student Id : " + t.studentId}</Text>
                  <Text> {"Transaction Type : " + t.transactionType}</Text>
                 
                </View>
              )
            })
            }
          </ScrollView> */}
          </View>
        </SafeAreaProvider>
      )
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
    searchBar: {
      flexDirection: 'row',
      height: 40,
      width: 'auto',
      borderWidth: 0.5,
      alignItems: 'center',
      backgroundColor: '#ffe2e2',
    },
    bar: {
      borderWidth: 2,
      height: 30,
      width: 300,
      paddingLeft: 10,
    },
    searchButton: {
      borderWidth: 1,
      height: 30,
      width: 70,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#14ffec',
      padding: 10,
      borderRadius: 8,
      margin: 10,
    },
  });