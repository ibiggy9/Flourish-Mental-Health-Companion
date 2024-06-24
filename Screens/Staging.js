import React, { useEffect } from 'react'
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Image, Easing } from 'react-native'
import tw from 'twrnc';
import { FontAwesome5 } from '@expo/vector-icons'; 

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import BackButton from '../Components/BackButton';
import { useAuth } from '../Context/AuthContext';


export default function Staging({navigation, route}) {
  
  const{items} = route.params
  const {isFleur, setIsFleur} = useAuth()
  useEffect(()=> {
    setIsFleur(false)
   }, [])

  
  useEffect(()=>{console.log(items)},[])
   /* Example Data Structure for this component:
    const items =[
        {title: "FAST ANXIETY REDUCTION", 
        description:"Try these scientifically demonstrated way to lower anxiety with a short guided breathing exercise.", 
        link:"IntroQuick", 
        duration:'1-2 minutes',
        moduleCount:'1 Exercise'},
        {title: "Retrain Your Thought Patterns For More Resilience", 
        description:"Anxiety can be complex, this program will guide you through a tailored Cognitive Behavioural Therapy experience.", 
        link:"Moderate",
        duration: '1-5 minutes',
        moduleCount:'3 Modules'},
        /*
        {title: "Longer Term Anxiety Reduction", 
        description:"Want a more comprehensive exercise to tackle your anxiety? Try this science-backed Cognitive Behavioural Therapy experience", 
        link:"Anxiety",
        duration:'4 Weeks',
        moduleCount:'3 Modules - 24 Sessions'
        
      }
        
      ]

      */

     
  return (
    <View style={{width: '100%', height:'100%', backgroundColor:'#030B27'}}>
      <BackButton navigation={navigation} />
    <FlatList 
      
      ListHeaderComponent={()=>{
        return(
          <View style={{marginBottom:30}}>
            <TouchableOpacity style={tw`mb--5`} onPress={()=> console.log(1)}>
          <Text style={tw`w-full mx-auto mt--5 mb-2 text-2xl text-white font-bold`}>Programs</Text>
          
          </TouchableOpacity>
        </View>
        )
      }}
      contentContainerStyle={tw`justify-center items-center mt-10 pb-20`}
      data={items}  
      renderItem={(itemData)=> {
      return(
        <TouchableOpacity style={[tw`h-55 w-90 rounded-2xl mb-7`, {backgroundColor:'#11205B'}]} key={itemData.index} onPress={() => navigation.navigate(itemData.item.link)} >
            
        <View id="card" style={tw`flex flex-col items-center justify-evenly `}>
            <Text style={tw` absolute left-1 top-1 rounded-lg p-2 px-3 text-white`}>New</Text>
        
        <View style={tw`flex flex-row`}>
          <View id="innerCard" style={tw`flex flex-col items-center`} >
            <Text style={tw` mx-2 text-white text-center font-bold text-xl mb-1 mt-10`}>{itemData.item.title}</Text>
          <View>
            <Text style={tw` px-7 text-violet-200 text-start`}>{itemData.item.description}</Text>
          </View>
          <View style={tw`flex flex-row items-center mt-5 `}>
            <View style={tw`flex flex-row`}>
              <MaterialCommunityIcons style={tw`text-slate-400 `} name="bookshelf" size={25} />
              <Text style={tw` text-slate-300 font-extralight text-xs mt-2`}>{itemData.item.duration}</Text>
            </View>
            <View style={tw`ml-4 flex flex-row`}>
              <Ionicons style={tw`mt-1 text-slate-400`} name="ios-time-outline" size={20}  />
              <Text  style={tw`text-slate-300 font-extralight text-xs mt-2 `} >{itemData.item.moduleCount}</Text>
            </View>
          </View>
          </View>
          </View>
          
          </View>
          </TouchableOpacity>
      )
    }
      
    }/>
    
    </View>
  
)
}

const styles = StyleSheet.create({
firstCard: {
  borderRadius: 10,
  marginTop:10,  
  alignItems:'center', 
  textAlign:'center',  
  backgroundColor:"#7E7B8F"
},
card:{
  width:350,
  height:150,
  borderRadius: 10,
  marginTop:50, 
  backgroundColor:"#7E7B8F",
},
cardText: {
  color:"white",
  fontWeight:'bold',
  fontSize:20
  
},
headerText:{
  color:"white",
  fontWeight:'bold',
  fontSize:30,
  marginLeft:30,
  marginBottom:-30,
  paddingBottom:-30
}, 

}
)

