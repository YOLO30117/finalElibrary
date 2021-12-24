import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
} from 'react-native';

import firebase from 'firebase';

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            password: '',
        };
    }

    login = async (email, password) => {
        if (email && password) {
            try {
                const response = await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    this.props.navigation.navigate("Screen2")
                }

            }
            catch (error) {
                switch(error.code){
                    case "auth/user-not-found":
                         alert("user does not exist")
                         break;
                    case "auth/invalid-email":
                        alert("incorrect email or password")
                        break
                }
            }
        }
        else {
            alert("Enter email and password")
        }
    };
    render() {
        return (
            <KeyboardAvoidingView>
                <View style={styles.container}>
                    <View>
                        <Image
                            source={require('../assets/booklogo.jpg')}
                            style={{ width: 200, height: 200 }}
                        />
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 30,
                                fontFamily: 'comic sans ms',
                            }}>
                            WILY
            </Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.loginBox}
                            placeholder="Example : abc@gmail.com"
                            keyboardType="email-address"
                            onChangeText={(info) => {
                                this.setState({
                                    emailId: info,
                                })
                            }}
                        />
                        <TextInput
                            style={styles.loginBox}
                            placeholder="Enter your password"
                            secureTextEntry={true}
                            onChangeText={(info) => {
                                this.setState({
                                    password: info,
                                })
                            }}
                        />
                    </View>

                    <View>
                        <TouchableOpacity
                            style={styles.loginBox}
                            onPress={() => { this.login(this.state.emailId, this.state.password) }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'comic sans ms' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e3fdfd',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 90,
    },
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        borderRadius: 10,
        fontSize: 16,
        margin: 20,
        paddingLeft: 10,
        fontFamily: 'comic sans ms',
    },
    loginButton: {
        height: 30,
        width: 90,
        borderWidth: 1,
        marginTop: 20,
        paddingTop: 5,
        borderRadius: 7,
    },
});
