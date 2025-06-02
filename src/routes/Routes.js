// Routes.js
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaPrincipal from '../screens/TelaPrincipal.js'
import Contato from '../screens/Contato.js'
import Instituicao from '../screens/Instituicao.js';
import icon from '../../assets/icon.png'

const Stack = createNativeStackNavigator();

export default function Routes() {

  function LogoTitle() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight:'bold'}}>Mais sobre a UTFPR</Text>
      <Image
        style={{ width: 60, height: 60, left:100 }}
        source={icon}
      />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaPrincipal">
        <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
        <Stack.Screen name="Contato" component={Contato} options={{
          headerShadowVisible:false,
          headerTitle:'Contato Prisma',
          headerTitleStyle:{
            fontFamily: 'DMSansSemiBold',
            fontWeight: 'bold'
          }
        }} />
        <Stack.Screen name="Instituicao" component={Instituicao} options={{
          headerShadowVisible:false,
          headerTitle:'Mais sobre a UTFPR',
          headerTitleStyle:{
            fontFamily: 'DMSansSemiBold',
            fontWeight: 'bold'
          },
          headerTitle: (props) => <LogoTitle {...props} />
                  }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
