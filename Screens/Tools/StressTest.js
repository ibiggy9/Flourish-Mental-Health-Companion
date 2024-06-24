
import React, { useEffect, useState, useRef } from 'react'
import {View, Text, Easing, TouchableOpacity, Alert, TouchableWithoutFeedback, Animated, Touchable, useWindowDimensions, Image, Linking} from 'react-native'
import tw from 'twrnc'
import { MotiView, MotiText, useDynamicAnimation, AnimatePresence } from 'moti'
import { MaterialIcons } from '@expo/vector-icons';
import {Motion} from '@legendapp/motion'
import * as Haptics from 'expo-haptics';
import { useHaptics } from 'react-native-custom-haptics'
import BackButton from '../../Components/BackButton';
import { LinearGradient } from 'expo-linear-gradient';
import InstructionSlider from '../../Components/ExerciseComponents/InstructionSlider';
import analytics from '@react-native-firebase/analytics';
import MarginWrapper from '../MarginWrapper';


export default function StressTest({navigation}) {
  const [step, setStep] = useState(0)
  const [starterSwitch, setStarterSwitch] = useState(3)
  const [started, setStarted] = useState(false)
  const [breathCount, setBreathCount] = useState(4)
  const [done, setDone] = useState(false)
  const iterationCount = useRef(1)
  const startTrigger = useRef(false)
  const {trigger, isRunning, stop} = useHaptics();
  const [instruction, setInstruction] = useState('')
  const breathFade = useRef(new Animated.Value(1)).current
  const breathSize = useRef(new Animated.Value(0.5)).current
  const {width, height} = useWindowDimensions()
  const number = useRef(0)
  const [timer, setTimer] = useState(1)
  const [score, setScore] = useState()

  const instructionStart = [
    {
      instructionTitle:"What It Does",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../assets/stress/s1.jpg')}/>,
      instructionShort:"This tool uses a breathing protocol to determine if you are stressed, moderately recovered, or well recovered.",
      source:"https://www.frontiersin.org/articles/10.3389/fpsyg.2014.00756/full"
    },
    {
      instructionTitle:"How it works",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../assets/stress/s2.jpg')}/>,
      instructionShort:"The need to breath is regulated in part by a nerve that gets information about your nervous system's accumlated stress. This test uses the breath to give you a score of how stressed or recovered you are.",
      source:"https://www.frontiersin.org/articles/10.3389/fpsyg.2014.00756/full"

    },
    {
      instructionTitle:"Benefits",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../assets/stress/s3.jpg')}/>,
      instructionShort:"Doing this test can help you determine how ready you are to take on the day and can help inform whether you should consider prioritizing recovery.",
      source:"https://www.frontiersin.org/articles/10.3389/fpsyg.2014.00756/full"
    },
  ]
  

  const FINISH_HAPTICS = [
    'heavy',
    250,
    'heavy',
    150,
    'heavy',
    150,
    'heavy',
    150,
    'heavy',
    120,
    'heavy',
    120,
    'heavy',
    120,
    'heavy',
    120,
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




  ]

  const BREATH_HAPTICS = [
    'heavy',
    250,
    'heavy',
    150,
    'heavy',
    150,
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
    50,
   
  ]

  
  useEffect(() => {
    // stops the haptic pattern on cleanup
    return () => stop();
  }, []);
  

  function runHaptics(){
      
      if(!isRunning){
      trigger(BREATH_HAPTICS)
      }
    
  }

  function finishHaptics(){
    if(!isRunning){
      trigger(FINISH_HAPTICS)
    }
  }
  
  function finishScore(){
    setScore(number.current)
    setStep(step+1)
  }

  function runAnimation(){
    setInstruction("Take 4 normal breaths")
    runHaptics()  
    Animated.sequence([  
    Animated.parallel([
    
    Animated.timing(breathSize, {toValue:2, useNativeDriver:true, duration:3500})]),
    Animated.parallel([
        
        Animated.timing(breathSize, {toValue:0.5, useNativeDriver:true, duration:3500}),
        ])
    ]).start(() => {
      
      
      iterationCount.current = iterationCount.current+1

      if((iterationCount.current <= breathCount)  && startTrigger.current == true){        
        runAnimation()
        runHaptics()
      }else {
        finishBreath()
        return
      }
    })
    
  }

  function countDown(){
    setDone(true)
    let interval = setInterval(() => {
        setTimer(lastTimerCount => {
            number.current==800 ? setStep(step+1) : number.current = number.current + 1
            
            return lastTimerCount - 1
        })
      }, 1000) //each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval()
      
  }

  async function saveScore(){
    console.log("saving score")
    await analytics().logEvent(`stressTestResults_${score}`,{id:score})
  }

  useEffect(()=> {
    if(step==3){
      saveScore()
    }
  },[step])


  function finishBreath(){
    setInstruction("Take a deep breath")
    finishHaptics()
    Animated.sequence([
      Animated.parallel([
        Animated.timing(breathSize, {toValue:2, useNativeDriver:true, duration:8000}),
        Animated.timing(breathFade, {toValue:0.6, useNativeDriver:true, duration:8000})


      ]),
        Animated.timing(breathFade, {toValue:0.0, useNativeDriver:true, duration:500})

    ]).start(()=> countDown())
    
    
  }

  function onCancel(){
    stop()
    startTrigger.current=false
    navigation.goBack()
    
  }

  function next(){
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setStep(step+1)
  }

  function start(){
    setStarted(true)
    setStarterSwitch(0)
    startTrigger.current = true
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
    <View style={[tw`flex-1 justify-start `,{height:height, width:width, opacity:1, position:'absolute'}]}>
    <AnimatePresence style={{height:1, width:1}}>
    
    {step <=1 &&<BackButton navigation={navigation} /> }
    {step == 0 ?

    <View key="adf" style={{width:width, height:height}}>
    
    
    <MotiView key="a" from={{opacity:0}} animate={{opacity:1}}  transition={{type:'timing', duration:500, easing:Easing.easing}} style={tw``}>
    <Text style={tw`text-center text-white font-bold text-3xl`}>Stress & Recovery Test</Text>
      <InstructionSlider navigation={navigation} instructions={instructionStart} />      
      
        
    
      
    </MotiView>

   
    <View style={tw`justify-end  items-center  `}>
    <TouchableOpacity style={tw``} onPress={()=> next()}>
    <MotiText key="b" from={{opacity:0}} animate={{opacity:1}}  transition={{type:'timing', duration:500, easing:Easing.easing}}  style={tw`items-center justify-center text-white m-4 pb-40 text-left text-2xl`}>Next</MotiText>
    </TouchableOpacity>
    </View>
    </View>
    :
     null
    }

  {step == 1 &&
    <MotiView key="123s" from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{type:'timing', duration:500, easing:Easing.easing }}style={tw`flex-1`}>
      <View style={tw`justify-start items-center`}>
      <Text style={tw`text-white text-4xl`}>Instructions</Text>
      </View>
      <View style={tw`mx-5`}>
      <Text style={tw`text-white  font-bold text-xl mt-10`}>The Exercise Follows These Steps:</Text>
      <Text style={tw`text-white text-xl mt-2`}>1. Take 4 normal breaths</Text>
      <Text style={tw`text-white text-xl mt-2`}>2. Draw 1 Deep Inhale</Text>
      <Text style={tw`text-white text-xl mt-2`}>3. As slow as you can, exhale until your lungs are completely empty</Text>
      <Text style={tw`text-white text-xl mt-2`}>4. Your score will be calculated based on how long it takes for you to completely empty your lungs.</Text>
      <Text style={tw`text-white text-xl mt-6 italic`}>Note: Be honest about when you are no longer able to breath out any more air. This will help you get a more accurate result.</Text>
      </View>
      <View style={tw`justify-end flex-1 items-center mb-20`}>
        <TouchableOpacity onPress={()=> next()}>
          <Text style={tw`text-white text-2xl`}>Begin</Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  
  
  
  
  
  
  }




    {step == 2 &&
      <View>
      {!started &&
      <TouchableWithoutFeedback style={{width:width, height:height}} onPress={()=> start()}>
      
      <View style={{width:width, height:height, alignItems:'center', justifyContent:'center'}}>
      <MotiView               
                  from={{opacity:0, scale:1}}
                  
                  animate={{opacity:1, scale:0.5}}
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
          
              <MotiText 
                key="2"
                from={{opacity:0, scale:0.5}}
                animate={{opacity:1, scale:1}}
                transition={{type:'timing', duration:2000, easing:Easing.easing}} 
                exit={{opacity:0}}
                style={tw`text-xl text-center items-center text-white mt-20`}>
                  Touch Here to Begin
              </MotiText>
              
        
            </View>
          </TouchableWithoutFeedback>
        }
        
        {!done ?
        
        <View key="123321" style={{width:width, height:height, alignItems:'center', justifyContent:'center'}}>
               {starterSwitch == 0 &&
               <View key="12433321" style={{width:width, height:height, alignItems:'center', justifyContent:'center'}}>
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
                    alignItems:'center'
                  }, 
                  {opacity:breathFade,
                    transform:[{scale: breathSize}]
                  }
                
                ]} />
                
          
                
              

            {instruction &&
          <Animated.View style={[tw`text-white items-center `, {opacity:breathFade}]} >
          <Text style={tw`text-white text-center items-center font-light text-xl mt-20`}>{instruction}</Text>
          </Animated.View>
            }
            <TouchableOpacity style={tw`mt-20`} onPress={()=> onCancel()}>
                     <Text style={tw`text-2xl font-light text-center items-center text-white`}>Cancel</Text>
                     </TouchableOpacity>
          </View>               
          }
          </View>
                
        :
        <View style={{width: '100%', height:'100%',}}>
        <MotiView style={tw`flex-1 justify-center items-center`} key="adfadfadfs" exit={{opacity:0}} from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing}}>
        <MotiText style={[tw`text-white`,{fontSize:150}]}>{number.current}</MotiText>
        <MotiText style={tw`text-white font-light text-xl mx-5`}>Fully exhale as slowly as possible and press the button below when your lungs have fully emptied.</MotiText>
        <TouchableOpacity style={tw`absolute bottom-15`} onPress={()=> finishScore()}>
          <Text style={tw` text-white text-2xl`}>I've fully exhaled</Text>
        </TouchableOpacity>
        </MotiView>
      </View>
        }
        
        </View>
        }

        {step ==3 &&
        
      <View style={{width: '100%', height:'100%',}}>
      <MotiView style={tw`flex-1 justify-center items-center`} key="adfadfadfs" exit={{opacity:0}} from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing}}>
      {score <= 19 && 
      <View style={tw`flex-col mx-5 bg-slate-800 bg-opacity-25 p-10 rounded-2xl`}>
        <MaterialIcons name="error" size={70} color="red" />
      <MotiText style={tw`text-white text-xl `}>Your Score Indicates You're Stressed. Consider Prioritizing Recovery Today.</MotiText>
      <TouchableOpacity onPress={()=> Linking.openURL(instructionStart[2].source)}>
      <Text style={tw`text-sm text-blue-300 italic underline  mt-5`}>Source: Lehrer, P., & Gevirtz, R. (2014). Heart rate variability biofeedback: how and why does it work? Frontiers in Psychology, 5, 756. doi: 10.3389/fpsyg.2014.00756</Text>
      </TouchableOpacity>
      </View>
      }
      
      {score <= 40 && score >= 20 && 
        <View style={tw`flex-col mx-5 bg-slate-800 bg-opacity-25 p-10 rounded-2xl `}>
          <MaterialIcons name="error" size={70} color="orange" />
          <MotiText style={tw`text-white text-xl `}>Your Score Indicates You're Not Fully Recovered But Are Still Able To Perform. </MotiText>
          <TouchableOpacity onPress={()=> Linking.openURL(instructionStart[2].source)}>
      <Text style={tw`text-sm text-blue-300 italic underline  mt-5`}>Source: Lehrer, P., & Gevirtz, R. (2014). Heart rate variability biofeedback: how and why does it work? Frontiers in Psychology, 5, 756. doi: 10.3389/fpsyg.2014.00756</Text>
      </TouchableOpacity>
      
      </View>
      }
      
      {score >= 41 && 
        <View style={tw`flex-col mx-5 bg-slate-800 bg-opacity-25 p-10 rounded-2xl`}>
          <MaterialIcons name="check-circle" size={70} color="#00FF74" />
      <MotiText style={tw`text-white text-xl`}>Your Score Indicates You're Well Recovered.</MotiText>
      <TouchableOpacity onPress={()=> Linking.openURL(instructionStart[2].source)}>
      <Text style={tw`text-sm text-blue-300 italic underline  mt-5`}>Source: Lehrer, P., & Gevirtz, R. (2014). Heart rate variability biofeedback: how and why does it work? Frontiers in Psychology, 5, 756. doi: 10.3389/fpsyg.2014.00756</Text>
      </TouchableOpacity>
      
      
      </View>
      }
      <TouchableOpacity style={tw`absolute bottom-15 rounded-xl`} onPress={()=> navigation.navigate('Exercises')}>
          <Text style={tw` text-white text-2xl`}>Tap here to go back</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
        
        
        }
       
    </AnimatePresence>
   </View>
   </MarginWrapper>
   </View>
  )
}
