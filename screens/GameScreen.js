import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

const generateRandomNumberBetween = (min,max,exclude) => {
    const randNum = Math.floor(Math.random() * (max-min)) + min;
    if(randNum === exclude){
        return generateRandomNumberBetween(min, max, exclude);
    }else{
        return randNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({userNumber, onGameOver}) => {
    const initialGuess = generateRandomNumberBetween(1,100,userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    useEffect(() => {
        if(currentGuess === userNumber){
            onGameOver(guessRounds.length);
        }
    },[currentGuess, userNumber, onGameOver]);

    useEffect(()=>{
        minBoundary = 1;
        maxBoundary = 100;
    },[]);

    const nextGuessHandler = (direction) => {
        if((direction === 'lower' && currentGuess < userNumber) ||
             (direction === 'greater' && currentGuess > userNumber)){
                Alert.alert("Don't Lie","That's the wrong command",
                [{text: 'Sorry!', style: 'cancel'}])
                return;
             }
        if(direction === 'lower'){
            maxBoundary = currentGuess;
        }
        else{
            minBoundary = currentGuess+1;
        }
        const newRandNumber = generateRandomNumberBetween(minBoundary,maxBoundary,currentGuess);
        setCurrentGuess(newRandNumber);
        setGuessRounds((prevGuessRounds)=> [newRandNumber, ...prevGuessRounds])
    }

    const guessRoundsListLength = guessRounds.length;

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>
                    Higher or Lower?
                </InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton 
                            onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton 
                            onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                {/* {guessRounds.map(guessRound =>  */}
                        {/* <Text key={guessRound}>Computer guessed {guessRound}</Text>)} */}
                <FlatList 
                    data={guessRounds}
                    renderItem={(itemData) => 
                        <GuessLogItem 
                            roundNumber={guessRoundsListLength - itemData.index} 
                            guess={itemData.item}/>}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    instructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})

export default GameScreen;