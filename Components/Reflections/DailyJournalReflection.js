import { ScrollView } from 'moti'
import React from 'react'
import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function DailyJounralReflection({navigation, route}) {
  const {title, date, status, keyFocus1, keyFocus2, keyFocus3, writing} = route.params
  const {height, width } = useWindowDimensions()
  return (
    <View style={{width:width, height:height}}>
    <LinearGradient 
    
    colors={['#27178C','#8C4917']}
    start={{x:0.05, y:0.6}}
    end={{x:0.9, y:0.3}}
    locations={[0.1,0.99]}
    
    
    style={{width:width, height:height, opacity:0.65}}
    >
    </LinearGradient>
    <View style={[tw`flex-1 justify-start mt-10 `,{height:height, width:width, opacity:1, position:'absolute'}]}>
    <View style={tw`flex-1`}>
    <ScrollView> 
        
        <View style={tw` flex-row item-start`}>
        <Text style={tw`text-white font-light text-lg ml-3`}>{date}</Text>
        </View>
        <View style={tw`items-center mt-5`}>
        <Text style={tw`text-white text-2xl font-bold`}>{title}</Text>
        </View>
      
        {status &&
        <View style={tw`mx-3 `}>
        <Text style={tw`text-white text-lg `}>Status: {status}</Text>
        </View>
          }
        {keyFocus1 &&
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-lg`}>Key Focus 1:</Text>
        <Text style={tw`text-white text-lg`}>{keyFocus1}</Text>
        </View>
        }
        {keyFocus2 &&
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-lg`}>Key Focus 2: </Text>
        <Text style={tw`text-white text-lg`}>{keyFocus2}</Text>
        </View>
        }
        {keyFocus3 &&
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-lg`}>Key Focus 3:</Text>
        <Text style={tw`text-white text-lg`}>{keyFocus3}</Text>
        
        </View>
        }
        {writing &&
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-lg`}>Free Writing:</Text>
        <Text style={tw`text-white text-lg`}>{writing}</Text>
        </View>
        
        }
         
    
    </ScrollView>
    </View>
    <TouchableOpacity style={tw`justify-end mt-2 mb-35 items-center`} onPress={()=> navigation.goBack()}>
    <Ionicons name="arrow-back-circle" size={60} color="white" />
        </TouchableOpacity>
    </View>
    </View>
  )
}

