import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon';
import { MotiView } from 'moti';
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons';

export default function ExerciseComplete({navigation, message, link}) {
  return (
    //CONGRATS FOR FINISHING
    <View style={tw`flex-1 justify-start items-center`}>
    <ConfettiCannon count={200} autoStartDelay={600} origin={{x: 100, y: 100}} />
    <MotiView from={{scale: 0.0, y:50}} animate={{scale: 1, y:0}} transition={{type:'spring', stiffness:100, damping:20}} style={tw``}>
    <Text style={tw`text-center text-white text-3xl font-bold mt-5 p-3`}> <AntDesign name="checkcircle" style={tw`mr-5`} size={40} color="white" /> Congratulations!</Text>
    </MotiView>
    <Text style={tw`text-white text-lg mx-5 mt-3`}>{message}</Text>
    <View style={tw`flex-1 justify-end mb-20`}>
    <View style={tw` flex-col`}>
    {!link ?
    <TouchableOpacity style={tw`border border-white rounded-xl p-3 px-10 mb-3 `} onPress={()=> navigation.navigate('Exercises')}>
    <Text style={tw`text-white text-lg font-bold`}>Finish</Text>
    </TouchableOpacity>
    :
    <TouchableOpacity style={tw`border border-white rounded-xl`} onPress={()=> navigation.goBack()}>
    <Text style={tw` text-white text-center text-lg font-bold px-30 py-3 `}>Finish</Text>
    </TouchableOpacity>

    }
    </View>
    </View>
    </View>
  )
}
