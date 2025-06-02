// screens/HomeScreen.js
import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Contato</Text>
      <Button
        title="Contato"
        onPress={() => navigation.navigate('Contato')}
      />
    <Text>Sobre a Instituicao</Text>
    <Button
        title="Instituicao"
        onPress={() => navigation.navigate('Instituicao')}
      />
    </View>
  );
}

const styles = StyleSheet.create({});