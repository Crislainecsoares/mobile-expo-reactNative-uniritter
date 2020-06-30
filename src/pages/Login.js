import React, { Component, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import api from '../services/api';

export default class Login extends Component {
  state = {
    loggedInAluno: null,
    errorMessage: null,
    matricula: '',
    password: '',
  };

  signIn = async () => {
    try {
      const response = await api.post('http://192.168.0.14:3333/login', { ...this.state })

      const { aluno, token } = response.data;

      await AsyncStorage.multiSet([
        ['@CodeApi:token', token],
        ['@CodeApi:aluno', JSON.stringify(aluno)],
      ]);

      this.setState({ loggedInAluno: aluno });

      this.props.navigation.navigate('Menu')

    } catch (response) {
      this.setState({ errorMessage: response.data.error })
    }

  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('@CodeApi:token');
    const aluno = JSON.parse(await AsyncStorage.getItem('@CodeApi:aluno'));

    if (token && aluno)
      this.setState({ loggedInAluno: aluno });

  }

  render() {

    if (this.state.loggedInAluno) {
      return (

        <View style={styles.container}>
          <Image
            source={require('../pages/LOGO.jpg')}
            style={styles.logo}
          />
          <Text style={styles.texto}>Olá</Text>
          {!!this.state.loggedInAluno && <Text style={styles.texto, { fontWeight: 'bold', }}>{this.state.loggedInAluno.nome}</Text>}
          <TouchableOpacity
            style={styles.botao}
            onPress={() => { this.props.navigation.navigate('Menu') }}>
            <Text>Vamos começar?</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
        >
          <View style={styles.container}>
            <Image
              source={require('../pages/LOGO.jpg')}
              style={styles.logo}
            />
            <Text style={{ fontWeight: 'bold', marginTop: 15 }} >Informe seus dados para acesso a plataforma:</Text>
            {!!this.state.errorMessage && <Text style={{ marginTop: 15}}>{this.state.errorMessage}!</Text>}
            <TextInput
              style={styles.input}
              placeholder="Informe sua matricula"
              value={this.state.matricula}
              onChangeText={(text) => this.setState({ matricula: text })}
              autoCapitalize="none"
              onSubmitEditing={() => { this.secondTextInput.focus(); }}
            >
            </TextInput>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
              ref={(input) => { this.secondTextInput = input; }}
              placeholder="Informe sua Senha"
            >
            </TextInput>
            <TouchableOpacity
              style={styles.botao}
              onPress={this.signIn}>
              <Text>Entrar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    marginTop: 15,
    width: 300,
    backgroundColor: '#FFF',
    fontSize: 16,
    borderBottomEndRadius: 3,
    padding: 10,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  botao: {
    width: 300,
    height: 42,
    backgroundColor: '#e60000',
    marginTop: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    marginTop: 15,

  }
});