
import React, { useEffect, useState, useRef } from 'react'
import {View, Text, Easing, TouchableOpacity, Alert, TouchableWithoutFeedback, Animated} from 'react-native'
import tw from 'twrnc'
import { MotiView, MotiText, useDynamicAnimation, AnimatePresence } from 'moti'
import {Motion} from '@legendapp/motion'


export default function SleepBreathing({navigation}) {
  const [step, setStep] = useState(0)
  const [starterSwitch, setStarterSwitch] = useState(3)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const breathFade = useRef(new Animated.Value(1)).current
  const breathSize = useRef(new Animated.Value(0.7)).current
  
  function runAnimation(){
    
  
    
    Animated.sequence([
        //In
    Animated.parallel([
        Animated.timing(breathFade, {toValue:0.6, useNativeDriver:true, duration:3000}),
        Animated.timing(breathSize, {toValue:2.5, useNativeDriver:true, duration:3000})]),
     
        //Out
    Animated.parallel([
        Animated.timing(breathFade, {toValue:1, useNativeDriver:true, duration:6000}),
        Animated.timing(breathSize, {toValue:0.7, useNativeDriver:true, duration:6000}),
    ]),
        //In
    Animated.parallel([
        Animated.timing(breathFade, {toValue:0.6, useNativeDriver:true, duration:6000}),
        Animated.timing(breathSize, {toValue:2.5, useNativeDriver:true, duration:6000})]),
        
        //Out
    Animated.parallel([
        Animated.timing(breathFade, {toValue:1, useNativeDriver:true, duration:9000}),
        Animated.timing(breathSize, {toValue:0.7, useNativeDriver:true, duration:9000}),]),
        //In
    Animated.parallel([
        Animated.timing(breathFade, {toValue:0.6, useNativeDriver:true, duration:9000}),
        Animated.timing(breathSize, {toValue:2.5, useNativeDriver:true, duration:9000})]),
        //Out
    Animated.parallel([
        Animated.timing(breathFade, {toValue:1, useNativeDriver:true, duration:12000}),
        Animated.timing(breathSize, {toValue:0.7, useNativeDriver:true, duration:12000}),]),
        //In
    Animated.parallel([
        Animated.timing(breathFade, {toValue:0.6, useNativeDriver:true, duration:12000}),
        Animated.timing(breathSize, {toValue:2.5, useNativeDriver:true, duration:12000})]),
        //Out
    Animated.parallel([
        Animated.timing(breathFade, {toValue:1, useNativeDriver:true, duration:14000}),
        Animated.timing(breathSize, {toValue:0.7, useNativeDriver:true, duration:14000}),]),
        //In
    Animated.parallel([
        Animated.timing(breathFade, {toValue:0.6, useNativeDriver:true, duration:14000}),
        Animated.timing(breathSize, {toValue:2.5, useNativeDriver:true, duration:14000})]),
        //Out
    Animated.parallel([
        Animated.timing(breathFade, {toValue:1, useNativeDriver:true, duration:16000}),
        Animated.timing(breathSize, {toValue:0.7, useNativeDriver:true, duration:16000}),]),
        //In
    Animated.parallel([
        Animated.timing(breathFade, {toValue:0.6, useNativeDriver:true, duration:16000}),
        Animated.timing(breathSize, {toValue:2.5, useNativeDriver:true, duration:16000})]),
        //Out
    Animated.parallel([
        Animated.timing(breathFade, {toValue:1, useNativeDriver:true, duration:18000}),
        Animated.timing(breathSize, {toValue:0.7, useNativeDriver:true, duration:18000}),]),
        //In
    Animated.parallel([
        Animated.timing(breathFade, {toValue:0.6, useNativeDriver:true, duration:18000}),
        Animated.timing(breathSize, {toValue:2.5, useNativeDriver:true, duration:18000})]),
        //Out
    Animated.parallel([
        Animated.timing(breathFade, {toValue:1, useNativeDriver:true, duration:20000}),
        Animated.timing(breathSize, {toValue:0.7, useNativeDriver:true, duration:20000}),]),
        //In
    Animated.parallel([
        Animated.timing(breathFade, {toValue:0.6, useNativeDriver:true, duration:20000}),
        Animated.timing(breathSize, {toValue:2.5, useNativeDriver:true, duration:20000})]),
        //Out
    Animated.parallel([
        Animated.timing(breathFade, {toValue:1, useNativeDriver:true, duration:22000}),
        Animated.timing(breathSize, {toValue:0.7, useNativeDriver:true, duration:22000}),]),
 
    Animated.timing(breathFade, {toValue:0.0, useNativeDriver:true, duration:1500})
  ]).start(()=>setDone(true))
  }


  async function start(){
    setStarted(true)
    setStarterSwitch(0)
    runAnimation() 
  }

  return (
    <View style={{width: '100%', height:'100%', backgroundColor:'black', position:'relative'}}> 
    <AnimatePresence exitBeforeEnter>
    {step == 0 ?
    <View key="adf" style={{width: '100%', height:'100%', backgroundColor:'black', position:'relative'}}>
    
    <MotiView key="a" from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{type:'timing', duration:1000, easing:Easing.easing}} style={tw`justify-center flex-1 mx-5 mt-40`}>
      <Text style={tw`text-white text-4xl text-center`}>Welcome</Text>
      <Text style={tw`text-white m-4 text-left text-lg `}>This Exercise is composed of 8 breathes </Text>
      <Text style={tw`text-white m-4  text-left text-lg`}>Each breath has a longer exhale than inhale and the breaths get slower as the exercise progresses.</Text>
      <Text style={tw`text-white m-4  text-left text-lg`}>If you are able to get through this exercise, you have taken a powerful step towards preparing your body for sleep.</Text>
      <Text style={tw`text-white m-4 text-left text-lg`}>Science has shown that extended exhales are one of the most immediate and powerful ways to reduce stress and anxiety in the moment. </Text>
    
    
      
    </MotiView>
    
    <TouchableOpacity style={tw`justify-end items-center mb-20 flex-1`} onPress={()=> setStep(step+1)}>
    <MotiText key="b" from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{type:'timing', duration:1000, easing:Easing.easing}}  style={tw`items-center justify-center text-white m-4 text-left text-lg`}>Begin</MotiText>
    </TouchableOpacity>
    
    </View>
    :
     null
    }





    {step != 0 &&
      <View style={{width: '100%', height:'100%', backgroundColor:'black', position:'relative'}}>
      {!started &&
      <TouchableWithoutFeedback style={{width:'100%', height:'100%'}} onPress={()=> start()}>
      <View style={tw`mx-auto justify-center items-center mt-90`}>
      
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
          
              <MotiText 
                key="2"
                from={{opacity:0, scale:0.5}}
                animate={{opacity:1, scale:1}}
                transition={{type:'timing', duration:2000, easing:Easing.easing}} 
                exit={{opacity:0}}
                style={tw`text-2xl text-center items-center text-white mt-20`}>
                  Touch Here to Begin
              </MotiText>

        
          </View>
          </TouchableWithoutFeedback>
        }
        
        {!done ?
        <View key="asdfs" style={{width:'100%', height:'100%'}}>
        <View key="asdfasd" style={tw`mx-auto justify-center items-center mt-90`}>
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
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <Text style={tw`text-2xl text-center items-center text-white mt-20`}>Cancel</Text>
                    </TouchableOpacity>
                    </Animated.View>
                  
               </View>
               
                }
               </View>
                </View>
        :
        <View style={{width: '100%', height:'100%', backgroundColor:'black', position:'relative'}}>
          <MotiView style={tw`flex-1 justify-center items-center`} key="adfadfadfs" exit={{opacity:0}} from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:2000, easing:Easing.easing}}>
          <MotiText style={tw`text-white text-4xl `}>Exercise Complete</MotiText>
          <TouchableOpacity style={tw`items-center rounded-xl p-3 mx-20 mt-10`} onPress={()=> navigation.navigate('BreathOverview')}>
            <Text style={tw` text-white text-2xl`}>Tap here to go back</Text>
          </TouchableOpacity>
          </MotiView>
        </View>
        }
        
        </View>
        }
    </AnimatePresence>
   </View>
  )
}
