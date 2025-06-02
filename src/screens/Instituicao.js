// screens/HomeScreen.js
import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import utfprLogo from '../../assets/CPUTFPR.png'
import { Feather } from '@expo/vector-icons';

export default function Instituicao({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={{top:'-20%'}}>
            <Image source={utfprLogo}/>
            <View style={{width:'80%'}}>
            <Text style={{fontWeight:'bold', fontSize:16, marginTop:'-30'}}>A Universidade Tecnológica Federal do Paraná é referência em ensino, pesquisa e extensão. Com cursos gratuitos e estrutura de qualidade, ela pode ser o seu próximo passo depois do Prisma.</Text>
            </View>
            <TouchableOpacity style={{ top: 50, justifyContent: 'center', alignItems: 'center' }}>
  <View style={styles.button}>
    <Feather name="paperclip" size={20} color="black" style={{ marginRight: 8 }} />
    <Text style={styles.buttonText}>Ver cursos e vestibular</Text>
  </View>
</TouchableOpacity>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor:'white'
    },
    button: {
        backgroundColor: 'rgba(203, 201, 212, 0.5)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 60,
        width: 300,
        paddingHorizontal: 16,
      },
      
      buttonText: {
        fontSize: 20,
        fontFamily: 'DMSansRegular',
        textAlignVertical: 'center',
      }
});