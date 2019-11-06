import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Menu from "./Menu";


export default class App  extends React.Component{

  render() {
    return (
        <Menu/>
    );
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
});
