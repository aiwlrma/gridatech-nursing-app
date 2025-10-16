import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { colors, typography, spacing, baseStyles } from '../../theme';
import { AuthStorage } from '../../utils/storage';
import { logError, getUserFriendlyMessage } from '../../utils/errorHandler';
// SettingsScreenProps removed - now using BottomTabNavigator types

const SettingsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  console.log('SettingsScreen rendered');
  const handleLogout = async () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: async () => {
            try {
              await AuthStorage.clearAuthData();
              navigation.replace('Login');
            } catch (error) {
              logError(error, 'SettingsScreen.handleLogout');
              const userMessage = getUserFriendlyMessage(error);
              Alert.alert('오류', userMessage);
            }
          },
        },
      ]
    );
  };


  const handleProfileEdit = () => {
    Alert.alert('프로필 편집', '프로필 편집 기능이 구현될 예정입니다.');
  };

  const handleNotificationSettings = () => {
    Alert.alert('알림 설정', '알림 설정 기능이 구현될 예정입니다.');
  };

  const handlePrivacySettings = () => {
    Alert.alert('개인정보 설정', '개인정보 설정 기능이 구현될 예정입니다.');
  };

  const handleHelp = () => {
    Alert.alert('도움말', '도움말 기능이 구현될 예정입니다.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileEmoji}>👩‍⚕️</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>김간호</Text>
            <Text style={styles.profileDetails}>간호학과 3학년 · 202291930</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleProfileEdit}>
            <Text style={styles.editButtonText}>편집</Text>
          </TouchableOpacity>
        </View>

        {/* Notification & Account Settings Card */}
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem} onPress={handleNotificationSettings}>
            <View style={styles.settingIcon}>
              <Text style={styles.settingEmoji}>🔔</Text>
            </View>
            <Text style={styles.settingText}>알림 설정</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.settingItem} onPress={handlePrivacySettings}>
            <View style={styles.settingIcon}>
              <Text style={styles.settingEmoji}>🔒</Text>
            </View>
            <Text style={styles.settingText}>개인정보 설정</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* App Info Card */}
        <View style={styles.appInfoCard}>
          <TouchableOpacity style={styles.settingItem} onPress={handleHelp}>
            <View style={styles.settingIcon}>
              <Text style={styles.settingEmoji}>❓</Text>
            </View>
            <Text style={styles.settingText}>도움말</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
          
          <View style={styles.appVersionContainer}>
            <Text style={styles.appVersion}>버전 1.0.0</Text>
          </View>
        </View>

        {/* Logout Card */}
        <View style={styles.logoutCard}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: baseStyles.BORDER_COLOR,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  headerTitle: {
    ...typography.textStyles.heading3,
    fontSize: 18,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  // Profile Card - Compact Design
  profileCard: {
    ...baseStyles.CARD_STYLE,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
    height: 80,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileEmoji: {
    fontSize: 24,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F2E',
    marginBottom: 2,
  },
  profileDetails: {
    fontSize: 13,
    color: '#6B7280',
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    fontSize: 14,
    color: '#1884FF',
    fontWeight: '600',
  },
  // Settings Card - Grouped Items
  settingsCard: {
    ...baseStyles.CARD_STYLE,
    padding: 20,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingEmoji: {
    fontSize: 24,
    color: '#6B7280',
  },
  settingText: {
    fontSize: 16,
    color: '#1A1F2E',
    flex: 1,
    fontWeight: '500',
  },
  settingArrow: {
    fontSize: 20,
    color: '#6B7280',
    fontWeight: '300',
  },
  divider: {
    ...baseStyles.DIVIDER_STYLE,
    marginVertical: 8,
  },
  // App Info Card
  appInfoCard: {
    ...baseStyles.CARD_STYLE,
    padding: 20,
    marginBottom: 16,
  },
  appVersionContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  appVersion: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  // Logout Card - Separate Card
  logoutCard: {
    ...baseStyles.CARD_STYLE,
    padding: 20,
    marginBottom: 32,
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SettingsScreen;
