import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CategoryScoreCardProps {
  title: string;
  score: number;
  maxScore: number;
  color?: string;
  onPress?: () => void;
  improvementTip?: string;
}

const CategoryScoreCard: React.FC<CategoryScoreCardProps> = ({
  title,
  score,
  maxScore,
  onPress,
  improvementTip
}) => {
  const percentage = (score / maxScore) * 100;
  const color = percentage >= 80 ? '#1884FF' : '#F59E0B';
  const needsImprovement = percentage < 80;

  const CardContent = () => (
    <>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{title}</Text>
        <Text style={[styles.categoryScore, { color }]}>
          {score}점
        </Text>
      </View>
      
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.categoryPercentage}>{Math.round(percentage)}%</Text>
        {needsImprovement && (
          <Text style={styles.improvementText}>개선 필요</Text>
        )}
      </View>
      
      {improvementTip && needsImprovement && (
        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>💡 {improvementTip}</Text>
        </View>
      )}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity style={styles.categoryCard} onPress={onPress} activeOpacity={0.7}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.categoryCard}>
      <CardContent />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F2E',
  },
  categoryScore: {
    fontSize: 24,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryPercentage: {
    fontSize: 13,
    color: '#6B7280',
  },
  improvementText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  tipContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  tipText: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 16,
  },
});

export default CategoryScoreCard;
