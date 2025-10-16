import React from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';

interface iPhoneFrameProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
}

const iPhoneFrame: React.FC<iPhoneFrameProps> = ({ 
  children, 
  width = 375, 
  height = 812 
}) => {
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.iphoneFrame, { width, height }]}>
        {/* iPhone 상단 노치 영역 */}
        <View style={styles.notch} />
        
        {/* iPhone 화면 영역 */}
        <View style={styles.screen}>
          {children}
        </View>
        
        {/* iPhone 하단 홈 인디케이터 */}
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    minHeight: '100vh',
  },
  iphoneFrame: {
    backgroundColor: '#1c1c1e',
    borderRadius: 40,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  notch: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: -75 }],
    width: 150,
    height: 30,
    backgroundColor: '#000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 10,
  },
  screen: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 32,
    overflow: 'hidden',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    transform: [{ translateX: -67 }],
    width: 134,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 2.5,
    opacity: 0.3,
  },
});

export default iPhoneFrame;
