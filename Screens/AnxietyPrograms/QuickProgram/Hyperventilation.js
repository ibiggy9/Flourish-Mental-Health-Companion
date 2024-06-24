
import React, { useEffect, useState, useRef } from 'react'
import {View, Text, Easing, TouchableOpacity, Alert, TouchableWithoutFeedback, Animated, useWindowDimensions, ScrollView} from 'react-native'
import tw from 'twrnc'
import { MotiView, MotiText, useDynamicAnimation, AnimatePresence } from 'moti'
import {Motion} from '@legendapp/motion'
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useHaptics } from 'react-native-custom-haptics'
import BackButton from '../../../Components/BackButton'
import { LinearGradient } from 'expo-linear-gradient'



export default function Hyperventilation({navigation}) {
  const [step, setStep] = useState(0)
  const [starterSwitch, setStarterSwitch] = useState(3)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const [breathCount, setBreathCount] = useState(25)
  const totalLoops = useRef(4)
  const breathFade = useRef(new Animated.Value(1)).current
  const breathSize = useRef(new Animated.Value(0.7)).current
  const iterationCount = useRef(1)
  const [finished, setFinished] = useState(false)
  const triggerStart = useRef(false)
  const {trigger, stop, isRunning} = useHaptics()
  const [timer, setTimer] = useState(25)
  const {height, width} = useWindowDimensions()
  const [instruction, setInstruction] = useState()

  const BREATH_HAPTICS = [
    
    'heavy',
    200,
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
    setInstruction("Take Full Breaths In & Out With Force")
    runHaptics()
    Animated.sequence([
    Animated.parallel([
    Animated.timing(breathFade, {toValue:0.6, useNativeDriver:true, duration:900}),
    Animated.timing(breathSize, {toValue:2.5, useNativeDriver:true, duration:900})]),
    Animated.parallel([
    Animated.timing(breathFade, {toValue:1, useNativeDriver:true, duration:900}),
    Animated.timing(breathSize, {toValue:0.7, useNativeDriver:true, duration:900}),
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
    Animated.timing(breathFade, {toValue:0, useNativeDriver:true, duration:300}).start(()=>countDown())
    setFinished(true)
  }

  function countDown(){
    
    let interval = setInterval(() => {
        setTimer(lastTimerCount => {
            lastTimerCount <= 1 && cleanAndRestart(interval)
            return lastTimerCount - 1
        })
      }, 1000) //each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval()
    
    
    
  }

function cleanAndRestart(interval){
    console.log(totalLoops)
    if(totalLoops.current != 0){
    totalLoops.current = totalLoops.current -1
    clearInterval(interval)
    setFinished(false)
    setBreathCount(25)
    iterationCount.current = 1
    setTimer(25)
    runAnimation()
    } else { 
        clearInterval(interval)
        setDone(true)
    }
}

 

  function next(){
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
    <View style={{width:width, height: height}}>
    <LinearGradient 
    
    colors={['#27178C','#8C4917']}
    start={{x:0.05, y:0.6}}
    end={{x:0.9, y:0.3}}
    locations={[0.1,0.99]}
    
    
    style={{width:width, height:height, opacity:0.65}}
    >
    </LinearGradient>
    <View style={[tw`flex-1 justify-start`,{height:height, width:width, opacity:1, position:'absolute'}]}>
    <AnimatePresence exitBeforeEnter>
      
    {step == 0 ?
    <View key="adf" style={[{width:width, height:height}, tw``]}>
    <BackButton navigation={navigation} />
    
    <MotiView key="a" from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{type:'timing', duration:1000, easing:Easing.easing}} style={tw`flex-1 justify-start`}>
      <ScrollView contentContainerStyle={tw`mx-5 pb-20`}>
      <Text style={tw`text-white text-4xl mb-3 text-center`}>Welcome</Text>
      <Text style={tw`text-white m-1 text-left text-lg font-light `}>When we're stressed, we often seek relaxation exercises to help address those feelings.</Text>
      <Text style={tw`text-white m-1  text-left text-lg font-light`}>However, voluntary exposure to stress actually can help you get used to the effects of stress and frame them as a performance enhancer rather than a detriment.</Text>
      <Text style={tw`text-white m-1  text-left text-lg font-light`}>Temporary hyperventilation can cause a rush of adrenaline that can prime you for performance, boost your mood mental skills.</Text>
      <Text style={tw`text-white m-1  text-left text-lg font-light`}>*WARNING: Do not do this exercise if you have a history of panic attacks* </Text>
      <Text style={tw`text-white m-1 mt-10 text-left text-lg font-bold`}>INSTRUCTIONS: On the inhale, breath in forcefully and as deeply as possible, then breath out the same way. After 25 breaths, you will be asked to exhale and hold your breath for 25 seconds. This will feel easy after hyperventilating. Then the exercise repeats for a total of 5 times.</Text>
      </ScrollView>
      
    </MotiView>

    <View style={tw`justify-end items-center mb-10 mt-1`}>
    <TouchableOpacity style={tw``} onPress={()=> next()}>
    <MotiText key="b" from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{type:'timing', duration:1000, easing:Easing.easing}}  style={tw` text-white  text-2xl`}>Begin</MotiText>
    </TouchableOpacity>
    </View>
    
    </View>
    :
     null
    }





    {step == 1 &&
      <View key="adf2" style={{width:width, height:height}}>
      {!started &&
      <TouchableWithoutFeedback style={{width:'100%', height:'100%'}} onPress={()=> start()}>
      <View style={[{width:width, height:height, alignItems:'center', justifyContent:'start'},tw`mt-70` ]}>
      
      <MotiView               
                  from={{opacity:0, scale:1}}
                  
                  animate={{opacity:1, scale:0.7}}
                  exit={{opacity:0}}
                  key="1"
                  transition={{type:'timing', duration:1000, easing:Easing.easing}}
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
          
              <MotiText 
                key="2"
                from={{opacity:0, scale:0.5}}
                animate={{opacity:1, scale:1}}
                transition={{type:'timing', duration:1000, easing:Easing.easing}} 
                exit={{opacity:0}}
                style={tw`text-2xl text-center items-center text-white mt-20`}>
                  Touch Here to Begin
              </MotiText>

        
          </View>
          </TouchableWithoutFeedback>
        }
        
        {!done ?
        
        <View key="12433321" style={{width:width, height:height, alignItems:'center', justifyContent:'start' }}>
               {starterSwitch == 0 && !finished &&
               <View style={[{width:width, height:height, alignItems:'center', justifyContent:'start'},tw`mt-70`]}>
               <MotiView from={{opacity:0}} animate={{opacity:1}}>
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
                  {
                    opacity:breathFade,
                    transform:[{scale: breathSize}]
                  }
                
                ]} />

                </MotiView>
                {instruction &&
                <MotiText from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', delay:1500, easing:Easing.easing}} style={tw`text-white font-light text-center items-center  text-xl mt-30`}>{instruction}</MotiText>
                    }
                  <TouchableOpacity style={tw`mt-20`} onPress={()=> onCancel()}>
                     <MotiText from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing}} style={tw`text-2xl font-light text-center items-center text-white`}>Cancel</MotiText>
                     </TouchableOpacity>
        
               
               </View>
                }
                {finished &&
                <View key="12433321" style={[{width:width, height:height, alignItems:'center', justifyContent:'start'}, tw`mt-70`]}>
                <MotiView from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', delay:1500, easing:Easing.easing}}>
                    
                    <Text style={[tw`text-white text-center`, {fontSize:150}]}>{timer}</Text>
                    <Text style={tw`text-white text-center font-light text-2xl mt-10`}>Exhale and Hold</Text>
                </MotiView>
                <TouchableOpacity style={tw`mt-20`} onPress={()=> onCancel()}>
                     <Text style={tw`text-2xl font-light text-center items-center text-white`}>Cancel</Text>
                     </TouchableOpacity>
                </View>
                }

                
                
               
                    
                   
               </View>
                
        :
        <View style={{width: '100%', height:'100%'}}>
          <MotiView style={tw`flex-1 justify-center items-center`} key="adfadfadfs" exit={{opacity:0}} from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing}}>
          <MotiText style={tw`text-white text-4xl `}>Exercise Complete</MotiText>
          <TouchableOpacity style={tw`items-center rounded-xl p-3 mx-20 mt-10`} onPress={()=> navigation.goBack()}>
            <Text style={tw` text-white text-2xl`}>Tap here to go back</Text>
          </TouchableOpacity>
          </MotiView>
        </View>
        }
        
        </View>
        }
    </AnimatePresence>
   </View>
   </View>
  )
}
