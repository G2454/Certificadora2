// eslint-disable
// @ts-nocheck
import { CheckCircle, Circle, XCircle } from 'lucide-react-native';
import { useEffect, useState} from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, LogBox } from 'react-native';
import Button from '../components/Button';
import { theme } from '../constants/theme';
import { getQuestionsBySubject } from '../services/quizService';
import AsyncStorage from '@react-native-async-storage/async-storage';

   LogBox.ignoreAllLogs(true); // This will suppress all log notifications (yellow boxes) in Expo


const QuizScreen = ({ route, navigation }) => {
  const { subject } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);


  const Alternative = ({ text, onPress, state = 'default' }) => {
    const getContainerStyle = () => { switch (state) { case 'selected': return { borderColor: theme.colors.primary, backgroundColor: '#E6F2FF' }; case 'correct': return { borderColor: theme.colors.success, backgroundColor: '#EAF9E9' }; case 'incorrect': return { borderColor: theme.colors.danger, backgroundColor: '#FFEBEA' }; default: return { borderColor: theme.colors.secondary }; } };
    const getIcon = () => { switch (state) { case 'correct': return <CheckCircle color={theme.colors.success} size={24} />; case 'incorrect': return <XCircle color={theme.colors.danger} size={24} />; case 'selected': return <Circle color={theme.colors.primary} size={24} fill={theme.colors.primary} />; default: return <Circle color={theme.colors.gray} size={24} />; } };
    return (<TouchableOpacity style={[styles.alternativeContainer, getContainerStyle()]} onPress={onPress}>{getIcon()}<Text style={styles.alternativeText}>{text}</Text></TouchableOpacity>);
};

  useEffect(() => { const fetchQuestions = async () => { setQuestions(await getQuestionsBySubject(subject)); setLoading(false); }; fetchQuestions(); }, [subject]);


  // Efeito para navegar quando o quiz terminar
  useEffect(() => {
    const handleQuizEnd = async () => {
      if (!loading && currentQuestionIndex >= questions.length) {
        try {
          // 1. Pega os resultados antigos
          const existingResults = await AsyncStorage.getItem('@quiz_results');
          const results = existingResults ? JSON.parse(existingResults) : [];

          // 2. Adiciona o novo resultado
          const newResult = {
            score,
            total: questions.length,
            date: new Date().toISOString(), // Salva a data para referência
          };
          results.push(newResult);

          // 3. Salva a lista atualizada de volta no AsyncStorage
          await AsyncStorage.setItem('@quiz_results', JSON.stringify(results));

        } catch (e) {
          console.error("Erro ao salvar o resultado.", e);
        } finally {
          // 4. Navega para a tela de resultados
          navigation.replace('Resultado', { score, total: questions.length });
        }
      }
    };

    handleQuizEnd();
  }, [currentQuestionIndex, loading, navigation, questions, score]);

  
  const handleSelectAnswer = (alternative) => { if (!isAnswered) setSelectedAnswer(alternative); };
  const handleConfirmAnswer = () => { if (!selectedAnswer) return; setIsAnswered(true); if (selectedAnswer.isCorrect) setScore(prev => prev + 1); };
  
  // Função de avançar simplificada
  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    // Apenas atualiza o índice ou avança para o "estado final" (índice > tamanho)
    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  if (loading) return <ActivityIndicator size="large" color={theme.colors.primary} style={{ flex: 1 }} />;
  
  // Evita erro ao tentar acessar uma questão que não existe
  if (currentQuestionIndex >= questions.length) {
    // Pode mostrar um último loader ou simplesmente nada enquanto o useEffect navega
    return <ActivityIndicator size="large" color={theme.colors.primary} style={{ flex: 1 }} />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View>
        <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
        <View>
          {currentQuestion.alternatives.map((alt) => {
            let state = 'default';
            if (isAnswered) { if (alt.isCorrect) state = 'correct'; else if (alt.id === selectedAnswer?.id) state = 'incorrect'; } 
            else if (alt.id === selectedAnswer?.id) { state = 'selected'; }
            return <Alternative key={alt.id} text={alt.text} onPress={() => handleSelectAnswer(alt)} state={state} />;
          })}
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        {isAnswered ? (
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>Explicação:</Text>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
            <Button title="Próxima" onPress={handleNextQuestion} variant="success" />
          </View>
        ) : (<Button title="Confirmar" onPress={handleConfirmAnswer} disabled={!selectedAnswer} />)}
      </View>
    </ScrollView>
  );
};


 const styles = StyleSheet.create({
  container: 
  { flex: 1, 
    backgroundColor: theme.colors.background, 
    paddingHorizontal: theme.spacing.md 
  },
  contentContainer: 
  { flexGrow: 1, justifyContent: 
    'space-between', paddingVertical: 
    theme.spacing.lg 
  },
  questionText: 
  { ...theme.typography.h3, 
    textAlign: 'center', 
    marginBottom: theme.spacing.lg 
  },
  alternativeContainer: 
  { flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: theme.colors.card, 
    padding: theme.spacing.md, 
    borderRadius: theme.borderRadius.md, 
    borderWidth: 2, 
    marginBottom: theme.spacing.sm 
  },
  alternativeText: 
  { fontSize: 16, 
    marginLeft: theme.spacing.md, 
    flex: 1, 
    color: theme.colors.text 
  },
  buttonContainer: 
  { marginTop: theme.spacing.lg 

  },
  explanationBox: 
  { marginTop: theme.spacing.md, 
    padding: theme.spacing.md, 
    backgroundColor: theme.colors.secondary, 
    borderRadius: theme.borderRadius.md 
  },
  explanationTitle: 
  { fontSize: 16, 
    fontWeight: 'bold', 
    color: theme.colors.text },
  explanationText: { fontSize: 16, 
    color: theme.colors.textSecondary, 
    marginVertical: theme.spacing.sm 
  },
});



export default QuizScreen;