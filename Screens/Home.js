import React, { useState } from 'react'
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Button, useWindowDimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc';
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'moti';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


export default function Home({navigation}) {
  const [activePrograms, setActivePrograms] = useState(false)
  const {width, height} = useWindowDimensions()

  const items =[
    {
      title: "Window of Tolerance", 
      descriptionShort:"Learn about how to stay in your zone more consistently.", 
      descriptionLong:"In this module, you’ll learn about the window of tolerance. The window of tolerance is the zone of arousal we ideally want to be in, in which an individual has the most effective functioning. Complete this module to find out if and how often you go out of your window of tolerance and how this may be impacting your day-to-day.",
      icon: <MaterialCommunityIcons name="window-open" size={50} color="white" />
    },
    {
      title: "Grounding", 
      descriptionShort:"Learn to cope with Anxiety in the moment.", 
      descriptionLong:"In this module, you will learn grounding strategies to help cope with anxiety. Everyone experiences some degrees of anxiety from time to time, and it’s important to know how to appropriately deal with it. Complete this module to learn grounding strategies that you can apply to reduce anxiety and improve daily functioning.",
      icon: <MaterialCommunityIcons name="meditation" size={50} color="white" />
    },
    {
      title: "Sleep Hygiene", 
      descriptionShort:"Lack of sleep impacts your ability to function. Learn how to improve it. ", 
      descriptionLong:"Lack of sleep impacts your ability to function effectively and engage with the world around you. In this module, you will learn sleep hygiene strategies to improve the quality of your sleep. From building a better bedtime routine to what to do if you’re tossing and turning, this module covers it all. ",
      icon: <MaterialCommunityIcons name="sleep" size={50} color={'white'}/>
    },

  ]

  return (
    <View style={{width:width, height:height}}>
<LinearGradient 

colors={['#182E77','#EA1D3F']}
start={{x:0.05, y:0.6}}
end={{x:0.9, y:0.3}}
locations={[0.1,0.99]}


style={{width:width, height:height, opacity:0.65}}
>
</LinearGradient>
<View style={[tw`flex-1 justify-start`,{height:height, width:width, opacity:1, position:'absolute'}]}>
    <ScrollView>
    <View style={tw`flex-1 justify-start  mt-20 pb-30`}>

      <View style={tw`flex-row justify-between mx-10`}>
      <View>
        <Text style={tw`text-white text-3xl font-bold mb-2`}>Daily Activities</Text>
        
      </View>
      
      </View>

      <TouchableOpacity id="card" onPress={()=> navigation.navigate("DailyJournal")} style={[tw`ml-10 rounded-xl mb-3`, {aspectRatio:8/3, width:"80%",}]}>
            <View style={tw`flex flex-row items-center p-3 bg-slate-800 bg-opacity-40  rounded-2xl`}>
              <View style={tw` rounded-xl p-2 mt-3 items-center`}>
            <Ionicons name="journal" size={50} color="white" />
            </View>
            <View id="innerCard" style={tw`flex flex-col pl-2 mr-2 pb-4 pt-2 items-start`} >
              <Text style={tw`text-white font-bold text-lg mb-1`}>Daily Morning Journal</Text>
              <View>
              <Text style={tw`pr-10 items-start text-violet-200 mr-8`}>Keep a log of how you're feeling day-to-day.</Text>
              
              </View>
            </View>
            
            </View>
           
            
            </TouchableOpacity>
          <TouchableOpacity id="card" onPress={()=> navigation.navigate("FreeWriting")} style={[tw`ml-10 rounded-xl mb-3  bg-slate-800 bg-opacity-40`, {aspectRatio:8/3, width:"80%",}]}>
          <View style={tw`flex flex-row items-center p-3  rounded-2xl`}>
            <View style={tw` rounded-xl p-2 mt--1 items-center`}>
            <Entypo name="book" size={50} color="white" />
          </View>
          <View id="innerCard" style={tw`flex flex-col pl-2 mr-2 pb-4 pt-2 items-start`} >
            <Text style={tw`text-white font-bold text-lg mb-1 mt--4 mr-8`}>Free Writing</Text>
            <View>
            <Text style={tw`pr-10 items-start text-violet-200 mr-8`}>Write anything that comes to mind in this unstructured writing exercise. This can be completed any time of day.</Text>
            
            </View>
          </View>
          
          </View>
          
          
          </TouchableOpacity>


      
    </View>
    </ScrollView>
    </View>
    </View>
      )
  }

