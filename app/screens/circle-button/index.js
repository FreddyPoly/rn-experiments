import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Image } from 'react-native';
import { RotationGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

const CircleButton = () => {
  const circleRotation = useRef(new Animated.Value(0)).current;

  const cRotation = circleRotation.interpolate({
    inputRange: [-100, 100],
    outputRange: ['-100rad', '100rad'],
  });

  const _onRotateHandlerStateChange = (event) => {
    console.log(`event : ${JSON.stringify(Object.keys(event))}`);
    console.log(`event : ${JSON.stringify(event.nativeEvent)}`);
  };

  return (
    <View style={styles.container}>
      <RotationGestureHandler
        onGestureEvent={Animated.event([{ nativeEvent: { rotation: circleRotation } }], { useNativeDriver: true })}
        onHandlerStateChange={_onRotateHandlerStateChange}>
        <Animated.View style={{ backgroundColor: 'green', width: 80, height: 80 }} />
      </RotationGestureHandler>

      <RotationGestureHandler
        onGestureEvent={Animated.event([{ nativeEvent: { x: circleRotation } }], { useNativeDriver: true })}
        onHandlerStateChange={_onRotateHandlerStateChange}>
        <Animated.View style={[styles.circle, { transform: [{ rotate: cRotation }] }]}>
          <View style={{ backgroundColor: 'yellow', width: 20, height: 20, borderRadius: 10, top: 35, left: 35 }} />
        </Animated.View>
      </RotationGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'red',
    height: 150,
    width: 150,
    borderRadius: 75,
  },
});

export default CircleButton;
