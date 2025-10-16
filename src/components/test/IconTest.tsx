import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HomeIcon, ClipboardIcon, BookIcon, SettingsIcon } from '../icons/navigation';

const IconTest: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SVG Icon Test</Text>
      
      <View style={styles.iconRow}>
        <View style={styles.iconContainer}>
          <HomeIcon size={32} color="#3B82F6" />
          <Text style={styles.label}>Home</Text>
        </View>
        
        <View style={styles.iconContainer}>
          <ClipboardIcon size={32} color="#3B82F6" />
          <Text style={styles.label}>Clipboard</Text>
        </View>
        
        <View style={styles.iconContainer}>
          <BookIcon size={32} color="#3B82F6" />
          <Text style={styles.label}>Book</Text>
        </View>
        
        <View style={styles.iconContainer}>
          <SettingsIcon size={32} color="#3B82F6" />
          <Text style={styles.label}>Settings</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    padding: 10,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
});

export default IconTest;
