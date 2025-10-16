import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import FeedbackDetailScreen from '../screens/student/feedback/FeedbackDetailScreen';
import ScoreDetailScreen from '../screens/student/ScoreDetailScreen';
import RecommendedDetailScreen from '../screens/student/RecommendedDetailScreen';
import VRScenarioListScreen from '../screens/student/VRScenarioListScreen';
import EvaluationDetailScreen from '../screens/student/EvaluationDetailScreen';
import InstructorFeedbackScreen from '../screens/student/InstructorFeedbackScreen';
import DocumentDetailScreen from '../screens/student/DocumentDetailScreen';
import GuideDetailScreen from '../screens/student/guide/GuideDetailScreen';
import IVGuideDetailScreen from '../screens/student/guide/IVGuideDetailScreen';
import VRScenarioScreen from '../screens/student/vr/VRScenarioScreen';
import ExplanationScriptScreen from '../screens/student/script/ExplanationScriptScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTabs: undefined;
  FeedbackDetail: undefined;
  ScoreDetail: undefined;
  RecommendedDetail: undefined;
  VRScenarioList: undefined;
  EvaluationDetail: { evaluationId: string };
  InstructorFeedback: { evaluationId: string };
  DocumentDetail: { documentId: string; title: string; documentUri: string };
  GuideDetail: { guideId: string; title: string };
  IVGuideDetail: { guideId: string; title: string };
  VRScenario: { scenarioId: string; title: string };
  ExplanationScript: { scriptId: string; title: string };
};

// Navigation prop types for each screen
export type SplashScreenProps = {
  navigation: any; // Will be properly typed later
};

export type LoginScreenProps = {
  navigation: any; // Will be properly typed later
};

// Removed individual screen props as they're now handled by BottomTabNavigator

export type FeedbackDetailScreenProps = {
  navigation: any; // Will be properly typed later
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer
      onStateChange={(state) => {
        console.log('Current route:', state?.routes[state.index]?.name);
      }}
    >
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="FeedbackDetail" component={FeedbackDetailScreen} />
        <Stack.Screen name="ScoreDetail" component={ScoreDetailScreen} />
        <Stack.Screen name="RecommendedDetail" component={RecommendedDetailScreen} />
        <Stack.Screen name="VRScenarioList" component={VRScenarioListScreen} />
        <Stack.Screen name="EvaluationDetail" component={EvaluationDetailScreen} />
        <Stack.Screen name="InstructorFeedback" component={InstructorFeedbackScreen} />
        <Stack.Screen name="DocumentDetail" component={DocumentDetailScreen} />
        <Stack.Screen name="GuideDetail" component={GuideDetailScreen} />
        <Stack.Screen name="IVGuideDetail" component={IVGuideDetailScreen} />
        <Stack.Screen name="VRScenario" component={VRScenarioScreen} />
        <Stack.Screen name="ExplanationScript" component={ExplanationScriptScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
