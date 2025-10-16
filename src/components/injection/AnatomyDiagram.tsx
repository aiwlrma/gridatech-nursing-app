import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

const { width } = Dimensions.get('window');

interface InjectionSite {
  name: string;
  nameEn: string;
  score: number;
  color: string;
  lastPractice: string;
}

interface AnatomyDiagramProps {
  sites: InjectionSite[];
}

const AnatomyDiagram: React.FC<AnatomyDiagramProps> = ({ sites }) => {
  const [selectedSite, setSelectedSite] = useState<InjectionSite | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Animation for pulse effect
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#10B981'; // Green
    if (score >= 80) return '#A5F3E3'; // Mint
    if (score >= 70) return '#FACC15'; // Amber
    return '#EF4444'; // Red
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 90) return 'Green (90%+)';
    if (score >= 80) return 'Mint (80-89%)';
    if (score >= 70) return 'Amber (70-79%)';
    return 'Red (<70%)';
  };

  const handleSitePress = (site: InjectionSite) => {
    setSelectedSite(site);
  };

  // Color legend data
  const colorLegend = [
    { color: '#10B981', label: 'Green (90%+)' },
    { color: '#A5F3E3', label: 'Mint (80-89%)' },
    { color: '#FACC15', label: 'Amber (70-79%)' },
    { color: '#EF4444', label: 'Red (<70%)' },
  ];

  // Web-optimized body diagram
  const renderWebBodyDiagram = () => (
    <View style={styles.webBodyContainer}>
      {/* SVG-like body representation for web */}
      <View style={styles.webBodySilhouette}>
        {/* Head */}
        <View style={[styles.webBodyPart, styles.webHead]} />
        
        {/* Torso */}
        <View style={[styles.webBodyPart, styles.webTorso]} />
        
        {/* Arms */}
        <View style={[styles.webBodyPart, styles.webLeftArm]} />
        <View style={[styles.webBodyPart, styles.webRightArm]} />
        
        {/* Legs */}
        <View style={[styles.webBodyPart, styles.webLeftLeg]} />
        <View style={[styles.webBodyPart, styles.webRightLeg]} />
        
        {/* Injection Sites with better visibility */}
        <Animated.View
          style={[
            styles.webInjectionSite,
            styles.webDeltoidSite,
            { 
              backgroundColor: getScoreColor(sites[0]?.score || 0),
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.webSiteButton}
            onPress={() => handleSitePress(sites[0])}
            activeOpacity={0.7}
          />
        </Animated.View>
        
        <Animated.View
          style={[
            styles.webInjectionSite,
            styles.webAbdomenSite,
            { 
              backgroundColor: getScoreColor(sites[1]?.score || 0),
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.webSiteButton}
            onPress={() => handleSitePress(sites[1])}
            activeOpacity={0.7}
          />
        </Animated.View>
        
        <Animated.View
          style={[
            styles.webInjectionSite,
            styles.webThighSite,
            { 
              backgroundColor: getScoreColor(sites[2]?.score || 0),
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.webSiteButton}
            onPress={() => handleSitePress(sites[2])}
            activeOpacity={0.7}
          />
        </Animated.View>
        
        <Animated.View
          style={[
            styles.webInjectionSite,
            styles.webGlutealSite,
            { 
              backgroundColor: getScoreColor(sites[3]?.score || 0),
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.webSiteButton}
            onPress={() => handleSitePress(sites[3])}
            activeOpacity={0.7}
          />
        </Animated.View>
      </View>
    </View>
  );

  // Mobile body diagram (original)
  const renderMobileBodyDiagram = () => (
    <View style={styles.bodyContainer}>
      <View style={styles.bodySilhouette}>
        {/* Head */}
        <View style={[styles.bodyPart, styles.head]} />
        
        {/* Torso */}
        <View style={[styles.bodyPart, styles.torso]} />
        
        {/* Arms */}
        <View style={[styles.bodyPart, styles.leftArm]} />
        <View style={[styles.bodyPart, styles.rightArm]} />
        
        {/* Legs */}
        <View style={[styles.bodyPart, styles.leftLeg]} />
        <View style={[styles.bodyPart, styles.rightLeg]} />
        
        {/* Injection Sites */}
        <Animated.View
          style={[
            styles.injectionSite,
            styles.deltoidSite,
            { 
              backgroundColor: getScoreColor(sites[0]?.score || 0),
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.siteButton}
            onPress={() => handleSitePress(sites[0])}
            activeOpacity={0.7}
          />
        </Animated.View>
        
        <Animated.View
          style={[
            styles.injectionSite,
            styles.abdomenSite,
            { 
              backgroundColor: getScoreColor(sites[1]?.score || 0),
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.siteButton}
            onPress={() => handleSitePress(sites[1])}
            activeOpacity={0.7}
          />
        </Animated.View>
        
        <Animated.View
          style={[
            styles.injectionSite,
            styles.thighSite,
            { 
              backgroundColor: getScoreColor(sites[2]?.score || 0),
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.siteButton}
            onPress={() => handleSitePress(sites[2])}
            activeOpacity={0.7}
          />
        </Animated.View>
        
        <Animated.View
          style={[
            styles.injectionSite,
            styles.glutealSite,
            { 
              backgroundColor: getScoreColor(sites[3]?.score || 0),
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.siteButton}
            onPress={() => handleSitePress(sites[3])}
            activeOpacity={0.7}
          />
        </Animated.View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Platform-specific body diagram */}
      {Platform.OS === 'web' ? renderWebBodyDiagram() : renderMobileBodyDiagram()}

      {/* Site Labels - Responsive layout for web */}
      <View style={Platform.OS === 'web' ? styles.webSiteLabels : styles.siteLabels}>
        {Platform.OS === 'web' ? (
          // Web: Single column layout for better readability
          <View style={styles.webSiteLabelColumn}>
            <View style={styles.webSiteLabel}>
              <View style={[styles.webLabelDot, { backgroundColor: getScoreColor(sites[0]?.score || 0) }]} />
              <Text style={styles.webLabelText}>
                삼각근 (Deltoid) ● {sites[0]?.score || 0}%
              </Text>
            </View>
            <View style={styles.webSiteLabel}>
              <View style={[styles.webLabelDot, { backgroundColor: getScoreColor(sites[1]?.score || 0) }]} />
              <Text style={styles.webLabelText}>
                복부 (Abdomen) ● {sites[1]?.score || 0}%
              </Text>
            </View>
            <View style={styles.webSiteLabel}>
              <View style={[styles.webLabelDot, { backgroundColor: getScoreColor(sites[2]?.score || 0) }]} />
              <Text style={styles.webLabelText}>
                대퇴부 (Thigh) ● {sites[2]?.score || 0}%
              </Text>
            </View>
            <View style={styles.webSiteLabel}>
              <View style={[styles.webLabelDot, { backgroundColor: getScoreColor(sites[3]?.score || 0) }]} />
              <Text style={styles.webLabelText}>
                둔부 (Gluteal) ● {sites[3]?.score || 0}%
              </Text>
            </View>
          </View>
        ) : (
          // Mobile: Original two-column layout
          <>
            <View style={styles.siteLabelRow}>
              <View style={styles.siteLabel}>
                <View style={[styles.labelDot, { backgroundColor: getScoreColor(sites[0]?.score || 0) }]} />
                <Text style={styles.labelText}>
                  삼각근 (Deltoid) ● {sites[0]?.score || 0}%
                </Text>
              </View>
              <View style={styles.siteLabel}>
                <View style={[styles.labelDot, { backgroundColor: getScoreColor(sites[1]?.score || 0) }]} />
                <Text style={styles.labelText}>
                  복부 (Abdomen) ● {sites[1]?.score || 0}%
                </Text>
              </View>
            </View>
            <View style={styles.siteLabelRow}>
              <View style={styles.siteLabel}>
                <View style={[styles.labelDot, { backgroundColor: getScoreColor(sites[2]?.score || 0) }]} />
                <Text style={styles.labelText}>
                  대퇴부 (Thigh) ● {sites[2]?.score || 0}%
                </Text>
              </View>
              <View style={styles.siteLabel}>
                <View style={[styles.labelDot, { backgroundColor: getScoreColor(sites[3]?.score || 0) }]} />
                <Text style={styles.labelText}>
                  둔부 (Gluteal) ● {sites[3]?.score || 0}%
                </Text>
              </View>
            </View>
          </>
        )}
      </View>

      {/* Color Legend */}
      <View style={styles.legendContainer}>
        {colorLegend.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Selected Site Info */}
      {selectedSite && (
        <View style={styles.selectedSiteInfo}>
          <Text style={styles.selectedSiteTitle}>
            {selectedSite.name} ({selectedSite.nameEn})
          </Text>
          <Text style={styles.selectedSiteScore}>
            정확도: {selectedSite.score}%
          </Text>
          <Text style={styles.selectedSiteDate}>
            마지막 실습: {selectedSite.lastPractice}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Removed card styling - now handled by parent card
  },
  bodyContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  bodySilhouette: {
    width: 120,
    height: 200,
    position: 'relative',
  },
  bodyPart: {
    backgroundColor: colors.border,
    position: 'absolute',
  },
  head: {
    width: 40,
    height: 40,
    borderRadius: 20,
    top: 0,
    left: 40,
  },
  torso: {
    width: 60,
    height: 80,
    borderRadius: 8,
    top: 40,
    left: 30,
  },
  leftArm: {
    width: 20,
    height: 60,
    borderRadius: 10,
    top: 50,
    left: 10,
  },
  rightArm: {
    width: 20,
    height: 60,
    borderRadius: 10,
    top: 50,
    right: 10,
  },
  leftLeg: {
    width: 25,
    height: 80,
    borderRadius: 12,
    top: 120,
    left: 35,
  },
  rightLeg: {
    width: 25,
    height: 80,
    borderRadius: 12,
    top: 120,
    right: 35,
  },
  injectionSite: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  siteButton: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  deltoidSite: {
    top: 60,
    left: 52,
  },
  abdomenSite: {
    top: 100,
    left: 52,
  },
  thighSite: {
    top: 160,
    left: 52,
  },
  glutealSite: {
    top: 140,
    left: 52,
  },
  siteLabels: {
    marginBottom: spacing.md,
  },
  siteLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  siteLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  labelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  labelText: {
    ...typography.textStyles.bodySmall,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  legendText: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    fontSize: 10,
  },
  selectedSiteInfo: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  selectedSiteTitle: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  selectedSiteScore: {
    ...typography.textStyles.bodySmall,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    marginBottom: 2,
  },
  selectedSiteDate: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
  },
  // Web-specific styles
  webBodyContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    minHeight: 250,
  },
  webBodySilhouette: {
    width: 150,
    height: 250,
    position: 'relative',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  webBodyPart: {
    backgroundColor: '#DEE2E6',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#ADB5BD',
  },
  webHead: {
    width: 50,
    height: 50,
    borderRadius: 25,
    top: 10,
    left: 50,
  },
  webTorso: {
    width: 80,
    height: 100,
    borderRadius: 10,
    top: 60,
    left: 35,
  },
  webLeftArm: {
    width: 25,
    height: 80,
    borderRadius: 12,
    top: 70,
    left: 10,
  },
  webRightArm: {
    width: 25,
    height: 80,
    borderRadius: 12,
    top: 70,
    right: 10,
  },
  webLeftLeg: {
    width: 30,
    height: 100,
    borderRadius: 15,
    top: 160,
    left: 40,
  },
  webRightLeg: {
    width: 30,
    height: 100,
    borderRadius: 15,
    top: 160,
    right: 40,
  },
  webInjectionSite: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  webSiteButton: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  webDeltoidSite: {
    top: 80,
    left: 65,
  },
  webAbdomenSite: {
    top: 120,
    left: 65,
  },
  webThighSite: {
    top: 200,
    left: 65,
  },
  webGlutealSite: {
    top: 180,
    left: 65,
  },
  // Web-specific label styles
  webSiteLabels: {
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  webSiteLabelColumn: {
    width: '100%',
    maxWidth: 300,
  },
  webSiteLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  webLabelDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  webLabelText: {
    ...typography.textStyles.body,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
    fontSize: 14,
  },
});

export default AnatomyDiagram;
