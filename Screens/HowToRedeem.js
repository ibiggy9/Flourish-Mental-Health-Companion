import { View, Text, useWindowDimensions, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import BackButton from '../Components/BackButton'

export default function HowToRedeem({navigation}) {
    const {width, height} = useWindowDimensions()
    
    
  return (
    
      <View style={[{height:height/2}, tw`flex-1 mt-10`]}>
                <View style={[tw` justify-start bg-slate-900 `, {height:height}]}>
                  <ScrollView style={tw`pb-40`}>
                    <BackButton navigation={navigation} />
                    <Text style={tw`text-2xl text-white text-center font-bold mt-7`}>How to Redeem an Offer Code</Text>
                  <View style={tw`mt-5`}>
                  <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
                  <Text style={tw`text-white text-lg mx-5 mb-3 font-bold`}>1. Press Begin Free Trial On The Previous Screen.</Text>
                  <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
                  <Text style={tw`text-white text-lg mx-5 mb-3 font-bold`}>2. A menu will pop up offering a 1-week free trial then a monthly subscription.</Text>
                  <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
                  <Text style={tw`text-white text-lg mx-5 mb-3 font-bold`}>3. Tap on your payment method. </Text>
                  <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
                  <Image style={[tw` `, {height:height/1.5, width:width}]}  source={require('../assets/howToPay/pay1.png')} />
                  <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
                  <Text style={tw`text-white text-lg mx-5 my-5 font-bold`}>4. Select "Redeem Code:"</Text>
                  <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
                  <Image style={[tw` `, {height:height/1.5, width:width}]}  source={require('../assets/howToPay/pay2.png')} />
                  <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
                  <Text style={tw`text-white text-xl mx-5 my-5 font-bold`}>5. Enter your code:</Text>
                  <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
                  <Image style={[tw` `, {height:height/1.5, width:width}]}  source={require('../assets/howToPay/pay3.png')} />
                  </View>
                  
                  <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <Text style={tw`text-2xl text-white text-center mt-10 font-bold mb-10`}>Close</Text>  
                  </TouchableOpacity>
                  </ScrollView>
                  
                </View>
        </View>
   
  )
}