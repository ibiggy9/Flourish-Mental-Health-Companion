import { View, Text, TouchableOpacity, FlatList, ScrollView, useWindowDimensions, Image} from 'react-native'
import React, {useState, useEffect} from 'react'
import tw from 'twrnc'
import { MotiView, MotiText } from 'moti'
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../Components/BackButton'


export default function Welcome({navigation}) {
    const {width, height} = useWindowDimensions()
  return (
    <View style={[tw`bg-indigo-900`,{height:height, width:width}]}>
        <ScrollView contentContainerStyle={tw`mt-15 mx-3 pb-50`} showsVerticalScrollIndicator={false}>
       
      <Text style={tw`text-white text-2xl font-bold text-center`}>Welcome To Flourish</Text>
      <Text style={tw`text-white text-lg mt-2`}>Here are a few details to get you started:</Text>
      <Text style={tw`text-white text-2xl font-bold mt-5`}>Explore:</Text>
      <Image source={require('../assets/welcomeScreen/explore.png')} resizeMode={'contain'} style={{width:width/1.1, height:height/8}} />
      <Text style={tw`text-slate-200`}>This is your hub for content on all things mental wellness. Learning about how your mind works can be very helpful in guiding yourself towards better habits in your thought life and physical life.
         Over time, we will continue to add new content pieces.
        </Text>


        <Text style={tw`text-white text-2xl font-bold mt-5`}>Fleur:</Text>
      <Image source={require('../assets/welcomeScreen/Fleur.png')} resizeMode={'contain'} style={{width:width/1.1, height:height/8}} />
      <Text style={tw`text-slate-200`}>This is where you go to interact with Fleur, your AI Therapist. You can ask her for advice, help with a situation or really any thing around your mental wellness.
        </Text>


        <Text style={tw`text-white text-2xl font-bold mt-5`}>Exercises:</Text>
      <Image source={require('../assets/welcomeScreen/Exercise.png')} resizeMode={'contain'} style={{width:width/1.1, height:height/8}} />
      <Text style={tw`text-slate-200`}>This menu is where all the tools for your mental wellness live. Ranging from breathwork to cogntiive behavioral therapy, you can pick the exercise that works for you. 
        </Text>


        <Text style={tw`text-white text-2xl font-bold mt-5`}>Profile:</Text>
      <Image source={require('../assets/welcomeScreen/Profile.png')} resizeMode={'contain'} style={{width:width/1.1, height:height/8}} />
      <Text style={tw`text-slate-200`}>This is where you can go to review your past work within our various tools and you can manage your profile. </Text>

      <TouchableOpacity onPress={()=> navigation.goBack()}  style={[tw`items-center rounded-2xl mx-15 p-3 mt-5  `, {backgroundColor:'#E5962D'}]}>
        <Text style={tw`text-white text-xl`}>I'm Ready to Begin!</Text>
      </TouchableOpacity>

      </ScrollView>

    </View>
  )
}