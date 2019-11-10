import React from 'react';
import { StyleSheet, Text, View, ImageBackground,ScrollView, Button, TextInput } from 'react-native';
import CardManager from "./CardManager";

const defaultCard = CardManager().createNewCard("Empty deck","Empty deck",0)
const print = (p)=> console.log(p)
const printCard = (card)=> console.log(card.front + "  "+card.back + "  "+card.time)

export default class Card extends React.Component {
    state = {
        side: true,
        addNew: false,
        newFrontSide:"",
        newBackSide:"",
        cardInfo:{frontSide:"", backSide:""},
        cards:[],
        currentIndex: 0,

        startTime:0,
        endTime:0,

        correctCards:[],
        incorrectCards:[],
    }

    constructor(props) {
        super(props);
        this.state.cards = props.cards
        this.state.startTime = this.getTime()
    }

    getTime = () => {
        return new Date().getTime();
    }

    flipButtonAction = () => {
        //end time
        this.state.endTime = this.getTime()
        this.getThisCard().setTime(this.state.endTime-this.state.startTime)
        this.setState(prev => ({side: !prev.side}))
    }

    addNewButtonAction = () => {
        this.state.cards.push(CardManager().createNewCard(this.state.newFrontSide, this.state.newBackSide, 0))
        this.state.newFrontSide = ""
        this.state.newBackSide = ""
        this.setState(prev => ({addNew: !prev.addNew}))
    }

    changeFrontSide = (newFrontSide) => {
        this.setState({newFrontSide: newFrontSide})
    }

    changeBackSide = (newBackSide) => {
        this.setState({newBackSide: newBackSide})
    }

    removeThisCard = () => {
        this.state.cards.splice(this.state.currentIndex, 1)
    }

    getThisCard = () => {

        if(!(this.state.currentIndex<=this.state.cards.length-1))
        {
            if(this.state.correctCards.length!==0 || this.state.incorrectCards.length!==0)
            {
                print("not empty")
                this.createNewCardOrder()
                return this.state.cards[this.state.currentIndex]
            }
            else
            {
                print("empty")
                return defaultCard
            }
        }
        return this.state.cards[this.state.currentIndex]
    }

    createNewCardOrder = () => {

        if(this.state.cards.length!==0)
        {
            this.state.cards.forEach((x)=>{this.state.incorrectCards.push(x)})
        }

        this.state.cards.forEach((x)=>{this.state.cards.pop()})

        this.state.incorrectCards.sort(function(a, b){return b.time - a.time})
        this.state.incorrectCards.forEach((x)=>{this.state.cards.push(x)})
        this.state.correctCards.sort(function(a, b){return b.time - a.time})
        this.state.correctCards.forEach((x)=>{this.state.cards.push(x)})

        print("new length "+this.state.cards.length)
        this.state.cards.forEach((x)=>{printCard(x)})

        this.state.incorrectCards = []
        this.state.correctCards = []
    }

    prepareNextCard = () =>
    {
        this.state.startTime = this.getTime()
        this.removeThisCard()
        this.setState(prev => ({side: !prev.side}))
    }

    rightButtonAction = () => {
        if(this.getThisCard()!==defaultCard)
        {
            this.state.correctCards.push(this.getThisCard())
            this.prepareNextCard()
        }
        else this.setState(prev => ({side: !prev.side}))
    }

    wrongButtonAction = () => {
        if(this.getThisCard()!==defaultCard)
        {
            this.state.incorrectCards.push(this.getThisCard())
            this.prepareNextCard()
        }
        else this.setState(prev => ({side: !prev.side}))
    }
    removeButtonAction = () => {
        this.removeThisCard()
        this.setState(prev => ({side: !prev.side}))
    }

    closeButtonAction = () => {
        this.createNewCardOrder()
        this.props.onClose()
    }

    CloseButton = () =>
    {
        return(
            <View style={styles.closeButtonContainer}>
                <Button title="X" color = {'gray'}
                        onPress={() => this.closeButtonAction()}
                />
            </View>
        )
    }

    FrontSide = ()=>
    {
        return(
            <View style={styles.container}>
                <ImageBackground source={require('./card.png')} style={styles.container}>
                    <this.CloseButton/>
                    <View style={styles.smallContainer}>
                        <ScrollView>
                            <Text style = {styles.text}>{this.getThisCard().front}</Text>
                        </ScrollView>
                    </View>
                    <View style={styles.smallestContainer}/>
                    <View style={styles.buttonContainer}>
                        <Button title="Flip"
                                  color = {'blue'}
                                  onPress={() => this.flipButtonAction()}
                        />
                        <View style={styles.smallestContainer}/>
                        <Button title="Add"
                                onPress={() => {this.setState(prev => ({addNew: !prev.addNew}))}}
                                color = {'green'}
                        />
                    </View>
                </ImageBackground>
            </View>
        )
    }

    BackSide = ()=>
    {
        return(
            <View style={styles.container}>
                <ImageBackground source={require('./card2.png')} style={styles.container}>
                    <View style={styles.smallContainer}>
                        <ScrollView>
                            <Text style = {styles.text}>{this.getThisCard().back}</Text>
                        </ScrollView>
                    </View>
                    <View style={styles.smallestContainer}/>
                    <View style={styles.buttonContainer}>
                        <Button title="Right" color = {'green'} onPress= {() => this.rightButtonAction()} />
                        <View style={styles.smallestContainer}/>
                        <Button title="Wrong" color = {'red'} onPress= {() => this.wrongButtonAction()}/>
                        <View style={styles.smallestContainer}/>
                        <Button title="Remove" color = {'purple'} onPress= {() => this.removeButtonAction()}/>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    CreateNewCard = ()=> {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./card.png')} style={styles.container}>
                    <View  style={styles.inputField}>
                        <Text style = {styles.text}>
                            New Front Side
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.newFrontSide}
                            onChangeText={this.changeFrontSide}
                            multiline={true}
                        />
                        <Text style = {styles.text}>
                            New Back Side
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.newBackSide}
                            onChangeText={this.changeBackSide}
                            multiline={true}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Add" color = {'green'} onPress= {() => this.addNewButtonAction()} />
                            <View style={styles.smallestContainer}/>
                            <Button title="Back" color = {'gray'} onPress= {() =>{this.setState(prev => ({addNew: !prev.addNew}))}} />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }


    render() {
        return(
            this.state.addNew ?
                <this.CreateNewCard />:
                this.state.side ? <this.FrontSide />:<this.BackSide/>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    smallContainer: {
        width: 300,
        height: 350
    },
    buttonContainer: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallestContainer: {
        width: 30,
        height: 20
    },
    text: {
        fontSize : 30
    },
    closeButtonContainer: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        bottom:30
    },
    inputField: {
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        bottom:30
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        margin: 20,
        width:200
    }
});
