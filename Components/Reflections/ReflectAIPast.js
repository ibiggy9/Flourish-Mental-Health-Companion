import { ScrollView } from 'moti'
import React from 'react'
import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ReflectAIPast({navigation, route}) {
  const {title, date, reflectionTopic, q1, a1, q2, a2, q3, a3, q4, a4, q5, a5, q6, a6, q7, a7, q8, a8, q9, a9, q10, a10} = route.params
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
        
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-xl`}>Reflection Topic:</Text>
        <Text style={tw`text-white text-lg`}>{reflectionTopic}</Text>
        </View>
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-xl`}>Reflection:</Text>
        </View>
        {q1 &&
        <View style={tw`mx-3 `}>
        <Text style={tw`text-white text-lg `}>1. {q1}</Text>
        <Text style={tw`text-white text-lg font-light`}>{a1}</Text>
        </View>
          }
        {q2 &&
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-lg`}>2. {q2}</Text>
        <Text style={tw`text-white text-lg font-light`}>{a2}</Text>
        </View>
        }
        {q3 &&
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-lg`}>3. {q3}</Text>
        <Text style={tw`text-white text-lg font-light`}>{a3}</Text>
        </View>
        }
        {q4 &&
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-lg`}>4. {q4}</Text>
        <Text style={tw`text-white text-lg`}>{a4}</Text>
        </View>
        }
        {q5 &&
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-lg`}>5. {q5}</Text>
        <Text style={tw`text-white text-lg`}>{a5}</Text>
        </View>
        
        }
        {q6 &&
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-lg`}>6. {q6}</Text>
        <Text style={tw`text-white text-lg`}>{a6}</Text>
        </View>
        }
        {q7 &&
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-lg`}>7. {q7}</Text>
        <Text style={tw`text-white text-lg`}>{a7}</Text>
        </View>
        
        }
        {q8 &&
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-lg`}>8. {q8}</Text>
        <Text style={tw`text-white text-lg font-light`}>{a8}</Text>
        </View>
        }
        {q9 &&
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-lg`}>9. {q9}</Text>
        <Text style={tw`text-white text-lg`}>{a9}</Text>
        </View>
        }
        {q10 &&
        <View style={tw`mx-3 mt-5`}>
        <Text style={tw`text-white text-lg`}>10. {q10}</Text>
        <Text style={tw`text-white text-lg`}>{a10}</Text>
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

