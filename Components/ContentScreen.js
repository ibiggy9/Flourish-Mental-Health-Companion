import React, {useState, useEffect} from 'react';
import { View, Text, useWindowDimensions, ScrollView, Touchable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc'
import BackButton from './BackButton';


export default function ContentScreen({navigation, route}) {
    const {contentImage, content, fullArticle} = route.params
    const {width, height} = useWindowDimensions()

  return (
    <View>
    <LinearGradient 

colors={['#182E77','#EA1D3F']}
start={{x:0.05, y:0.6}}
end={{x:0.9, y:0.3}}
locations={[0.1,0.99]}


style={{width:width, height:height, opacity:0.65}}
></LinearGradient>




<View style={[tw`flex-1 justify-start `,{height:height, width:width, opacity:1, position:'absolute'}]}>
<ScrollView contentContainerStyle={tw`pb-40`}>
    <BackButton navigation={navigation} />
    <Text style={tw`text-white text-center text-2xl mx-10 mb-5 `}>{fullArticle.title}</Text>
    <View style={tw`items-center`}>{contentImage}</View>
    <View style={tw`items-center  bg-slate-800 bg-opacity-20 p-4 mx-2 rounded-2xl mt-5`} id='player'>
        
        {content}
        
    </View>
    </ScrollView>
</View>
</View>
    
  )
}