import { View, Text, useWindowDimensions, FlatList, Image, Platform, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tw from 'twrnc'
import { ScrollView, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import analytics from '@react-native-firebase/analytics';
import useRevHook from '../Components/useRevHook'
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { getDatabase, ref, onValue } from 'firebase/database'
import { getAuth } from 'firebase/auth'

import MarginWrapper from './MarginWrapper'

export default function ExercisesNew({navigation}) {
    const{height, width} = useWindowDimensions()
    const {isProMember} = useRevHook()
    const [cogCoachUsage, setCogCoachUsage] = useState(0)
    const [goalUsage, setGoalUsage] = useState(0)
    const [reflectUsage, setReflectUsage] = useState(0)
    const auth = getAuth()
    
    
   

    function getUsageCounts(){
            console.log("This is RUNNING")
            console.log("Getting Database Usage")
            const db = getDatabase()
            const reflectRef = ref(db, `users/${auth.currentUser.uid}/userdata/usage/reflectUsage`)
            const goalRef = ref(db, `users/${auth.currentUser.uid}/userdata/usage/goalUsage`)
            const cogCoachRef = ref(db, `users/${auth.currentUser.uid}/userdata/usage/cogCoachUsage`)
        

            onValue(reflectRef, (snapshot) => {
                var temp = snapshot.val()
                console.log(temp)
       
                setReflectUsage(temp)     

            });

            onValue(goalRef, (snapshot) => {
                var temp = snapshot.val()
                setGoalUsage(temp)
                
            
            });
            onValue(cogCoachRef, (snapshot) => {
                var temp = snapshot.val()
                setCogCoachUsage(temp)
            
            });
        
    }
   


        
    const ShortTermItems =[
        
          {
          
          title:'Mindful Exhale Breathwork',
          eventName:"breathExhaleClicked",
          description:'This tool is based on one of the scientifically most effective breathing techniques to help you relax in as little as a few breaths.',
          link:'BreathingExercise',
          image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/breath.jpg')} />,
          lockImage:
            <View style={[tw` justify-center items-center rounded-xl bg-slate-800`, {height:height/4.5, width:width/1.35}]}>
                <AntDesign size={44} name='lock' color="white" />
                <Text style={tw`text-white mt-1`}>Only Available in Premium</Text>
            </View>,
          duration:'1-3 minutes',
          moduleCount:'1 Tool'

        },
      
        {
          
          title:'Sigh Relief Breathwork',
          eventName:"sighClicked",
          description:'Did you know all mammels do this breathing pattern to relax unconsciously? This breathing technique helps you find calm fast.',
          link:'PhysiologicalBreath',
          duration:'1-3 minutes',
          image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/physbreath.jpg')} />,
          lockImage:
            <View style={[tw` justify-center items-center rounded-xl bg-slate-800`, {height:height/4.5, width:width/1.35}]}>
                <AntDesign size={44} name='lock' color="white" />
                <Text style={tw`text-white mt-1`}>Only Available in Premium</Text>
            </View>,
          moduleCount:'1 Tool'

        }]
        
     
      

      const AssessmentItems = [
        {
          
            title:'Mental Health Assessment',
            eventName:"continuummClicked",
            description:"Take this short assessment to see if you are flourishing, moderately mentally health, or languishing.",
            link:'MhContQuiz',
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/continuum.jpg')} />,
            lockImage:
            <View style={[tw` justify-center items-center rounded-xl bg-slate-800`, {height:height/4.5, width:width/1.35}]}>
                <AntDesign size={44} name='lock' color="white" />
                <Text style={tw`text-white mt-1`}>Only Available in Premium</Text>
            </View>,
            duration:'1-5 Minutes',
            moduleCount:'14 Questions'
          },
          {
          
          title:'Anxiety & Depression Severity Assessment',
          eventName:"anxietyTestClicked",
          description:"This assessment will help you understand how severe your anxiety and depressive symptoms are and whether you'd benefit from professional licensed therapy.",
          image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/lao.jpg')} />,
          lockImage:
            <View style={[tw` justify-center items-center rounded-xl bg-slate-800`, {height:height/4.5, width:width/1.35}]}>
                <AntDesign size={44} name='lock' color="white" />
                <Text style={tw`text-white mt-1`}>Only Available in Premium</Text>
            </View>,
          link:'Quiz',
          duration:'1-3 Minutes',
          moduleCount:'14 Questions'
        },
        {
          
            title:'Stress & Recovery Test',
            eventName:'stressTestClicked',
            description:'Did you know your urge to breath is tightly tied to your stress levels? This breathing test will reveal how stressed or recovered you are in less than a minute.',
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/hm.jpg')} />,
            lockImage:
            <View style={[tw` justify-center items-center rounded-xl bg-slate-800`, {height:height/4.5, width:width/1.35}]}>
                <AntDesign size={44} name='lock' color="white" />
                <Text style={tw`text-white mt-1`}>Only Available in Premium</Text>
            </View>,
            link:'StressTest',
            duration:'1 Minute',
            moduleCount:'1 Tool'
          }

      ]
        
      const otherItems = [
       
          {
            
            title:'White Noise',
            eventName:"whiteNoiseClicked",
            description:'Similar to Binaural Beats, White Noise has also been shown to boost focus and productivity. Listen to this during your next work session.',
            link:'WhiteNoise',
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/headphone.jpg')} />,
            lockImage:
            <View style={[tw` justify-center items-center rounded-xl bg-slate-800`, {height:height/4.5, width:width/1.35}]}>
                <AntDesign size={44} name='lock' color="white" />
                <Text style={tw`text-white mt-1`}>Only Available in Premium</Text>
            </View>,
            duration:'30 Minutes of Sound',
            moduleCount:'1-Track'
          },
      ]

  return (
    
    <View style={[tw`flex-1 ${Platform.OS=="android" && `bg-black`}`,{width:width, height:height}]}>
        
        {Platform.OS == "ios" &&
        <LinearGradient 
        
        colors={['#182E77','#EA1D3F']}
        start={{x:0.05, y:0.6}}
        end={{x:0.9, y:0.3}}
        locations={[0.1,0.99]}
        
        
        style={[{width:width, height:height, opacity:0.75}]}
        />
        }

        {Platform.OS == "android" &&
        <SafeAreaView>
        
    
    <View style={[tw` flex-1 justify-start mt-15 pb-20`,{height:height, width:width, opacity:1, position:'absolute'}]}>
        <ScrollView  contentContainerStyle={tw`pb-20`} showsVerticalScrollIndicator={false}>
       
        <View>
            <Text  style={tw` ml-3 text-white text-2xl`}>Mental Health Assessments</Text>
            <Text style={tw` ml-3 text-white font-light text-lg`}>Scientific mental health assessments.</Text>
            <FlatList 
            data={AssessmentItems}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            snapToEnd
            snapToStart
            snapToOffsets={[0, width-80]}
            decelerationRate='fast'
            renderItem={(itemData)=> {
                return(
                    <View>
                    {isProMember ? 
                    <TouchableOpacity onPress={async ()=> {
                        navigation.navigate(itemData.item.link)
                        await analytics().logEvent(`${itemData.item.eventName}`, {
                            id:itemData.item.title
                        })

                        }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.image}
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                       <View style={tw`flex-row justify-start`}> 
                       <View style={tw`flex-row`}>
                       
                       <Ionicons style={tw`mt-1 text-slate-300`} name="ios-time-outline" size={20}  />
                       <Text style={tw`text-white font-light mt-1 text-sm`}>{itemData.item.duration}</Text>
                       </View>
                       <View style={tw`flex-row`}>
                       <MaterialCommunityIcons style={tw`text-slate-300 ml-4`} name="bookshelf" size={25} />
                       <Text style={tw`text-white font-light mt-1  text-sm`}>{itemData.item.moduleCount}</Text>
                       </View>
                       </View>
                       </View>
                       </View>
                    </TouchableOpacity>
                    :
                    <View style={tw`bg-slate-900 bg-opacity-80`}>
                    <TouchableOpacity onPress={async ()=> {
                        navigation.navigate(itemData.item.link)
                        await analytics().logEvent(`${itemData.item.eventName}`, {
                            id:itemData.item.title
                        })

                        }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.image}
                       <Text style={tw`text-white mt-2 text-lg`}> {itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                       <View style={tw`flex-row justify-start`}> 
                       <View style={tw`flex-row`}>
                       
                       <Ionicons style={tw`mt-1 text-slate-300`} name="ios-time-outline" size={20}  />
                       <Text style={tw`text-white font-light mt-1 text-sm`}>{itemData.item.duration}</Text>
                       </View>
                       <View style={tw`flex-row`}>
                       <MaterialCommunityIcons style={tw`text-slate-300 ml-4`} name="bookshelf" size={25} />
                       <Text style={tw`text-white font-light mt-1  text-sm`}>{itemData.item.moduleCount}</Text>
                       </View>
                       </View>
                       </View>
                       </View>
                    </TouchableOpacity>
                    </View>
                }
                </View>
                )}
            }
            />
        </View>
        
        
        <View style={tw``}>
            <Text style={tw` ml-3 text-white text-2xl`}>Quick Stress Reliever</Text>
            <Text style={tw` ml-3 text-white font-light text-lg`}>Reduce stress & anxiety now.</Text>
            <FlatList 
            data={ShortTermItems}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            snapToEnd
            snapToStart
            snapToOffsets={[0, width-80]}
            decelerationRate='fast'
            renderItem={(itemData)=> {
                return(
                    
                    <TouchableOpacity onPress={async ()=> {
                        navigation.navigate(itemData.item.link)
                        await analytics().logEvent(`${itemData.item.eventName}`,{
                            id:"exerciseSelection"
                        })
                        }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.image}
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                       <View style={tw`flex-row justify-start`}> 
                       <View style={tw`flex-row`}>
                       
                       <Ionicons style={tw`mt-1 text-slate-300`} name="ios-time-outline" size={20}  />
                       <Text style={tw`text-white font-light mt-1 text-sm`}>{itemData.item.duration}</Text>
                       </View>
                       <View style={tw`flex-row`}>
                       <MaterialCommunityIcons style={tw`text-slate-300 ml-4`} name="bookshelf" size={25} />
                       <Text style={tw`text-white font-light mt-1  text-sm`}>{itemData.item.moduleCount}</Text>
                       </View>
                       </View>
                       </View>
                       </View>
                    </TouchableOpacity>
                )}
            }
            />
        </View>
       
        
        <View>
            <Text  style={tw` ml-3 text-white text-2xl`}>Focus and Productivity Tools</Text>
            <Text style={tw` ml-3 text-white font-light text-lg`}>Get it done, feel better.</Text>
            <FlatList 
            data={otherItems}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            snapToEnd
            snapToStart
            snapToOffsets={[0, width-80]}
            decelerationRate='fast'
            renderItem={(itemData)=> {
                return(
                    <TouchableOpacity onPress={async ()=> {
                        navigation.navigate(itemData.item.link)
                        await analytics().logEvent(`${itemData.item.eventName}`,{
                            id:"exerciseSelection"
                        })
                        }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.image}
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                       <View style={tw`flex-row justify-start`}> 
                       <View style={tw`flex-row`}>
                       
                       <Ionicons style={tw`mt-1 text-slate-300`} name="ios-time-outline" size={20}  />
                       <Text style={tw`text-white font-light mt-1 text-sm`}>{itemData.item.duration}</Text>
                       </View>
                       <View style={tw`flex-row`}>
                       <MaterialCommunityIcons style={tw`text-slate-300 ml-4`} name="bookshelf" size={25} />
                       <Text style={tw`text-white font-light mt-1  text-sm`}>{itemData.item.moduleCount}</Text>
                       </View>
                       </View>
                       </View>
                       </View>
                    </TouchableOpacity>
                )}
            }
            />
        </View>
        </ScrollView>
    </View>
    </SafeAreaView>
    }

    {Platform.OS == "ios" &&
    
        
    
    <View style={[tw` flex-1 justify-start ${Platform.OS == 'ios' && `mt-15`} pb-20`,{height:height, width:width, opacity:1, position:'absolute'}]}>
        <ScrollView  contentContainerStyle={tw`pb-20`} showsVerticalScrollIndicator={false}>
       
        <View>
            <Text  style={tw` ml-3 text-white text-2xl`}>Mental Health Assessments</Text>
            <Text style={tw` ml-3 text-white font-light text-lg`}>Scientific mental health assessments.</Text>
            <FlatList 
            data={AssessmentItems}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            snapToEnd
            snapToStart
            snapToOffsets={[0, width-80]}
            decelerationRate='fast'
            renderItem={(itemData)=> {
                return(
                    <View>
                    {isProMember ? 
                    <TouchableOpacity onPress={async ()=> {
                        navigation.navigate(itemData.item.link)
                        await analytics().logEvent(`${itemData.item.eventName}`, {
                            id:itemData.item.title
                        })

                        }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.image}
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                       <View style={tw`flex-row justify-start`}> 
                       <View style={tw`flex-row`}>
                       
                       <Ionicons style={tw`mt-1 text-slate-300`} name="ios-time-outline" size={20}  />
                       <Text style={tw`text-white font-light mt-1 text-sm`}>{itemData.item.duration}</Text>
                       </View>
                       <View style={tw`flex-row`}>
                       <MaterialCommunityIcons style={tw`text-slate-300 ml-4`} name="bookshelf" size={25} />
                       <Text style={tw`text-white font-light mt-1  text-sm`}>{itemData.item.moduleCount}</Text>
                       </View>
                       </View>
                       </View>
                       </View>
                    </TouchableOpacity>
                    :
                    <View style={tw``}>
                    <TouchableOpacity onPress={async ()=> {
                        navigation.navigate("Paywall")
                        await analytics().logEvent(`${itemData.item.eventName}`, {
                            id:itemData.item.title
                        })

                        }} style={[tw` mb-5 `, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3 rounded-xl border-white`]}>
                        <View style={tw`justify-center items-center`}>
                        {itemData.item.lockImage}
                        </View>
                       <Text style={tw`text-white mt-2 text-lg`}> {itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                       <View style={tw`flex-row justify-start`}> 
                       <View style={tw`flex-row`}>
                       
                       <Ionicons style={tw`mt-1 text-slate-300`} name="ios-time-outline" size={20}  />
                       <Text style={tw`text-white font-light mt-1 text-sm`}>{itemData.item.duration}</Text>
                       </View>
                       <View style={tw`flex-row`}>
                       <MaterialCommunityIcons style={tw`text-slate-300 ml-4`} name="bookshelf" size={25} />
                       <Text style={tw`text-white font-light mt-1  text-sm`}>{itemData.item.moduleCount}</Text>
                       </View>
                       </View>
                       </View>
                       </View>
                    </TouchableOpacity>
                    </View>
                }
                </View>
                )}
            }
            />
        </View>
        
        
        <View style={tw``}>
            <Text style={tw` ml-3 text-white text-2xl`}>Quick Stress Reliever</Text>
            <Text style={tw` ml-3 text-white font-light text-lg`}>Reduce stress & anxiety now.</Text>
            <FlatList 
            data={ShortTermItems}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            snapToEnd
            snapToStart
            snapToOffsets={[0, width-80]}
            decelerationRate='fast'
            renderItem={(itemData)=> {
                return(
                    <View>
                    {isProMember ? 
                    <TouchableOpacity onPress={async ()=> {
                        navigation.navigate(itemData.item.link)
                        await analytics().logEvent(`${itemData.item.eventName}`,{
                            id:"exerciseSelection"
                        })
                        }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.image}
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                       <View style={tw`flex-row justify-start`}> 
                       <View style={tw`flex-row`}>
                       
                       <Ionicons style={tw`mt-1 text-slate-300`} name="ios-time-outline" size={20}  />
                       <Text style={tw`text-white font-light mt-1 text-sm`}>{itemData.item.duration}</Text>
                       </View>
                       <View style={tw`flex-row`}>
                       <MaterialCommunityIcons style={tw`text-slate-300 ml-4`} name="bookshelf" size={25} />
                       <Text style={tw`text-white font-light mt-1  text-sm`}>{itemData.item.moduleCount}</Text>
                       </View>
                       </View>
                       </View>
                       </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={async ()=> {
                        navigation.navigate("Paywall")
                        await analytics().logEvent(`${itemData.item.eventName}`,{
                            id:"exerciseSelection"
                        })
                        }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.lockImage}
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                       <View style={tw`flex-row justify-start`}> 
                       <View style={tw`flex-row`}>
                       
                       <Ionicons style={tw`mt-1 text-slate-300`} name="ios-time-outline" size={20}  />
                       <Text style={tw`text-white font-light mt-1 text-sm`}>{itemData.item.duration}</Text>
                       </View>
                       <View style={tw`flex-row`}>
                       <MaterialCommunityIcons style={tw`text-slate-300 ml-4`} name="bookshelf" size={25} />
                       <Text style={tw`text-white font-light mt-1  text-sm`}>{itemData.item.moduleCount}</Text>
                       </View>
                       </View>
                       </View>
                       </View>
                    </TouchableOpacity>

                    
                    }
                    </View>
                )}
            }
            />
        </View>
       
        
        <View>
            <Text  style={tw` ml-3 text-white text-2xl`}>Focus and Productivity Tools</Text>
            <Text style={tw` ml-3 text-white font-light text-lg`}>Get it done, feel better.</Text>
            <FlatList 
            data={otherItems}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            snapToEnd
            snapToStart
            snapToOffsets={[0, width-80]}
            decelerationRate='fast'
            renderItem={(itemData)=> {
                return(
                    <TouchableOpacity onPress={async ()=> {
                        navigation.navigate(itemData.item.link)
                        await analytics().logEvent(`${itemData.item.eventName}`,{
                            id:"exerciseSelection"
                        })
                        }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.image}
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                       <View style={tw`flex-row justify-start`}> 
                       <View style={tw`flex-row`}>
                       
                       <Ionicons style={tw`mt-1 text-slate-300`} name="ios-time-outline" size={20}  />
                       <Text style={tw`text-white font-light mt-1 text-sm`}>{itemData.item.duration}</Text>
                       </View>
                       <View style={tw`flex-row`}>
                       <MaterialCommunityIcons style={tw`text-slate-300 ml-4`} name="bookshelf" size={25} />
                       <Text style={tw`text-white font-light mt-1  text-sm`}>{itemData.item.moduleCount}</Text>
                       </View>
                       </View>
                       </View>
                       </View>
                    </TouchableOpacity>
                )}
            }
            />
        </View>
        </ScrollView>
    </View>
    
    
    
    
    }
    
    </View>

    

  )
}