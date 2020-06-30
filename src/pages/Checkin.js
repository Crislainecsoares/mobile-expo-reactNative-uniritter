import React, { Component, useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Alert,
    FlatList,
    TouchableOpacity,
    Image,

} from 'react-native';

import api from '../services/api';

export default class Checkin extends Component {
    state = {
        isLoading: true,
        checkin: [],

    };

    onRequest = async () => {
        try {
            const res = await api.post('http://192.168.0.14:3333/checkin', { ...this.state.checkin })

            Alert.alert('Checkout Efetuado com sucesso');

            this.props.navigation.navigate('Checkin')
            return res.data;

        } catch (error) {
            console.log('erro', error)
        }
    }

    getCheckinList = async () => {
        try {
            const response = await api.get('/checkin');

            const { checkin } = response.data;

            this.setState({ checkin });
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

                {this.state.checkin.map(checkin => (
                    <View style={styles.listItem}>
                        <FlatList
                            data={this.state.checkin}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                ))}
                <TouchableOpacity
                    style={styles.botao}
                    onPress={this.onRequest}>
                    <Text>Realizar Checkin</Text>
                    <Image
                        source={require('../pages/checkin.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botao}
                    onPress={this.getCheckinList}>
                    <Text>Visualizar histórico de Checkin</Text>
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