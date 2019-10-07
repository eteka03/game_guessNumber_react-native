import React from 'react';

import {StyleSheet,View,Text,Button,Image} from 'react-native';
import BodyText from '../components/BodyText'
import Colors  from '../constants/color';
import MainButton from '../components/MainButton'

const GameOverScreen = props =>{

    return(
        <View style={styles.screen}>
            <BodyText>
                The Game is over!!
            </BodyText>
            <View style={styles.imageContainer}>
            <Image style={styles.image} resizeMode="cover" source={{uri:'https://www.canalvie.com/polopoly_fs/1.9529622.1564082230!/image/plages-pres-quebec.jpg_gen/derivatives/cvlandscape_670_377/plages-pres-quebec.jpg'}} />
            </View>
            <BodyText style={styles.resultContainer}>
                Your phone needed <Text style={styles.highlight}> {props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
            </BodyText>
           

            
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({

    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    imageContainer:{
        width:300,
        height:300,
        borderRadius:200,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden'
    },
    image:{
        width:'100%',
        height:'100%'
    },
    highlight:{
        color:Colors.primary,
        fontFamily:'open-sans-bold'
    },
    resultContainer:{
        marginHorizontal:20,
        marginVertical:20
    }

})


export default GameOverScreen