import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface EvaluationDetailButtonProps {
  evaluationId: string;
  style?: any;
}

export const EvaluationDetailButton: React.FC<EvaluationDetailButtonProps> = ({
  evaluationId,
  style,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('EvaluationDetail', { evaluationId });
  };

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handlePress}>
      <Text style={styles.buttonText}>더보기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1884FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default EvaluationDetailButton;
