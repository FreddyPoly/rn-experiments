import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Image, PanResponder } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');
const SIZE = 200;

const CircleButton = () => {
  const midPoint = {
    x: width / 2,
    y: height / 2,
  };
  const normalPoint = {
    x: width,
    y: height / 2,
  };

  const deg = useRef(new Animated.Value(0)).current;

  const onPanGestureEvent = ({ nativeEvent }) => {
    const a1 = Math.atan2(normalPoint.y - midPoint.y, normalPoint.x - midPoint.x);
    const a2 = Math.atan2(nativeEvent.absoluteY - midPoint.y, nativeEvent.absoluteX - midPoint.x);

    const theta = (a1 - a2) * 180 / Math.PI;
    deg.setValue(theta);
    console.log(`theta : ${theta}`);
  };

  const cRotation = deg.interpolate({
    inputRange: [-180, 0, 180],
    outputRange: ['180deg', '0deg', '-180deg'],
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}>
        <Animated.View
          style={{
            position: 'absolute',
            top: midPoint.y - SIZE / 2,
            left: midPoint.x - SIZE / 2,
            transform: [
              { rotate: cRotation },
            ]
          }}>
          <View style={styles.square} />
        </Animated.View>
      </PanGestureHandler>
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
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  square: {
    backgroundColor: 'blue',
    height: SIZE,
    width: SIZE,
    borderRadius: 28,
  },
});

export default CircleButton;
