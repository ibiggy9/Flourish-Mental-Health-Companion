import React, {useState, useEffect, useRef } from 'react'
import {View, Text, TouchableOpacity, ActivityIndicator, Easing, Alert, useWindowDimensions, Image, Animated, ScrollView, Linking} from 'react-native'
import tw from 'twrnc'
import {MotiView, AnimatePresence, useDynamicAnimation} from 'moti'
import { Motion } from '@legendapp/motion'
import * as Haptics from 'expo-haptics';
import BackButton from '../../Components/BackButton';
import { LinearGradient } from 'expo-linear-gradient'
import InstructionSlider from '../../Components/ExerciseComponents/InstructionSlider'
import analytics from '@react-native-firebase/analytics';
import MarginWrapper from '../MarginWrapper'

export default function MhContQuiz({navigation}) {
  const{height, width} = useWindowDimensions()
  const [instructions, setInstructions] = useState(true)
  const [step, setStep] = useState(0) 
  const isLanguishing = useRef(false)
  const isFlourishing = useRef(false)
  const flourishingCount = useRef(0)
  const languishingCount = useRef(0)
  
  const questionFade = useRef(new Animated.Value(1)).current
  const [finalScore, setFinalScore] = useState(null)
  const [loading, setLoading] = useState(false)

  


  const instructionStart = [
    {
      instructionTitle:"What It Does",
      image:<Image  style={[tw` rounded-xl `, {height:height/3.5, width:width/1.3}]} source={require('../../assets/cont/c1.jpg')}/>,
      instructionShort:"This assessment will provide you with a general result indicating your approximate mental health status. It will determine you as flourishing, moderate, or languishing.",
      source:"https://midus.wisc.edu/findings/pdfs/56.pdf"
    },
    {
      instructionTitle:"Why It's Effective",
      image:<Image  style={[tw` rounded-xl `, {height:height/3.5, width:width/1.3}]} source={require('../../assets/cont/c2.jpg')}/>,
      instructionShort:"This assessment has been used in decades of research to determine what category a person is in and what commonalities and differences are seen between flourishers, the moderately mentally healthy, and the languishers.",
      source:"https://midus.wisc.edu/findings/pdfs/56.pdf"
     
    },
    {
      instructionTitle:"How To Do It",
      image:<Image  style={[tw` rounded-xl `, {height:height/3.5, width:width/1.3}]} source={require('../../assets/cont/c3.jpg')}/>,
      instructionShort:"Answer each question truthfully, selecting the answer that best represents your current state of mind. The tool will then provide you with a score and description of your mental health.",
      source:"https://midus.wisc.edu/findings/pdfs/56.pdf"
     
    },
  ]


  useEffect(()=>{
    navigation.addListener('beforeRemove', (e) =>{
        const action = e.data.action;
        console.log(e.data.action)
        if(e.data.action.type == "NAVIGATE"){
            
            return 
        }
        e.preventDefault()

        Alert.alert(
            'Leave Quiz?',
            "You haven't completed the quiz. Are you sure you want to leave?",
            [{text: "Stay", style:'cancel', onPress: () => {}}, {
                text:'Leave',
                style:'destructive',
                onPress: () => navigation.dispatch(action),

            },
        ]
        )
    })
}, [navigation])

  const [scoring, setScoring] = useState([
    {question: 1, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
    {question: 2, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
    {question: 3, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
    {question: 4, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
    {question: 5, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
    {question: 6, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
    {question: 7, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
    {question: 8, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
    {question: 9, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
    {question: 10, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
    {question: 11, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
    {question: 12, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
    {question: 13, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
    {question: 14, option_1: false, option_2: false, option_3: false, option_4: false, option_5: false, option_6:false},
  ])
  

  const quiz = [
    
    {question:'How often in the past month did you feel happy?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},
    {question:'How often in the past month did you feel interested in life?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},
    {question:'How often in the past month did you feel satisfied with your life?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},
    {question:'How often during the past month did you feel that you had something important to contribute to society?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},
    {question:'How often during the past month did you feel that you belonged to a community(like a social group, neighbourhood, city, school)?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},
    {question:'How often during the past month did you feel that our society is becoming a better place for people like you?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},
    {question:'How often during the past month did you feel that people are basically good?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},
    {question:'How often during the past month did you feel that the way our society works makes sense to you?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},
    {question:'How often during the past month did you feel that you like most parts of your personality?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},
    {question:'How often during the past month did you feel good at managing the responsibilities of your daily life?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},
    {question:'How often during the past month did you feel that you had warm and trusting relationships with others?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},
    {question:'How often during the past month did you feel that you had experiences that challenged you to grow and become a better person?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},
    {question:'How often during the past month did you feel confident to think or express your own ideas and opinions?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},
    {question:'How often during the past month did you feel that your life has a sense of direction or meaning to it?', option_1: 'Every day',  option_2: 'Almost every day', option_3: 'About 2 or 3 times a week', option_4:'About once a week', option_5:"Once or twice", option_6:'Never'},

  
  ]

  const helperDescription = 'Take control of your mental well-being and unlock a deeper understanding of your psychological state with our cutting-edge mental health assessment. In just 14 questions, our tool measures whether you are languishing, in moderate mental health, or flourishing. With easy-to-understand results and actionable insights, our assessment provides you with a comprehensive and personalized snapshot of your current mental health. Whether you are looking to better understand your emotions and coping strategies, or simply want to improve your overall well-being, our assessment is here to help. Our tool is based on scientifically-validated measures and provides a quick and accurate evaluation of your psychological state. By taking just a few minutes to complete our assessment, you will gain a deeper understanding of your mental health and be equipped with the tools you need to make positive changes in your life. Get started today and take control of your mental well-being with our mental health assessment.'
  const helperDisclaimer = 'This quiz only assesses mental health and does not assess mental illness. If you suspect you may have a mental illness please contact a mental health professional.'

async function scoringChange(e, qNum, option_num){
    runFade()
    if(qNum != 13){
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    } else {
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
    }

    let data = [...scoring]
    data[qNum].option_1=false
    data[qNum].option_2=false
    data[qNum].option_3=false
    data[qNum].option_4=false
    data[qNum].option_5=false
    data[qNum].option_6=false

    data[qNum][option_num] = true
    setScoring(data)
    if(step == 13){
      calcScoring()
    }
     
  }

  async function runFade(){

      console.log("This ran")
      Animated.timing(questionFade, {toValue:0, useNativeDriver:true, duration:250}).start(()=> runShow())
      
  }

  function runShow(){
    setStep((prev)=> prev+1)
    Animated.timing(questionFade, {toValue:1, useNativeDriver:true, duration:250}).start()
  }

 function calcScoring(){
    
    setLoading(true)

    for(let i=0; i< scoring.length; i++){
        if(i === 0 || i==1 || i == 2 ){
            if(scoring[i].option_1 === true){
                isFlourishing.current = true
            } 
            if(scoring[i].option_2 === true){
              isFlourishing.current = true
            }
            
            if(scoring[i].option_5 === true){
                isLanguishing.current = true
              }
              if(scoring[i].option_6 === true){
                isLanguishing.current = true
              }
        }

        if(i>=3 && i<=13){
          if(scoring[i].option_1 === true){
            flourishingCount.current = flourishingCount.current +1
          } 
          if(scoring[i].option_2 === true){
            flourishingCount.current = flourishingCount.current +1
          }
          if(scoring[i].option_5 === true){
            languishingCount.current = languishingCount.current +1
          }
          if(scoring[i].option_6 === true){
            languishingCount.current = languishingCount.current +1
          }
        }
        
    }
    
    setLoading(false)
    calcfinalScore()
    
  }

  function calcfinalScore(){
    console.log(scoring)
    console.log(`Flourishing Count: ${flourishingCount.current}`)
    console.log(`Languishing Count: ${languishingCount.current}`)
    console.log(`isLangishing: ${isLanguishing.current}`)
    console.log(`isFlourishing: ${isFlourishing.current}`)
    if(isLanguishing.current == true && languishingCount.current >= 6){
      setFinalScore("isLanguishing")
    } else if(isFlourishing.current == true && flourishingCount.current >= 6){
      setFinalScore("isFlourishing")
    } else{
      setFinalScore("isModerate")
    }
  }

  async function saveScore(){
    console.log('pushing analytics')
    await analytics().logEvent(`ContinuummScore_${finalScore}`, {id:finalScore})
  }

  useEffect(()=>{
    if(step == 14 && finalScore){

      saveScore()
    }
  },[step])


  function handleBegin(){
    setInstructions(false)
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Warning
    )

  }
 

  return (
    
    <View style={[tw`flex-1 ${Platform.OS=="android" && `bg-black`}`,{width:width, height:height}]}>
      <MarginWrapper>
    {Platform.OS != 'android' &&
  <LinearGradient 
  
  colors={['#182E77','#EA1D3F']}
  start={{x:0.05, y:0.6}}
  end={{x:0.9, y:0.3}}
  locations={[0.1,0.99]}
  
  
  style={{width:width, height:height, opacity:0.65}}
  />
  }
    <View style={[tw`flex-1 justify-start pb-40`,{height:height, width:width, opacity:1, position:'absolute'}]}>
    <View style={{height:height, width:width}}>
    {step!=14 && 
    
    <BackButton navigation={navigation} />
    
    }
    
    {instructions === true ?
    <MotiView initial={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, ease:Easing.easing}} style={[tw` text-center rounded-xl`, {width:width, height:height}]}>
    
    <Text style={tw`text-2xl text-white text-center font-bold`}>Welcome to the Mental Health Continuum Quiz</Text>
    <InstructionSlider navigation={navigation} instructions={instructionStart} />
    <View style={tw`flex-1 items-center`}>
    <TouchableOpacity style={tw`rounded-xl p-3 px-10`} onPress={handleBegin}  >
     
      <Text style={tw`text-2xl text-white font-bold`} >Begin</Text>
     
    </TouchableOpacity>
    </View>
    </MotiView> 
    :
    
    <View style={tw`flex-1 flex-col justify-center items-center text-start pb-40 rounded-xl`}>
    {step != 14  && instructions == false &&
    
    <Animated.View style={{opacity:questionFade}}>
    <MotiView key={'c'} from={{opacity:0, scale:0.7}} animate={{opacity:1, scale:1}}  transition={{type:'timing', duration:800, easing:Easing.easing}}>
    <Text style={tw`text-lg mx-7 mt-5 text-white text-left font-bold`}>{quiz[step].question}</Text>
    
  
    <View style={tw`flex flex-col justify-between items-center mt-5`}>
    <TouchableOpacity   onPress={(e)=> scoringChange(e, step, "option_1")}  >
      <View style={tw`border border-white rounded-xl p-3 w-80 m-3`}> 
      <Text  style={tw`text-lg text-center text-white font-light`} >{quiz[step].option_1}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity  onPress={(e)=> scoringChange(e, step, "option_2")}  >
    <View style={tw`border border-white rounded-xl p-3 w-80 m-3`}> 
      <Text style={tw`text-lg text-center text-white font-light`} >{quiz[step].option_2}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={(e)=> scoringChange(e, step, "option_3")}  >
    <View style={tw`border border-white rounded-xl p-3 w-80 m-3`}> 
      <Text style={tw`text-lg text-center text-white font-light`} >{quiz[step].option_3}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={(e)=> scoringChange(e, step, "option_4")}  >
    <View style={tw`border border-white rounded-xl p-3 w-80 m-3`}> 
      <Text style={tw`text-lg text-center text-white font-light`} >{quiz[step].option_4}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={(e)=> scoringChange(e, step, "option_5")}  >
    <View style={tw`border border-white rounded-xl p-3 w-80 m-3`}> 
      <Text style={tw`text-lg text-center text-white font-light`} >{quiz[step].option_5}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={(e)=> scoringChange(e, step, "option_6")}  >
    <View style={tw`border border-white rounded-xl p-3 w-80 m-3`}> 
      <Text style={tw`text-lg text-center text-white font-light`} >{quiz[step].option_6}</Text>
      </View>
    </TouchableOpacity>
    </View>
    </MotiView>
    </Animated.View>
    
    
    }
   {loading && 
    <ActivityIndicator size="large" />
   }

    {step == 14 && !loading &&
    <View style={{height:height, width:width}}>
    <MotiView from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing}} style={tw`flex-1 mt-20`}>
    <View style={tw`flex-1 justify-start p-5`}>
    
    <View style={tw`items-center`}><Text style={tw`text-white font-bold text-3xl mt-10`}>Your Results:</Text></View>
    {finalScore == "isLanguishing" &&
      <View>
        <Text style={tw`text-4xl text-white mt-10`}>Languishing</Text>
        <Text style={tw`text-lg text-white`}>Your results indicate that you are currently experiencing a state of "languishing." This means that you may be struggling with feelings of boredom, dissatisfaction, and emptiness, and that your overall well-being may be compromised. It's important to recognize that this is a common experience, and that there are resources and support available to help improve your mental health. It may be helpful to speak with a mental health professional, engage in self-care practices, and reach out to loved ones for support. With care and attention, it is possible to regain a sense of purpose and fulfillment in life.</Text>
        <Text style={tw`text-sm text-slate-300 font-light mt-3`}>Disclaimer: This tool cannot diagnose any mental health-related illness. If you suspect that you are in need of professional mental health care, please contact a licensed mental health professional to get help.</Text>
        <TouchableOpacity onPress={()=> Linking.openURL(instructionStart[2].source)}>
      <Text style={tw`text-sm text-blue-300 italic underline  mt-5`}>Source: Keyes, C. L. M. (2002). The mental health continuum: From languishing to flourishing in life. Journal of Health and Social Behavior, 43(2), 207-222.</Text>
      </TouchableOpacity>
      </View>

    } 

    {finalScore == 'isFlourishing' &&
      <ScrollView>
      <Text style={tw`text-3xl text-white mt-10`}>Flourishing</Text>
      <Text style={tw`text-lg text-white`}>Your recent mental health assessment results indicate that you are currently experiencing a state of "flourishing." This means that you have a high level of well-being and are thriving in both your personal and professional life. You are likely experiencing positive emotions and meaningful relationships, as well as a sense of purpose and satisfaction. This is a great accomplishment and it's important to continue practicing self-care and seeking support from loved ones to maintain your mental health. Remember to acknowledge and celebrate your successes and to stay mindful of any challenges that may arise.</Text>
      <Text style={tw`text-sm text-slate-300 font-light mt-3`}>Disclaimer: This tool cannot diagnose any mental health related illness. If you suspect that you are in need of professional mental health care, please contact a licensed mental health professional to get help.</Text>
      <TouchableOpacity onPress={()=> Linking.openURL(instructionStart[2].source)}>
      <Text style={tw`text-sm text-blue-300 italic underline  mt-5`}>Source: Keyes, C. L. M. (2002). The mental health continuum: From languishing to flourishing in life. Journal of Health and Social Behavior, 43(2), 207-222.</Text>
      </TouchableOpacity>
    </ScrollView>
    }
    
    {finalScore == 'isModerate' &&
     <View>
     <Text style={tw`text-3xl text-white mt-10`}>Moderate Mental Health</Text>
     <Text style={tw`text-lg text-white`}>Your results indicate that you have moderate mental health. This means that you may be experiencing some stress, challenges or difficulties in your daily life that are affecting your well-being, but you are also still able to find joy, meaning and purpose in life. It's important to keep in mind that everyone goes through ups and downs and it's okay to not always feel your best. There are ways to support and improve your mental health, such as through self-care, therapy, and seeking support from loved ones</Text>
     <Text style={tw`text-sm text-slate-300 font-light mt-3`}>Disclaimer: This tool cannot diagnose any mental health related illness. If you suspect that you are in need of professional mental health care, do not  a licensed mental health professional to get help.</Text>
     <TouchableOpacity onPress={()=> Linking.openURL(instructionStart[2].source)}>
      <Text style={tw`text-sm text-blue-300 italic underline  mt-5`}>Source: Keyes, C. L. M. (2002). The mental health continuum: From languishing to flourishing in life. Journal of Health and Social Behavior, 43(2), 207-222.</Text>
      </TouchableOpacity>
   </View>
    }
  
    
   
    </View>
    
    </MotiView>
    <View style={tw``}>
    <TouchableOpacity style={tw` border border-white rounded-xl mx-20 py-3`} onPress={()=> navigation.navigate("Exercises")}>
    <Text style={tw`text-white font-bold text-xl text-center`}>Done</Text>
    </TouchableOpacity>
    </View>
    </View>
    }
    
    </View>
  }
    
    </View>
    </View>
    </MarginWrapper>
    </View>
  )
  
}
