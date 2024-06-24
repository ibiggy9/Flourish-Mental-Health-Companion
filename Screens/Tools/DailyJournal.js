import React, {useEffect, useState} from 'react'
import {View, Text, Touchable, TouchableOpacity, ScrollView, FlatList, Easing, TextInput, useWindowDimensions} from 'react-native'
import tw from 'twrnc'
import BackButton from '../../Components/BackButton'
import ExerciseAssessment from '../../Components/ExerciseComponents/ExerciseAssessment'
import ExerciseComplete from '../../Components/ExerciseComponents/ExerciseComplete'
import SmallInputExercise from '../../Components/ExerciseComponents/SmallInputExercise'
import TextInputExercise from '../../Components/ExerciseComponents/TextInputExercise'
import { AntDesign } from '@expo/vector-icons';
import { MotiView } from 'moti'
import TitleEntry from '../../Components/ExerciseComponents/TitleEntry'
import { LinearGradient } from 'expo-linear-gradient'
import {useIsFocused} from '@react-navigation/native'
import app from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, set, onValue, forEach, push } from "firebase/database";
import analytics from '@react-native-firebase/analytics';

export default function DailyJournal({navigation}) {
    const[step, setStep] = useState(0)
    const [isHidden, setIsHidden] = useState(false)
    const[freeWriting, setFreeWriting] = useState()
    const [pastEntries, setPastEntries] = useState([])
    const [title, setTitle] = useState("")
    const [dailyJournal1, setDailyJournal1] = useState()
    const [dailyJournal2, setDailyJournal2] = useState()
    const [dailyJournal3, setDailyJournal3] = useState()
    const [score, setScore] = useState()
    const {width, height} = useWindowDimensions()
    const isFocused = useIsFocused()
    const auth = getAuth(app)

    function next(){
        setStep(step+1)
    }
    function back(){
        setStep(step-1)
    }
    
    useEffect(()=> {
        if(isFocused){
            setStep(0)
            setFreeWriting()
            setTitle("")
            setDailyJournal1()
            setDailyJournal2()
            setDailyJournal3()
            setScore()
        }
    }, [navigation, isFocused])

    

    const dummyJournalEntries = [
        {
            title:'Today',
            date:'07/07/2020',
            feelingScore:'Awesome',
            keyFocus1:'Get a workout in',
            keyFocus2:'Finish financial report',
            keyFocus3:'Go to cooking class',
            content:'"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."'
        }
    ]

    //DATABASE FUNCTIONS
    //This function gets the users past entries from the database
  function getPastEntries(){
    
    console.log("Getting Database")
    const db = getDatabase()
    const userRef = ref(db, `users/${auth.currentUser.uid}/userdata/journals/dailyJournal/`)
  
    onValue(userRef, (snapshot) => {
      
      snapshot.forEach((value) => {
        var temp = value
        
        setPastEntries((prev)=>[...prev, temp.val()])
      })
      
    });
  
    
  
    }
  
    useEffect(()=> {
      if(pastEntries){
      console.log(pastEntries)
      }

      if(pastEntries.length == 0){
        console.log(true)
      }
    },[pastEntries])
    // This function saves the entries from the database
    function saveEntry(){
      var currentDate = new Date();
  
      var month = currentDate.getMonth();
      if (month < 10) month = "0" + month;
      var dateOfMonth = currentDate.getDate();
      if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
      var year = currentDate.getFullYear();
      var formattedDate = dateOfMonth + "/" + month + "/" + year;
  
      var mili = currentDate.getTime()
      const db = getDatabase()
      const userRef = ref(db, 'users/')
      const entry={
        date: formattedDate,
        title:title,
        status:score,
        keyFocus1:dailyJournal1,
        keyFocus2:dailyJournal2,
        keyFocus3: dailyJournal3,
        writing:freeWriting,

        
      }
      
    if(auth.currentUser.uid){
    set(ref(db, `users/${auth.currentUser.uid}/userdata/journals/dailyJournal/${currentDate}/`), {
        entry
    })
  } else {
    console.log("no user id")
  }
    }

    async function saveAnalytics(){
     await analytics().logEvent("DailyJournalComplete", {id:true}) 
    }

    useEffect(()=> {
        if(step==5){
            saveAnalytics()
            saveEntry()
        }
        if(step==0){
            getPastEntries()
        }
        console.log(title.length)
    }, [step])
  

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
    <View style={[tw`flex-1 justify-start`,{height:height, width:width, opacity:1, position:'absolute'}]}>
    {step < 5 && <BackButton navigation={navigation} />}
        {step == 0 && 
            <View style={tw`flex-1 justify-start items-center`}>
                <Text style={tw`text-white text-3xl`}>Daily Journal Entries</Text>
        {pastEntries.length !=0 ? 
                <FlatList 
        data={pastEntries}
        contentContainerStyle={tw`pb-30`}
        showsVerticalScrollIndicator={false}
        renderItem={(itemData)=> {
          return(
            <View style={[tw``, {width:width/1.1}]}>
              
              <TouchableOpacity style={[tw`border border-white rounded-xl px-5 mx-5 py-5 mt-2`]} onPress={()=> navigation.navigate('DailyJournalReflection', {
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
        <Text style={tw`text-white text-xl font-light px-2`}>No reflections yet! Press the plus sign to get started.</Text>
        }
        <View style={tw``} >
        <TouchableOpacity style={tw`px-10 mx-12 pb-10`} onPress={()=> next()}>
        <AntDesign style={tw`mb-30 m-auto`} name="pluscircle" size={40} color="white" />
        </TouchableOpacity>
        </View>
        </View>
        }

        {step == 1 &&
        <View style={tw`flex-1 justify-start items-center mt-5`}>
            <TitleEntry titleName={"Write A Title For Today's Journal"} nextStep={()=> next()} title={title} setTitle={setTitle} />
        </View>
        }

        {step == 2 &&
        <View style={tw`flex-1 justify-start items-center`}>
            
            <ExerciseAssessment title={"How are you doing today?"}  score={score} setScore={setScore}/>
            <View style={tw`flex-row mt-10`}>
            
            
            </View>
            {score && 
            <TouchableOpacity style={tw`absolute bottom-15`} onPress={()=> next()}>
                <Text style={tw`text-white text-4xl mx-20 mt-20 `}>Next</Text>
            </TouchableOpacity>
            }
        </View>
        }

        {step == 3 &&
       <View style={tw`flex-1 justify-start items-center`}>
       <ScrollView>
       <SmallInputExercise 
       title={"3 Key Focuses"}
       label={"What are 3 things you want to focus on today?"}
       example={'Being more present, spending time with your partner, exercising on the treadmill, working on a passion project.'}
       text={dailyJournal1}
       setText={setDailyJournal1}
       text1={dailyJournal2}
       setText1={setDailyJournal2}
       text2={dailyJournal3}
       setText2={setDailyJournal3}
       //emphasis={}
       //emphasisTitle={}
       //emphasisDescription={}
       //emphasisExample={}
       nextStepper={()=> next()}
       lastStepper={()=> back()}
       />

       
       </ScrollView>
       
   </View>
        
        }
        {step == 4 &&
         <View style={tw``}>
         <TextInputExercise 
         
         title={"Free Writing"}
         label={"Write anything that comes to mind here. It could be expanding on your focuses for the day or anything you'd like to capture."}
         text={freeWriting}
         setText={setFreeWriting}
         //emphasis={}
         //emphasisTitle={}
         //emphasisDescription={}
         //emphasisExample={}
         nextStepper={()=> next()}
         lastStepper={()=> back()}
         />
        {freeWriting &&
        <TouchableOpacity>
            <Text>White</Text>
        </TouchableOpacity>
        
        }
     </View>
        }
        {step == 5 && 
        <View style={tw`flex-1 mt-20`}>
        <ExerciseComplete link={'ExercisesNew'} navigation={navigation} message={"You completed your journal for the day. Do this each morning to get a good start on your day and identify where your focus should go."}/>
        </View>
        }
    </View>
    </View>
  )
}
