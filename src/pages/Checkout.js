import React, { Component, useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    Image,
    FlatList,

} from 'react-native';

import api from '../services/api';

export default class Checkout extends Component {
    state = {
        checkout: [],
    };

    onRequest = async () => {
        try {
            const res = await api.post('http://192.168.0.14:3333/checkout', { ...this.state.checkout })

            Alert.alert('Checkout Efetuado com sucesso');

            this.props.navigation.navigate('Checkout')

            return res.data;

        } catch (error) {
            console.log('erro', error)
        }
    }

    getCheckoutList = async () => {
        try {
            const response = await api.get('/checkout');

            const { checkout } = response.data;

            this.setState({ checkout });
        } catch (response) {
            this.setState({ errorMessage: response.data.error })
        }

    };

    _renderItem = ({ item }) => (
        <TouchableOpacity >
            <View style={styles.item}>
                <Text>{item.createdAt}</Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        return (

            <View style={styles.container}>
                <Image
                    source={require('../pages/LOGO.jpg')}
                    style={styles.logo}
                />

                <Text style={{ fontWeight: 'bold', marginTop: 15 }} >O que deseja fazer?</Text>



                {this.state.checkout.map(checkout => (
                    <View style={styles.listItem}>
                        <FlatList
                            data={this.state.checkout}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index}
                        />

                    </View>

                ))}

                <TouchableOpacity
                    style={styles.botao}
                    onPress={this.onRequest}>
                    <Text>Realizar Checkout</Text>
                    <Image
                        source={require('../pages/checkout.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botao}
                    onPress={this.getCheckoutList}>
                    <Text>Visualizar histórico de Checkout</Text>
                    <Image
                        source={require('../pages/historico.png')}
                    />
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
    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        backgroundColor: '#EEE',
        marginTop: 20,
        padding: 30,
    },
    botao: {
        width: 300,
        height: 60,
        marginTop: 20,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    item: {
        borderBottomWidth: 1,
        borderStartColor: '#EEE',
    },
});