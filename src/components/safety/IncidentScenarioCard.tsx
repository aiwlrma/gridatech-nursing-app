import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface IncidentScenarioCardProps {
  data: {
    completed: number;
    total: number;
    scenarios: Array<{
      name: string;
      status: 'completed' | 'pending';
    }>;
  };
  onScenarioPress: (scenario: any) => void;
}

const IncidentScenarioCard: React.FC<IncidentScenarioCardProps> = ({ data, onScenarioPress }) => {
  const progressPercentage = Math.round((data.completed / data.total) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>사고 보고 및 대응</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            완료한 시나리오: {data.completed}/{data.total}
          </Text>
        </View>
      </View>
      
      <View style={styles.progressBarBackground}>
        <View 
          style={[
            styles.progressBarFill, 
            { width: `${progressPercentage}%` }
          ]} 
        />
      </View>
      
      <View style={styles.scenariosContainer}>
        {data.scenarios.map((scenario, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.scenarioItem,
              scenario.status === 'completed' && styles.completedScenario
            ]}
            onPress={() => onScenarioPress(scenario)}
            activeOpacity={0.7}
          >
            <View style={styles.scenarioLeft}>
              <Text style={styles.scenarioIcon}>
                {scenario.status === 'completed' ? '✓' : '○'}
              </Text>
              <Text style={[
                styles.scenarioName,
                scenario.status === 'completed' && styles.completedText
              ]}>
                • {scenario.name}
              </Text>
            </View>
            <Text style={[
              styles.scenarioStatus,
              scenario.status === 'completed' ? styles.completedStatus : styles.pendingStatus
            ]}>
              {scenario.status === 'completed' ? '완료' : '대기'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  header: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.textStyles.heading3,
    marginBottom: spacing.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  scenariosContainer: {
    gap: spacing.xs,
  },
  scenarioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.backgroundSecondary,
  },
  completedScenario: {
    backgroundColor: colors.success + '10',
    borderWidth: 1,
    borderColor: colors.success + '30',
  },
  scenarioLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  scenarioIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
    fontWeight: 'bold',
  },
  scenarioName: {
    ...typography.textStyles.bodySmall,
    flex: 1,
  },
  completedText: {
    color: colors.success,
    fontWeight: typography.fontWeight.medium,
  },
  scenarioStatus: {
    ...typography.textStyles.caption,
    fontWeight: typography.fontWeight.medium,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 4,
  },
  completedStatus: {
    color: colors.success,
    backgroundColor: colors.success + '20',
  },
  pendingStatus: {
    color: colors.warning,
    backgroundColor: colors.warning + '20',
  },
});

export default IncidentScenarioCard;
