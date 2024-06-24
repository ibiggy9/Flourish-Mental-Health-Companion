//A Component that pulls up a screen in a modal style that provides the user with more information about something. Must pass at least title and description.


import React from 'react'
import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import BackButton from '../BackButton';


export default function ReminderScreen({navigation, route}) {
    const {title, description, example, disclaimer} = route.params;
  return (
     <View style={{width: '100%', height:'100%', backgroundColor:'#292B55'}}>  
    <ScrollView 
    contentContainerStyle={tw`pb-20`}

    >
      
        <Text style={tw`text-center text-3xl font-bold mt-15  text-white mx-2`}>{title}</Text>
        <Text style={tw`text-white text-lg mx-3 mt-3`}>{description}</Text>
        <View style={tw`justify-start`}>
        {disclaimer && <Text style={tw`text-slate-300 text-sm font-light text-start mx-6 mt-10`}>Disclaimer:{disclaimer}</Text>}
        {example && <Text style={tw`text-white text-2xl text-center mt-5 font-bold`}> Example:</Text>}
        {example && <Text style={tw`text-white text-lg mx-3 mt-3`}>{example}</Text>}
        </View>
        
    </ScrollView>
    <View style={tw`flex-end items-center mb-20 justify-end`} >
    <TouchableOpacity style={tw``} onPress={() => navigation.goBack()}>
          <Text style={tw`text-white text-xl`}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
