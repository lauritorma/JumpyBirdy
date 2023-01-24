import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)

  useEffect(() => {
    setRunning(false)
  }, [])
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <ImageBackground
      style={{
        
          justifyContent: 'center', height: '100%'
        
    }}
    source={require('./images/background.png')}
    resizeMode='cover'
      >

      </ImageBackground>
      <GameEngine
      ref={(ref) => {setGameEngine(ref) }}
      systems={[Physics]}
      entities={entities()}
      running={running}
      onEvent={(e) =>{
        switch(e.type) {
          case 'game_over':
            setRunning(false)
            gameEngine.stop()
            
            break;
          case 'new_point':
            setCurrentPoints(currentPoints + 1)
            break;

        }
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      >  

        <StatusBar style="auto" hidden={true}/>

      </GameEngine>
      
      {!running ?
        <View style={{flex: 0, justifyContent: 'center', alignItems: 'center', bottom: '60%'}}>
           <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 30, color: 'white', backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10}}>Your score: {currentPoints}</Text>
          <TouchableOpacity style={{backgroundColor: 'red', paddingHorizontal: 30, paddingVertical: 10}}
          onPress={() => {
            setCurrentPoints(0)
            setRunning(true)
            gameEngine.swap(entities())
          }}
          >
           
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center'}}>START GAME</Text>
          </TouchableOpacity>

        </View> : null }
    </View>
  );
}


