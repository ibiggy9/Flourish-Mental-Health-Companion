import React from 'react'
import {View, Text, SafeAreaView} from 'react-native'
import { Motion } from '@legendapp/motion'
import tw from 'twrnc'

export default function ReflectionCount() {
  return (
    <View>
    <Motion.View initial={{y:280, opacity:0}} animate={{y:0, opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing}, y:{type:"timing", duration:500, easing: Easing.easing, delay:1000}}}>
    <Text style={tw`text-white mx-auto text-3xl font-bold mt-5`}>Reflection Overview</Text>
    </Motion.View>
    <Motion.View  initial={{opacity:0}} animate={{opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing, delay:1700}}} >
    <Text style={tw`text-white text-lg mb--5 mt-6 font-bold text-xl ml-10`}>Your Progress:</Text>
    <Text style={tw`text-white text-sm mt-5 mb--5 mx-10`}>We recommend completing this exercise for 7 days to get the best results.</Text>
    </Motion.View>

    
<View style={tw`flex flex-row justify-center`}>
    <SafeAreaView id="calendar" style={tw`flex flex-row justify-evenly`}>
        
        <Motion.View  initial={{opacity:0}} animate={{opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing, delay:2200}}} >
        <View style={tw`flex flex-col items-center mx-2 `}>
        <Text style={tw`text-white text-lg mb-2 text-green-600`}>1</Text>
        <AntDesign name="checkcircleo" size={30} color="green" />
        </View>
        </Motion.View>

        <Motion.View  initial={{opacity:0}} animate={{opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing, delay:2400}}} >
        <View style={tw`flex flex-col items-center mx-2`}>
        <Text style={tw`text-white text-lg mb-2`}>2</Text>
        <Entypo name="circle" size={30} color="white" />
        </View>
        </Motion.View>

        <Motion.View  initial={{opacity:0}} animate={{opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing, delay:2600}}} >
        <View style={tw`flex flex-col items-center mx-2 `}>
        <Text style={tw`text-white text-lg mb-2`}>3</Text>
        <Entypo name="circle" size={30} color="white" />
        </View>
        </Motion.View>

        <Motion.View  initial={{opacity:0}} animate={{opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing, delay:2800}}} >
        <View style={tw`flex flex-col items-center mx-2 `}>
        <Text style={tw`text-white text-lg mb-2`}>4</Text>
        <Entypo name="circle" size={30} color="white" />
        </View>
        </Motion.View>

        <Motion.View  initial={{opacity:0}} animate={{opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing, delay:3000}}} >
        <View style={tw`flex flex-col items-center mx-2`}>
        <Text style={tw`text-white text-lg mb-2`}>5</Text>
        <Entypo name="circle" size={30} color="white" />
        </View>
        </Motion.View>

        <Motion.View  initial={{opacity:0}} animate={{opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing, delay:3200}}} >
        <View style={tw`flex flex-col items-center mx-2 `}>
        <Text style={tw`text-white text-lg mb-2`}>6</Text>
        <Entypo name="circle" size={30} color="white" />
        </View>
        </Motion.View>

        <Motion.View  initial={{opacity:0}} animate={{opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing, delay:3400}}} >
        <View style={tw`flex flex-col justify-center items-center mx-2`}>
        <Text style={tw`text-white text-lg mb-2`}>7 </Text>
        <Entypo name="circle" size={30} color="white" />
        </View>
        </Motion.View>

    </SafeAreaView>
</View>
    <Motion.View initial={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing, delay:3900}}>
    <View style={tw`flex flex-row justify-center mt-10`}>
    <TouchableOpacity style={tw`bg-blue-900 rounded-xl p-3 px-10 mx-12`} onPress={()=> lastStep()}>
        <Text style={tw`text-white m-auto text-lg font-bold`}>Back</Text>
    </TouchableOpacity>
    <TouchableOpacity style={tw`bg-blue-900 rounded-xl p-3 px-10 mx-12`} onPress={()=> firstStep()}>
        <Text style={tw`text-white m-auto text-lg font-bold`}>Next</Text>
    </TouchableOpacity>
    </View>
    </Motion.View>
    </View>
  )
}
