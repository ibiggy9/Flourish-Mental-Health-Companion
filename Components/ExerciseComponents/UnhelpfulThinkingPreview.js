import React from 'react'
import {View, Text, Easing, TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import { Motion } from "@legendapp/motion"
import { Ionicons } from '@expo/vector-icons';


export default function ExercisePreview({navigation, route}) {
    const {title, description, link} = route.params;
    

  return (
    <View style={{width: '100%', height:'100%', backgroundColor:'#292B55'}}>  
    <TouchableOpacity onPress={()=> navigation.goBack()} style={tw`flex flex-row  justify-start mt-20 ml-4`}>
    <Ionicons name="chevron-back-circle" size={38} color="white" />
    </TouchableOpacity>

      <Motion.Text 
      initial={{y:280, opacity:0}} animate={{y:0, opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing}, y:{type:"timing", duration:500, easing: Easing.easing, delay:1000}}}
      style={tw`text-center mt-10 text-white font-bold text-3xl`}>{title}</Motion.Text>
    
    <Motion.View initial={{opacity:0}} animate={{opacity:1}} transition={{type:"timing", duration:600, easin: Easing.easing, delay:1700}}>
      
      <Text style={tw`text-white text-lg font-light text-start  px-8 py-4 text-start items-center mx-4  rounded-2xl  mt-3 `}>{description}</Text>
      
      
      <TouchableOpacity style={tw`bg-orange-700 p-3 mx-20 rounded-xl mt-10`} onPress={()=> navigation.navigate(link)} >
        <Text style={tw`text-center text-lg font-bold text-white`}>Begin</Text>
      </TouchableOpacity>
      </Motion.View>
    </View>
  )
}
