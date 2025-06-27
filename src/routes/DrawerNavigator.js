import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import do StackNavigator
import StackNavigator from './StackNavigator'; 

// Import das telas
import ResultScreen from '../screens/ResultScreen';
import Instituicao from '../screens/Instituicao';
import Contato from '../screens/Contato';


const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="InicioStack">
      
      <Drawer.Screen 
        name="InicioStack" // Nome interno da rota
        component={StackNavigator} 
        options={{ 
          title: 'Início', // Texto que aparece no menu
          headerShown: false // Esconde o header duplicado do drawer
        }}
      />
      
      <Drawer.Screen 
        name="ResultScreen" 
        component={ResultScreen}
        options={{ title: 'Progresso' }}
      />

      <Drawer.Screen 
        name="Instituicao" 
        component={Instituicao}
        options={{ title: 'Mais sobre a UTFPR' }}
      />

      <Drawer.Screen 
        name="Contato" 
        component={Contato}
        options={{ title: 'Contato Prisma' }}
      />
      
    </Drawer.Navigator>
  );
}