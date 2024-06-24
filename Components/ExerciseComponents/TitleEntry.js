import React, {useState, useEffect} from 'react'
import {View, Text, Easing, TouchableOpacity, TextInput, ScrollView, NativeAppEventEmitter, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert, useWindowDimensions, SafeAreaView} from 'react-native'
import tw from 'twrnc'
import { Entypo } from '@expo/vector-icons';
import {AnimatePresence, Motion} from '@legendapp/motion'
import { MotiView, useDynamicAnimation, MotiText } from 'moti';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

export default function TitleEntry({title, setTitle, titleName, nextStep, lastStep}) {
    const height = useWindowDimensions()
    const [isHidden, setIsHidden] = useState(false)
    function titleFocus(){
        setIsHidden(true)
    }

    function titleNotFocused(){
        setIsHidden(false)
    }
  return (

    <MotiView style={{height:'100%'}} from={{ opacity:0, scale:0.7}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
            <Text style={tw`text-white text-center text-xl mt-2`}>{titleName}</Text>
            <TextInput
        style={[tw`my-4 px-3 rounded-xl border border-white text-slate-200 text-xl mx-2`, {aspectRatio:15/3, width:'95%'}]}
        multiline={false}
        
        maxLength={30}
        cursorColor={'white'}
        onFocus={()=> titleFocus()}
        onBlur={()=> titleNotFocused()}
        keyboardAppearance="dark"
        onChangeText={setTitle}
        selectionColor={'white'}
        value={title}
        
      />
        {isHidden &&
      <KeyboardAvoidingView style={tw`flex-1 `}>
      <View style={[tw`flex-row justify-end`, {}]}>  
      <MotiView key="asdfadgh" exit={{opacity:0, translateX:-20}} from={{opacity:0, translateX:50, translateY:0}} animate={{opacity:1, translateX:-20, translateY:0}}><TouchableOpacity onPress={()=>Keyboard.dismiss()} style={''} >
        <Text style={tw`text-white text-lg mb-3`}>{title.length}/30</Text>
        <AntDesign name="checkcircle" size={50} color="white" />
        </TouchableOpacity>
        </MotiView> 
      </View>
      </KeyboardAvoidingView>
         }
      {!isHidden && 
      <MotiView style={tw` flex-1 items-center justify-end mx-10 mb-20`}>
        
          {title &&
          <MotiView from={{scale:0}} animate={{scale:1}} transition={{type:'spring', stiffness:150, damping:10}} key='alkjsadhfkljasdhf'>
          <TouchableOpacity onPress={() => nextStep()}>
                <MaterialIcons name="navigate-next" size={50} color="white" />
          </TouchableOpacity>
          </MotiView>
          }

          </MotiView>}

            </MotiView>
  )
}
