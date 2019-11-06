import React from 'react';
import { StyleSheet, Text, View, ImageBackground,ScrollView, Button, TextInput } from 'react-native';


export default class Card extends React.Component {
    state = {
        side: true,
        addNew: false,
        newFrontSide:"",
        newBackSide:"",
        cardInfo:{frontSide:"", backSide:""}
    }


    flipButtonAction = () => {
        this.setState(prev => ({side: !prev.side}))
    }
    addButtonAction = () => {
        this.setState(prev => ({addNew: !prev.addNew}))
    }
    addNewButtonAction = () => {
        this.props.addNewCard(this.state.newFrontSide, this.state.newBackSide)
        this.setState(prev => ({addNew: !prev.addNew}))
    }

    changeFrontSide = (newFrontSide) => {
        this.setState({newFrontSide: newFrontSide})
    }

    changeBackSide = (newBackSide) => {
        this.setState({newBackSide: newBackSide})
    }

    rightButtonAction = () => {
        this.props.onRight()
        this.setState(prev => ({side: !prev.side}))
    }
    wrongButtonAction = () => {
        this.props.onWrong()
        this.setState(prev => ({side: !prev.side}))
    }
    removeButtonAction = () => {
        this.setState(prev => ({side: !prev.side}))
    }


    CloseButton = () =>
    {
        return(
            <View style={styles.closeButtonContainer}>
                <Button title="X" color = {'gray'}
                        onPress={() => this.props.onClose()}
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
                            <Text style = {styles.text}>{this.props.value.front}</Text>
                        </ScrollView>
                    </View>
                    <View style={styles.smallestContainer}/>
                    <View style={styles.buttonContainer}>
                        <Button title="Flip"
                                  onPress={() => this.flipButtonAction()}
                        />
                        <View style={styles.smallestContainer}/>
                        <Button title="Add"
                                onPress={() => this.addButtonAction()}
                                color = {'yellow'}
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
                            <Text style = {styles.text}>{this.props.value.back}</Text>
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
                            <Button title="Back" color = {'gray'} onPress= {() => this.addButtonAction()} />
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
