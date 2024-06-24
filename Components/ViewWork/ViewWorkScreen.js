import { View, Text, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import tw from 'twrnc'
import React, {useState} from 'react'
import { useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { getDatabase, ref, set, onValue, forEach, push } from "firebase/database";
import app from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'
import BackButton from '../BackButton'

export default function ViewWorkScreen({navigation, route}) {
    const {width, height} = useWindowDimensions()
    const {tool} = route.params
    const [goalList, setGoalList] = useState([])
    const [reflectionList, setReflectionList] = useState([])
    const [freeList, setFreeList] = useState([])
    const [dailyList, setDailyList] = useState([])
    const [cogList, setCogList] = useState([])
    const auth = getAuth(app)

    function getFree(){
        console.log("Getting Database")
        const db = getDatabase()
        const userRef = ref(db, `users/${auth.currentUser.uid}/userdata/journals/freeWriting/`)
        onValue(userRef, (snapshot) => {
          snapshot.forEach((value) => {
            var temp = value 
            setFreeList((prev)=>[...prev, temp.val()])
          })
        });
        }


        function getReflect(){
            console.log("Getting Database")
            const db = getDatabase()
            const userRef = ref(db, `users/${auth.currentUser.uid}/userdata/journals/reflectai/`)
            onValue(userRef, (snapshot) => {
              snapshot.forEach((value) => {
                var temp = value
                setReflectionList((prev)=>[...prev, temp.val()])
              })
            })
            }
          

        function getCog(){
            console.log("Getting Database")
            const db = getDatabase()
            const userRef = ref(db, `users/${auth.currentUser.uid}/userdata/aiTools/cogCoach/`)
            onValue(userRef, (snapshot) => {
              snapshot.forEach((value) => {
                var temp = value
                setCogList((prev)=>[...prev, temp.val()])
              })
            })
            }

        function getDaily(){
            console.log("Getting Database")
            const db = getDatabase()
            const userRef = ref(db, `users/${auth.currentUser.uid}/userdata/journals/dailyJournal/`)
            onValue(userRef, (snapshot) => { 
              snapshot.forEach((value) => {
                var temp = value  
                setDailyList((prev)=>[...prev, temp.val()])
              })
              
            })
            }

    function getGoals(){
      console.log("Getting Database")
      const db = getDatabase()
      const userRef = ref(db, `users/${auth.currentUser.uid}/userdata/aiTools/goalPlanner/`)
      onValue(userRef, (snapshot) => {
        snapshot.forEach((value) => {
          var temp = value  
          setGoalList((prev)=>[...prev, temp.val()])
        })
      });
      }

    useEffect(()=> {
        console.log(tool)
        if(tool == "goals"){
            getGoals()
        } else if(tool == "cog"){
            getCog()
        } else if(tool == "reflection"){
            getReflect()
        } else if(tool == "daily"){
            getDaily()
        } else if(tool == "free"){
            getFree()
        }
    }, [])

    

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
    <View style={[tw`justify-start mt-10`,{height:height, width:width, opacity:1, position:'absolute'}]}>
      <ScrollView style={{width:width, height:height}}>
        <BackButton navigation={navigation} />
        <View style={tw` items-center`}>
        {tool && tool == "goals" && <Text style={tw`text-white font-bold  text-2xl`}>Your Goals</Text>}
        {tool && tool == "cog" && <Text style={tw`text-white font-bold  text-2xl`}>Your Cog Coach Sessions</Text>}
        {tool && tool == "free" && <Text style={tw`text-white font-bold  text-2xl`}>Your Free Writing Sessions</Text>}
        {tool && tool == "daily" && <Text style={tw`text-white font-bold  text-2xl`}>Your Daily Morning Journals</Text>}
        {tool && tool == "reflection" && <Text style={tw`text-white font-bold  text-2xl`}>Your Refect AI sessions</Text>}
        </View>
        
        {tool && tool == "goals" &&
        <>
        { goalList.length != 0 ?
        <FlatList
            data={goalList}
            contentContainerStyle={tw`items-center`}
            renderItem={(itemData)=> {
                return(
                    <View style={{width:width/1.2}}>
                        <TouchableOpacity style={[tw`border border-white rounded-xl px-3 py-5 mt-2`, ]} 
                        onPress={()=>
                        navigation.navigate('GoalPlannerReflection', {
                            title: itemData.item.entry.title, 
                            date: itemData.item.entry.date,
                            goal: itemData.item.entry.goal,
                            q1: itemData.item.entry.question1,
                            a1: itemData.item.entry.answer1,
                            q2: itemData.item.entry.question2,
                            a2: itemData.item.entry.answer2,
                            q3: itemData.item.entry.question3,
                            a3: itemData.item.entry.answer3,
                            q4: itemData.item.entry.question4,
                            a4: itemData.item.entry.answer4,
                            q5: itemData.item.entry.question5,
                            a5: itemData.item.entry.answer5,
                            plan: itemData.item.entry.plan.choices[0].text
                        })
                        }
                        >
                          <Text style={tw`text-white mr-3`}>{itemData.item.entry.date}</Text>
                            <Text style={tw`text-white text-xl my-3 text-center`}>{itemData.item.entry.title}</Text>
                            <View style={tw`flex-row`}>
                            
                            <Text style={tw`text-white font-light`}>{itemData.item.entry.goal.substring(0,70)}...</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }}
        
        />
        :
        <View style={tw`items-center`}>
        <Text style={tw` text-white text-lg`}>You haven't started any goals. Visit "Goal Planner" under "Exercises" to get started.</Text>
        </View>
        }
        </>}

        {tool && tool == "reflection" &&
        <>
        {reflectionList.length != 0 ?
        <FlatList
            data={reflectionList}
            contentContainerStyle={tw`items-center`}
            renderItem={(itemData)=> {
                return(
                    <View style={[tw``, {width:width/1.2}]}>
                    <TouchableOpacity  style={[tw`border border-white rounded-xl px-3 py-5 mt-2`, ]} 
                    onPress={()=> navigation.navigate('ReflectAIPast',{
                      title: itemData.item.entry.title,
                      date: itemData.item.entry.date, 
                      reflectionTopic: itemData.item.entry.reflectionTopic,
                      q1: itemData.item.entry.question1,
                      a1: itemData.item.entry.answer1,
                      q2: itemData.item.entry.question2,
                      a2: itemData.item.entry.answer2,
                      q3: itemData.item.entry.question3,
                      a3: itemData.item.entry.answer3,
                      q4: itemData.item.entry.question4,
                      a4: itemData.item.entry.answer4,
                      q5: itemData.item.entry.question5,
                      a5: itemData.item.entry.answer5,
                      q6: itemData.item.entry.question6,
                      a6: itemData.item.entry.answer6,
                      q7: itemData.item.entry.question7,
                      a7: itemData.item.entry.answer7,
                      q8: itemData.item.entry.question8,
                      a8: itemData.item.entry.answer8,
                      q9: itemData.item.entry.question9,
                      a9: itemData.item.entry.answer9,
                      q10: itemData.item.entry.question10,
                      a10: itemData.item.entry.answer10,
                  
                    })}
                    
                    >
                        <Text style={tw`text-white`}>{itemData.item.entry.date}</Text>
                        <Text style={tw`text-white text-center text-xl`}>{itemData.item.entry.title}</Text>
                        <View style={tw`flex-row`}>
                        <Text style={tw`text-white mr-3`}>{itemData.item.entry.reflectionTopic.substring(0,70)}...</Text>
                        
                        </View>
                    </TouchableOpacity>
                </View>
                )
            }}
        
        />
        :
        <View style={tw`items-center`}>
        <Text style={tw`mx-4 text-white text-lg`}>You haven't started any reflections. Visit "Reflect AI" under "Exercises" to get started.</Text>
        </View>
        }
        </>}

        {tool && tool == "free" &&
        <>
        { freeList.length != 0 ?
        <FlatList
            data={freeList}
            contentContainerStyle={tw`items-center`}
            renderItem={(itemData)=> {
                return(
                    <View style={{width:width/1.2}}>
              
                    <TouchableOpacity style={[tw`border border-white rounded-xl px-3 py-5 mt-2`]} onPress={()=> navigation.navigate('FreeWritingReflection', {title: itemData.item.entry.title, date:itemData.item.entry.date, writing:itemData.item.entry.writing})}>
                    <Text style={tw`text-white mr-3`}>{itemData.item.entry.date}</Text>
                    
                    <View style={tw`flex-col`}>
                    <Text style={tw`text-white text-xl text-center mb-3`}>{itemData.item.entry.title}</Text>
                    <Text style={tw`text-slate-300 `}>{itemData.item.entry.writing.substring(0,70)}...</Text>
                    </View>
                    </TouchableOpacity>
                    
                  </View>
                )
            }}
        
        />
        :
        <View style={tw`items-center`}>
        <Text style={tw`text-white text-lg`}>You haven't done any free writing sessions. Visit "Free Writing" under "Exercises" to get started.</Text>
        </View>
        }
        </>}

        {tool && tool == "daily" &&
        <>
        { dailyList.length != 0 ?
        <FlatList
            data={dailyList}
            contentContainerStyle={tw`items-center`}
            renderItem={(itemData)=> {
                return(
                    <View style={[tw``, {width:width/1.2}]}>
              
              <TouchableOpacity style={[tw`border border-white rounded-xl px-3 py-5 mt-2`]} onPress={()=> navigation.navigate('DailyJournalReflection', {
                title: itemData.item.entry.title,
                date: itemData.item.entry.date,
                status: itemData.item.entry.status,
                keyFocus1: itemData.item.entry.keyFocus1,
                keyFocus2: itemData.item.entry.keyFocus2,
                keyFocus3: itemData.item.entry.keyFocus3,
                writing: itemData.item.entry.writing

                
                })}>
                  <Text style={tw`text-white font-light mr-3`}>{itemData.item.entry.date}</Text>
              
              <View style={tw`flex-col`}>
              <Text style={tw`text-white text-xl text-center  mb-3`}>{itemData.item.entry.title}</Text>
              <Text style={tw`text-white font-light `}>{itemData.item.entry.writing.substring(0,70)}...</Text>
              </View>
              </TouchableOpacity>
              
            </View>
                )
            }}
        
        />
        :
        <View style={tw`items-center`}>
        <Text style={tw` text-white text-lg`}>You haven't done any daily journals yet. Visit "Daily Morning Journal" under "Exercises" to get started.</Text>
        </View>
        }
        </>}

        {tool && tool == "cog" &&
        <>
        { cogList.length != 0 ?
        <FlatList
            data={cogList}
            contentContainerStyle={tw`items-center`}
            renderItem={(itemData)=> {
                return(
                    <View style={{width:width/1.2}}>
                        <TouchableOpacity style={[tw`border border-white rounded-xl px-8 py-5 mt-2`, ]} 
                        onPress={()=>
                        navigation.navigate('CogCoachReflection', {
                            title: itemData.item.entry.title, 
                            date: itemData.item.entry.date,
                            situation: itemData.item.entry.reflectionTopic,
                            q1: itemData.item.entry.question1,
                            a1: itemData.item.entry.answer1,
                            q2: itemData.item.entry.question2,
                            a2: itemData.item.entry.answer2,
                            q3: itemData.item.entry.question3,
                            a3: itemData.item.entry.answer3,
                            q4: itemData.item.entry.question4,
                            a4: itemData.item.entry.answer4,
                            q5: itemData.item.entry.question5,
                            a5: itemData.item.entry.answer5,
                            advice: itemData.item.entry.additionalAdvice.choices[0].text
                            

                        })
                        }
                        >
                           <Text style={tw`text-white  mr-3`}>{itemData.item.entry.date}</Text>
                            <Text style={tw`text-white text-xl my-3  text-center`}>{itemData.item.entry.title}</Text>
                            <View style={tw`flex-row`}>
                           
                            <Text style={tw`text-white font-light`}>{itemData.item.entry.reflectionTopic.substring(0,70)}...</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }}
        
        />
        :
        <View style={tw`items-center`}>
        <Text style={tw` text-white text-lg`}>You haven't had any Cog Coach sessions yet. Visit "Cog Coach" under the Exercises menu to get started.</Text>
  
        </View>
        }
        </>}


      </ScrollView>
    </View>
    </View>
    
  )
}