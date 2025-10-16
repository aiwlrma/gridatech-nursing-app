import React from 'react';

// 간단한 웹 전용 앱
export default function HomePage() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Smart Nursing Feedback App</h1>
          <p style={styles.subtitle}>간호학생을 위한 스마트한 피드백 및 학습 관리 앱</p>
        </div>

        <div style={styles.features}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>💉</div>
            <h3 style={styles.featureTitle}>IV 삽입 술기 가이드</h3>
            <p style={styles.featureDescription}>단계별 학습 가이드와 체크리스트</p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🥽</div>
            <h3 style={styles.featureTitle}>VR 시나리오</h3>
            <p style={styles.featureDescription}>난이도별 VR 시뮬레이션 학습</p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🛡️</div>
            <h3 style={styles.featureTitle}>환자 안전 관리</h3>
            <p style={styles.featureDescription}>안전 프로토콜 및 사고 예방 시스템</p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📚</div>
            <h3 style={styles.featureTitle}>학습 가이드</h3>
            <p style={styles.featureDescription}>인슐린 투약, 응급처치 등 전문 가이드</p>
          </div>
        </div>

        <div style={styles.cta}>
          <button style={styles.button}>
            모바일 앱 다운로드
          </button>
          <p style={styles.note}>
            전체 기능은 모바일 앱에서 이용하실 수 있습니다.
          </p>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            © 2024 Smart Nursing Feedback App. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  content: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingTop: '40px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1F2E',
    marginBottom: '12px',
    margin: '0 0 12px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6B7280',
    lineHeight: '24px',
    margin: '0',
  },
  features: {
    marginBottom: '40px',
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '16px',
    border: '1px solid #E5E7EB',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  featureIcon: {
    fontSize: '32px',
    marginBottom: '12px',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1A1F2E',
    marginBottom: '8px',
    margin: '0 0 8px 0',
  },
  featureDescription: {
    fontSize: '14px',
    color: '#6B7280',
    lineHeight: '20px',
    margin: '0',
  },
  cta: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  button: {
    backgroundColor: '#1884FF',
    padding: '16px 32px',
    borderRadius: '12px',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '16px',
  },
  note: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0',
  },
  footer: {
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #E5E7EB',
  },
  footerText: {
    fontSize: '12px',
    color: '#9CA3AF',
    margin: '0',
  },
};