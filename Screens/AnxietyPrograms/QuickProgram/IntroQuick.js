import React from 'react'
import {View, Text, Easing, TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import { Motion } from "@legendapp/motion"
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import BackButton from '../../../Components/BackButton';


export default function IntroQuick({navigation}) {
  const description = 'In this program, you will have the option to go through several breathing exercises that will help you lower your stress and anxiety in a few minutes.'

  function next(){
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
     navigation.navigate('BreathOverview')
  }


  return (
    <View style={{width: '100%', height:'100%', backgroundColor:'#030B27'}}>  
    <BackButton navigation={navigation} />
      <View style={tw`flex-1 justify-start items-center`}>
      <Motion.Text 
      initial={{y:280, opacity:0}} animate={{y:0, opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing}, y:{type:"timing", duration:500, easing: Easing.easing, delay:1000}}}
      style={tw`text-center mt-10 text-white font-bold text-2xl`}>Quick Anxiety Reduction Program</Motion.Text>
      <Motion.View style={tw``} initial={{opacity:0}} animate={{opacity:1.2}} transition={{type:"timing", duration:600, easin: Easing.easing, delay:1700}}>
      
      <Text style={tw`text-white text-lg font-light  p-5 px-12 mt-3 `}>{description}</Text>
      
      
      
      </Motion.View>
      </View>

      <View style={tw`flex-1 justify-end mb-15`}>
      <TouchableOpacity style={tw`flex-row  text-center justify-center items-center  p-3 mx-20 rounded-xl mt-10`} onPress={()=> next()} >
        <Text style={tw`ml-4 text-center text-2xl font-bold text-white`}>Begin</Text>
        <MaterialIcons name="navigate-next" size={35} color="white" />
      </TouchableOpacity>
      </View>
    </View>
  )
}
