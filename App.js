import React, {useState, useMemo} from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Tabs from './Components/Tabs'
import Quiz from './Screens/AnxietyPrograms/Quiz'
import ExercisePreview from './Screens/ExercisePreview'
import ModuleOverView from './Screens/AnxietyPrograms/ModuleOverView'
import ReminderScreen from './Components/ExerciseComponents/ReminderScreen'
import ExercisesNew from './Screens/ExercisesNew'
import BreathingExercise from './Screens/AnxietyPrograms/QuickProgram/BreathingExercise'
import PhysiologicalBreath from './Screens/AnxietyPrograms/QuickProgram/PhysiologicalBreath'
import { HapticsProvider } from 'react-native-custom-haptics';
import WhiteNoise from './Screens/AnxietyPrograms/QuickProgram/WhiteNoise'
import StressTest from './Screens/Tools/StressTest'
import HowToRedeem from './Screens/HowToRedeem'
import { useEffect } from 'react'
import MhContQuiz from './Screens/Tools/MhContQuiz'
import Login from './Screens/Login'
import { AuthProvider } from './Context/AuthContext'
import Paywall2 from './Screens/Paywall2' 
import AiTab from './Screens/AI/AiTab'

import { 
  onAuthStateChanged, 
  getAuth,
} from 'firebase/auth'
import app from './firebaseConfig'
import Fleur from './Screens/AI/ChatBot/Fleur'
import OnBoarding from './Screens/OnBoarding/OnBoarding'
import Welcome from './Screens/Welcome'
import ConfirmDelete from './Screens/ConfirmDelete'
import RefreshLogin from './Screens/RefreshLogin'
import PromoCode from './Screens/PromoCode'
import { StatusBar, View, AppState } from 'react-native'
import { Platform, useWindowDimensions } from 'react-native'
import Disclaimer from './Screens/Disclaimer'
import tw from 'twrnc'
import MarginWrapper from './Screens/MarginWrapper'
import useRevHook from './Components/useRevHook'
import { FleurProvider } from './Context/FleurContext'
import * as Device from 'expo-device';
import DeviceInfo from 'react-native-device-info';

export const AppContext = React.createContext()
export default function App({navigation}) {
  const Stack = createNativeStackNavigator()
  const auth = getAuth(app)
  const [user, setUser] = useState()
  const {isProMember} = useRevHook()
  const {width, height} = useWindowDimensions()
  
  



useEffect(() => {
  
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)  
      
  })
  
  return () =>{
      unsubscribe()
      
  }
}, [auth.currentUser])
  
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent'
    }
  }
 return (
  
  <>
    <AuthProvider>
    <FleurProvider>
    <HapticsProvider>
    <StatusBar barStyle={'light-content'}    backgroundColor='black' />
    <NavigationContainer>
      <Stack.Navigator 
         screenOptions={{
          headerShown:false,
          backgroundColor:'transparent',
          borderTopWidth: 0,
          }}
          initialRouteName="home"
      >
         
              <>
            <Stack.Screen name="home" component={Tabs} />            
            <Stack.Screen name="PhysiologicalBreath" component={PhysiologicalBreath}  options={{gestureEnabled:false}} />
            <Stack.Screen name="RefreshLogin" component={RefreshLogin} />
            <Stack.Screen name="Quiz" component={Quiz} options={{gestureEnabled:false}}  />
            <Stack.Screen name="ModuleOverView" component={ModuleOverView} options={{gestureEnabled:false}} />
            <Stack.Screen name="BreathingExercise" component={BreathingExercise}  options={{gestureEnabled:false}} />
            <Stack.Screen name="Disclaimer" component={Disclaimer}  options={{gestureEnabled:false}} />
            <Stack.Screen name="WhiteNoise" component={WhiteNoise} />
            <Stack.Screen name="StressTest" component={StressTest} />
            <Stack.Screen name='ExercisesNew' component={ExercisesNew} />
            <Stack.Screen name="AiTab" component={AiTab} />
            <Stack.Screen name="MhContQuiz" component={MhContQuiz}  options={{gestureEnabled:false}}  />
            <Stack.Screen name="Fleur" component={Fleur} />
            <Stack.Screen name="HowToRedeem" component={HowToRedeem} />    
            <Stack.Screen name="ConfirmDelete" component={ConfirmDelete} />          
            <Stack.Group screenOptions={{presentation:"modal"}}>
               <Stack.Screen name="ExercisePreview" component={ExercisePreview} />   
               <Stack.Screen name="Welcome" component={Welcome} />
               <Stack.Screen name="Reminder" component={ReminderScreen} />
               
            </Stack.Group>
            <Stack.Group screenOptions={{presentation:'fullScreenModal'}}>
                <Stack.Screen name="PromoCode" component={PromoCode} />
                <Stack.Screen name="Paywall" component={Paywall2} />  
            <Stack.Screen name='Onboarding' component={OnBoarding} />
            {/*<Stack.Screen name="Reminder" component={ReminderScreen} />*/}
            </Stack.Group>
              </>       
           
           

        </Stack.Navigator>
    </NavigationContainer>
    </HapticsProvider>
    </FleurProvider>
    </AuthProvider>
    
    
    </>
    
    
  );
}

