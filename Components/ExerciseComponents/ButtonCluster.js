import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import { Motion } from '@legendapp/motion'

export default function ButtonCluster({lastClick, nextClick, stepper, previousCommand, nextCommand, hidden, hiddenNext}) {
  return (
    <View style={tw`flex flex-row justify-center mt-10`}>
      {hidden == true ?
        
        <TouchableOpacity style={tw`bg-blue-900 rounded-xl p-3 px-10 mx-12 hidden`} onPress={()=> lastClick()}>
        <Text style={tw`text-white m-auto text-lg font-bold`}>{previousCommand}</Text>
        </TouchableOpacity>
        
        :
        <Motion.View initial={{opacity:0}}  animate={{opacity:1}}  transition={{default: {type:'timing', duration:1200, easing:'backInOut', delay:2000}}}>
        <TouchableOpacity style={tw`bg-blue-900 rounded-xl p-3 px-10 mx-12`} onPress={()=> lastClick()}>
        <Text style={tw`text-white m-auto text-lg font-bold`}>{previousCommand}</Text>
        </TouchableOpacity>
        </Motion.View>
      
      }
       {hiddenNext ?
        <Motion.View>
        <TouchableOpacity style={tw`bg-blue-900 rounded-xl p-3 px-10 mx-12 hidden`} onPress={()=> nextClick()}>
            <Text style={tw`text-white m-auto text-lg font-bold`}>{nextCommand}</Text>
        </TouchableOpacity>
        </Motion.View>
        :
        <Motion.View initial={{opacity:0}}  animate={{opacity:1}}  transition={{default: {type:'timing', duration:1200, easing:'backInOut', delay:2000}}}>
        <TouchableOpacity style={tw`bg-blue-900 rounded-xl p-3 px-10 mx-12`} onPress={()=> nextClick()}>
            <Text style={tw`text-white m-auto text-lg font-bold`}>{nextCommand}</Text>
        </TouchableOpacity>
        </Motion.View>
        }
        </View>
        
  )
}
