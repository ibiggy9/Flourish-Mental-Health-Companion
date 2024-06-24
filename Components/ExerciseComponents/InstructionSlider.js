import { View, Text, FlatList, useWindowDimensions, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'


export default function InstructionSlider({navigation, instructions}) {
    const {height, width} = useWindowDimensions()
    useEffect(()=> {
      console.log(navigation)
    },[])
    
  return (
    <View>
      <FlatList 
        data={instructions}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled
        snapToEnd
        snapToStart
        snapToInterval={width}
        
        decelerationRate='fast'
        renderItem={(itemData)=> {
          return(
            <View style={[{height:height/1.43, width:width}, tw`flex-1 justify-start mt-3 items-center`]}>
              <View style={[tw`flex-1 bg-slate-600 bg-opacity-40 rounded-2xl items-center mb-3 `, {width:width-40, height: height/2.7}]}>
              <View style={[tw`flex-7 justify-end`, {width:width}]}>
              <View style={tw`mt-0 mx-5 items-center justify-end`}>
              
              {itemData.item.image}
              <Text style={[tw`text-white  text-center mt-7 font-bold`, {fontSize:25}]}>{itemData.item.instructionTitle}</Text>
              <Text style={[tw`text-white text-center mx-2`, {fontSize:16}]}>{itemData.item.instructionShort}</Text>
              <TouchableOpacity onPress={()=> Linking.openURL(itemData.item.source)}>
              <Text style={[tw`text-white mx-2 my-4 text-xs font-bold text-left italic `, {fontSize:12}]}>Source</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate("Disclaimer")} >
                <Text style={[tw`text-white mx-2  text-xs font-bold text-left`, {fontSize:12}]}>See Disclaimer</Text>
                </TouchableOpacity>
              
              </View>
              
                </View>
                
                <View style={tw`flex-1 flex-col justify-end items-end`}>
                <View style={tw` flex-row items-center `}>
                {itemData.index == 0 &&
                <>
                <View style={tw`bg-white rounded-full w-3 h-3 mx-2  mb-5`}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2  mb-5 `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2  mb-5`}></View>
                </>
                }
                {itemData.index == 1 &&
                <>
                
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2 mb-5 `}></View>
                <View style={tw`bg-white rounded-full w-3 h-3 mx-2  mb-5`}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2  mb-5`}></View>
                </>
                }
                {itemData.index == 2 &&
                <>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2 mb-5`}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2 mb-5`}></View>
                <View style={tw`bg-white rounded-full w-3 h-3 mx-2 mb-5 `}></View>
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
  )
}