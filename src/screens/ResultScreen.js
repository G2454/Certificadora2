import { Award } from 'lucide-react-native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { theme } from '../constants/theme';

const ResultScreen = ({ route, navigation }) => {
  const { score, total } = route.params;
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
        <Button title="Voltar ao Início" onPress={() => navigation.navigate('TelaPrincipal')} />
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
});
export default ResultScreen;