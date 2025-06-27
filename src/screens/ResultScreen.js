import { Award } from 'lucide-react-native';
import React, { useState, useCallback } from 'react'; // Importar useState e useEffect
import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator, Alert } from 'react-native'; // Importar FlatList e ActivityIndicator
import Button from '../components/Button';
import { theme } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const ResultScreen = ({ route, navigation }) => {
  
  
  // Pega os parâmetros da rota, se existirem
  const immediateResult = route.params; 

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(!immediateResult);


  useFocusEffect(
    useCallback(() => {
      // Esta função será executada toda vez que a tela for focada
      const loadHistory = async () => {
        // Se estivermos na tela de histórico (sem resultado imediato), ativamos o loading.
        if (!immediateResult) {
            setLoading(true);
        }
        try {
          const storedResults = await AsyncStorage.getItem('@quiz_results');
          if (storedResults !== null) {
            const parsedResults = JSON.parse(storedResults);
            setHistory(parsedResults.reverse()); 
          }
        } catch (e) {
          console.error("Erro ao carregar o histórico.", e);
        } finally {
          // Desativamos o loading em qualquer caso ao final da operação.
          setLoading(false);
        }
      };
      
      loadHistory();
      
      // A função de limpeza do useCallback é opcional aqui, pois a operação é assíncrona e curta.
      return () => {}; 
    }, [immediateResult]) // A dependência garante que o callback se recrie se o modo da tela mudar.
  );

  
 const handleClearHistory = async () => {
    // Pede confirmação ao usuário
    Alert.alert(
      "Limpar Histórico",
      "Você tem certeza que deseja apagar todo o seu histórico de resultados? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Sim, Limpar Tudo", 
          onPress: async () => {
            try {
              // Remove o item do AsyncStorage
              await AsyncStorage.removeItem('@quiz_results');
              // Atualiza o estado para refletir a mudança na UI
              setHistory([]);
              // (Opcional) Mostra uma mensagem de sucesso
              Alert.alert("Sucesso", "Seu histórico foi limpo.");
            } catch (e) {
              console.error("Erro ao limpar o histórico.", e);
              Alert.alert("Erro", "Não foi possível limpar o histórico.");
            }
          },
          style: "destructive" // Estilo "destrutivo" para iOS (texto vermelho)
        }
      ]
    );
  };

  const renderResultItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyDate}>
        {new Date(item.date).toLocaleDateString('pt-BR')} - {new Date(item.date).toLocaleTimeString('pt-BR')}
      </Text>
      <Text style={styles.historyScore}>
        Você acertou {item.score} de {item.total}
      </Text>
    </View>
  );

  
  if (loading) {
    return <ActivityIndicator size="large" color={theme.colors.primary} style={{ flex: 1 }} />;
  }
  
  // Se for um resultado imediato, mostra a tela de parabéns
  if (immediateResult) {
    const { score = 0, total = 0 } = immediateResult;
    const percentage = total > 0 ? (score / total) * 100 : 0;
    let message = "";
    if (percentage >= 75) message = "Excelente trabalho!";
    else if (percentage >= 50) message = "Bom esforço! Continue praticando.";
    else message = "Não desanime, a prática leva à perfeição!";

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Award size={80} color={theme.colors.primary} />
          <Text style={styles.title}>Quiz Finalizado!</Text>
          <Text style={styles.score}>Você acertou {score} de {total}</Text>
          <Text style={styles.message}>{message}</Text>
          <Button title="Ver Histórico" onPress={() => navigation.push('Resultado')} variant="outline" />
          <View style={{height: 10}}/>
          <Button title="Voltar ao Início" onPress={() => navigation.popToTop()} />
        </View>
      </SafeAreaView>
    );
  }

  // Se não, mostra a tela de histórico
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.historyTitle}>Histórico de Resultados</Text>
      {history.length === 0 ? (
        <View style={styles.container}>
           <Text style={styles.message}>Você ainda não completou nenhum quiz.</Text>
        </View>
       
      ) : (
        <FlatList
          data={history}
          renderItem={renderResultItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ padding: theme.spacing.md }}
        />
      )}
       
      <View style={styles.bottomButtonContainer}>
         {history.length > 0 && ( // Só mostra o botão de limpar se houver histórico
            <>
              <Button title="Limpar Histórico" onPress={handleClearHistory} variant="outline" />
              <View style={{height: 10}}/>
            </>
         )}
         <Button title="Voltar ao Início" onPress={() => navigation.navigate("InicioStack")} />
       </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: theme.spacing.xl },
  title: { ...theme.typography.h1, marginVertical: theme.spacing.md, color: theme.colors.text },
  score: { fontSize: 22, color: theme.colors.textSecondary },
  message: { fontSize: 18, textAlign: 'center', color: theme.colors.textSecondary, marginTop: theme.spacing.sm, marginBottom: theme.spacing.xl },
  // Estilos para o histórico
  historyTitle: { ...theme.typography.h2, textAlign: 'center', marginVertical: theme.spacing.lg },
  historyItem: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 5,
    borderLeftColor: theme.colors.primary,
  },
  historyDate: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  historyScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.xs,
  },
});

export default ResultScreen;