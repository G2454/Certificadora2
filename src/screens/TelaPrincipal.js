
import { Menu } from 'lucide-react-native';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';
import Logo from "../../assets/icon.png"
const TelaPrincipal = ({ navigation }) => {
  const topic = 'Análise de Circuitos'; 

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Menu size={28} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Início</Text>
          <Image
            source={Logo}
            style={styles.headerLogo}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>E aí vestibulando.{"\n"}Pronto para hoje?</Text>

          <TouchableOpacity 
            style={styles.mainTopicCard}
            onPress={() => navigation.navigate('Quiz', { subject: topic })}
          >
            <Text style={styles.mainTopicCardText}>{topic}</Text>
            <Text style={styles.startQuizText}>Iniciar Quiz →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingTop: '12%', 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  headerLogo: {
    width: 32,
    height: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  mainTopicCard: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  mainTopicCardText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  startQuizText: {
    fontSize: 16,
    color: theme.colors.white,
    opacity: 0.8,
    marginTop: theme.spacing.sm,
  },
});

export default TelaPrincipal;



/*
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

*/