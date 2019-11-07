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

const defaultPictureIndex = 3

/*
    props:
    selectDeck
    index
    name
    removeOldElement
 */

export default class MenuElement extends React.Component
{
    state = {
        index:0
    }

    constructor(props)
    {
        super(props)
        this.state.index = props.index
    }

    choosePicture = ()=>
    {
        if(this.state.index<3)
        {
            return images()[this.state.index]
        }
        else return images()[defaultPictureIndex]
    }

    NormalMode= ()=>
    {
        return (
            <View key={this.state.index}>
                <TouchableHighlight onPress={() => this.props.function(this.state.index)} style={styles.touchable}>
                    <Image source={this.choosePicture(this.state.index)} style={styles.picture}/>
                </TouchableHighlight>
                <Text style = {styles.text}>{this.props.name}</Text>
            </View>
        )
    }

    DeleteMode= ()=>
    {
        return (
            <View key={this.state.index}>
                <TouchableHighlight onPress={() => this.props.function(this.state.index)} style={styles.touchable}>
                    <Image source={this.choosePicture(this.state.index)} style={styles.picture}/>
                </TouchableHighlight>
                <Text style = {styles.text}>{this.props.name}</Text>
                <Button title="Remove"
                        onPress={() => this.props.function(this.state.index)}
                        color = {'red'}
                />
            </View>
        )
    }

    render() {
        return (this.props.deleteMode ? <this.DeleteMode/> : <this.NormalMode/>)
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
