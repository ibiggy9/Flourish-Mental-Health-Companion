import React, {useState, useEffect } from 'react'
import {View, Text, TouchableOpacity, ActivityIndicator, Easing, Alert, useWindowDimensions, Image, Linking} from 'react-native'
import tw from 'twrnc'
import { Motion } from "@legendapp/motion"
import * as Haptics from 'expo-haptics';
import BackButton from '../../Components/BackButton';
import { LinearGradient } from 'expo-linear-gradient';
import InstructionSlider from '../../Components/ExerciseComponents/InstructionSlider';
import analytics from '@react-native-firebase/analytics';
import MarginWrapper from '../MarginWrapper';

export default function Quiz({navigation}) {
  const [instructions, setInstructions] = useState(true)
  const [step, setStep] = useState(0)
  const [anxietyScore, setAnxietyScore] = useState(0)
  const [depressionScore, setDepressionScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const {height, width} = useWindowDimensions()


  const instructionStart = [
    {
      instructionTitle:"What It Is",
      image:<Image  style={[tw` rounded-xl `, {height:height/3.5, width:width/1.3}]} source={require('../../assets/adQuiz/q1.jpg')}/>,
      instructionShort:"This tool assesses your anxiety and depression symptoms through 14 questions and provides a score of severity.",
      source:"https://pubmed.ncbi.nlm.nih.gov/11556941/"
    },
    {
      instructionTitle:"How To Do it",
      image:<Image  style={[tw` rounded-xl `, {height:height/3.5, width:width/1.3}]} source={require('../../assets/adQuiz/q2.jpg')}/>,
      instructionShort:"Answer each question truthfully and the tool will provide a score and description of the severity of your anxiety and depression symptoms.",
      source:"https://pubmed.ncbi.nlm.nih.gov/11556941/"
    },
    {
      instructionTitle:"Benefits of Doing It",
      image:<Image  style={[tw` rounded-xl `, {height:height/3.5, width:width/1.3}]} source={require('../../assets/adQuiz/q3.jpg')}/>,
      instructionShort:"The tool is based on established assessments and has been validated by mental health professionals. Regular tracking can help in making inform decisions towards seeking help.",
      source:"https://pubmed.ncbi.nlm.nih.gov/11556941/"
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
    {question: 1, option_1: false, option_2: false, option_3: false, option_4: false},
    {question: 2, option_1: false, option_2: false, option_3: false, option_4: false},
    {question: 3, option_1: false, option_2: false, option_3: false, option_4: false},
    {question: 4, option_1: false, option_2: false, option_3: false, option_4: false},
    {question: 5, option_1: false, option_2: false, option_3: false, option_4: false},
    {question: 6, option_1: false, option_2: false, option_3: false, option_4: false},
    {question: 7, option_1: false, option_2: false, option_3: false, option_4: false},
    {question: 8, option_1: false, option_2: false, option_3: false, option_4: false},
    {question: 9, option_1: false, option_2: false, option_3: false, option_4: false},
    {question: 10, option_1: false, option_2: false, option_3: false, option_4: false},
    {question: 11, option_1: false, option_2: false, option_3: false, option_4: false},
    {question: 12, option_1: false, option_2: false, option_3: false, option_4: false},
    {question: 13, option_1: false, option_2: false, option_3: false, option_4: false},
    {question: 14, option_1: false, option_2: false, option_3: false, option_4: false},
  ])
  

  const quiz = [
    
    {question:'I feel tense or "wound up"', option_1: 'Most of the time',  option_2: 'A lot of the time', option_3: 'From time to time, occasionally', option_4:'Not at all'},
    {question:'I still enjoy the things I used to enjoy', option_1: 'Definitely as much', option_2: 'Not quite so much', option_3: 'Only a little', option_4:'Hardly at all'},
    {question:'I get a sort of frightened feeling as if something awful is about to happen', option_1: 'Very definitely and quite badly ', option_2: 'Yes, but not too badly ', option_3: "A little, but it doesn't worry me", option_4:'Not at all'},
    {question:'I can laugh and see the funny side of things', option_1:'As much as I always could ', option_2: 'Not quite so much now ', option_3: 'Definitely not so much now ', option_4:'Not at all '},
    {question:'Worrying thoughts go through my mind', option_1: 'A great deal of the time ', option_2: 'A lot of the time ', option_3: ' From time to time, but not too often ', option_4:'Only occasionally '},
    {question:'I feel cheerful', option_1: 'Not at all', option_2: 'Not often ', option_3: 'Sometimes ', option_4:'Most of the time '},
    {question:'I can sit at ease and feel relaxed', option_1: 'Definitely', option_2: 'Usually', option_3: 'Not Often ', option_4:'Not at all '},
    {question:'I feel as if I am slowed down', option_1: 'Nearly all the time ', option_2: 'Very often ', option_3: 'Sometimes ', option_4:'Not at all '},
    {question:'I get a sort of frightened feeling like "butterflies" in the stomach', option_1: 'Not at all ', option_2: 'Occasionally ', option_3: 'Quite Often ', option_4:'Very Often '},
    {question:'I have lost interest in my appearance', option_1: 'Definitely ', option_2: "I don't take as much care as I should", option_3: 'I may not take quite as much care ', option_4:'I take just as much care as ever '},
    {question:'I feel restless as if have to be on the move', option_1: ' Very much indeed ', option_2: 'Quite a lot', option_3: 'Not very much ', option_4:'Not at all '},
    {question:'I look forward with enjoyment to things', option_1: 'As much as I ever did', option_2: 'Rather less than I used to ', option_3: 'Definitely less than I used to ', option_4:'Hardly at all '},
    {question:'I get sudden feelings of panic', option_1: 'Very often indeed ', option_2: 'Quite often ', option_3: 'Not very often', option_4:'Not at all'},
    {question:'I can enjoy a good book or radio or TV program', option_1: 'Often ', option_2: 'Sometimes ', option_3: 'Not often ', option_4:'Very seldom'},
  
  ]
 
function scoringChange(e, qNum, option_num){
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

    data[qNum][option_num] = true
    setScoring(data)
    if(step == 13){
      calcScoring()
    }
    
    
    
    
      setStep((prev)=> prev+1)
      
    
  }

  function nextStep(){
   
    setStep((prev) => prev + 1)
    
  }

 function calcScoring(){
    
    setLoading(true)

    
    for(let i=0; i< scoring.length; i++){
        if(i === 0 || i === 2 || i===4 || i===10 || i===12){
            if(scoring[i].option_1 === true){
              setAnxietyScore((prev) => prev+3)
            } 
            if(scoring[i].option_2 === true){
              setAnxietyScore((prev) => prev+2)
            }
            if(scoring[i].option_3 === true){
              setAnxietyScore((prev) => prev+1)
            }
            if(scoring[i].option_4 === true){
              setAnxietyScore((prev) => prev+0)
            }
        }

        if(i===1 || i===3 || i===11 || i===13){
          if(scoring[i].option_1 === true){
            setDepressionScore((prev) => prev+0)
          } 
          if(scoring[i].option_2 === true){
            setDepressionScore((prev) => prev+1)
          }
          if(scoring[i].option_3 === true){
            setDepressionScore((prev) => prev+2)
          }
          if(scoring[i].option_4 === true){
            setDepressionScore((prev) => prev+3)
          }
        }
        if(i===5 || i===7 || i===9){
          if(scoring[i].option_1 === true){
            setDepressionScore((prev) => prev+3)
          } 
          if(scoring[i].option_2 === true){
            setDepressionScore((prev) => prev+2)
          }
          if(scoring[i].option_3 === true){
            setDepressionScore((prev) => prev+1)
          }
          if(scoring[i].option_4 === true){
            setDepressionScore((prev) => prev+0)
          }
        }
        if(i===6 || i===8){
          if(scoring[i].option_1 === true){
            setAnxietyScore((prev) => prev+0)
          } 
          if(scoring[i].option_2 === true){
            setAnxietyScore((prev) => prev+1)
          }
          if(scoring[i].option_3 === true){
            setAnxietyScore((prev) => prev+2)
          }
          if(scoring[i].option_4 === true){
            setAnxietyScore((prev) => prev+3)
          }
        }
    }
    setLoading(false)
    
  }

  function handleBegin(){
    setInstructions(false)
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Warning
    )

  }

  async function saveScore(){
    await analytics().logEvent(`adQuizResults_a${anxietyScore}_d:${depressionScore}`,{anxiety:anxietyScore, depression:depressionScore})
  }
 
  useEffect(()=>{
    if(step==14){
      saveScore()
    }
  },[step])

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
    <View style={[tw`flex-1 justify-start`,{height:height, width:width, opacity:1, position:'absolute'}]}>
  
  
    
    {instructions === true ?
    <Motion.View initial={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, ease:Easing.easing}} style={[tw` text-center rounded-xl`, {width:width, height:height}]}>
    <BackButton navigation={navigation}/>
    <Text style={tw`text-2xl mx-5 text-white text-center font-bold `}>Anxiety & Depression Assessment</Text>
    <InstructionSlider navigation={navigation} instructions={instructionStart} />
    
    <TouchableOpacity style={tw`flex-1 items-center  justify-start rounded-xl p-3 px-10`} onPress={handleBegin}  >
      <Text style={tw`text-2xl text-white font-bold`} >Begin</Text>

    </TouchableOpacity>
    
    </Motion.View> 
    :
    
    <View style={tw`flex flex-col justify-start text-center rounded-xl`}>
      {step != 14 && <BackButton navigation={navigation}/>}
    {step != 14  && instructions == false &&
    
    <Motion.View style={tw`mt-20`} initial={{y: 500}} animate={{y:0}} transition={{type:'spring', damping:20, stiffness:200}}>
    <Text style={tw`text-3xl mx-10 text-white text-center font-bold`}>{quiz[step].question}</Text>
  
    <View style={tw`flex flex-col justify-between items-center mt-10`}>
    <Motion.Pressable   onPress={(e)=> scoringChange(e, step, "option_1")}  >
      <Motion.View style={tw`border border-white rounded-xl p-3 w-80 m-3`} whileTap={{scale:0.8, opacity:0.1}} transition={{type:'spring', damping:10, stiffness:300}} >
      <Text  style={tw`text-lg text-center text-white font-light`} >{quiz[step].option_1}</Text>
      </Motion.View>
    </Motion.Pressable>
    <Motion.Pressable  onPress={(e)=> scoringChange(e, step, "option_2")}  >
    <Motion.View style={tw`border border-white rounded-xl p-3 w-80 m-3`} whileTap={{scale:0.8, opacity:0.1}} transition={{type:'spring', damping:10, stiffness:300}} >
      <Text style={tw`text-lg text-center text-white font-light`} >{quiz[step].option_2}</Text>
      </Motion.View>
    </Motion.Pressable>
    <Motion.Pressable onPress={(e)=> scoringChange(e, step, "option_3")}  >
    <Motion.View style={tw`border border-white rounded-xl p-3 w-80 m-3`} whileTap={{scale:0.8, opacity:0.1}} transition={{type:'spring', damping:10, stiffness:300}} >
      <Text style={tw`text-lg text-center text-white font-light`} >{quiz[step].option_3}</Text>
      </Motion.View>
    </Motion.Pressable>
    <Motion.Pressable onPress={(e)=> scoringChange(e, step, "option_4")}  >
    <Motion.View style={tw`border border-white rounded-xl p-3 w-80 m-3`} whileTap={{scale:0.8, opacity:0.1}} transition={{type:'spring', damping:10, stiffness:300}} >
      <Text style={tw`text-lg text-center text-white font-light`} >{quiz[step].option_4}</Text>
      </Motion.View>
    </Motion.Pressable>
    </View>
    </Motion.View>
    
    
    }
   {loading && 
    <ActivityIndicator size="large" />
   }

    {step == 14 && !loading &&
      <View style={[tw` mt-20 flex-col justify-start`, {height:height, width:width}]}>
    <Motion.View initial={{opacity:0}} animate={{opacity:1}} style={tw`mx-5`} transition={{type:'timing', duration:1000, easing:Easing.easing}} >
    
    <View style={tw` font-bold text-xl`}><Text style={tw`text-white   font-bold text-4xl`}>Your Results:</Text></View>
    {depressionScore <= 7 &&
      <View style={tw`text-white font-bold mt-2 p-3 `}>
        <Text style={tw`text-white font-bold text-xl`}>Depression Score: {depressionScore}</Text>
        <Text style={tw`text-white text-lg`} >Your score indicates that you do not have clinically significant depression.</Text>
      </View>
    }
    {depressionScore >= 8 && depressionScore <=10 && 
      <View style={tw`mt-3 p-3`}>
        <Text style={tw`text-white font-bold text-xl`}>Depression Score: {depressionScore}</Text> 
        <Text style={tw`text-white text-lg`}>Your score indiciates that your depressive symptoms are borderline. If in doubt, seek professional help.</Text>
        </View>
    }

    {depressionScore >= 11 &&
      <View style={tw` mt-3 p-3 `}>
        <Text style={tw`text-white font-bold text-xl`}>Depression Score: {depressionScore} </Text>
          <Text style={tw`text-white text-lg`}>Your score indicates that your despression may be clincially signficant. It is recommended that you seek assistance from a licensed mental health professional.  </Text>
          </View>

    }

    {anxietyScore <= 7 &&
      <View style={tw` mt-3 p-3 `}>
        <Text style={tw`text-white font-bold text-xl`}>Anxiety Score: {anxietyScore} </Text> 
        <Text style={tw`text-white text-lg`}>Your score indicates that you do not have clinically significant anxiety.</Text>
        </View>

    }

    { anxietyScore >= 8 && anxietyScore <=10 &&
      <View style={tw` mt-3  p-3`}>
        <Text style={tw`text-white font-bold text-xl`} >Anxiety Score:  {anxietyScore} </Text> 
        <Text style={tw`text-white text-lg`}>Your score indicates that while your anxiety does not appear to be clinically significant, it is borderline. If in doubt, seek professional help. </Text>

        </View>
    }

    { anxietyScore >= 11 && 
      <View style={tw` mt-3 p-3 `}>
        <Text style={tw`text-white font-bold text-xl`}>Anxiety Score:  {anxietyScore}</Text>
        <Text style={tw`text-white text-lg`}>Your score indicates that your anxiety may be clinical. It is recommended that you seek assistance from a licensed mental health professional.</Text>
        </View>

    }

<Text style={tw`text-sm text-slate-300 font-light mt-10`}>Disclaimer: This tool cannot diagnose any mental health related illness. If you suspect that you are in need of professional mental health care, please contact a licensed mental health professional to get help.</Text>
<TouchableOpacity onPress={()=> Linking.openURL(instructionStart[2].source)}>
<Text style={tw`text-sm text-blue-300 italic underline  mt-5`}>Source: Kroenke K, Spitzer RL, Williams JB. The PHQ-9: Validity of a brief depression severity measure. Journal of General Internal Medicine. 2001;16(9):606-613.</Text>
</TouchableOpacity>
    
   
    
    </Motion.View>
    <View style={tw`flex-1  mb-40 justify-end`}>
     <TouchableOpacity style={tw` border border-white rounded-xl py-3 mx-10`} onPress={()=> navigation.navigate('Exercises')}>
     <Text style={tw`text-white font-bold text-xl text-center`}>Done</Text>

   </TouchableOpacity>
   </View>
   </View>
    
    }
    
    </View>
  }
    
    </View>
    </MarginWrapper>
    </View>
  )
  
}
