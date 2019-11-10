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
        MenuDeleteElements:[],
        MyDecks:null,
        newDeckName:"",
        elementID:-1,
        renamedKey:-1
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
                                 changeMode={false}
                                 function = {this.selectDeck}
                    />
                </View>)
            }
        )
    }

    renameExistingOne=(key)=>
    {
        this.state.renamedKey = key
        this.setState(prev => ({deckNameEdit: !prev.deckNameEdit}))
    }

    createNewDeck=()=>
    {
        this.state.elementID++
        this.state.MyDecks.push(CardManager().createNewDeck(this.state.newDeckName))
        this.state.MenuElements.push(
            <View key={this.state.elementID}>
                <MenuElement index={this.state.elementID}
                             name={this.state.newDeckName}
                             deleteMode={false}
                             function={this.selectDeck}
                />
            </View>
        )
    }

    renameDeck=()=>
    {
        let findIndex = -1
        this.state.MenuElements.forEach(
            (x,index)=>
            {
                if(x.key==this.state.renamedKey)
                {
                    findIndex = index
                }})

        this.state.MyDecks[this.state.renamedKey].name = this.state.newDeckName
        this.state.MenuElements[findIndex] = (
            <View key={this.state.renamedKey}>
                <MenuElement index  = {this.state.renamedKey}
                             name = {this.state.newDeckName}
                             deleteMode={false}
                             function = {this.selectDeck}
                />
            </View>)
        this.state.renamedKey = -1
        this.pressRemoveOld()
    }

    createOrChangeDeckName=()=>
    {
        if(!this.state.changeMode) {
            this.createNewDeck()
        }
        else
        {
            this.renameDeck()
        }
        this.goBackToMenuFromNewDeck()
    }

    goBackToMenuFromNewDeck=()=>
    {
        this.state.newDeckName = ""
        this.setState(prev => ({deckNameEdit: !prev.deckNameEdit}))
    }

    selectDeck=(deckNumber)=>
    {
        this.setState(prev => ({onGame: !prev.onGame}))
        this.state.cards = this.state.MyDecks[deckNumber].cards
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
                                     functionRename = {this.renameExistingOne}
                        />
                    </View>)
            }
        )
        this.setState(prev => ({changeMode: true}))
    }


    goBackToMenu=()=>
    {
        this.setState(prev => ({onGame: !prev.onGame}))
    }

    pressAddNew = ()=>
    {
        this.setState(prev => ({deckNameEdit: !prev.deckNameEdit}))
    }


    doneRemoving = ()=>
    {
        this.setState(prev => ({changeMode: !prev.changeMode}))
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
                        <Button title="Change Old"
                                onPress={() => this.pressRemoveOld()}
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
                    <Button title="Back" color = {'gray'} onPress= {() => this.goBackToMenuFromNewDeck()} />
                    </View>
            </View>
        )
    }


    render() {
        return (
            this.state.deckNameEdit ? <this.CreateOrChangeDeck/>:
            this.state.onGame ? <Card onClose ={this.goBackToMenu}
                                      cards = {this.state.cards}  />
            : <this.showMenu/>)
        }

}

const getElementIndex =(element)=>{
    if(typeof element.key === "string")
    {
        return Number(element.key)
    }
    else return -1
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
