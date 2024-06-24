import React from 'react'
import { TouchableWithoutFeedback, View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons';
import { AnimatePresence, Motion } from '@legendapp/motion';

export default function HorizontalCard({navigation, items, images, clickNextNo, clickNextYes,  stepper }) {
    const {width, height} = useWindowDimensions()

  return (
    <Motion.View  initial={{opacity:0}}  animate={{opacity:1}}  transition={{default: {type:'timing', duration:1200, easing:'backInOut', delay:2000}}}>
             <TouchableWithoutFeedback style={{width:width, height:height, paddingBottom:100}}>  
                  
                   <View style={tw` pb-80`} >
                    <Text style={tw`text-white text-2xl mx-10`}>{items[stepper].title}</Text>
                    <View style={tw`mx-auto mt-10`}>
                      <Text>{images[stepper]}</Text>
                    </View>
                    <View style={tw`flex mx-10  mt-10`}>
                      <Text style={tw`text-white font-light text-lg`}>{items[stepper].definition} </Text>
                      </View>
                    <View style={tw`flex flex-row justify-evenly mt-20`}>
                    <Motion.Pressable onPress={() => clickNextNo(12903812)}>
                    <Motion.View whileTap={{scale:0.8, opacity:0.1}} transition={{type:'spring', damping:10, stiffness:300}} style={tw`flex flex-col`}>
                    <AntDesign name="closecircle" size={90} color="red" />
                    <Text style={tw`text-white p-2`}>This isn't me </Text>
                    </Motion.View>
                    </Motion.Pressable>

                    <Motion.Pressable onPress={() => clickNextYes(12312451)}>
                    <Motion.View whileTap={{scale:0.8, opacity:0.1}} transition={{type:'spring', damping:10, stiffness:300}} >
                    <AntDesign  name="checkcircle" size={90} color="green" />
                    <Text style={tw`text-white p-2`}>This is me</Text>
                    </Motion.View>
                    </Motion.Pressable>
                      </View>
                      </View>
                      
            </TouchableWithoutFeedback>
            </Motion.View>
  )
}
