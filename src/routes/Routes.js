// Routes.js
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaPrincipal from '../screens/TelaPrincipal.js'
import Contato from '../screens/Contato.js'
import Instituicao from '../screens/Instituicao.js';
import QuizScreen from '../screens/QuizScreen.js';
import ResultScreen from '../screens/ResultScreen.js';
import icon from '../../assets/icon.png'
import { theme } from '../constants/theme.js';

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
        <Stack.Screen name="TelaPrincipal" component={TelaPrincipal}
        options={
          {
            headerShown:false
          }
        }
        />
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
  <Stack.Screen 
            name="Quiz" 
            component={QuizScreen} 
            options={{ 
              headerShown: true, 
              title: 'Questão',
              headerStyle: { 
                backgroundColor: theme.colors.background,
                elevation: 0, 
                shadowOpacity: 0,
              },
              headerTintColor: theme.colors.text,
              headerRight: () => (
                <Image
                  source={icon}
                  style={{width: 32,height: 32,marginRight: theme.spacing.md}}
                />
              ),
            }} 
          />
        <Stack.Screen name="Resultado" component={ResultScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
