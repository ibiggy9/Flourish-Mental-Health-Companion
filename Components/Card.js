import React from 'react'

export default function Card({title}) {
  return (
    <View id="card" style={tw`flex flex-col items-center bg-slate-500 mx-8 rounded-xl mt-1 mb-6 `}>
            <View id="innerCard" style={tw`flex flex-col px-4 pb-4 pt-2 items-center`} >
              <Text style={tw`text-white font-bold text-xl mb-1`}>{title}</Text>
            <View>
              <Text style={tw`px-2 text-violet-200`}>Description would go here and would be highly descriptive of the exact thing this content is about. </Text>
            
            </View>
            </View>
            <TouchableOpacity style={tw`flex flex-row bg-purple-200 rounded-b-xl py-3 w-full text-center justify-center`}>
              <Text style={tw`text-center text-md font-bold`}>Tap My Ass</Text>
            </TouchableOpacity>
            
            </View>
  )
}
