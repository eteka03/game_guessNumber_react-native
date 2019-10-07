import React,{useState,useRef,useEffect} from 'react';
import {StyleSheet,View,Text,Button,Alert,ScrollView} from 'react-native';
import NumberContainer from '../components/numberContainer';
import Card from '../components/Card';
import defaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton'
import {Ionicons} from '@expo/vector-icons';
import BodyText from '../components/BodyText'


const generateRandomBetween = (min,max,exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random()*(max-min)) + min;

    if(rndNum === exclude){
        return generateRandomBetween(min,max,exclude)
    }else{
        return rndNum;
    }
};

const renderListItem = (value,numOfRound) => (
<View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
    </View>
    )

const GameScreen = props =>{

    const initialGuess = generateRandomBetween(1,100,props.userChoice)
    const[currentGuess,setCurrentGuess]= useState(initialGuess);
   

    const [pastGuess,setPastGuess] =useState([initialGuess])

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const  {userChoice,onGameOver} = props

    useEffect(()=>{
        if(currentGuess === userChoice){
         onGameOver(pastGuess.length);
        }
    },[currentGuess,userChoice,onGameOver]);


    const nextGuessHandler = direction =>{
            if((direction === 'lower' && currentGuess < props.userChoice) ||(direction === 'greater' &&  currentGuess > props.userChoice) ){
                Alert.alert('lie!','You know that this is wrong...',[{text:'Sorry',style:'cancel'}]);

                return
            }
            if (direction === 'lower'){
                currentHigh.current = currentGuess;
            }else{
                currentLow.current = currentGuess;
            }

         const nextNumber =    generateRandomBetween(currentLow.current,currentHigh.current,currentGuess);

         setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds +1);

        setPastGuess(curPastGuesses=> [nextNumber,...curPastGuesses])
    }

 return(
     <View style={styles.screen}>
         <Text style={defaultStyles.title}>
             Opponent's Guess
         </Text>

         <NumberContainer>
             {currentGuess}
         </NumberContainer>
         <Card style={styles.buttonContainer}>

            <MainButton onPress={nextGuessHandler.bind(this,'lower')}>
                <Ionicons name="md-remove" size={32}  color="white"/>
            </MainButton>

            <MainButton onPress={nextGuessHandler.bind(this,'greater')}>
                <Ionicons name="md-add" size={32}  color="white"/>
            </MainButton>
            
         
             

             
         </Card>
        <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
             {pastGuess.map((guess,index) => renderListItem(guess,index+1))}
         </ScrollView>
        </View>
       
     </View>
 )
}


const styles = StyleSheet.create({
  screen:{
      flex:1,
      padding:10,
      alignItems:'center'
  },
  buttonContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:20,
      width:300,
      maxWidth:'80%',

  },
  listContainer:{
    width:'60%',
    flex:1
  },
  list:{
      flexGrow:1,
     
      justifyContent:'flex-end'
  },
  listItem:{
      borderColor:'#ccc',
      padding:15,
      marginVertical:10,
      backgroundColor:'white',
      borderWidth:1,
      flexDirection:'row',
      justifyContent:'space-between'
      

  }
});

export default GameScreen