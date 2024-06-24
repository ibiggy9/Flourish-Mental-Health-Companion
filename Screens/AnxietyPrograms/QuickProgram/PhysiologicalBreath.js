
import React, { useEffect, useState, useRef } from 'react'
import {View, Text, Easing, TouchableOpacity, Alert, TouchableWithoutFeedback, Animated, useWindowDimensions, ScrollView, Image} from 'react-native'
import tw from 'twrnc'
import { MotiView, MotiText, useDynamicAnimation, AnimatePresence } from 'moti'
import { MaterialIcons } from '@expo/vector-icons';
import {Motion} from '@legendapp/motion'
import * as Haptics from 'expo-haptics';
import { useHaptics } from 'react-native-custom-haptics'
import BackButton from '../../../Components/BackButton';
import { LinearGradient } from 'expo-linear-gradient';
import InstructionSlider from '../../../Components/ExerciseComponents/InstructionSlider';
import analytics from '@react-native-firebase/analytics';
import MarginWrapper from '../../MarginWrapper';

export default function PhysiologicalBreath({navigation}) {
  const [step, setStep] = useState(0)
  const [starterSwitch, setStarterSwitch] = useState(3)
  const [started, setStarted] = useState(false)
  const [breathCount, setBreathCount] = useState(4)
  const [done, setDone] = useState(false)
  const iterationCount = useRef(1)
  const fadeInNum = useRef(new Animated.Value(0)).current
  const startTrigger = useRef(false)
  const [finishing, setFinishing] = useState(false)
  const {trigger, isRunning, stop} = useHaptics();
  const breathFade = useRef(new Animated.Value(1)).current
  const breathSize = useRef(new Animated.Value(0.5)).current
  const {height, width} = useWindowDimensions()
  const [instruction, setInstruction] = useState("")

    async function saveAnalytics(){
      await analytics().logEvent("physiologicalBreathComplete", {id:true})
    }

    useEffect(()=> {
      if(done === true){
        saveAnalytics()
      }
    }, [done])

  const instructionStart = [
    {
      instructionTitle:"What It Is",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../../assets/phys/p1.jpg')}/>,
      instructionShort:"This exercise is meant to help you manage stress in just a few simple steps."
    },
    {
      instructionTitle:"Why It Works",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../../assets/phys/p2.jpg')}/>,
      instructionShort:"Studies have shown that taking a deep sigh can help release physical tension and reduce feelings of stress."
    },
    {
      instructionTitle:"How To Do It",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../../assets/phys/p3.jpg')}/>,
      instructionShort:"The physiological sigh is done by taking a deep breath all the way in, then at the top of your breath, breathing in a little further and letting it out."
    },
  ]
  
  
  
  const BREATH_HAPTICS = [
    'heavy',
    250,
    'heavy',
    250,
    'heavy',
    250,
    'heavy',
    200,
    'heavy',
    175,
    'heavy',
    175,
    'heavy',
    175,
    'heavy',
    150,
    'heavy',
    150,
    'heavy',
    125,
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
    500,
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

 

  function runAnimation(){
    
    
    setInstruction("Breath all the way in. At the top of the breath, take one more little inhale, then let it out.")
    runHaptics()  
    Animated.sequence([  
    Animated.parallel([
    Animated.timing(fadeInNum, {toValue:1, useNativeDriver:true, duration:1500}),
    Animated.timing(breathFade, {toValue:0.6, useNativeDriver:true, duration:3500}),
    Animated.timing(breathSize, {toValue:2, useNativeDriver:true, duration:3500})]),
    Animated.parallel([
    Animated.timing(breathFade, {toValue:1, useNativeDriver:true, duration:750, delay:500}),
    Animated.timing(breathSize, {toValue:2.5, useNativeDriver:true, duration:750, delay:500}),
    ]),
    Animated.parallel([
        Animated.timing(breathFade, {toValue:1, useNativeDriver:true, duration:2500}),
        Animated.timing(breathSize, {toValue:0.5, useNativeDriver:true, duration:2500}),
        ])
    ]).start(() => {
      
      
      iterationCount.current = iterationCount.current+1
      console.log(start)
      if((iterationCount.current <= breathCount)  && startTrigger.current == true){        
        runAnimation()
        runHaptics()
      }else {
        finishBreath()
        setFinishing(true)
        return
      }
    })
    
  }


  function finishBreath(){
    Animated.timing(breathFade, {toValue:0.0, useNativeDriver:true, duration:1500}).start(()=> setDone(true))
  }

  function onCancel(){
    stop()
    startTrigger.current=false
    navigation.goBack()
    
  }

  async function next(){
    await analytics().logEvent(`SighbreathCount_${breathCount}`)
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
    <View style={[tw`flex-1 justify-start`,{height:height, width:width, opacity:1, position:'absolute'}]}>
    
    <AnimatePresence exitBeforeEnter>
    
    {step == 0 ?
    
    <View key="adf" style={[tw`flex-1`, {height:height, width:width}]}>
      <ScrollView contentContainerStyle={tw`pb-15`}>
    
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
    
    <TouchableOpacity style={tw` rounded-2xl mx-30  items-center`} onPress={()=> next()}>
    <MotiText key="b" from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{type:'timing', duration:1000, easing:Easing.easing}}  style={tw`items-center justify-center text-white m-3 text-left text-xl`}>Begin</MotiText>
    </TouchableOpacity>
    </ScrollView>
    </View>
    :
     null
    }





    {step != 0 &&
      <View style={{width:width, height:height}}>
      {!started &&
      <TouchableWithoutFeedback style={{width:width, height:height, backgroundColor:'yellow'}} onPress={()=> start()}>
      <View style={[{width:width, height:height, alignItems:'center'} ,tw`mt-70` ]}>
      
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
                style={tw`text-xl text-center items-center text-white mt-10`}>
                  Touch Here to Begin
              </MotiText>

        
          </View>
          </TouchableWithoutFeedback>
        }
        
        {!done ?
        <View key="asdfs" style={{width:'100%', height:'100%'}}>
        <View key="12433321" style={{width:width, height:height, alignItems:'center'}}>
               {starterSwitch == 0 &&
               <View key="12433321" style={[{width:width, height:height, alignItems:'center'}, tw`mt-70`]}>
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
                
                {instruction &&
          <Animated.View
            style={[tw`items-center`, 
            {
              opacity: finishing ? breathFade : fadeInNum

              }
              ]}>
            <Text style={tw`text-white text-center font-light text-xl mx-3 mt-20`}>{instruction}</Text>
          </Animated.View> 
            }
              <Animated.View
              style={{
                opacity: finishing ? breathFade : fadeInNum
              }}
              >
                <TouchableOpacity style={tw`mt-20`} onPress={()=> onCancel()}>
                     <Text style={tw`text-2xl font-light text-center items-center text-white`}>Cancel</Text>
                     </TouchableOpacity>
              </Animated.View>
               
                    
                  
               </View>
               
               
                }
               </View>
                </View>
        :
        <View style={{width:width, height:height}}>
          <MotiView style={tw`flex-1 justify-start items-center mt-70`} key="adfadfadfs" exit={{opacity:0}} from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:2000, easing:Easing.easing}}>
          <View style={tw`bg-slate-600 bg-opacity-40 items-center p-10 rounded-2xl`}>
          <MotiText style={tw`text-white text-2xl `}>Exercise Complete</MotiText>
          <TouchableOpacity style={tw`items-center rounded-xl mt-5`} onPress={()=> navigation.goBack()}>
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
