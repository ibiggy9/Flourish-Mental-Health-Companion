import React, {useEffect, useState} from 'react'
import {View, Text, Touchable, TouchableOpacity, useWindowDimensions, FlatList, Modal} from 'react-native'
import tw from 'twrnc'
import BackButton from '../../Components/BackButton'
import ExerciseComplete from '../../Components/ExerciseComponents/ExerciseComplete'
import TextInputExercise from '../../Components/ExerciseComponents/TextInputExercise'
import { AntDesign } from '@expo/vector-icons';
import TitleEntry from '../../Components/ExerciseComponents/TitleEntry'
import { LinearGradient } from 'expo-linear-gradient'
import {useIsFocused} from '@react-navigation/native'
import app from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, set, onValue, forEach, push } from "firebase/database";
import analytics from '@react-native-firebase/analytics';

export default function DailyJournal({navigation}) {
    const {width, height} = useWindowDimensions()
    const[step, setStep] = useState(0)
    const [pastEntries, setPastEntries] = useState([])
    const[freeWriting, setFreeWriting] = useState()
    const [title, setTitle] = useState("")
    const isFocused = useIsFocused()
    const auth = getAuth(app)

    
    useEffect(()=> {
      setStep(0)
      setFreeWriting()
      setTitle("")

    },[navigation, isFocused])

    function next(){
        setStep(step+1)
    }
    function back(){
        setStep(step-1)
    }

    const dummyJournalEntries = [
      {
        date:'07/07/2022', 
        title:'Test1',
        content:
        ' "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."'
      },

    ]

    //DATABASE FUNCTIONS
    //This function gets the users past entries from the database
  function getPastEntries(){
    
    console.log("Getting Database")
    const db = getDatabase()
    const userRef = ref(db, `users/${auth.currentUser.uid}/userdata/journals/freeWriting/`)
  
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
        writing: freeWriting
  
      }
      
    if(auth.currentUser.uid){
    set(ref(db, `users/${auth.currentUser.uid}/userdata/journals/freeWriting/${currentDate}/`), {
        entry
    })
  } else {
    console.log("no user id")
  }
    }

    async function saveAnalytics(){
      await analytics().logEvent("FreeWritingComplete", {id:true})
    }

    useEffect(()=> {
      if(step==3){
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
    <View style={[tw`flex-1 justify-start mt-10`,{height:height, width:width, opacity:1, position:'absolute'}]}>
    {step !=3 &&
    <BackButton navigation={navigation} />
    }
       
      {step == 0 &&
      
        
        <View style={tw`flex-1 justify-start items-center`}>
        <Text style={tw`text-white text-2xl`}>Free Writing Journal Entries</Text>
        {pastEntries.length != 0 ?
        
        <FlatList 
        data={pastEntries}
        contentContainerStyle={tw`pb-30`}
        showsVerticalScrollIndicator={false}
        renderItem={(itemData)=> {
          return(
            <View style={{width:width/1.1}}>
              
              <TouchableOpacity style={[tw`border border-white rounded-xl px-5 mx-5 py-5 mt-2`]} onPress={()=> navigation.navigate('FreeWritingReflection', {title: itemData.item.entry.title, date:itemData.item.entry.date, writing:itemData.item.entry.writing})}>
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
        <Text style={tw`text-white text-xl font-light px-2`}>No reflections yet! Press the plus sign to get started.</Text>
      }
        
        <View style={tw``} >
        <TouchableOpacity style={tw`px-10 mx-12`} onPress={()=> next()}>
        <AntDesign style={tw`mb-20`} name="pluscircle" size={40} color="white" />
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
         <View style={tw``}>
         <TextInputExercise 
         title={"Free Writing"}
         label={"Write anything that comes to mind here. It could be expanding on your focuses for the day or anything else you'd like to capture."}
         text={freeWriting}
         setText={setFreeWriting}
         //emphasis={}
         //emphasisTitle={}
         //emphasisDescription={}
         //emphasisExample={}
         nextStepper={()=> next()}
         lastStepper={()=> back()}
         />
        
        </View>
      }
      {step == 3 &&
        
        <ExerciseComplete link={'ExercisesNew'} navigation={navigation} message={"You have completed your free writing entry. Your writing has been saved to your profile."} />
        
      } 
    </View>
    </View>
  )
}
