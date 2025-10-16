import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';
import ScreenGradient from '../common/ScreenGradient';
import ScoreCard from '../cards/ScoreCard';
import PremiumButton from '../common/PremiumButton';
import PremiumListItem from '../common/PremiumListItem';
import ProgressBar from '../common/ProgressBar';
import GlassCard from '../common/GlassCard';
import { Icon } from '../icons';

/**
 * Premium Example Component
 * 
 * This component demonstrates all the new premium design features:
 * - #1884FF primary color system
 * - Blue-tinted gradients and shadows
 * - Glass morphism effects
 * - Smooth animations
 * - Premium typography and spacing
 */
const PremiumExample: React.FC = () => {
  return (
    <ScreenGradient variant="primary">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Premium Design System</Text>
          <Text style={styles.subtitle}>#1884FF Brand Colors & Effects</Text>
        </View>

        {/* Score Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium Score Cards</Text>
          
          <ScoreCard
            score={85}
            label="Overall Performance"
            trend={+5}
            comparison="전체 평균 대비 우수"
            animated={true}
          />
          
          <ScoreCard
            score={92}
            label="Safety Score"
            trend={+3}
            comparison="안전 점수 우수"
            size={100}
            animated={true}
          />
        </View>

        {/* Buttons Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium Buttons</Text>
          
          <View style={styles.buttonRow}>
            <PremiumButton
              label="Primary Action"
              variant="primary"
              onPress={() => console.log('Primary pressed')}
              size="medium"
            />
          </View>
          
          <View style={styles.buttonRow}>
            <PremiumButton
              label="Secondary Action"
              variant="secondary"
              onPress={() => console.log('Secondary pressed')}
              size="medium"
            />
          </View>
          
          <View style={styles.buttonRow}>
            <PremiumButton
              label="Ghost Button"
              variant="ghost"
              onPress={() => console.log('Ghost pressed')}
              size="medium"
            />
          </View>
        </View>

        {/* Progress Bars Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress Indicators</Text>
          
          <View style={styles.progressContainer}>
            <ProgressBar
              value={75}
              max={100}
              label="Learning Progress"
              showPercentage={true}
              animated={true}
            />
          </View>
          
          <View style={styles.progressContainer}>
            <ProgressBar
              value={60}
              max={100}
              color={colors.status.warning.base}
              label="Safety Training"
              showPercentage={true}
              animated={true}
            />
          </View>
        </View>

        {/* List Items Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium List Items</Text>
          
          <PremiumListItem
            title="IM Injection Practice"
            subtitle="근육주사 실습 완료"
            score={88}
            icon={<Icon name="injection" size={24} color={colors.primary.base} />}
            status="success"
            onPress={() => console.log('List item pressed')}
          />
          
          <PremiumListItem
            title="Patient Safety Check"
            subtitle="환자 안전 확인 절차"
            score={72}
            icon={<Icon name="safety" size={24} color={colors.status.warning.base} />}
            status="warning"
            onPress={() => console.log('Safety check pressed')}
          />
          
          <PremiumListItem
            title="Medication Administration"
            subtitle="약물 투여 실습"
            score={95}
            icon={<Icon name="medication" size={24} color={colors.status.success.base} />}
            status="success"
            onPress={() => console.log('Medication pressed')}
          />
        </View>

        {/* Glass Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Glass Morphism Cards</Text>
          
          <GlassCard style={styles.glassCard}>
            <Text style={styles.glassTitle}>Glass Card Example</Text>
            <Text style={styles.glassContent}>
              This card demonstrates the glass morphism effect with blue-tinted transparency
              and subtle gradients that create depth and premium feel.
            </Text>
          </GlassCard>
          
          <GlassCard style={styles.glassCard} padding={16}>
            <Text style={styles.glassTitle}>Compact Glass Card</Text>
            <Text style={styles.glassContent}>
              Smaller padding for more compact layouts while maintaining the premium glass effect.
            </Text>
          </GlassCard>
        </View>

        {/* Color Palette Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color Palette</Text>
          
          <View style={styles.colorGrid}>
            <View style={[styles.colorSwatch, { backgroundColor: colors.primary.base }]}>
              <Text style={styles.colorLabel}>Primary</Text>
              <Text style={styles.colorValue}>#1884FF</Text>
            </View>
            
            <View style={[styles.colorSwatch, { backgroundColor: colors.primary.light }]}>
              <Text style={styles.colorLabel}>Light</Text>
              <Text style={styles.colorValue}>#4DA3FF</Text>
            </View>
            
            <View style={[styles.colorSwatch, { backgroundColor: colors.primary.dark }]}>
              <Text style={styles.colorLabel}>Dark</Text>
              <Text style={styles.colorValue}>#0066E6</Text>
            </View>
            
            <View style={[styles.colorSwatch, { backgroundColor: colors.status.success.base }]}>
              <Text style={styles.colorLabel}>Success</Text>
              <Text style={styles.colorValue}>#10B981</Text>
            </View>
            
            <View style={[styles.colorSwatch, { backgroundColor: colors.status.warning.base }]}>
              <Text style={styles.colorLabel}>Warning</Text>
              <Text style={styles.colorValue}>#F59E0B</Text>
            </View>
            
            <View style={[styles.colorSwatch, { backgroundColor: colors.status.error.base }]}>
              <Text style={styles.colorLabel}>Error</Text>
              <Text style={styles.colorValue}>#EF4444</Text>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </ScreenGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  buttonRow: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  progressContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  glassCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  glassTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  glassContent: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  colorSwatch: {
    width: '30%',
    height: 80,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    justifyContent: 'flex-end',
  },
  colorLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 2,
  },
  colorValue: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.white,
    opacity: 0.8,
  },
  bottomSpacing: {
    height: 40,
  },
});

export default PremiumExample;
