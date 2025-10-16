import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, TossIcon, TossIconVariants, iconSizes, iconColors } from './index';

/**
 * Comprehensive example component demonstrating the SVG icon system
 * This shows all available icons, sizes, colors, and usage patterns
 */
const IconSystemExample: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>SVG Icon System Examples</Text>
      
      {/* Basic Icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Icons</Text>
        <View style={styles.iconGrid}>
          <View style={styles.iconItem}>
            <Icon name="check" size={24} color={iconColors.success} />
            <Text style={styles.iconLabel}>Check</Text>
          </View>
          <View style={styles.iconItem}>
            <Icon name="close" size={24} color={iconColors.error} />
            <Text style={styles.iconLabel}>Close</Text>
          </View>
          <View style={styles.iconItem}>
            <Icon name="arrowRight" size={24} color={iconColors.primary} />
            <Text style={styles.iconLabel}>Arrow</Text>
          </View>
          <View style={styles.iconItem}>
            <Icon name="alert" size={24} color={iconColors.warning} />
            <Text style={styles.iconLabel}>Alert</Text>
          </View>
        </View>
      </View>

      {/* Medical Icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical Icons</Text>
        <View style={styles.iconGrid}>
          <View style={styles.iconItem}>
            <Icon name="pill" size={24} color={iconColors.primary} />
            <Text style={styles.iconLabel}>Pill</Text>
          </View>
          <View style={styles.iconItem}>
            <Icon name="syringe" size={24} color={iconColors.primary} />
            <Text style={styles.iconLabel}>Syringe</Text>
          </View>
          <View style={styles.iconItem}>
            <Icon name="stethoscope" size={24} color={iconColors.primary} />
            <Text style={styles.iconLabel}>Stethoscope</Text>
          </View>
          <View style={styles.iconItem}>
            <Icon name="heartRate" size={24} color={iconColors.error} />
            <Text style={styles.iconLabel}>Heart Rate</Text>
          </View>
        </View>
      </View>

      {/* Navigation Icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Navigation Icons</Text>
        <View style={styles.iconGrid}>
          <View style={styles.iconItem}>
            <Icon name="home" size={24} color={iconColors.text} />
            <Text style={styles.iconLabel}>Home</Text>
          </View>
          <View style={styles.iconItem}>
            <Icon name="clipboard" size={24} color={iconColors.text} />
            <Text style={styles.iconLabel}>Clipboard</Text>
          </View>
          <View style={styles.iconItem}>
            <Icon name="book" size={24} color={iconColors.text} />
            <Text style={styles.iconLabel}>Book</Text>
          </View>
          <View style={styles.iconItem}>
            <Icon name="settings" size={24} color={iconColors.text} />
            <Text style={styles.iconLabel}>Settings</Text>
          </View>
        </View>
      </View>

      {/* Status Icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status Icons</Text>
        <View style={styles.iconGrid}>
          <View style={styles.iconItem}>
            <Icon name="success" size={24} color={iconColors.success} />
            <Text style={styles.iconLabel}>Success</Text>
          </View>
          <View style={styles.iconItem}>
            <Icon name="warning" size={24} color={iconColors.warning} />
            <Text style={styles.iconLabel}>Warning</Text>
          </View>
          <View style={styles.iconItem}>
            <Icon name="error" size={24} color={iconColors.error} />
            <Text style={styles.iconLabel}>Error</Text>
          </View>
          <View style={styles.iconItem}>
            <Icon name="pending" size={24} color={iconColors.secondary} />
            <Text style={styles.iconLabel}>Pending</Text>
          </View>
        </View>
      </View>

      {/* Icon Sizes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Icon Sizes</Text>
        <View style={styles.sizeRow}>
          <Icon name="check" size={iconSizes.tiny} color={iconColors.success} />
          <Text style={styles.sizeLabel}>Tiny (12px)</Text>
        </View>
        <View style={styles.sizeRow}>
          <Icon name="check" size={iconSizes.small} color={iconColors.success} />
          <Text style={styles.sizeLabel}>Small (16px)</Text>
        </View>
        <View style={styles.sizeRow}>
          <Icon name="check" size={iconSizes.medium} color={iconColors.success} />
          <Text style={styles.sizeLabel}>Medium (20px)</Text>
        </View>
        <View style={styles.sizeRow}>
          <Icon name="check" size={iconSizes.large} color={iconColors.success} />
          <Text style={styles.sizeLabel}>Large (24px)</Text>
        </View>
        <View style={styles.sizeRow}>
          <Icon name="check" size={iconSizes.xlarge} color={iconColors.success} />
          <Text style={styles.sizeLabel}>XLarge (32px)</Text>
        </View>
        <View style={styles.sizeRow}>
          <Icon name="check" size={iconSizes.huge} color={iconColors.success} />
          <Text style={styles.sizeLabel}>Huge (48px)</Text>
        </View>
      </View>

      {/* TossIcon Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TossIcon Variants</Text>
        <View style={styles.variantGrid}>
          <View style={styles.variantItem}>
            {TossIconVariants.success('check', 20)}
            <Text style={styles.variantLabel}>Success</Text>
          </View>
          <View style={styles.variantItem}>
            {TossIconVariants.warning('alert', 20)}
            <Text style={styles.variantLabel}>Warning</Text>
          </View>
          <View style={styles.variantItem}>
            {TossIconVariants.error('close', 20)}
            <Text style={styles.variantLabel}>Error</Text>
          </View>
          <View style={styles.variantItem}>
            {TossIconVariants.info('info', 20)}
            <Text style={styles.variantLabel}>Info</Text>
          </View>
          <View style={styles.variantItem}>
            {TossIconVariants.neutral('more', 20)}
            <Text style={styles.variantLabel}>Neutral</Text>
          </View>
          <View style={styles.variantItem}>
            {TossIconVariants.square('settings', 20)}
            <Text style={styles.variantLabel}>Square</Text>
          </View>
        </View>
      </View>

      {/* Real-world Examples */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Real-world Examples</Text>
        
        {/* Alert Section */}
        <View style={styles.alertSection}>
          <View style={styles.alertHeader}>
            {TossIconVariants.warning('alert', 20)}
            <Text style={styles.alertTitle}>주의가 필요해요</Text>
          </View>
          
          <View style={styles.alertItem}>
            <Icon name="pill" size={16} color={iconColors.primary} />
            <View style={styles.alertContent}>
              <Text style={styles.alertText}>인슐린 투여</Text>
              <Text style={styles.alertSubtext}>마지막 실습 3일 전</Text>
            </View>
            <Text style={styles.alertScore}>78점</Text>
            <Icon name="arrowRight" size={16} color={iconColors.tertiary} />
          </View>
        </View>

        {/* Button Example */}
        <TouchableOpacity style={styles.button}>
          <Icon name="arrowRight" size={16} color="#FFFFFF" />
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>

        {/* Status List */}
        <View style={styles.statusList}>
          <View style={styles.statusItem}>
            {TossIconVariants.success('check', 16)}
            <Text style={styles.statusText}>정확한 물품을 준비하였습니다.</Text>
          </View>
          <View style={styles.statusItem}>
            {TossIconVariants.warning('alert', 16)}
            <Text style={styles.statusText}>손 소독 절차를 더욱 철저히 해주세요.</Text>
          </View>
          <View style={styles.statusItem}>
            {TossIconVariants.error('close', 16)}
            <Text style={styles.statusText}>환자 확인 절차를 강화해주세요.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 16,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  iconItem: {
    alignItems: 'center',
    width: 80,
  },
  iconLabel: {
    fontSize: 12,
    color: '#6B7684',
    marginTop: 8,
    textAlign: 'center',
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  sizeLabel: {
    fontSize: 14,
    color: '#191F28',
  },
  variantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  variantItem: {
    alignItems: 'center',
    width: 80,
  },
  variantLabel: {
    fontSize: 12,
    color: '#6B7684',
    marginTop: 8,
    textAlign: 'center',
  },
  alertSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#191F28',
  },
  alertSubtext: {
    fontSize: 12,
    color: '#6B7684',
    marginTop: 2,
  },
  alertScore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191F28',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3182F6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusList: {
    gap: 12,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#191F28',
    flex: 1,
  },
});

export default IconSystemExample;