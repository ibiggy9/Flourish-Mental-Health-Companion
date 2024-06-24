import React, {useEffect, useState, useRef} from 'react'
import {View, Text, useWindowDimensions, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import tw from 'twrnc'
import BackButton from './BackButton'
import { AntDesign } from '@expo/vector-icons';
//import binuralBeats from '../assets/audio/binuralBeats.mp3'
import { Audio } from 'expo-av';



export default function AudioPlayer({navigation, title, audio}) {
    const[playing, setPlaying] = useState(false)
    const {height, width} = useWindowDimensions()
    const [Loaded, SetLoaded] = React.useState(false);
    const [Loading, SetLoading] = React.useState(false);
    const [playingState, setPlayingState] = useState(false)
    const sound = React.useRef(new Audio.Sound());
    
    
    

    React.useEffect(() => {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            //interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            //interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            playThroughEarpieceAndroid: false,
            
        });
        
        onLoad();
        
      }, []);

      

      React.useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.current.unloadAsync();
 
            }
          : undefined;
      }, [sound]);
   
  
    
    async function onPlay(){
        setPlaying(true)
        try {
            const result = await sound.current.getStatusAsync();
            
            if (result.isLoaded) {
              if (result.isPlaying === false) {
                sound.current.playAsync();
                
                sound.current.setIsLoopingAsync(true)
              } else {
                setPlayingState(true)
              }
            }
          } catch (error) {}
    }

    async function onPause(){
        setPlaying(false)
        try {
            const result = await sound.current.getStatusAsync();
            if (result.isLoaded) {
              if (result.isPlaying === true) {
                sound.current.pauseAsync();
              }
            }
          } catch (error) {}
    }

    async function onLoad(){
        
            SetLoading(true);
            const checkLoading = await sound.current.getStatusAsync();
            if (checkLoading.isLoaded === false) {
              try {
                const result = await sound.current.loadAsync(audio, {}, true);
                if (result.isLoaded === false) {
                  SetLoading(false);
                  console.log('Error in Loading Audio');
                } else {
                  SetLoading(false);
                  SetLoaded(true);
                }
              } catch (error) {
                console.log(error);
                SetLoading(false);
              }
            } else {
              SetLoading(false);
            }
          };


    

  return (
    <View style={{height:height, width:width}}>
        <BackButton navigation={navigation}/>
        <View style={tw`flex-1 justify-start items-center`}>
        <Text style={[tw`text-white mb-10 mt-5`, {fontSize:35}]}>{title}</Text>
       

            <View>
               
                <View>
                {title.includes('Bi') ?
                
                <Image
                style={[tw`rounded-2xl`, {aspectRatio:4/5, height:height-500, marginBottom:1}]}
                source={require(`../assets/biurnal.jpg`)}
                />

                :


                <Image
                style={[tw`rounded-2xl`, {aspectRatio:4/5, height:height-500, marginBottom:1}]}
                source={require(`../assets/whiteNoise.jpg`)}
                />

                }
                
                </View>
                
            </View>
        
        

        {! Loading ?
        <View style={tw` justify-end items-center mt-10 `}>
        {!playing ?
        <TouchableOpacity style={tw`border-4 border-white p-10 rounded-full`} onPress={()=> onPlay()}>
        
       <AntDesign name="caretright" size={40} color="white" />
        
       </TouchableOpacity>
       :
       <TouchableOpacity style={tw`border-4 border-white p-10 rounded-full`}  onPress={()=> onPause()}>
        
       <AntDesign name="pause" size={40} color="white" />
       
       
        
       </TouchableOpacity>
        }
       </View>
       :
       <ActivityIndicator style={tw`mt-20`} size={"large"} color="white" />
      }
       </View>
    </View>
  )
}
