import React,{useState} from 'react';
import {View,Text,StyleSheet,TextInput,Button,TouchableWithoutFeedback,Keyboard,Alert } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/color';
import Input from '../components/Input';
import NumberContainer from '../components/numberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton'

const StartGameScreen =props=>{

        const [enteredValue,setEnteredValue] = useState('');
        const  [confirmed,setConfirmed] = useState(false);
        const [selectedNumber,setSelectedNumber] = useState('')

        const numberInputHamdler = inputText => {
            setEnteredValue(inputText.replace(/[^0-9]/g,''))
        }

        const resetInputHandler = ()=> {
            setEnteredValue('');
        };


        const confirmInputHandler=()=>{
            const chosenNumber = parseInt(enteredValue);
            if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
                Alert.alert('Invalid number!','Number has to be between 1 and 99',[{text:'Okay',style:'destructive',onPress:resetInputHandler}])
                return;
            }
            setConfirmed(true);
            
            setSelectedNumber(chosenNumber);
            setEnteredValue('');
            Keyboard.dismiss();
        }
let confirmedOutput;
        if(confirmed){
            confirmedOutput =(<Card style={styles.summaryContainer}>
                <BodyText>You selected </BodyText>
                <View>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton  onPress={()=>props.onStartGame(selectedNumber)}> START GAME</MainButton>

                </View>
            
            </Card> 
            )
        }

    return(

        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss()
        }}>

        
        <View style={styles.screen}>  
            <Text style={styles.title}>Start the Game !</Text>

            <Card style={styles.inputContainer}>
                <Text>Select Number</Text>
                <Input 
                onChangeText={numberInputHamdler}
                value={enteredValue}
                style={styles.input}
                 blurOnSubmit
                  autoCapitalize='none'
                   autoCorrect={false}
                    keyboardType="number-pad" 
                    maxLength={2}
                    />

                <View style={styles.buttonContainer}>
                   <View styles={styles.button}>
                       <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                       </View> 
                   <View styles={styles.button}>
                       <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
                       </View> 
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
 screen:{
     flex:1,
     padding:10,
     alignItems:'center'
 },
 title:{
fontSize:30,
marginVertical:10,
fontFamily:'open-sans-bold'

 },
 inputContainer:{
width:300,
maxWidth:'80%',
alignItems:'center',

 },
 buttonContainer:{
flexDirection:'row',
width:'100%',
justifyContent:'space-between',
paddingHorizontal:15
 },
 button:{
     width:100
 },
 input:{
     width:50,
     textAlign:'center'
 },
 summaryContainer:{
     marginTop:20,
     alignItems:'center'
 }
});


export default StartGameScreen