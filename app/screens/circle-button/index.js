import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Image, Easing } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import addWhite from '../../assets/circle-button/add_white.png';
import minusWhite from '../../assets/circle-button/minus_white.png';

import IconButton from './icon-button';

const { height, width } = Dimensions.get('window');
export const SIZE = 80;
const ANIM_TIME = 400;
const NB_BUTTONS = 5;
const increm = 360 / NB_BUTTONS;
const startAngle = 260;
const primaryColor = '#001D4A';

const CircleButton = () => {
  const midPoint = {
    x: width / 2,
    y: height / 2,
  };
  const normalPoint = {
    x: width,
    y: height / 2,
  };
  const origin = {
    x: midPoint.x - SIZE / 2,
    y: midPoint.y - SIZE / 2,
  };
  const [isOpen, setIsOpen] = useState(false);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const deg = useRef(new Animated.Value(0)).current;
  const iconAddScale = useRef(new Animated.Value(1)).current;

  const onPanGestureEvent = ({ nativeEvent }) => {
    const a1 = Math.atan2(normalPoint.y - midPoint.y, normalPoint.x - midPoint.x);
    const a2 = Math.atan2(nativeEvent.absoluteY - midPoint.y, nativeEvent.absoluteX - midPoint.x);

    const theta = (a1 - a2) * 180 / Math.PI;
    deg.setValue(theta);
  };

  const trigger = () => {
    const currentDeg = deg.__getValue();

    Animated.parallel([
      Animated.timing(deg, {
        toValue: !isOpen ? currentDeg + 60 : currentDeg - 60,
        duration: ANIM_TIME,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: !isOpen ? 4 : 1,
        duration: ANIM_TIME,
        useNativeDriver: true,
      }),
      Animated.timing(iconAddScale, {
        toValue: !isOpen ? 0 : 1,
        duration: ANIM_TIME,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOpen(!isOpen);
    });
  };

  const cRotation = deg.interpolate({
    inputRange: [-180, 0, 180],
    outputRange: ['180deg', '0deg', '-180deg'],
  });

  const imagesRotation = deg.interpolate({
    inputRange: [-180, 0, 180],
    outputRange: ['-180deg', '0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}>
        <Animated.View
          style={{
            position: 'absolute',
            top: origin.y,
            left: origin.x,
            backgroundColor: primaryColor,
            height: SIZE,
            width: SIZE,
            borderRadius: SIZE / 2,
            transform: [
              { rotate: cRotation },
              { scaleX: buttonScale },
              { scaleY: buttonScale },
            ]
          }}
        >
          {Array.from(Array(NB_BUTTONS).keys()).map((_, index) => {
            const angle = startAngle + increm * index;
            const rad = angle * Math.PI / 180;

            return (
              <IconButton
                key={index}
                index={index}
                rotation={imagesRotation}
                rad={rad} />
            )
          })}
        </Animated.View>
      </PanGestureHandler>

      <TouchableOpacity
        onPress={trigger}
        activeOpacity={1}
        style={{
          position: 'absolute',
          top: origin.y,
          left: origin.x,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: primaryColor,
            height: SIZE,
            width: SIZE,
            borderRadius: SIZE / 2,
          }}
        >
          <Animated.Image
            source={addWhite}
            style={{
              width: SIZE / 2,
              height: SIZE / 2,
              transform: [
                { scale: iconAddScale },
              ],
            }} />
            <Animated.Image
              source={minusWhite}
              style={{
                position: 'absolute',
                width: SIZE / 2,
                height: SIZE / 2,
              }} />
        </View>
      </TouchableOpacity>
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
});

export default CircleButton;
