/**
 * 에러 처리 유틸리티 함수들
 */

export interface ErrorInfo {
  message: string;
  code?: string;
  details?: any;
  timestamp: string;
}

/**
 * 에러를 표준화된 형태로 변환
 */
export const normalizeError = (error: any): ErrorInfo => {
  const timestamp = new Date().toISOString();
  
  if (error instanceof Error) {
    return {
      message: error.message,
      code: (error as any).code,
      details: error.stack,
      timestamp,
    };
  }
  
  if (typeof error === 'string') {
    return {
      message: error,
      timestamp,
    };
  }
  
  if (error && typeof error === 'object') {
    return {
      message: error.message || '알 수 없는 오류가 발생했습니다',
      code: error.code,
      details: error.details || error,
      timestamp,
    };
  }
  
  return {
    message: '알 수 없는 오류가 발생했습니다',
    timestamp,
  };
};

/**
 * 에러 로깅 함수
 */
export const logError = (error: any, context?: string): void => {
  const errorInfo = normalizeError(error);
  
  console.error(`[${context || 'ERROR'}]`, {
    message: errorInfo.message,
    code: errorInfo.code,
    timestamp: errorInfo.timestamp,
    details: errorInfo.details,
  });
  
  // 실제 프로덕션에서는 여기서 에러 리포팅 서비스로 전송
  // 예: Sentry, Bugsnag, Crashlytics 등
};

/**
 * 사용자 친화적인 에러 메시지 생성
 */
export const getUserFriendlyMessage = (error: any): string => {
  const errorInfo = normalizeError(error);
  
  // 네트워크 오류
  if (errorInfo.message.includes('Network Error') || errorInfo.message.includes('fetch')) {
    return '네트워크 연결을 확인해주세요.';
  }
  
  // 인증 오류
  if (errorInfo.message.includes('401') || errorInfo.message.includes('Unauthorized')) {
    return '로그인이 필요합니다. 다시 로그인해주세요.';
  }
  
  // 서버 오류
  if (errorInfo.message.includes('500') || errorInfo.message.includes('Internal Server Error')) {
    return '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
  
  // 타임아웃 오류
  if (errorInfo.message.includes('timeout')) {
    return '요청 시간이 초과되었습니다. 다시 시도해주세요.';
  }
  
  // 기본 메시지
  return errorInfo.message || '알 수 없는 오류가 발생했습니다.';
};

/**
 * 에러 복구 가능 여부 확인
 */
export const isRecoverableError = (error: any): boolean => {
  const errorInfo = normalizeError(error);
  
  // 네트워크 오류는 복구 가능
  if (errorInfo.message.includes('Network Error') || errorInfo.message.includes('fetch')) {
    return true;
  }
  
  // 타임아웃 오류는 복구 가능
  if (errorInfo.message.includes('timeout')) {
    return true;
  }
  
  // 5xx 서버 오류는 복구 가능
  if (errorInfo.code && errorInfo.code.startsWith('5')) {
    return true;
  }
  
  // 4xx 클라이언트 오류는 복구 불가능
  if (errorInfo.code && errorInfo.code.startsWith('4')) {
    return false;
  }
  
  // 기본적으로 복구 가능으로 간주
  return true;
};

/**
 * 에러 처리 래퍼 함수
 */
export const withErrorHandling = <T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context?: string
) => {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      logError(error, context);
      throw error;
    }
  };
};
