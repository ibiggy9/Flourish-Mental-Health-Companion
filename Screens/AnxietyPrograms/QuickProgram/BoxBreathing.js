
import { Motion } from '@legendapp/motion'
import React, { useEffect, useState, useRef } from 'react'
import {View, Text, Easing, TouchableOpacity, Alert, TouchableWithoutFeedback} from 'react-native'
import tw from 'twrnc'
import { MotiView, MotiText, useDynamicAnimation, AnimatePresence } from 'moti'


export default function BoxBreathing({navigation}) {
  const [starterSwitch, setStarterSwitch] = useState(3)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const [count, setCount] = useState(15)
  const [instruction, setInstruction] = useState('hi')
  const [sequence, setSequence] = useState(0)
  const [startTime, setStartTime] = useState()
  const [currentTime, setCurrentTime] = useState()

  const breathingState = useDynamicAnimation(()=>{
    return{
      scale:1
    }
  })

  const breathingCircles = useDynamicAnimation(()=>{
    return{
      scale:1,
      opacity:0.5
    }
  })


  async function runSequence(){
    breathingState.animateTo({
      scale:[{value:4, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},{value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000}]
    })
    breathingCircles.animateTo({
      scale:[
       1,
       {value:0.5, type:'timing', duration:500, easing:Easing.easing}, 
      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      
      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},

      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      
      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},

      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      
      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},

      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      
      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},

      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      
      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},

      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      
      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},

      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      
      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},

      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      
      {value:2.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},

    ],
      opacity:[
        
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000}, 
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000}, 
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:0.5, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
        {value:1, delay: 4000, type:'timing', easing:Easing.easing, duration:4000},
      ]
    })
    console.log("Done")
  }

  async function start(){
    setStarted(true)
    setStarterSwitch(0)
    
        await runSequence()
    
    
    
  }

  return (
    <View style={{width: '100%', height:'100%', backgroundColor:'black', position:'relative'}}> 
      {!started &&
      <TouchableWithoutFeedback style={{width:'100%', height:'100%'}} onPress={()=> start()}>
      <View style={tw`mx-auto justify-center items-center mt-90`}>
      <AnimatePresence exitBeforeEnter>
      <MotiView               
                  from={{opacity:0, scale:0.5}}
                  animate={{opacity:1, scale:1}}
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
                    

                
                    
                  }} 
                  
                  
                  />
          
              <MotiText 
                key="2"
                from={{opacity:0, scale:0.5}}
                animate={{opacity:1, scale:1}}
                transition={{type:'timing', duration:2000, easing:Easing.easing}} 
                exit={{opacity:0}}
                style={tw`text-2xl text-center items-center text-white mt-20`}>
                  Touch Anywhere to Begin
              </MotiText>
      </AnimatePresence>
        
          </View>
          </TouchableWithoutFeedback>
        }
        {!done ?
        <View style={tw`mx-auto justify-center items-center mt-90`}>
               {starterSwitch == 0 ?
               <View>
                
              
                  <MotiView
                  from={{opacity:0}}               
                  animate={{ opacity:2.5}}
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
                    
                   
                    
                  }} 
                  
                  
                  />
                    
  
               </View>
               :
               <View>
                {started==true &&
                <View style={tw`mx-auto justify-between items-center`}>
                 <MotiView               
                  from={{scale:0.2}}
                  animate={{scale:1}}
                  transition={{type:'timing', duration:800, easing:Easing.easing}}
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
         
                   
                 }} 
                 
                 
                 />
                <Text style={tw`mt-30 relative text-white text-4xl font-bold`}>{starterSwitch}</Text>
                </View>
                }
               </View>
                }
            
            
            {started != false &&
            
            
            <View>
              <TouchableOpacity style={tw`rounded-xl mx-30 mt-20 `} onPress={()=> navigation.goBack()}>
              <Text style={tw`text-white text-2xl p-4 text-center`}>Cancel</Text>
              </TouchableOpacity>
              {starterSwitch == 0 &&
              <View>
              
              

              </View>
              
              }
            </View>
            }
        </View>
        :
        <View style={tw`flex-1 justify-center items-center`}>
          <Motion.View from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing}}>
          <Text style={tw`text-white text-4xl `}>Complete! Nice Work</Text>
          <TouchableOpacity style={tw`bg-blue-800 items-center rounded-xl p-3 mx-20 mt-10`} onPress={()=> navigation.navigate('BreathOverview')}>
            <Text style={tw` text-white text-2xl`}>Go Back</Text>
          </TouchableOpacity>
          </Motion.View>
        </View>
        }
   </View>
  )
}
