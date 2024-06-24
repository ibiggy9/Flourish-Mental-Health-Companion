import React, {useState} from 'react'
import {View, Text, Easing, TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import { Motion } from "@legendapp/motion"
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import BackButton from '../Components/BackButton';
import { AntDesign } from '@expo/vector-icons';

export default function ExercisePreview({navigation, route}) {
    const {title, description} = route.params;
    const [toggleStar, setToggleStar] = useState(false)

    function flipStar(){
      setToggleStar((prev) => !prev)
    }


  return (
    <View style={{with: '100%', height:'100%', backgroundColor:'#030B27'}}>  
    <View style={tw` flex-row justify-between`}>
    <BackButton navigation={navigation} />
    {toggleStar ?
    <TouchableOpacity style={tw`mt-4 mr-7`} onPress={() => setToggleStar(false)} >
           <AntDesign name="star" size={40} color="#BDA426" />
    </TouchableOpacity>
    :
    <TouchableOpacity style={tw`mt-4 mr-7`} onPress={() => setToggleStar(true)} >
    <AntDesign name="staro" size={40} color="white" />
    </TouchableOpacity>   
    }
    </View>
    <View style={tw`flex-1 justify-start`}>
      <Motion.Text 
      initial={{y:280, opacity:0}} animate={{y:0, opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing}, y:{type:"timing", duration:500, easing: Easing.easing, delay:1000}}}
      style={tw`text-center mt-10 text-white font-bold text-3xl`}>{title}</Motion.Text>
      <Motion.View initial={{opacity:0}} animate={{opacity:1}} transition={{type:"timing", duration:600, easin: Easing.easing, delay:1700}}>
      
      <Text style={tw`text-white text-lg font-light text-start  px-8 py-4 text-start items-center mx-4  rounded-2xl  mt-3 `}>{description}</Text>
      
      
   
      </Motion.View>
    
    </View>
    <View style={tw`flex-1 justify-end mb-20`}>
    <Motion.View initial={{opacity:0}} animate={{opacity:1}} transition={{type:"timing", duration:600, easin: Easing.easing, delay:1700}}>
    <TouchableOpacity style={tw`bg-orange-700 p-3 mx-20 rounded-xl mt-10`} >
        <Text style={tw`text-center text-lg font-bold text-white`}>Begin</Text>
      </TouchableOpacity>
    </Motion.View>
    </View>
    </View>
  )
}
