import React, { useEffect, useState } from 'react'
import {Text, View, TouchableOpacity, Easing } from 'react-native'
import { Motion} from '@legendapp/motion'
import { MotionLinearGradient } from '@legendapp/motion/linear-gradient-expo';
import tw from 'twrnc'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


export default function ExerciseAssessment({navigation, title, setScore, score, label, alert}) {
    

  return (
    <View style={tw`flex-1 justify-start`}>
        <Text style={tw`text-white text-3xl font-bold mt-5`}>{title}</Text>
        {alert && !score &&
        <View style={tw`flex flex-row mt-3 justify-start bg-pink-700 mx-10 rounded-xl items-center p-3`}>
        <Entypo name="warning" size={36} color="black" />
        <Text style={tw` ml-1 text-center ml-12 text-white`}>Please make a selection.</Text>
        </View>
        }
        <Text style={tw`text-white mx-10  text-lg font-light mt-5`}>{label}</Text>
        <View style={tw` flex-row items-center justify-center mt--3 mx--12`}>
        <Motion.Pressable style={tw`mx-1`} onPress={()=> setScore("Not Great")}>
            <Motion.View    whileTap={{scale:0.8, opacity:0.6}} transition={{type:'spring', damping:20, stiffness:200}}>
                {score != 1 ? <View style={{height:65, width:65, borderRadius: 65/2, backgroundColor:'#760A00'}} /> : <View style={{height:65, width:65, borderRadius: 65/2, borderWidth:3, borderColor:'white', backgroundColor:'#760A00'}} /> }
            </Motion.View>
        </Motion.Pressable>  

        <Motion.Pressable style={tw`mx-1`} onPress={()=> setScore("Somewhat Poor")}>
            <Motion.View    whileTap={{scale:0.8, opacity:0.6}} transition={{type:'spring', damping:20, stiffness:200}}>
                {score != 2 ? <View style={{height:65, width:65, borderRadius: 65/2, backgroundColor:'#C32D24'}} /> : <View style={{height:65, width:65, borderRadius: 65/2, borderWidth:3, borderColor:'white', backgroundColor:'#C32D24'}} /> }
            </Motion.View>
        </Motion.Pressable>
        
        
        <Motion.Pressable style={tw`mx-1`} onPress={()=> setScore("Neutral")}>
            <Motion.View    whileTap={{scale:0.8, opacity:0.6}} transition={{type:'spring', damping:20, stiffness:200}}>
                {score != 3 ? <View style={{height:65, width:65, borderRadius: 65/2, backgroundColor:'#F9CB20'}} /> : <View style={{height:65, width:65, borderRadius: 65/2, borderWidth:3, borderColor:'white', backgroundColor:'#F9CB20'}} /> }
            </Motion.View>
        </Motion.Pressable>

        <Motion.Pressable style={tw`mx-1`} onPress={()=> setScore("Pretty Good")}>
            <Motion.View    whileTap={{scale:0.8, opacity:0.7}} transition={{type:'spring', damping:20, stiffness:200}}>
                {score != 4 ? <View style={{height:65, width:65, borderRadius: 65/2, backgroundColor:'#056814'}} /> : <View style={{height:65, width:65, borderRadius: 65/2, borderWidth:3, borderColor:'white', backgroundColor:'#056814'}} /> }
            </Motion.View>
        </Motion.Pressable>
  
        <Motion.Pressable style={tw`mx-1`} onPress={()=> setScore("Awesome")}>
            <Motion.View    whileTap={{scale:0.8, opacity:0.7}} transition={{type:'spring', damping:20, stiffness:200}}>
                {score != 5 ? <View style={{height:65, width:65, borderRadius: 65/2, backgroundColor:'#14A200'}} /> : <View style={{height:65, width:65, borderRadius: 65/2, borderWidth:3, borderColor:'white', backgroundColor:'#14A200'}} /> }
            </Motion.View>
        </Motion.Pressable>

        </View>

        {score == "Not Great" && 
        <Motion.View initial={{opacity:0, scale:0.1}} animate={{opacity: 1, scale:1}} transition={{type:'timing', duration:250, easing:Easing.easing}} style={tw`flex mx-auto mt-20`}>
         <View style={tw`mx-auto items-center`}>
        <MaterialCommunityIcons name="emoticon-frown" size={180} color="#760A00" />
        <Text style={tw` text-white text-lg ml-2`}>Not Great</Text>
        </View>
        </Motion.View>
        }

        {score == "Somewhat Poor" && 
        <Motion.View initial={{opacity:0, scale:0.1}} animate={{opacity: 1, scale:1}} transition={{type:'timing', duration:250, easing:Easing.easing}} style={tw`flex mx-auto mt-20 items-center`}>
         <View style={tw`mx-auto items-center`}>
         <MaterialCommunityIcons name="emoticon-sad" size={180} color="#C32D24" />
        <Text style={tw` text-white text-lg ml-2`}>Somewhat Poor</Text>
        </View>
        </Motion.View>
        }

        {score == "Neutral" && 
        <Motion.View initial={{opacity:0, scale:0.1}} animate={{opacity: 1, scale:1}} transition={{type:'timing', duration:250, easing:Easing.easing}} style={tw`flex mx-auto mt-20 items-center`}>
         <View style={tw`mx-auto items-center`}>
         <MaterialCommunityIcons name="emoticon-neutral" size={180} color="#F9CB20" />
        <Text style={tw` text-white text-lg ml-2`}>Neutral</Text>
        </View>
        </Motion.View>
        }

        {score == "Pretty Good" && 
        <Motion.View initial={{opacity:0, scale:0.1}} animate={{opacity: 1, scale:1}} transition={{type:'timing', duration:250, easing:Easing.easing}} style={tw`flex mx-auto mt-20 items-center`}>
         <View style={tw`mx-auto items-center`}>
         <MaterialCommunityIcons name="emoticon-happy" size={180} color="#056814" />
        <Text style={tw` text-white text-lg ml-2`}>Pretty Good</Text>
         
        </View>
        </Motion.View>
        }

        {score == "Awesome" && 
        <Motion.View initial={{opacity:0, scale:0.1}} animate={{opacity: 1, scale:1}} transition={{type:'timing', duration:250, easing:Easing.easing}} style={tw`flex mx-auto mt-20 items-center`}>
         <View style={tw`mx-auto items-center`}>
         <MaterialCommunityIcons name="emoticon" size={180} color="#14A200" />
        <Text style={tw` text-white text-lg ml-2`}>Awesome!</Text>
        </View>
        </Motion.View>
        }
        </View>
  )
}
