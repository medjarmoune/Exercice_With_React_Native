import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
} from "react-native";


export default class Carre extends Component {

  UNSAFE_componentWillMount() {
    
    this.animatedValue = new Animated.ValueXY(0,0)
    this.axes = {x: 0, y: 0}
     
    this.animatedValue.addListener((value) => this.axes = value);
    this.panResponder = PanResponder.create({
      
        onMoveShouldSetPanResponderCapture: () => true, 
        onPanResponderGrant: () => {
          this.animatedValue.setOffset({x: this.axes.x, y: this.axes.y});
        },
        onPanResponderMove: Animated.event([
          null,
           {dx: this.animatedValue.x, dy: this.animatedValue.y}
        ]) 
      });
  }

  render() {

    return (
      <View style={styles.container}>
        <Animated.View 
          style={[
              styles.box, 
              {
                transform: [
                  {translateX: this.animatedValue.x},
                  {translateY: this.animatedValue.y},
                ],
              }
            ]} 
            {...this.panResponder.panHandlers} 
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: '#1c9e7e',
    borderRadius:10
  }
});