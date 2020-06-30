import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';


export default class Home extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../pages/LOGO.jpg')}
                    style={styles.logo}
                />
                <Text style={{ fontWeight: 'bold', marginTop: 15 }} >Bem Vindo a Uniritter</Text>
                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => { this.props.navigation.navigate('Login') }}>
                    <Text>Iniciar</Text>
                </TouchableOpacity>

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
    botao: {
        width: 300,
        height: 42,
        backgroundColor: '#e60000',
        marginTop: 20,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    }
});