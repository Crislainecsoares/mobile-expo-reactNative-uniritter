import React, { Component, useState } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  Alert,
  removeStorageToken,
  Image,
} from 'react-native';

import api from '../services/api';

import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';

export default class Menu extends Component {
  state = {
    loggedInAluno: null,
    errorMessage: null,
  };

  logado = async () => {
    const { aluno, token } = response.data;

    await AsyncStorage.multiSet([
      ['@CodeApi:token', token],
      ['@CodeApi:aluno', JSON.stringify(aluno)],
    ]);

    this.setState({ loggedInAluno: aluno });

    {
      this.setState({ errorMessage: response.data.error })
    }

  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('@CodeApi:token');
    const aluno = JSON.parse(await AsyncStorage.getItem('@CodeApi:aluno'));

    if (token && aluno)
      this.setState({ loggedInAluno: aluno });

  }

  logout = async () => {
    await AsyncStorage.removeItem('@CodeApi:token'),
      this.props.navigation.navigate('Home')
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../pages/LOGO.jpg')}
          style={styles.logo}
        />

        <Text >Olá</Text>
        {!!this.state.loggedInAluno && <Text style={{ fontWeight: 'bold', marginTop: 15 }}>{this.state.loggedInAluno.nome}</Text>}
        {!!this.state.errorMessage && <Text style={{ fontWeight: 'bold', marginTop: 15 }}>{this.state.errorMessage}</Text>}

        <Text style={{ marginTop: 15 }}> O que deseja fazer? </Text>

        <Button
          title="Checkin"
          onPress={() => { this.props.navigation.navigate('Checkin') }}
        />

        <Button
          title="Checkout"
          onPress={() => { this.props.navigation.navigate('Checkout') }}
        />

        <Button
          title="Sair"
          onPress={this.logout}
        />

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});