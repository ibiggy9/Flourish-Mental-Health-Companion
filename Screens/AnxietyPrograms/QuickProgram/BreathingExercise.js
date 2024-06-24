
import React, { useEffect, useState, useRef } from 'react'
import {View, Text, Easing, TouchableOpacity, Alert, TouchableWithoutFeedback, Animated, useWindowDimensions, ScrollView, Image} from 'react-native'
import tw from 'twrnc'
import { MotiView, MotiText, useDynamicAnimation, AnimatePresence } from 'moti'
import {Motion} from '@legendapp/motion'
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useHaptics } from 'react-native-custom-haptics'
import BackButton from '../../../Components/BackButton'
import { LinearGradient } from 'expo-linear-gradient'
import InstructionSlider from '../../../Components/ExerciseComponents/InstructionSlider'
import analytics from '@react-native-firebase/analytics';
import MarginWrapper from '../../MarginWrapper'

export default function BreathingExercise({navigation}) {
  const [step, setStep] = useState(0)
  const [starterSwitch, setStarterSwitch] = useState(3)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const [breathCount, setBreathCount] = useState(16)
  const breathFade = useRef(new Animated.Value(1)).current
  const breathSize = useRef(new Animated.Value(0.7)).current
  const iterationCount = useRef(1)
  const triggerStart = useRef(false)
  const {trigger, stop, isRunning} = useHaptics()
  const {width, height} = useWindowDimensions()
    
    async function saveAnalytics(){
      await analytics().logEvent("exhaleBreathingComplete", {id:true})
    }

    useEffect(()=> {
      if(done ===true){
        saveAnalytics()
      }
    }, [done])


  const instructionStart = [
    {
      instructionTitle:"What It Does",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../../assets/Exhale/b1.jpg')}/>,
      instructionShort:"This tool guides users through an elongated exhale protocol to reduce stress and anxiety in the moment."
    },
    {
      instructionTitle:"Why It Works",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../../assets/Exhale/b2.jpg')}/>,
      instructionShort:"Elongated exhales activate the body’s natural relaxation response, reducing hormones such as cortisol."
    },
    {
      instructionTitle:"Benefits of Doing This Exercise",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../../assets/Exhale/b3.jpg')}/>,
      instructionShort:"This breathing technique decreases anxiety and panic symptoms, and improves overall feelings of calm and relaxation."
    },
  ]

    const BREATH_HAPTICS = [
    'heavy',
    400,
    'heavy',
    300,
    'heavy',
    250,
    'heavy',
    230,
    'heavy',
    210,
    'heavy',
    190,
    'heavy',
    180,
    'heavy',
    170,
    'heavy',
    160,
    'heavy',
    150,
    'heavy',
    140,
    'heavy',
    130,
    'heavy',
    120,
    'heavy',
    110,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    'heavy',
    100,
    
    'heavy',
    200,
    'heavy',
    300,
    'heavy',
    400,
    'heavy',
    500,


  ]
  //Stop Haptic Engine on Exit
 useEffect(() => {
    // stops the haptic pattern on cleanup
    return () => stop();
  }, []);

  function runHaptics(){
    if(!isRunning){
    trigger(BREATH_HAPTICS)
    }
  }

  function onCancel(){
    triggerStart.current = false
    stop()
    navigation.goBack()

  }
  
  function runAnimation(){
    runHaptics()
    Animated.sequence([
    Animated.parallel([
    Animated.timing(breathFade, {toValue:0.6, useNativeDriver:true, duration:6000}),
    Animated.timing(breathSize, {toValue:2.5, useNativeDriver:true, duration:6000})]),
    Animated.parallel([
    Animated.timing(breathFade, {toValue:1, useNativeDriver:true, duration:10000}),
    Animated.timing(breathSize, {toValue:0.7, useNativeDriver:true, duration:10000}),
    ])
    ]).start(() => {
      iterationCount.current = iterationCount.current +1
      if((iterationCount.current <= breathCount) && triggerStart.current == true){
        runHaptics()
        runAnimation()
      } else {
        breathFinish()
      }
    })
  }

  function breathFinish(){
    Animated.timing(breathFade, {toValue:0.0, useNativeDriver:true, duration:1500}).start(()=>setDone(true))
  }

 

  async function next(){
    await analytics().logEvent(`ExhalebreathCount_${breathCount}`)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setStep(step+1)
  }

  async function start(){
    triggerStart.current = true
    setStarted(true)
    setStarterSwitch(0)
    runAnimation() 
  }

  return (
    <View style={[tw`flex-1 ${Platform.OS=="android" && `bg-black`}`,{width:width, height:height}]}>
      <MarginWrapper>
    {Platform.OS != 'android' &&
  <LinearGradient 
  
  colors={['#182E77','#EA1D3F']}
  start={{x:0.05, y:0.6}}
  end={{x:0.9, y:0.3}}
  locations={[0.1,0.99]}
  
  
  style={{width:width, height:height, opacity:0.65}}
  />
  }
    <View style={[tw`flex-1 justify-start  pb-40`,{height:height, width:width, opacity:1, position:'absolute'}]}>
    <AnimatePresence exitBeforeEnter>
      
    {step == 0 ?
    <View style={[tw``,{height:height, width:width}]}>
    <ScrollView key="adf" contentContainerStyle={[tw`pb-10`]}>
    
    <BackButton navigation={navigation} />
    <MotiView key="a" from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{type:'timing', duration:1000, easing:Easing.easing}} style={tw``}>
      
    <InstructionSlider instructions={instructionStart} />
      
    </MotiView>

    <MotiView from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{type:'timing', duration:1000, easing:Easing.easing}} style={tw`justify-start items-center mt-2`}>
        <Text style={tw`text-white text-xl`}> Select Number of Breaths</Text>
        <View style={tw`flex-row justify-between items-center`}>
        {breathCount >=2 ?
        <TouchableOpacity onPress={()=> setBreathCount(breathCount-1)}>
        <MaterialIcons name="navigate-before" size={40} color="white" />
        </TouchableOpacity>
        :
        <MaterialIcons name="navigate-before" size={40} color="white" />

        }
        <Text style={tw`text-white text-xl text-center items-center mx-20`}>{breathCount}</Text>
        <TouchableOpacity onPress={()=> setBreathCount(breathCount+1)}>
        <MaterialIcons name="navigate-next" size={40} color="white" />
        </TouchableOpacity>
        </View>
    </MotiView>
    
    <TouchableOpacity style={tw`mx-15 rounded-2xl items-center `} onPress={()=> next()}>
    <MotiText key="b" from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{type:'timing', duration:1000, easing:Easing.easing}}  style={tw`items-center justify-center text-white m-4 text-left text-2xl`}>Begin</MotiText>
    </TouchableOpacity>
    
    </ScrollView>
    </View>
    :
     null
    }





    {step != 0 &&
      <View style={[{width:width, height: height}, tw`justify-start mt-70 items-center`]}>
      {!started &&
      
      
      <>
      
      <MotiView               
                  from={{opacity:0, scale:1}}
                  
                  animate={{opacity:1, scale:0.7}}
                  exit={{opacity:0}}
                  key="1"
                  transition={{type:'timing', duration:2000, easing:Easing.easing}}
                  style={{
                    width:100,
                    height:100,
                    borderRadius: 50,
                    borderWidth: 10,
                    borderColor:'#fff',
                    shadowColor:'#fff',
                    shadowOffset: {width: 0, height:0},
                    shadowOpacity:1,
                    shadowRadius:10, 
                       
                  }
                    } 
                  
                  
                  />
          <TouchableOpacity onPress={() => start()}>
              <MotiText 
                key="2"
                from={{opacity:0, scale:0.5}}
                animate={{opacity:1, scale:1}}
                transition={{type:'timing', duration:2000, easing:Easing.easing}} 
                exit={{opacity:0}}
                style={tw`text-xl text-center items-center text-white mt-20`}>
                  Touch Here to Begin
              </MotiText>
             </TouchableOpacity>
        
              </>
          
          
        }
        
        {!done ?
        <View key="asdfs" style={{width:width, height:height}}>
        <View key="asdfasd" style={tw` justify-center items-center`}>
               {starterSwitch == 0 &&
               <View>
                  <Animated.View style={[{
                    width:100,
                    height:100,
                    borderRadius: 50,
                    borderWidth: 10,
                    borderColor:'#fff',
                    shadowColor:'#fff',
                    shadowOffset: {width: 0, height:0},
                    shadowOpacity:1,
                    shadowRadius:10,
                  }, 
                  {opacity:breathFade,
                    transform:[{scale: breathSize}]
                  }
                
                ]} />
                
          
          
                    <Animated.View style={{opacity:breathFade}}>
                    <TouchableOpacity onPress={()=> onCancel()}>
                    <Text style={tw`text-2xl text-center items-center text-white mt-20`}>Cancel</Text>
                    </TouchableOpacity>
                    </Animated.View>
                  
               </View>
               
                }
               </View>
                </View>
        :
        <View style={{width:width, height: height}}>
          <MotiView style={tw`flex-1 justify-start items-center`} key="adfadfadfs" exit={{opacity:0}} from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:2000, easing:Easing.easing}}>
            <View style={tw`bg-slate-600 bg-opacity-40 p-10  items-center rounded-2xl`}>
          <MotiText style={tw`text-white text-2xl `}>Exercise Complete</MotiText>
          <TouchableOpacity style={tw`items-center rounded-xl p-3 mt-5`} onPress={()=> navigation.goBack()}>
            <Text style={tw` text-white text-xl`}>Tap here to go back</Text>
          </TouchableOpacity>
          </View>
          </MotiView>
        </View>
        }
        
        </View>
        }
    </AnimatePresence>
   </View>
   </MarginWrapper>
   </View>
  )
}
