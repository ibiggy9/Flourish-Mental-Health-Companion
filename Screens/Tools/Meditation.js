import { ScrollView } from 'moti'
import React, {useState} from 'react'
import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackButton from '../../Components/BackButton'

export default function Meditation({navigation}) {
  const [step, setStep] = useState(0)
  const {height, width} = useWindowDimensions()
  const [meditationType, selectMeditationType] = useState()
  

  return (
    <View style={{width: width, height:height, backgroundColor:'#030B27'}}>
      <BackButton navigation={navigation} />
        {!meditationType &&
          <View style={tw`flex-1 flex-col justify-start items-center`}>
            
            <View>
            <Text style={tw`text-white text-4xl font-bold text-center`}>Meditation Suite</Text>
            </View>
            <ScrollView contentContainerStyle={tw`justify-center items-center`}>
            <TouchableOpacity style={[tw` rounded-2xl px-10 py-10 mt-10`,{width:width-30, backgroundColor:'#11205B'}]} onPress={()=> selectMeditationType('in')}>
              
              <Text style={tw`text-white text-2xl font-bold text-center`}>Interoception Meditation</Text>
              <Text style={tw`text-white text-xl`}>Select this meditation exercise if you find your attention tends to be too wrapped up in the world around you.</Text>
              <View style={tw`flex flex-row items-center justify-center mt-3 `}>
            <View style={tw`flex-row`}>
              <MaterialCommunityIcons style={tw`text-slate-400 `} name="bookshelf" size={25} />
              <Text style={tw` text-slate-300 font-extralight text-xs mt-2`}>1 Tool</Text>
            </View>
            <View style={tw`ml-4 flex flex-row`}>
              <Ionicons style={tw`mt-1 text-slate-400`} name="ios-time-outline" size={20}  />
              <Text  style={tw`text-slate-300 font-extralight text-xs mt-2 `} >5 Minutes</Text>
            </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={[tw` rounded-2xl px-10 py-10 mt-10`,{width:width-30, backgroundColor:'#11205B'}]} onPress={()=> selectMeditationType('ex')}>
              
              <Text style={tw`text-white text-2xl font-bold text-center  `}>Exteroception Meditation</Text>
              <Text style={tw`text-white text-xl font-light mt-2`}>Select this meditation exercise if you find your attention tends to be too in your head and not attending to the world around you.</Text>
              
              <View style={tw` flex-row justify-center mt-3 `}>
            <View style={tw`flex flex-row`}>
              <MaterialCommunityIcons style={tw`text-slate-400 `} name="bookshelf" size={25} />
              <Text style={tw` text-slate-300 font-extralight text-xs mt-2 text-center`}>1 Tool</Text>
            </View>
            <View style={tw`ml-4 flex flex-row`}>
              <Ionicons style={tw`mt-1 text-slate-400`} name="ios-time-outline" size={20}  />
              <Text  style={tw`text-slate-300 font-extralight text-xs mt-2 `} >5 Minutes</Text>
            </View>
            </View>
            </TouchableOpacity>
            </ScrollView>
            

          </View>
        
        }
        {meditationType == "ex" && step == 0 &&
        <View style={tw`flex-1 justify-start `}>
          <View>
          <Text style={tw`text-white text-3xl text-center`}>Exteroception Meditation Instructions</Text>
          </View>
          <View style={tw`flex-col`}>
            <Text style={tw`text-white text-2xl`}>1. </Text>
            <Text style={tw`text-white text-2xl`}>2. </Text>
            <Text style={tw`text-white text-2xl`}>3. </Text>
            <Text style={tw`text-white text-2xl`}>4. </Text>
          </View>
          <View style={tw`flex-1 justify-end items-center mb-15`}>
          <TouchableOpacity onPress={()=> setStep(step+1)}>
            <Text style={tw`text-white text-2xl`}>Begin</Text>
          </TouchableOpacity>
        </View>
        </View>
        }
        {meditationType == "in" && step == 0 &&
        <View style={tw`flex-1 justify-start `}>
          <View>
          <Text style={tw`text-white text-3xl text-center`}>Interoception Meditation Instructions</Text>
          </View>
          <View style={tw`flex-col`}>
            <Text style={tw`text-white text-2xl`}>1. </Text>
            <Text style={tw`text-white text-2xl`}>2. </Text>
            <Text style={tw`text-white text-2xl`}>3. </Text>
            <Text style={tw`text-white text-2xl`}>4. </Text>
          </View>
          <View style={tw`flex-1 justify-end items-center mb-15`}>
          <TouchableOpacity onPress={()=> setStep(step+1)}>
            <Text style={tw`text-white text-2xl`}>Begin</Text>
          </TouchableOpacity>
        </View>
        </View>
        }
        {meditationType == "ex" && step == 1 &&
        <View>
          <Text style={tw`text-white`}>This is where the actual exercise will go</Text>
        </View>
        
        }
        {meditationType == "in" && step == 1 &&
        <View>
          <Text style={tw`text-white`}>This is where the actual exercise will go</Text>
        </View>
        }
        
        
    </View>
  )
}
