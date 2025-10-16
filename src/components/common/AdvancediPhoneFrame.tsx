import React, { useState } from 'react';
import { View, StyleSheet, Platform, Dimensions, TouchableOpacity, Text } from 'react-native';

interface AdvancediPhoneFrameProps {
  children: React.ReactNode;
  deviceType?: 'iPhone14' | 'iPhoneSE' | 'iPhone12';
  showControls?: boolean;
}

const deviceSpecs = {
  iPhone14: { width: 390, height: 844, notchHeight: 47 },
  iPhoneSE: { width: 375, height: 667, notchHeight: 0 },
  iPhone12: { width: 390, height: 844, notchHeight: 47 },
};

const AdvancediPhoneFrame: React.FC<AdvancediPhoneFrameProps> = ({ 
  children, 
  deviceType = 'iPhone14',
  showControls = true
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(deviceType);

  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  const specs = deviceSpecs[currentDevice];
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const switchDevice = (device: keyof typeof deviceSpecs) => {
    setCurrentDevice(device);
  };

  return (
    <View style={[
      styles.container, 
      isFullscreen && styles.fullscreenContainer
    ]}>
      {showControls && !isFullscreen && (
        <View style={styles.controls}>
          <View style={styles.deviceSelector}>
            <Text style={styles.controlLabel}>Device:</Text>
            {Object.keys(deviceSpecs).map((device) => (
              <TouchableOpacity
                key={device}
                style={[
                  styles.deviceButton,
                  currentDevice === device && styles.activeDeviceButton
                ]}
                onPress={() => switchDevice(device as keyof typeof deviceSpecs)}
              >
                <Text style={[
                  styles.deviceButtonText,
                  currentDevice === device && styles.activeDeviceButtonText
                ]}>
                  {device}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity style={styles.fullscreenButton} onPress={toggleFullscreen}>
            <Text style={styles.fullscreenButtonText}>Fullscreen</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={[
        styles.iphoneFrame, 
        { 
          width: isFullscreen ? screenWidth : specs.width,
          height: isFullscreen ? screenHeight : specs.height,
          borderRadius: isFullscreen ? 0 : 40,
        }
      ]}>
        {/* iPhone 상단 노치 영역 */}
        {specs.notchHeight > 0 && !isFullscreen && (
          <View style={[styles.notch, { height: specs.notchHeight }]} />
        )}
        
        {/* iPhone 화면 영역 */}
        <View style={[
          styles.screen,
          { borderRadius: isFullscreen ? 0 : 32 }
        ]}>
          {children}
        </View>
        
        {/* iPhone 하단 홈 인디케이터 */}
        {!isFullscreen && (
          <View style={styles.homeIndicator} />
        )}

        {/* 풀스크린 닫기 버튼 */}
        {isFullscreen && (
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={toggleFullscreen}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
    padding: 20,
  },
  fullscreenContainer: {
    backgroundColor: '#000',
    padding: 0,
  },
  controls: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  deviceSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 10,
    color: '#333',
  },
  deviceButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 2,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  activeDeviceButton: {
    backgroundColor: '#007AFF',
  },
  deviceButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeDeviceButtonText: {
    color: '#fff',
  },
  fullscreenButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  fullscreenButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  iphoneFrame: {
    backgroundColor: '#1c1c1e',
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
    backgroundColor: '#000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 10,
  },
  screen: {
    flex: 1,
    backgroundColor: '#000',
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
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdvancediPhoneFrame;
