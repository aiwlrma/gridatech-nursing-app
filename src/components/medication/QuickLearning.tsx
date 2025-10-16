import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';
import { Icon } from '../icons';

interface QuickLearningProps {
  resources: Array<{
    id: string;
    title: string;
    duration: string;
    type: string;
    icon: string;
  }>;
  onResourcePress: (resource: any) => void;
}

const QuickLearning: React.FC<QuickLearningProps> = ({ resources, onResourcePress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.cardsContainer}>
        {resources.map((resource, index) => (
          <TouchableOpacity
            key={resource.id}
            style={styles.learningCard}
            onPress={() => onResourcePress(resource)}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardIconContainer}>
                <Icon 
                  name={resource.icon === '주' ? 'syringe' : resource.icon === '계' ? 'book' : 'video'} 
                  size={24} 
                  color={colors.primary.base} 
                />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{resource.title}</Text>
                <Text style={styles.cardSubtitle}>
                  {resource.duration} · {resource.type}
                </Text>
              </View>
              <View style={styles.arrowContainer}>
                <Icon name="arrowRight" size={16} color={colors.textSecondary} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  cardsContainer: {
    gap: spacing.sm,
  },
  learningCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconContainer: {
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs / 2,
  },
  cardSubtitle: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
  },
});

export default QuickLearning;
