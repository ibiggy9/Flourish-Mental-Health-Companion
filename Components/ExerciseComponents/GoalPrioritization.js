import React from 'react'
import DraggableFlatList, {
    ScaleDecorator,
  } from "react-native-draggable-flatlist";
  import { Text, View, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import tw from 'twrnc'
import { useState } from "react";

export default function GoalPrioritization({goalObject, title}) {
    const {height, width} = useWindowDimensions()
    const [data, setData] = useState(
       goalObject
    )
   

    const renderItem = ({item, drag, isActive}) => {
        return (
          <ScaleDecorator>
            
            <TouchableOpacity
              onLongPress={drag}
              disabled={isActive}
              style={tw`border border-white rounded-xl text-white justify-center items-center text-4xl mx-10  mb-4`}
            >
              <Text style={[tw`text-white text-center text-xl  rounded-xl py-4`, {width:width - 40}]}>{item.name}</Text>
            </TouchableOpacity>
            
          </ScaleDecorator>
        );
      };

  return (
    <View>
        {title? <Text style={tw`items-center text-center text-3xl text-white my-2`}>{title}</Text> :<Text style={tw`items-center text-center text-3xl text-white my-2`}>Prioritize Your Goals</Text>}
        <Text style={tw`text-white text-center text-lg mb-3 font-light`}>Press & Hold To Reprioritize</Text>
        <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      containerStyle={[{aspectRatio:4/6}, tw`rounded-xl`]}
    />
    
    </View>
  )
}

const styles = StyleSheet.create({
    rowItem: {
      height: 100,
      width: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },
  });