import React, {useState, useEffect} from 'react'
import {View, Text, useWindowDimensions, TouchableOpacity, Linking, Alert, Platform, SafeAreaView} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MotiView, ScrollView } from 'moti';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../Context/AuthContext';
import { Entypo } from '@expo/vector-icons';
import app from '../firebaseConfig';
import * as WebBrowser from 'expo-web-browser';
import useRevHook from '../Components/useRevHook';
import analytics from '@react-native-firebase/analytics';
import Purchases from 'react-native-purchases';
import Spinner from 'react-native-loading-spinner-overlay'
import { NavigationBarColor } from 'react-native-navigation-bar-color';

import MarginWrapper from './MarginWrapper';


export default function Settings({navigation}) {
  const {width, height} = useWindowDimensions()
  const {logout, auth} = useAuth(app)
  const {isProMember, currentOffering} = useRevHook()
  const [spinner, setSpinner] = useState()




  async function goToPlayStore(){
    Linking.openURL('https://play.google.com/store/account/subscriptions')
  }

  async function restorePurchases(){
    setSpinner(true)
    const purchaserInfo = await Purchases.restorePurchases().catch((error)=> {
      console.log(error)
      setSpinner(false)
    })

    if(purchaserInfo.activeSubscriptions.length > 0 || purchaserInfo.activeSubscription){
      Alert.alert("Success", "Your purchase has been restored")
      setSpinner(false)
      
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

  
  
  function openSubscriptions(){
    
    Linking.openURL('https://apps.apple.com/account/subscriptions')
  }

  async function openPrivacy(){
    await WebBrowser.openBrowserAsync('https://www.termsfeed.com/live/d95ac4f5-6025-4554-8ee8-7b40b3f7adf1')
  }

  async function openSite(){
    await WebBrowser.openBrowserAsync('https://www.flourishtech.app/')
  }

  async function openAgreement(){
    await WebBrowser.openBrowserAsync('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/')
  }

  return (
    <View style={[tw`flex-1 ${Platform.OS=="android" && `bg-black`}`,{width:width, height:height}]}>
      
      <Spinner
        visible={spinner}
        textStyle={{color:'white'}}
        />

    {Platform.OS != 'android' &&
  <LinearGradient 
  
  colors={['#182E77','#EA1D3F']}
  start={{x:0.05, y:0.6}}
  end={{x:0.9, y:0.3}}
  locations={[0.1,0.99]}
  
  
  style={{width:width, height:height, opacity:0.75}}
  />
  }
 
<View style={[tw`flex-1 justify-start ${Platform.OS == "android" && `mt-15`}`,{height:height, width:width, opacity:1, position:'absolute'}]}>
<SafeAreaView>
        <Text style={tw`text-white text-center text-2xl font-bold `}>Your Profile</Text>
        <ScrollView showsVerticalScrollIndicator={false}>      
        
        

        {!isProMember &&
        <>
        <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
        <TouchableOpacity onPress={async () => {
          await analytics().logEvent('Paywall')
          navigation.navigate('Paywall')
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>Upgrade to Premium</Text>
        </TouchableOpacity>
        </>
        }

        <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
        
        
        {!isProMember &&
        <TouchableOpacity onPress={async () => {
          await analytics().logEvent('upgradeClicked')
          restorePurchases()
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>Restore Purchases</Text>
        </TouchableOpacity>
        }

        




        <TouchableOpacity onPress={async () => {
          await analytics().logEvent('aboutUsClicked')
          openSite()
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={async () => {
          await analytics().logEvent('aboutUsClicked')
          navigation.navigate('Disclaimer')
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>Disclaimer</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent('supportClicked')
          Linking.openURL('mailto:support@flourishtech.app')
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2`}>Feature Requests & Support</Text>
        </TouchableOpacity>
        
        {isProMember &&
        <TouchableOpacity onPress={async ()=> {
          if(Platform.OS == 'ios'){ 
             openSubscriptions()}
             else{ 
              goToPlayStore()
            }
          await analytics().logEvent('cancelMembershipClicked')
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2`}>Cancel Membership</Text>
        </TouchableOpacity>
        }


        <TouchableOpacity onPress={async ()=> {
          navigation.navigate("PromoCode")
          await analytics().logEvent('offerCodeClicked')
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2`}>Enter Offer Code</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent('privacyClicked', {
            id:"clicked"
          })
          openPrivacy()
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent('userAgreementClicked', {
            id:"clicked"
          })
          openAgreement()
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>User Agreement</Text>
        </TouchableOpacity>
          {/*
        <TouchableOpacity onPress={()=> logout()}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>Logout</Text>
        </TouchableOpacity>
         */}



         {/*
        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent("confirmDeleteClicked")
          navigation.navigate("ConfirmDelete")

        }}>
        <View style={tw`flex-row  justify-center  rounded-2xl`}>
          
        
      <Text style={tw`text-slate-300 text-xs mx-5  mt-5 mb-2`}>Delete Your Account</Text>
        </View>
        </TouchableOpacity>
         */}

        <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
        

        {/* 
        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent("goalsCheckedOnSettings")
          navigation.navigate("ViewWorkScreen", {tool:'goals'})
      
      }}>

          <View style={tw`flex-row items-center`}>
        <Entypo name="battery" style={tw`ml-10 mr--5`} size={30} color="white" />
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>View Goals</Text>
        </View>
        </TouchableOpacity>
    


      
        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent("cogCoachClickedOnSettings")
          navigation.navigate("ViewWorkScreen", {tool:'cog'})
      }}>
        <View style={tw`flex-row items-center`}>
        <Entypo name="basecamp" style={tw`ml-10 mr--5`}  size={30} color="white" />
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>View Cog Coach Sessions</Text>
        </View>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent('freeWritingSettingsClicked')
          navigation.navigate("ViewWorkScreen", {tool:'free'})
          }}>
        <View style={tw`flex-row items-center`}>
        <Entypo name="book" style={tw`ml-10 mr--5 `} size={30} color="white" />
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>View Free Writing Sessions</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent('dailyJournalSettingsClicked')
          navigation.navigate("ViewWorkScreen", {tool:"daily"})
      }}>
        <View style={tw`flex-row items-center`}>
        <Entypo name="archive" style={tw`ml-10 mr--5`} size={30} color="white" />
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>View Daily Journals</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent("reflectAISettingsClicked")
          navigation.navigate("ViewWorkScreen",{tool:"reflection"})

        }}>
        <View style={tw`flex-row items-center`}>
        <Entypo name="lab-flask" style={tw`ml-10 mr--5`} size={30} color="white" />
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>View Reflect AI Reflections</Text>
        </View>
        </TouchableOpacity>

      `     
        <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
        */}
       

{/*
{!isProMember  &&
        <TouchableOpacity style={tw`border-2 border-white bg-opacity-50 rounded-2xl mx-10 mt-5`} onPress={async () => {
          navigation.navigate('Paywall')
          await analytics().logEvent('upgradeClicked')
          
          navigation.navigate('Paywall')
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 text-center font-bold `}>Upgrade to Premium</Text>
        </TouchableOpacity>
        }
      */}
       

        

        </ScrollView>

      

        </SafeAreaView>   
      </View>
      
      
    </View>
    

  )
}
