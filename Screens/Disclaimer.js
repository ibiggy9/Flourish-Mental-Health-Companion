import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import BackButton from '../Components/BackButton'
import { LinearGradient } from 'expo-linear-gradient'
import MarginWrapper from './MarginWrapper'

export default function Disclaimer({navigation}) {
    const {width, height} = useWindowDimensions()
  return (
    <View style={[tw`flex-1 ${Platform.OS=="android" && `bg-black`}`,{width:width, height:height}]}>
    {Platform.OS != 'android' &&
  <LinearGradient 
  
  colors={['#182E77','#EA1D3F']}
  start={{x:0.05, y:0.6}}
  end={{x:0.9, y:0.3}}
  locations={[0.1,0.99]}
  
  
  style={{width:width, height:height, opacity:0.65}}
  />
  }
    <View style={[tw` flex-1 justify-start ${Platform.OS != 'android' ? `mt-15`: null } pb-20`,{height:height, width:width, opacity:1, position:'absolute'}]}>
      <MarginWrapper>
        <BackButton navigation={navigation} />
        <View style={tw`items-center`}>
        <Text style={tw`text-2xl text-white`}>Disclaimer</Text>
        </View>
        <View>
            <Text style={tw`text-lg text-white font-light mx-2`}>All services provided by Flourish Technologies are for general mental wellness support only and do not constitute the practice of professional mental health care service including the giving of medical advice. No doctor patient relationship is formed. The use of these services and the materials linked to the mobile app is at the users own risk. The content on the application is not intended to be a substitute for professional medical advice, diagnosis or treatment. Users should not disregard or delay in obtaining medical advice from any medical condition they have and they should seek the assistance for any such conditions. </Text>
        </View>
        </MarginWrapper>
    </View>
    </View>
  )
}