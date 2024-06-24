import React, { useState, useRef, useEffect } from 'react'

import {View, Text, useWindowDimensions, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import tw from 'twrnc'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiText } from 'moti'
import Checkbox from 'expo-checkbox';
import { MotiView } from 'moti'
import { FontAwesome5 } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import app from '../../firebaseConfig'
import { getAuth, signInWithCredential, signInWithCustomToken, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider} from 'firebase/auth';
import { getDatabase, ref, set, onValue, forEach, push } from "firebase/database";
import useRevHook from '../../Components/useRevHook'
import Purchases from 'react-native-purchases'
import Spinner from 'react-native-loading-spinner-overlay';
import analytics from '@react-native-firebase/analytics';
import * as WebBrowser from 'expo-web-browser';


export default function OnBoarding({navigation}) {
  const {height, width} = useWindowDimensions()
  const [privacy, setPrivacy] = useState(false) 
  const [spinner, setSpinner] = useState(false) 
  const [user, setUser] = useState(false)
   const {currentOffering, isProMember, customerInfo} = useRevHook()
 

  //Modal Refs
  const fleurRef = useRef();
  const cbtRef = useRef()
  const reflectionRef = useRef();
  const goalRef = useRef()
  const breathRef= useRef()
  const mental = useRef()
  const focus = useRef()

  const disclaimer= 'All services provided by Flourish are for general mental wellness support only and do not constitute the practice of professional mental health care service including the giving of medical advice. No doctor patient relationship is formed. The use of these services and the materials linked to the mobile app is at the users own risk. The content on the application is not intended to be a substitute for professional medical advice, diagnosis or treatment. Users should not disregard or delay in obtaining medical advice from any medical condition they have and they should seek the assistance for any such conditions. '

  useEffect(()=> {
    if(privacy==true && user==true){
      navigation.navigate('Paywall')
    }

  }, [privacy, user])

  useEffect(() => {
    setUser(false)
    setPrivacy(false)
    console.log(isProMember)
    console.log(customerInfo)
    if(isProMember){
      navigation.navigate('Explore')
    }
  }, [])

  async function restorePurchases(){
    setSpinner(true)
    const purchaserInfo = await Purchases.restorePurchases().catch((error)=> {
      setSpinner(false)
    })

    if(purchaserInfo.activeSubscriptions.length > 0){
      Alert.alert("Success", "Your purchase has been restored")
    } else {
      Alert.alert("Error", "No purchases to restore")
      setSpinner(false)
    }

    if(!currentOffering){
      return(
        <View>
          <ActivityIndicator size="large" color='white' />
        </View>
      )
    }
  }


  async function handleMonthlyPurchase(){
    setSpinner(true)
    if(!currentOffering?.monthly) return
    
    const purchaserInfo = await Purchases.purchasePackage(currentOffering.monthly).catch((error)=> {
      setSpinner(false)
    })

    console.log("Monthly sub purchased", purchaserInfo.customerInfo.entitlements.active)
    if(purchaserInfo.customerInfo.entitlements.active.pro){
      setSpinner(false)
      navigation.navigate("Explore")
    } else {
      setSpinner(false)
    }
  }

  async function handleAnnualPurchase(){
    setSpinner(true)
    if(!currentOffering?.annual) return console.log('false')
    const purchaserInfo = await Purchases.purchasePackage(currentOffering.annual).catch((error)=> {
      setSpinner(false)
    })

    console.log("Annual sub purchased", purchaserInfo.customerInfo.entitlements.active)
    if(purchaserInfo.customerInfo.entitlements.active.pro){
      setSpinner(false)
      navigation.navigate("Explore")
    } else{
      setSpinner(false)
    }
    
    
  }

  function openModel(refName){
    refName.current.open()
    
  }
  function closeModel(refName){
    refName.current.close()
  }


  async function openPrivacy(){
    await WebBrowser.openBrowserAsync('https://www.termsfeed.com/live/d95ac4f5-6025-4554-8ee8-7b40b3f7adf1')
  }


  const welcomeMessage = [
    {instructionTitle:"Message From The Developer"},
    {instructionTitle:"Mental Flourishing", instructionShort:"The absence of mental illness is not mental health. Flourish provides tools to help support your mental health with the aim to help you not just live, but Flourish.", image:<Image  style={[tw` rounded-xl `, {height:height/2.2, width:width/1.2}]} source={require('../../assets/onboardingImage.jpg')}/>},
    {instructionTitle:"What Can Flourish Do?"},
    {instructionTitle:"Agree To Our Policies"},
  ]

  const useCases = [
    {
      uc:"Fleur, Your AI Therapist®", 
      refName:"fleurRef", 
      eventName:"fleur_onBoardingClick",
      ref:fleurRef,
      title:'Introducing Fleur',
      content:"Fleur is an AI-powered therapist. She can answer (pretty much) any question you have related to your mental health. She can even provide advice and guide you through specific exercises like planning, reflecting on an experience and much more."

    },
    {
      uc:"Cognitive Behavioural Therapy", 
      refName:"cbtRef", 
      eventName:"cbt_onBoardingClick",
      ref:cbtRef,
      title:"What is CBT?",
      content:"Cognitive Behavioural Therapy (CBT) is a type of therapy that helps people change unhelpful patterns of thinking and behaviour that can cause or worsen mental health problems. Our CBT tool can guide you through a personalized experience that helps you reframe specific experiences you've gone through to help create greater mental resilience."
    },
    {
      uc:"Personalized Structured Reflection", 
      refName:"reflectionRef", 
      eventName:"reflect_onBoardingClick",
      ref:reflectionRef, 
      title:"Better Thinking With AI",
      content:"Life's challenges are often complicated. Our Reflect AI tool can be used to help break things down and think them through. All you do is describe your situation and the AI will provide you with helpful questions to help you think through your challenge."
    },
    {
      uc:"Personalized Goal Setting", 
      refName:"goalRef", 
      eventName:"goals_onBoardingClick",
      ref:goalRef,
      title:"Goal Setting With AI",
      content:"Setting goals is an art and the science. When done properly, goals help us feel motivated to do the things we wish to do. But too often we can articulate them in an unhelpful way, leaving them to vague or missing key details that make it actionable. Our AI Goal setting tool helps take your general intention and articulate it as a goal, then provides you with a sample implementation plan personalized to your aims."
    },
    {
      uc:"Science-Based Breathwork", 
      refName:"breathRef", 
      eventName:"breath_onBoardingClick",
      ref:breathRef,
      title:"The Power Of Breathwork",
      content:"Breathing can be thought of as a behavioural wedge into your mind. Effect breath can very quickly improve our mood, mental state and energy levels while reducing stress. Our breathing tools leverage the latest on breathing science to create a powerful effect in just a few minutes."
    },
    {
      uc:"Mental Health Assessments", 
      refName:"mental", 
      eventName:"mentalTests_onBoardingClick",
      ref:mental,
      title:"Assess Your Mental Health",
      content:"It can be difficult to know how you're really doing. Some are very in tune with their internal states and feelings while others, less so. Our mental health assessments can help with this. They can give you a loose reading on the severity of your anixety or depression, help you understand your current stress levels and give you a sense of how mentally health you may be."

    },
    {
      uc:"Focus & Productivity Tools", 
      refName:"focus", 
      eventName:"focus_onBoardingClick",
      ref:focus,
      title:"Focus On What Your Need To Do",
      content:"A common source of stress is procrastination. Our focus and productivity tracks help you get down to work by leveraging audio that has been shown to encourage the brain to fall into a more focused state."
    }

  ]

  function openModal(refName){
    if(refName == "fleurRef"){
      fleurRef.current.open()
    } else if(refName == "cbtRef"){
      cbtRef.current.open()
    } else if(refName=="reflectionRef"){
      reflectionRef.current.open()
    } else if(refName=="goalRef"){
      goalRef.current.open()
    } else if(refName=="breathRef"){
      breathRef.current.open()
    } else if(refName=="mental"){
      mental.current.open()
    } else if(refName == "focus"){
      focus.current.open()
    }

  }


  return (
    <View style={{width:width, height:height}}>
      
        <Spinner
        visible={spinner}
        
        textStyle={{color:'white'}}
        />
      
      {useCases.map((item)=>
     <Modalize
     modalStyle={""}
     modalHeight={height/2.1}
     
     modalTopOffset={100}
    ref={item.ref}>
          <View style={{width:width, height: height}}>
          <LinearGradient 
          
          colors={['#27178C','#8C4917']}
          start={{x:0.05, y:0.6}}
          end={{x:0.9, y:0.3}}
          locations={[0.1,0.99]}
          
          
          style={{width:width, height:height, opacity:0.65}}
          >
          </LinearGradient>
          <View style={[tw`flex-1 justify-start`,{height:height, width:width, opacity:1, position:'absolute'}]}>
            <Text style={tw`text-white text-2xl mt-5 text-center font-bold`}>{item.title}</Text>
            <Text style={tw`text-white text-lg mt-3 mx-3`}>{item.content}</Text>
          </View>
          </View>
   </Modalize>
    
    )}
    <LinearGradient 
    
    colors={['#182E77','#EA1D3F']}
    start={{x:0.05, y:0.6}}
    end={{x:0.9, y:0.3}}
    locations={[0.1,0.99]}
    
    
    style={{width:width, height:height, opacity:0.65}}
    >
    </LinearGradient>
    <View style={[tw`flex-1 justify-start mt-20`,{height:height, width:width, opacity:1, position:'absolute'}]}>
    
   
              
        <MotiText from={{scale:0}} animate={{scale:1}} style={tw`text-white text-2xl text-center`}>Welcome to Flourish!</MotiText>
        <FlatList 
        data={welcomeMessage}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled
        snapToEnd
        snapToStart
        snapToInterval={width}
        
        decelerationRate='fast'
        renderItem={(itemData)=> {
          return(
            
            <View style={[{height:height/1.3, width:width}, tw`flex-1 justify-start mt-3 items-center`]}>
              <View style={[tw`flex-1 bg-slate-600 bg-opacity-40 rounded-2xl items-center mb-3 `, {width:width-40, height: height/2.7}]}>
              
              {itemData.index == 0 &&
              <View style={[tw`flex-7 justify-start`, {width:width}]}>
              <View style={tw`mt-0 mx-5  justify-start`}>
              
              {itemData.item.image}
              
              <Text style={[tw`text-white  text-center mt-7 font-bold`, {fontSize:25}]}>{itemData.item.instructionTitle}</Text>
              <View style={tw`items-center my-4`}>
              <FontAwesome name="hand-peace-o" size={80} color="white" />
              </View>
              <Text style={[tw`text-white text-start mx-4 mt-3`, {fontSize:16}]}>Hey, </Text>
              <Text style={[tw`text-white text-start mx-4 mt-3`, {fontSize:16}]}>Thanks for checking out our app. Our goal is to provide a low cost option for ongoing mental wellness support.</Text>
              <Text style={[tw`text-white text-start mx-4 mt-3`, {fontSize:16}]}>This is an early version of the app and we are excited to bring new features and improvements in the coming weeks.</Text>
              <Text style={[tw`text-white text-start mx-4 mt-3`, {fontSize:16}]}>With that said, we'd really appreciate any feedback you might have. Whether that be bugs, crashes or feature requests. So if you have any feedback, please feel free to go to the support section under "Profile" or send us a note to:</Text>
              <Text style={[tw`text-blue-400 underline text-start mx-4 mt-3`, {fontSize:16}]}>support@flourishtech.app</Text>
              <Text style={[tw`text-white text-start mx-4 mt-3`, {fontSize:16}]}>Thank you and welcome!</Text>
              <Text style={[tw`text-white text-start mx-4 mt-3`, {fontSize:16}]}>Ian</Text>
              
              </View>
              </View>
              }

            {itemData.index == 1 &&
              <View style={[tw`flex-7 justify-end`, {width:width}]}>
              <View style={tw`mt-0 mx-5 items-center justify-end`}>
              
              {itemData.item.image}
              
              <Text style={[tw`text-white  text-center mt-7 font-bold`, {fontSize:25}]}>{itemData.item.instructionTitle}</Text>
              <Text style={[tw`text-white text-start mx-4`, {fontSize:16}]}>{itemData.item.instructionShort}</Text>
              
              </View>
              </View>
              }

              {itemData.index == 2 &&
              <View style={[tw`flex-7 justify-start`, {width:width}]}>
              <View style={tw` mx-5 items-center justify-start`}>
              
              

              <Text style={[tw`text-white  text-center mt-7 font-bold`, {fontSize:20}]}>{itemData.item.instructionTitle}</Text>


              {useCases.map((item)=> 
              <>
              <TouchableOpacity onPress={async ()=> {
                await analytics().logEvent(`${item.eventName}`, {
                  id:item.title
                })
                openModal(item.refName)
                
                }} style={[tw` border border-white px-5 py-2 my-3 rounded-2xl items-center justify-center`, {width:width/1.3, height:height/18}]}>
              <Text style={tw`text-white text-lg text-center`}>{item.uc}</Text>
              </TouchableOpacity>
              </>
              )}
              
              
              </View>
              </View>
              }  


              {itemData.index == 3 &&
              <View style={[tw`flex-7 justify-start`, {width:width}]}>
              <View style={tw` mx-5 items-center justify-start`}>
              <Text style={[tw`text-white  text-center mt-7 mb-3 font-bold`, {fontSize:25}]}>{itemData.item.instructionTitle}</Text>
              <View style={[tw`flex-row`, {width: width/1.2}]}>
                <Checkbox 
                color={"white"}

                value={privacy}
                onValueChange={() => setPrivacy(!privacy)}
                style={tw`items-center justify-center mt-2 p-3`}
                />
              <TouchableOpacity style={tw`items-center justify-center mt-2`} onPress={()=> openPrivacy()}>
              <Text style={[tw`items-center justify-center text-lg text-white text-start mx-2`]}>By checking this box you agree to Flourish's <Text style={tw`text-blue-300  text-lg`}>Privacy Policy</Text> </Text>
              </TouchableOpacity>
              </View>


              <View style={[tw`flex-row mt-3`, {width: width/1.2}]}>
                <Checkbox 
                value={user}
                onValueChange={() => setUser(!user)}
                color={"white"}
                style={[tw`items-center justify-center mt-2 p-3`]}
                />
              <TouchableOpacity style={tw`items-center justify-center mt-2`} onPress={()=> navigation.navigate('Reminder', {title:'Disclaimer', description:disclaimer})}>
              <Text style={[tw`items-center justify-center text-lg text-white text-start mx-2`]}>By checking this box you understand and agree to Flourish's <Text style={tw`text-blue-300 text-lg`}>User Disclaimer</Text> </Text>
              </TouchableOpacity>
              </View>

              
              
              </View>
              </View>
              }   

              {itemData.index == 3 && privacy && user &&
              <TouchableOpacity onPress={()=> navigation.navigate("Paywall")} style={tw`border border-white rounded-2xl px-20 py-5`}>
                  <Text style={tw`text-lg text-white`}>Open Plans</Text>
                </TouchableOpacity>  
                }
                <View style={tw`flex-1 flex-col mb-5 justify-end items-center`}>
                
                
                <View style={tw` flex-row items-center `}>
                  
                {itemData.index == 0 &&
                <>
                <View style={tw`bg-white rounded-full w-3 h-3 mx-2  `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2  `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2  `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2  `}></View>
                </>
                }
                {itemData.index == 1 &&
                <>
                
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2  `}></View>
                <View style={tw`bg-white rounded-full w-3 h-3 mx-2  `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2  `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2  `}></View>
                </>
                }
                {itemData.index == 2 &&
                <>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2 `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2 `}></View>
                <View style={tw`bg-white rounded-full w-3 h-3 mx-2 `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2 `}></View>
                </>
                }

              {itemData.index == 3 && (!privacy || !user) &&
                <>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2 `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2`}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2`}></View>
                <View style={tw`bg-white rounded-full w-3 h-3 mx-2 `}></View>
                </>
                }
                </View>
                </View>

              </View>
            </View>
          )
          }
        }
        />
    </View>
    </View>
  )
}
