import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../../theme';
import { SplashScreenProps } from '../../navigation/RootNavigator';
import { AuthStorage } from '../../utils/storage';
import { logError } from '../../utils/errorHandler';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  // Check authentication status with better error handling
  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      return await AuthStorage.isAuthenticated();
    } catch (error) {
      logError(error, 'SplashScreen.checkAuthStatus');
      return false;
    }
  };

  // Navigate to appropriate screen
  const navigateToScreen = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
      navigation.replace('MainTabs');
    } else {
      navigation.replace('Login');
    }
  };

  useEffect(() => {
    // Wait for minimum display time and check auth status
    Promise.all([
      new Promise(resolve => setTimeout(resolve, 2000)), // Min display time
      checkAuthStatus(), // AsyncStorage token check
    ]).then(([_, isAuthenticated]) => {
      navigateToScreen(isAuthenticated as boolean);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* App Icon */}
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            style={styles.iconGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.iconEmoji}>🎓</Text>
          </LinearGradient>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Smart Nursing Feedback
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Real-time VR practice analytics
        </Text>

        {/* Loading Indicator */}
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary.base} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.layout.screenPadding,
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  iconEmoji: {
    fontSize: 48,
  },
  title: {
    ...typography.textStyles.splashTitle,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.textStyles.splashSubtitle,
    textAlign: 'center',
    marginBottom: spacing['4xl'],
  },
  loaderContainer: {
    position: 'absolute',
    bottom: height * 0.15,
  },
});

export default SplashScreen;
