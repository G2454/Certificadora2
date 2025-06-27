class Question {
  constructor(id, questionText, alternatives, explanation) {
    this.id = id;
    this.questionText = questionText;
    this.alternatives = alternatives;
    this.explanation = explanation;
  }

  getShuffledAlternatives() {
    const shuffled = [...this.alternatives];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

const questionDatabase = new Map();

const circuitAnalysisQuestions = [
  new Question('c1','De acordo com a Lei dos Nós de Kirchhoff (LKC), a soma das correntes em qualquer nó de um circuito é:',[{ id: 'a', text: 'Sempre igual a 1.', isCorrect: false },{ id: 'b', text: 'Igual à tensão total.', isCorrect: false },{ id: 'c', text: 'Sempre igual a zero.', isCorrect: true },{ id: 'd', text: 'Dependente da resistência.', isCorrect: false },],'A LKC afirma que a soma algébrica das correntes em um nó é zero, refletindo a conservação da carga elétrica.'),
  new Question('c2','A Lei das Malhas de Kirchhoff (LKT) é uma consequência direta da conservação de qual princípio?',[{ id: 'a', text: 'Conservação da Massa', isCorrect: false },{ id: 'b', text: 'Conservação da Energia', isCorrect: true },{ id: 'c', text: 'Conservação da Carga', isCorrect: false },{ id: 'd', text: 'Conservação do Momento', isCorrect: false },],'A LKT reflete a conservação de energia, pois a soma das quedas e elevações de tensão em uma malha fechada deve ser zero.'),
  new Question('c3','Numa associação de resistores em paralelo, qual grandeza é a mesma para todos os resistores?',[{ id: 'a', text: 'A corrente elétrica', isCorrect: false },{ id: 'b', text: 'A potência dissipada', isCorrect: false },{ id: 'c', text: 'A resistência', isCorrect: false },{ id: 'd', text: 'A diferença de potencial (tensão)', isCorrect: true },],'Em uma associação em paralelo, todos os componentes estão conectados aos mesmos dois pontos, portanto, a tensão sobre eles é a mesma.'),
  new Question('c4','Dois resistores, R1 = 20Ω e R2 = 20Ω, estão em paralelo. Qual é a resistência equivalente?',[{ id: 'a', text: '40Ω', isCorrect: false },{ id: 'b', text: '10Ω', isCorrect: true },{ id: 'c', text: '20Ω', isCorrect: false },{ id: 'd', text: '0Ω', isCorrect: false },],'Para resistores iguais em paralelo, a equivalência é o valor de um dividido pelo número deles. Req = 20 / 2 = 10Ω.'),
  new Question('c5','Qual componente armazena energia em um campo elétrico?',[{ id: 'a', text: 'Indutor', isCorrect: false },{ id: 'b', text: 'Resistor', isCorrect: false },{ id: 'c', 'text': 'Capacitor', isCorrect: true },{ id: 'd', text: 'Diodo', isCorrect: false },],'O Capacitor armazena energia em um campo elétrico formado entre suas placas. O indutor armazena em um campo magnético.'),
  new Question('c6','Qual é a reatância de um capacitor ideal em um circuito de corrente contínua (CC) em regime permanente?',[{ id: 'a', text: 'Infinita (circuito aberto)', isCorrect: true },{ id: 'b', text: 'Zero (curto-circuito)', isCorrect: false },{ id: 'c', text: 'Igual à sua capacitância', isCorrect: false },{ id: 'd', text: 'Negativa', isCorrect: false },],'Em CC, a frequência é zero. A reatância capacitiva (Xc = 1/(2πfC)) tende ao infinito, fazendo com que o capacitor se comporte como um circuito aberto.'),
];

questionDatabase.set('Análise de Circuitos', circuitAnalysisQuestions);

export const getQuestionsBySubject = (subject) => {
  const questions = questionDatabase.get(subject) || [];
  const processedQuestions = questions.map(q => ({
    id: q.id,
    questionText: q.questionText,
    alternatives: q.getShuffledAlternatives(),
    explanation: q.explanation,
  }));
  return new Promise((resolve) => {
    setTimeout(() => resolve(processedQuestions), 300);
  });
};