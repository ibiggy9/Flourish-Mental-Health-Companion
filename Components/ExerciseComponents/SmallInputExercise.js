import React, {useState, useEffect} from 'react'
import {View, Text, Easing, TouchableOpacity, TextInput, ScrollView, NativeAppEventEmitter, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert, useWindowDimensions, SafeAreaView} from 'react-native'
import tw from 'twrnc'
import { Entypo } from '@expo/vector-icons';
import {AnimatePresence, Motion} from '@legendapp/motion'
import { MotiView, useDynamicAnimation, MotiText } from 'moti';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';


export default function SmallInputExercise({navigation, title,  label, text, setText, text1, setText1, text2, setText2,  emphasis, emphasisTitle, emphasisDescription, emphasisExample, nextStepper, lastStepper, noBack, example, hasProgressBar, progress}) {
 
    const height = useWindowDimensions()
    const [isHidden, setIsHidden] = useState(false)
    const TextBox1 = useDynamicAnimation(()=> {
      return{
        translateY:0,
        opacity:1,
        scale:1
     
      }
    })
    const TextBox2 = useDynamicAnimation(()=> {
        return{
          translateY:0,
          opacity:1,
          scale:1
        }
      })
      const TextBox3 = useDynamicAnimation(()=> {
        return{
          translateY:0,
          opacity:1,
          scale:1
        }
      })

    
   
   function next(){
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      nextStepper()

   }

   function last(){
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    lastStepper()
   }

    function textBoxFocus1(){
        
        TextBox2.animateTo({scale:[{value:0, easing:Easing.easing, type:'timing', duration:200}]})
        TextBox3.animateTo({scale:[{value:0, easing:Easing.easing, type:'timing', duration:200}]})
        
        setIsHidden(true)
    }
    
    function textBoxFocus2(){


        TextBox1.animateTo({scale:[{value:0, easing:Easing.easing, type:'timing', duration:50}]})
        TextBox3.animateTo({scale:[{value:0, easing:Easing.easing, type:'timing', duration:50}]})
        TextBox2.animateTo({translateY:[{value:-100, easing:Easing.easing, type:'timing', duration:200}]})
        
        setIsHidden(true)
    }

    function textBoxFocus3(){

        
        TextBox2.animateTo({scale:[{value:0, easing:Easing.easing, type:'timing', duration:50}]})
        TextBox1.animateTo({scale:[{value:0, easing:Easing.easing, type:'timing', duration:50}]})
        TextBox3.animateTo({translateY:[{value:-200, easing:Easing.easing, type:'timing', duration:200}]})
        
        setIsHidden(true)
    }

    function isNotFocused1(){
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
     
      
      TextBox2.animateTo({scale:[{value:1, easing:Easing.easing, type:'timing', duration:400}]})
      TextBox3.animateTo({scale:[{value:1, easing:Easing.easing, type:'timing', duration:400}]})
      setIsHidden(false)
      Keyboard.dismiss()
    }

    
    function isNotFocused2(){
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        
        TextBox2.animateTo({translateY:[{value:0, easing:Easing.easing, type:'timing', duration:200}]})
        TextBox1.animateTo({scale:[{value:1, easing:Easing.easing, type:'timing', duration:400}]})
        TextBox3.animateTo({scale:[{value:1, easing:Easing.easing, type:'timing', duration:400}]})
        setIsHidden(false)
        Keyboard.dismiss()
      }

    
      function isNotFocused3(){
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      
      TextBox3.animateTo({translateY:[{value:0, easing:Easing.easing, type:'timing', duration:200}]})
      TextBox2.animateTo({scale:[{value:1, easing:Easing.easing, type:'timing', duration:400}]})
      TextBox1.animateTo({scale:[{value:1, easing:Easing.easing, type:'timing', duration:400}]})
      setIsHidden(false)
      Keyboard.dismiss()
      }
  
    
    //Saving description for later from thoughts are not feelings:


  return (
    
        <View>
        
        <View>
        <AnimatePresence style={{height:1, width:1}}>
        {!isHidden ?
        
        <MotiView style={tw``} animate={{opacity:1}} exit={{opacity:0}} key='asdf' >

        {hasProgressBar && <ProgressBar style={tw` mt-5 mx-16`} progress={progress} color={'#FB7A01'} />}
       
       
        <MotiView from={{ opacity:0, scale:1.3}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
        <Text style={tw`text-white  text-3xl mx-5 text-center  mt-5 text-white`}>{title}</Text>
        </MotiView>
        
       
        <MotiView from={{ opacity:0, scale:1.3}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
        
        {label &&
        <ScrollView style={tw`h-20`}>

        <Text style={tw`text-white  mx-5 text-lg items-center text-start font-light mt-3 text-slate-200 `}>{label}</Text>
        
        
        </ScrollView>
          }

         {example && 
          <View style={tw`h-25 mb-5`}>
          <Text style={tw`text-white text-xl mx-5 font-bold`}>For Example:</Text>
          <Text style={tw`text-white  mx-5 text-lg items-center text-start font-light text-slate-200 `}>{example}</Text>
          
          
          </View>
         
         
         } 
        {emphasis &&
        <TouchableOpacity style={tw``} onPress={() => navigation.navigate('Reminder', {title: emphasisTitle, description:emphasisDescription, example:emphasisExample})}>
        <Text id="emphasis" style={[tw`font-bold text-center text-blue-100 text-xl mt-3 underline`, {width:'100%'}]}>{emphasis}</Text>
        </TouchableOpacity>
          }
        </MotiView>
        </MotiView>

        :
        <MotiView style={tw``} animate={{opacity:1}} exit={{opacity:0}} key='asdf' >
        
       
      
        
       
        <MotiView from={{ opacity:0, scale:1.3}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
        
        
        
        </MotiView>
        </MotiView>


        }
      
        
      <MotiView style={{height:'100%'}} from={{ opacity:0, scale:0.7}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
 
      <MotiView  state={TextBox1} >
        <TextInput
        style={[tw`my-4 px-3 rounded-xl border border-white text-slate-200 text-lg mx-2`, {aspectRatio:15/3, width:'95%'}]}
        multiline={true}
        numberOfLines={5}
        selectionColor={'white'}
        maxLength={750}
        onFocus={textBoxFocus1}
        onBlur={()=> isNotFocused1()}
        keyboardAppearance="dark"
        onChangeText={setText}
        value={text}
        
      />
      </MotiView>

      <MotiView  state={TextBox2}>
    <TextInput
        style={[tw`my-4 px-3 rounded-xl border border-white text-slate-200 text-lg mx-2`, {aspectRatio:15/3, width:'95%'}]}
        multiline={true}
        numberOfLines={5}
        selectionColor={'white'}
        maxLength={750}
        onFocus={textBoxFocus2}
        onBlur={()=> isNotFocused2()}
        keyboardAppearance="dark"
        onChangeText={setText1}
        value={text1}
        
      />
      </MotiView>

      <MotiView  state={TextBox3}>
    <TextInput
        style={[tw`my-4 px-3 rounded-xl border border-white text-slate-200 text-lg mx-2`, {aspectRatio:15/3, width:'95%'}]}
        multiline={true}
        numberOfLines={5}
        maxLength={750}
        selectionColor={'white'}
        onFocus={textBoxFocus3}
        onBlur={()=> isNotFocused3()}
        keyboardAppearance="dark"
        onChangeText={setText2}
        value={text2}
        
      />
      </MotiView>

      {isHidden &&
      <KeyboardAvoidingView style={tw`flex-1 `}>
      <View style={[tw`flex-row justify-end`, {}]}>  
      <MotiView key="asdfadgh" exit={{opacity:0, translateX:-20}} from={{opacity:0, translateX:50, translateY:0}} animate={{opacity:1, translateX:-20, translateY:-160}}><TouchableOpacity onPress={()=>Keyboard.dismiss()} style={''} ><AntDesign name="checkcircle" size={50} color="white" /></TouchableOpacity></MotiView> 
      </View>
      </KeyboardAvoidingView>
    }
      {!isHidden && 
      <MotiView style={tw`flex-row justify-between mx-10 mt-10`}>
        {!noBack &&
        <TouchableOpacity onPress={() => last()}>
        <MaterialIcons name="navigate-before" size={50} color="white" />
          </TouchableOpacity>
        }
          {text && text1 && text2 &&
          <MotiView from={{scale:0}} animate={{scale:1}} transition={{type:'spring', stiffness:150, damping:10}} key='alkjsadhfkljasdhf'>
          <TouchableOpacity onPress={() => next()}>
        <MaterialIcons name="navigate-next" size={50} color="white" />
          </TouchableOpacity>
          </MotiView>
          }

          </MotiView>}
      </MotiView>
       </AnimatePresence>
      </View>
      
      </View>
      
      
        
        
      
  )
}
