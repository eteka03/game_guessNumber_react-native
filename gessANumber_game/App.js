import React,{useState,useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/startGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

const  FetchFonts = async () => {
  await Font.loadAsync({
     'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
     'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
   })
 }


export default function App() {

const [userNumber,setUserNumber] = useState();
const [guessRounds,setGuessRounds] = useState(0);
const [dataLoaded,setDataLoaded] = useState(false);




  if(!dataLoaded){
    return <AppLoading startAsync={FetchFonts} onFinish={()=>setDataLoaded(true)}/>
  }




const configureNewGameHandler = ()=>{
  setGuessRounds(0);
  setUserNumber(null)
}

  const startGameHandler = selectedNumber =>{
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numofround => {
    setGuessRounds(numofround)
  }

  let content = <StartGameScreen onStartGame = {startGameHandler}/>;

  if(userNumber && guessRounds <= 0){
    content = <GameScreen userChoice={userNumber} onGameOver = {gameOverHandler}/>
  }else if(guessRounds > 0){
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart ={configureNewGameHandler}/>
  }



  return (
    <View style={styles.screen}>
     <Header title="Guess A Number"/>
     {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
});
