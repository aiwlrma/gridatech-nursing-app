import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GuideSectionProps {
  title: string;
  content: string;
  imageUrl?: string;
}

const GuideSection: React.FC<GuideSectionProps> = ({ title, content, imageUrl }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content}</Text>
      {imageUrl && (
        <View style={styles.imageContainer}>
          <Text style={styles.imagePlaceholder}>📷 이미지: {title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 12,
    lineHeight: 28,
  },
  sectionContent: {
    fontSize: 16,
    fontWeight: '400',
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
  },
  imageContainer: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  imagePlaceholder: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
});

export default GuideSection;
