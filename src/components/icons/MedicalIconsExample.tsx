import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  MedicalSyringeIcon,
  MedicalBookIcon,
  VideoIcon,
  MedicalCheckIcon,
  MedicalAlertIcon,
  ChevronRightIcon,
} from './medical/MedicalIcons';

export const MedicalIconsExample: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Icons Example</Text>
      
      <View style={styles.iconRow}>
        <MedicalSyringeIcon size={32} color="#EF4444" />
        <Text style={styles.label}>주사기 (Syringe)</Text>
      </View>

      <View style={styles.iconRow}>
        <MedicalBookIcon size={32} color="#10B981" />
        <Text style={styles.label}>책 (Book)</Text>
      </View>

      <View style={styles.iconRow}>
        <VideoIcon size={32} color="#3B82F6" />
        <Text style={styles.label}>비디오 (Video)</Text>
      </View>

      <View style={styles.iconRow}>
        <MedicalCheckIcon size={32} color="#10B981" />
        <Text style={styles.label}>체크 (Check)</Text>
      </View>

      <View style={styles.iconRow}>
        <MedicalAlertIcon size={32} color="#F59E0B" />
        <Text style={styles.label}>경고 (Alert)</Text>
      </View>

      <View style={styles.iconRow}>
        <ChevronRightIcon size={32} color="#9CA3AF" />
        <Text style={styles.label}>화살표 (Chevron Right)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});
