import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Image,
    TouchableHighlight,
    TextInput,
    CheckBox
} from 'react-native';
import Card from "./Card";
import CardManager from "./CardManager";


const images = ()=> [
    require('./jscript.png'),
    require('./jscript2.png'),
    require('./jscript3.png'),
    require('./qust.png')
]


export default class Menu extends React.Component
{
    state = {
        addNew:false,
        cards:[],
        currentIndex:0,
        currentCard:null,
        onGame:false,
        MenuElements:[],
        MyDecks:null,
        newDeckName:"",
        MenuDeleteElements:[],
        deleteMode:false,
        elementID:0
    }


    constructor(props) {
        super(props);
        this.state.MyDecks = CardManager().createMyDecks()
        let i = -1
        let image = null
        this.state.MenuElements = this.state.MyDecks.map(
            (x,index)=>{
            i++
            if(i<3)image = images()[i]
            else image = images()[3]//default

            this.state.elementID = this.state.elementID+1
            return(
                <View key={this.state.elementID}>
                    <TouchableHighlight onPress={() =>
                    {
                        if(!this.state.deleteMode) this.selectDeck(this.state.elementID-1)
                    }
                    } style={styles.touchable}>
                        <Image source={image} style={styles.picture}/>
                    </TouchableHighlight>
                    <Text style = {styles.text}>{x.name}</Text>
                </View>
            );
        });

    }

    selectDeck=(deckNumber)=>
    {
        console.log(deckNumber)
        this.setState(prev => ({onGame: !prev.onGame}))
        this.state.cards = this.state.MyDecks[deckNumber].cards
        this.getCard()
    }

    createDeck=(deckNumber)=>
    {
        console.log("create deck :" + deckNumber)
        this.state.MyDecks.push(CardManager().createNewDeck(this.state.newDeckName))
    }

    goBackToMenu=()=>
    {
        this.setState(prev => ({onGame: !prev.onGame}))
    }

    goBackToMenuFromNewDeck=()=>
    {
        this.state.newDeckName = ""
        this.setState(prev => ({addNew: !prev.addNew}))
    }


    createAndAddNewDeck=()=>
    {
        this.createDeck(this.state.MenuElements.length)
        this.state.elementID = this.state.elementID+1
        this.state.MenuElements.push(
            <View key={this.state.elementID}>
                <TouchableHighlight onPress={() => this.selectDeck(this.state.elementID-1)} style={styles.touchable}>
                    <Image source={images()[3]} style={styles.picture}/>
                </TouchableHighlight>
                <Text style = {styles.text}>{this.state.newDeckName}</Text>
            </View>
        )

        this.goBackToMenuFromNewDeck()
    }

    pressAddNew = ()=>
    {
        this.setState(prev => ({addNew: !prev.addNew}))
    }

    onDeleteExactElement =() =>
    {
        console.log("darosi")
        this.setState({checked: !this.state.checked})
    }

    getCard= ()=>
    {
        if(this.state.currentIndex<this.state.cards.length)
        {
            this.state.currentCard = this.state.cards[this.state.currentIndex]
            this.setState(prev => ({currentIndex: prev.currentIndex+1}))
        }
        else
        {
            //restart
        }

    }

    removeOldElement = (index)=>
    {
        this.state.MenuElements.splice(index, 1)
        this.pressRemoveOld()
    }

    pressRemoveOld = ()=>
    {
        this.state.MenuDeleteElements = this.state.MenuElements.map(
            (x,index)=>
            {
                return(
                    <View key={index}>
                        {x}
                        <Button title="Remove"
                                onPress={() => this.removeOldElement(index)}
                                color = {'red'}
                        />
                    </View>
                )
            }
        )
        this.setState(prev => ({deleteMode: true}))
    }

    doneRemoving = ()=>
    {
        this.setState(prev => ({deleteMode: !prev.deleteMode}))
    }


    addNewCard= (front,back)=>{
        this.state.cards.push(CardManager().createNewCard(front,back, 0))
    }


    changeToWrong = ()=>
    {
        console.log("wrong")
        this.getCard()
    }

    changeToRight= ()=>
    {
        this.getCard()
    }

    changeNewDeckName = (newDeckName) => {
        this.setState({newDeckName: newDeckName})
    }

    showMenu = ()=>
    {

        return(
            this.state.deleteMode ?
                <View style={styles.container}>
                    <ScrollView>
                        {this.state.MenuDeleteElements}
                        <View style={styles.emptyContainer}/>
                        <Button title="Done"
                                onPress={() => this.doneRemoving()}
                                color = {'green'}
                        />
                    </ScrollView>
                </View>
                    :
            <View style={styles.container}>
                <ScrollView>
                    {this.state.MenuElements}
                    <View style={styles.emptyContainer}/>
                    <View style={styles.buttonContainer}>
                        <Button title="Add New"
                                onPress={() => this.pressAddNew()}
                                color = {'green'}
                        />
                        <View style={styles.smallestContainer}/>
                        <Button title="Remove Old"
                                onPress={() => this.pressRemoveOld()}
                                color = {'red'}
                        />
                    </View>
                    <View style={styles.emptyContainer}/>

                </ScrollView>
            </View>
        )
    }

    CreateNewDeck= ()=>
    {
        return (
            <View style={styles.container}>
                <Text style = {styles.text}>
                    New Card Deck
                </Text>
                <TextInput
                    style={styles.input}
                    value={this.state.newDeckName}
                    onChangeText={this.changeNewDeckName}
                    multiline={true}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Add" color = {'green'} onPress= {() => this.createAndAddNewDeck()} />
                    <View style={styles.smallestContainer}/>
                    <Button title="Back" color = {'gray'} onPress= {() => this.goBackToMenuFromNewDeck()} />
                    </View>
            </View>
        )
    }


    render() {
        return (
            this.state.addNew ? <this.CreateNewDeck/>:
            this.state.onGame ? <Card onClose ={this.goBackToMenu} value={this.state.currentCard} onWrong ={this.changeToWrong} onRight ={this.changeToRight} addNewCard = {this.addNewCard} />
            : <this.showMenu/>)
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    picture: {
        width: 150,
        height: 150
    },
    touchable:
    {
        top:40,
    },
    text: {
        fontSize : 30
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
    emptyContainer: {
        height: 40
    },


    inputField: {
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        margin: 20,
        width:200
    }

});
