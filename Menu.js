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

export default class Menu extends React.Component
{
    state = {
        deckNameEdit:false,
        onGame:false,
        changeMode:false,
        cards:[],
        MenuElements:[],
        MenuChangeElements:[],
        MyDecks:null,
        newDeckName:"",
        renameIndex:-1
    }

    createNewMenuElementsFromMyDecks=()=>
    {
        this.state.MenuElements = this.state.MyDecks.map(
            (x,index)=>{
                return(
                    <View key={index}>
                        <MenuElement index  = {index}
                                     name = {x.name}
                                     changeMode={false}
                                     selectElement = {this.selectDeck}
                        />
                    </View>)
            }
        )
    }


    createNewMenuChangeElementsFromMyDecks=()=>
    {
        this.state.MenuChangeElements = this.state.MyDecks.map(
            (x,index)=>{
                return(
                    <View key={index}>
                        <MenuElement index  = {index}
                                     deleteMode={true}
                                     name = {x.name}
                                     removeElement = {this.removeElement}
                                     renameElement = {this.renameElement}
                        />
                    </View>)
            }
        )
    }

    constructor(props) {
        super(props);
        this.state.MyDecks = CardManager().createMyDecks()
        this.uploadInfo()
    }

    uploadInfo=()=>
    {
        this.createNewMenuElementsFromMyDecks()
        this.createNewMenuChangeElementsFromMyDecks()
    }

    renameElement=(index)=>
    {
        this.state.renameIndex = index
        this.setState(prev => ({deckNameEdit: !prev.deckNameEdit}))
    }

    selectDeck=(deckNumber)=>
    {
        this.state.cards = this.state.MyDecks[deckNumber].cards
        this.setState(prev => ({onGame: !prev.onGame}))
    }

    removeElement = (index)=>
    {
        this.state.MyDecks.splice(index, 1)
        this.uploadInfo()
        this.setState(prev => ({changeMode: true}))
    }

    createOrChangeDeckName=()=>
    {
        if(!this.state.changeMode) {
            this.state.MyDecks.push(CardManager().createNewDeck(this.state.newDeckName))
        }
        else
        {
            this.state.MyDecks[this.state.renameIndex].name = this.state.newDeckName
            this.state.renameIndex = -1
        }
        this.uploadInfo()
        this.state.newDeckName = ""
        this.setState(prev => ({deckNameEdit: !prev.deckNameEdit}))
    }

    changeNewDeckName = (newDeckName) => {
        this.setState({newDeckName: newDeckName})
    }

    showMenu = ()=>
    {
        return(
            this.state.changeMode ?
                <View style={styles.container}>
                    <ScrollView>
                        {this.state.MenuChangeElements}
                        <View style={styles.emptyContainer}/>
                        <Button title="Done"
                                onPress={() => this.setState(prev => ({changeMode: !prev.changeMode}))}
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
                                onPress={() => this.setState(prev => ({deckNameEdit: !prev.deckNameEdit}))}
                                color = {'green'}
                        />
                        <View style={styles.smallestContainer}/>
                        <Button title="Change Old"
                                onPress={() => this.setState(prev => ({changeMode: true}))}
                                color = {'red'}
                        />
                    </View>
                    <View style={styles.emptyContainer}/>
                </ScrollView>
            </View>
        )
    }

    CreateOrChangeDeck= ()=>
    {
        return (
            <View style={styles.container}>
                <View style={styles.emptyContainer}/>
                <Text style = {styles.text}>
                    Enter new deck name
                </Text>
                <TextInput
                    style={styles.input}
                    value={this.state.newDeckName}
                    onChangeText={this.changeNewDeckName}
                    multiline={true}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Add" color = {'green'} onPress= {() => this.createOrChangeDeckName()} />
                    <View style={styles.smallestContainer}/>
                    <Button title="Back" color = {'gray'} onPress= {() => this.setState(prev => ({deckNameEdit: !prev.deckNameEdit}))} />
                    </View>
            </View>
        )
    }

    render() {
        return (
            this.state.deckNameEdit ? <this.CreateOrChangeDeck/>:
            this.state.onGame ? <Card onClose ={() => this.setState(prev => ({onGame: !prev.onGame}))}
                                      cards = {this.state.cards}  />
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
