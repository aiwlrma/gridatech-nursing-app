import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity 
      style={styles.faqItem}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.faqQuestion}>
        <Text style={styles.questionText}>Q. {question}</Text>
        <Text style={styles.expandIcon}>{expanded ? '▼' : '▶'}</Text>
      </View>
      
      {expanded && (
        <Text style={styles.answerText}>A. {answer}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  faqItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1F2E',
  },
  expandIcon: {
    fontSize: 12,
    color: '#6B7280',
  },
  answerText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginTop: 12,
    paddingLeft: 16,
  },
});

export default FAQItem;
