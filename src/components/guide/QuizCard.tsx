import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuizCardProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onAnswer?: (isCorrect: boolean) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  question, 
  options, 
  correctAnswer,
  onAnswer 
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionPress = (index: number) => {
    if (!submitted) {
      setSelected(index);
    }
  };

  const handleSubmit = () => {
    if (selected !== null && !submitted) {
      setSubmitted(true);
      const isCorrect = selected === correctAnswer;
      onAnswer?.(isCorrect);
    }
  };

  const getOptionStyle = (index: number) => {
    if (!submitted) {
      return selected === index ? styles.quizSelected : styles.quizOption;
    }
    
    if (index === correctAnswer) {
      return styles.quizCorrect;
    }
    
    if (selected === index && index !== correctAnswer) {
      return styles.quizWrong;
    }
    
    return styles.quizOption;
  };

  const getOptionTextStyle = (index: number) => {
    if (!submitted) {
      return selected === index ? styles.optionTextSelected : styles.optionText;
    }
    
    if (index === correctAnswer) {
      return styles.optionTextCorrect;
    }
    
    if (selected === index && index !== correctAnswer) {
      return styles.optionTextWrong;
    }
    
    return styles.optionText;
  };

  return (
    <View style={styles.quizCard}>
      <Text style={styles.quizQuestion}>❓ {question}</Text>
      
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={getOptionStyle(index)}
          onPress={() => handleOptionPress(index)}
          disabled={submitted}
        >
          <Text style={getOptionTextStyle(index)}>{option}</Text>
        </TouchableOpacity>
      ))}

      {!submitted && selected !== null && (
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>정답 확인</Text>
        </TouchableOpacity>
      )}

      {submitted && (
        <View style={styles.resultContainer}>
          <Text style={[
            styles.resultText,
            selected === correctAnswer ? styles.resultCorrect : styles.resultWrong
          ]}>
            {selected === correctAnswer ? '✅ 정답입니다!' : '❌ 틀렸습니다.'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  quizCard: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
  },
  quizQuestion: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 20,
    lineHeight: 24,
  },
  quizOption: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  quizSelected: {
    borderColor: '#1884FF',
    backgroundColor: '#F0F7FF',
  },
  quizCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  quizWrong: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  optionTextSelected: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1884FF',
  },
  optionTextCorrect: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  optionTextWrong: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  submitButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  resultContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    fontWeight: '700',
  },
  resultCorrect: {
    color: '#10B981',
  },
  resultWrong: {
    color: '#EF4444',
  },
});

export default QuizCard;
