import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, baseStyles } from '../../theme';
import { LoginScreenProps } from '../../navigation/RootNavigator';
import { AuthStorage } from '../../utils/storage';
import { logError, getUserFriendlyMessage } from '../../utils/errorHandler';

// Demo account credentials
const DEMO_CREDENTIALS = {
  email: 'admin@nursing.com',
  password: 'password123',
} as const;

// UI Constants
const UI_CONSTANTS = {
  buttonHeight: 50,
  borderRadius: 8,
  marginTop: 24,
} as const;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoBack = () => {
    console.log('뒤로가기 버튼이 눌렸습니다!');
    
    // 네비게이션 스택에서 이전 페이지로 돌아가기
    if (navigation.canGoBack()) {
      navigation.goBack();
      console.log('이전 페이지로 돌아갔습니다.');
    } else {
      // 이전 페이지가 없는 경우 메인 탭으로 이동
      console.log('이전 페이지가 없어서 메인 탭으로 이동합니다.');
      navigation.navigate('MainTabs');
    }
  };

  const handleLogin = async () => {
    console.log('=== 로그인 시도 시작 ===');
    console.log('입력된 이메일:', `"${email}"`);
    console.log('입력된 비밀번호:', `"${password}"`);
    
    // 입력값 검증
    if (!email || !password) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 공백 제거 및 추가 검증
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert('입력 오류', '이메일과 비밀번호에 공백만 입력할 수 없습니다.');
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert('입력 오류', '올바른 이메일 형식을 입력해주세요.');
      return;
    }

    // 디버깅을 위한 로그
    console.log('공백 제거된 이메일:', `"${trimmedEmail}"`);
    console.log('공백 제거된 비밀번호:', `"${trimmedPassword}"`);
    console.log('기대하는 이메일:', `"${DEMO_CREDENTIALS.email}"`);
    console.log('기대하는 비밀번호:', `"${DEMO_CREDENTIALS.password}"`);
    console.log('이메일 비교 결과:', trimmedEmail === DEMO_CREDENTIALS.email);
    console.log('비밀번호 비교 결과:', trimmedPassword === DEMO_CREDENTIALS.password);

    // 로그인 로직 (실제로는 서버 API 호출)
    if (trimmedEmail === DEMO_CREDENTIALS.email && trimmedPassword === DEMO_CREDENTIALS.password) {
      try {
        // 인증 토큰 저장
        await AuthStorage.setToken('dummy_token_12345');
        await AuthStorage.setUserEmail(trimmedEmail);
        
        console.log('로그인 성공! 홈 화면으로 이동합니다.');
        navigation.replace('MainTabs');
      } catch (error) {
        logError(error, 'LoginScreen.handleLogin');
        const userMessage = getUserFriendlyMessage(error);
        Alert.alert('로그인 오류', userMessage);
      }
    } else {
      console.log('로그인 실패 - 잘못된 계정 정보');
      Alert.alert('로그인 실패', `잘못된 이메일 또는 비밀번호입니다.\n\n데모 계정:\n이메일: ${DEMO_CREDENTIALS.email}\n비밀번호: ${DEMO_CREDENTIALS.password}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleGoBack}
          activeOpacity={0.7}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          delayPressIn={0}
          delayPressOut={0}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>로그인</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
        
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#8B95A8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8B95A8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
          
          <View style={styles.demoInfo}>
            <Text style={styles.demoText}>데모 계정:</Text>
            <Text style={styles.demoText}>이메일: {DEMO_CREDENTIALS.email}</Text>
            <Text style={styles.demoText}>비밀번호: {DEMO_CREDENTIALS.password}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.layout.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.textStyles.heading3,
    color: colors.textPrimary,
  },
  headerSpacer: {
    width: 40, // Same width as back button to center the title
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.layout.screenPadding,
  },
  title: {
    ...typography.textStyles.heading1,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.textStyles.bodySmall,
    textAlign: 'center',
    marginBottom: spacing['4xl'],
  },
  form: {
    gap: spacing.md,
  },
  input: {
    ...baseStyles.INPUT_STYLE,
    height: spacing.component.inputHeight.md,
    borderRadius: UI_CONSTANTS.borderRadius,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
  },
  loginButton: {
    height: UI_CONSTANTS.buttonHeight,
    backgroundColor: colors.primary.base,
    borderRadius: UI_CONSTANTS.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: UI_CONSTANTS.marginTop,
    width: '100%',
  },
  loginButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  demoInfo: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: UI_CONSTANTS.borderRadius,
    borderWidth: baseStyles.BORDER_WIDTH,
    borderColor: baseStyles.BORDER_COLOR,
  },
  demoText: {
    ...typography.textStyles.caption,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
});

export default LoginScreen;
