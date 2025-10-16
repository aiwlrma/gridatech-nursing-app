/**
 * 플랫폼별 스토리지 유틸리티
 * React Native와 웹 환경 모두 지원
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StorageItem {
  key: string;
  value: string;
}

/**
 * 스토리지에 데이터 저장
 */
export const setStorageItem = async (key: string, value: string): Promise<void> => {
  try {
    // React Native 환경에서 AsyncStorage 사용
    await AsyncStorage.setItem(key, value);
    console.log(`AsyncStorage에 저장 완료: ${key}`);
  } catch (storageError) {
    console.warn('AsyncStorage 오류 (웹 환경일 수 있음):', storageError);
    
    // 웹 환경에서 localStorage 사용
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(key, value);
        console.log(`localStorage에 저장 완료: ${key}`);
      } catch (localStorageError) {
        console.error('localStorage 오류:', localStorageError);
        throw new Error(`스토리지 저장 실패: ${key}`);
      }
    } else {
      throw new Error('스토리지를 지원하지 않는 환경입니다.');
    }
  }
};

/**
 * 스토리지에서 데이터 조회
 */
export const getStorageItem = async (key: string): Promise<string | null> => {
  try {
    // React Native 환경에서 AsyncStorage 사용
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (storageError) {
    console.warn('AsyncStorage 오류 (웹 환경일 수 있음):', storageError);
    
    // 웹 환경에서 localStorage 사용
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const value = window.localStorage.getItem(key);
        return value;
      } catch (localStorageError) {
        console.error('localStorage 오류:', localStorageError);
        return null;
      }
    }
    
    return null;
  }
};

/**
 * 스토리지에서 데이터 삭제
 */
export const removeStorageItem = async (key: string): Promise<void> => {
  try {
    // React Native 환경에서 AsyncStorage 사용
    await AsyncStorage.removeItem(key);
    console.log(`AsyncStorage에서 삭제 완료: ${key}`);
  } catch (storageError) {
    console.warn('AsyncStorage 오류 (웹 환경일 수 있음):', storageError);
    
    // 웹 환경에서 localStorage 사용
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(key);
        console.log(`localStorage에서 삭제 완료: ${key}`);
      } catch (localStorageError) {
        console.error('localStorage 오류:', localStorageError);
        throw new Error(`스토리지 삭제 실패: ${key}`);
      }
    } else {
      throw new Error('스토리지를 지원하지 않는 환경입니다.');
    }
  }
};

/**
 * 스토리지 전체 초기화
 */
export const clearStorage = async (): Promise<void> => {
  try {
    // React Native 환경에서 AsyncStorage 사용
    await AsyncStorage.clear();
    console.log('AsyncStorage 전체 초기화 완료');
  } catch (storageError) {
    console.warn('AsyncStorage 오류 (웹 환경일 수 있음):', storageError);
    
    // 웹 환경에서 localStorage 사용
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.clear();
        console.log('localStorage 전체 초기화 완료');
      } catch (localStorageError) {
        console.error('localStorage 오류:', localStorageError);
        throw new Error('스토리지 초기화 실패');
      }
    } else {
      throw new Error('스토리지를 지원하지 않는 환경입니다.');
    }
  }
};

/**
 * 인증 토큰 관련 유틸리티
 */
export const AuthStorage = {
  /**
   * 인증 토큰 저장
   */
  setToken: async (token: string): Promise<void> => {
    await setStorageItem('auth_token', token);
  },

  /**
   * 인증 토큰 조회
   */
  getToken: async (): Promise<string | null> => {
    return await getStorageItem('auth_token');
  },

  /**
   * 인증 토큰 삭제
   */
  removeToken: async (): Promise<void> => {
    await removeStorageItem('auth_token');
  },

  /**
   * 사용자 이메일 저장
   */
  setUserEmail: async (email: string): Promise<void> => {
    await setStorageItem('user_email', email);
  },

  /**
   * 사용자 이메일 조회
   */
  getUserEmail: async (): Promise<string | null> => {
    return await getStorageItem('user_email');
  },

  /**
   * 사용자 이메일 삭제
   */
  removeUserEmail: async (): Promise<void> => {
    await removeStorageItem('user_email');
  },

  /**
   * 인증 상태 확인
   */
  isAuthenticated: async (): Promise<boolean> => {
    const token = await AuthStorage.getToken();
    return !!token;
  },

  /**
   * 인증 데이터 전체 삭제
   */
  clearAuthData: async (): Promise<void> => {
    await Promise.all([
      AuthStorage.removeToken(),
      AuthStorage.removeUserEmail(),
    ]);
  },
};
