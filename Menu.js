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
import MenuElement from "./MenuElement";


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
        onGame:false,
        deleteMode:false,

        cards:[],
        currentIndex:0,
        currentCard:null,
        MenuElements:[],
        MyDecks:null,
        newDeckName:"",
        MenuDeleteElements:[],
        elementID:-1
    }


    constructor(props) {
        super(props);
        this.state.MyDecks = CardManager().createMyDecks()
        this.state.MenuElements = this.state.MyDecks.map(
            (x,index)=>{
                this.state.elementID++
                return(
                <View key={this.state.elementID}>
                    <MenuElement index  = {this.state.elementID}
                                 name = {x.name}
                                 deleteMode={false}
                                 function = {this.selectDeck}
                    />
                </View>)
            }
        )
    }

    createAndAddNewDeck=()=>
    {
        this.state.elementID++
        this.state.MyDecks.push(CardManager().createNewDeck(this.state.newDeckName))
        this.state.MenuElements.push(
        <View key={this.state.elementID}>
            <MenuElement index  = {this.state.elementID}
                         name = {this.state.newDeckName}
                         deleteMode={false}
                         function = {this.selectDeck}
            />
        </View>
        )
        this.goBackToMenuFromNewDeck()
    }

    goBackToMenuFromNewDeck=()=>
    {
        this.state.newDeckName = ""
        this.setState(prev => ({addNew: !prev.addNew}))
    }

    selectDeck=(deckNumber)=>
    {
        console.log(deckNumber)
        this.state.currentIndex = 0
        this.setState(prev => ({onGame: !prev.onGame}))
        this.state.cards = this.state.MyDecks[deckNumber].cards
        this.getCard()
    }

    removeOldElement = (index)=>
    {
        this.state.MenuElements.splice(index, 1)
        this.pressRemoveOld()
    }

    pressRemoveOld = ()=>
    {
        this.state.MenuDeleteElements = this.state.MenuElements.map(
            (x,index)=>{
                return(
                    <View key={x.key}>
                        <MenuElement index  = {x.key}
                                     deleteMode={true}
                                     name = {this.state.MyDecks[x.key].name}
                                     function = {this.removeOldElement}
                        />
                    </View>)
            }
        )
        this.setState(prev => ({deleteMode: true}))
    }

    goBackToMenu=()=>
    {
        this.setState(prev => ({onGame: !prev.onGame}))
    }

    pressAddNew = ()=>
    {
        this.setState(prev => ({addNew: !prev.addNew}))
    }


    getCard= ()=>
    {
        if(this.state.cards.length === 0)
        {
            this.state.currentCard = CardManager().createNewCard("Empty deck","Empty deck",0)
        }
        else if(this.state.currentIndex<this.state.cards.length)
        {
            this.state.currentCard = this.state.cards[this.state.currentIndex]
            this.setState(prev => ({currentIndex: prev.currentIndex+1}))
        }
        else
        {
            //restart
        }
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
