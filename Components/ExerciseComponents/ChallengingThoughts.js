import React from 'react'
import { Text,View } from 'react-native'
import BackButton from '../BackButton'
import tw from 'twrnc'

export default function ChallengingThoughts({navigation, route}) {
    const {title} = route.params
  return (
    <View style={{width: '100%', height:'100%', backgroundColor:'#292B55'}}>  
    <BackButton navigation={navigation} />
    <Text style={tw`text-white text-2xl mx-auto`}>{title}</Text>
    </View>
  )
}
