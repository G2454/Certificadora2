// screens/DetailsScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import logo from '../../assets/icon.png'

export default function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={[styles.LogoArea, {top:'-30%'}]}>
            <Image source={logo}  style={{alignItems:'center'}}/>
                <Text style={{textAlign:'center', fontWeight: 'bold', top:-30, fontFamily: 'DMSansRegular'}}>PRISMA</Text>
                <Text style={{textAlign:'center', top:-30, fontWeight: 'bold', fontFamily: 'DMSansRegular'}}>Cursos Preparatórios</Text>
        </View>
        <View style={{top:'-15%', width:'100%', marginLeft:'10%'}}>
            <Text style={{fontSize: 22, width:'100%', fontWeight:'bold', fontFamily:'DMSansSemiBold'}}>Informações de Contato</Text>
            <Text style={{top:10, fontSize:18}}>Instagram: @prisma.utfprcp</Text>
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
    titleLogo:{
        textAlign:'center', 
        fontWeight: 'bold', 
        top:-30, 
        fontFamily: 'DMSansRegular'
    }
})
