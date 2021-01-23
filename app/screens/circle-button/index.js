import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
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
const secondaryColor = 'white';

const CircleButton = () => {
  const midPoint = {
    x: width / 2,
    y: height / 2,
  };
  const origin = {
    x: midPoint.x - SIZE / 2,
    y: midPoint.y - SIZE / 2,
  };
  const startGesturePoint = {
    x: width,
    y: height / 2,
  };
  let initAngle = null;
  const [isOpen, setIsOpen] = useState(false);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const deg = useRef(new Animated.Value(0)).current;
  const iconAddScale = useRef(new Animated.Value(1)).current;

  const onPanGestureEvent = ({ nativeEvent }) => {
    const a1 = Math.atan2(startGesturePoint.y - midPoint.y, startGesturePoint.x - midPoint.x);
    const a2 = Math.atan2(nativeEvent.absoluteY - midPoint.y, nativeEvent.absoluteX - midPoint.x);

    const theta = (a1 - a2) * 180 / Math.PI;

    deg.setValue(theta + initAngle);
  };

  const onHandlerStateChange = (state) => {
    if (state.nativeEvent.oldState === 0 || state.nativeEvent.oldState === 2) {
      startGesturePoint.x = state.nativeEvent.absoluteX;
      startGesturePoint.y = state.nativeEvent.absoluteY;

      initAngle = deg.__getValue();
    } else if (state.nativeEvent.state === 5) {
      startGesturePoint.x = width;
      startGesturePoint.y = height / 2;
    }
  };

  const trigger = () => {
    const currentDeg = deg.__getValue();

    Animated.parallel([
      Animated.timing(deg, {
        toValue: !isOpen ? currentDeg + 60 : currentDeg - 60,
        duration: ANIM_TIME,
        useNativeDriver: false,
      }),
      Animated.timing(buttonScale, {
        toValue: !isOpen ? 4 : 1,
        duration: ANIM_TIME,
        useNativeDriver: false,
      }),
      Animated.timing(iconAddScale, {
        toValue: !isOpen ? 0 : 1,
        duration: ANIM_TIME,
        useNativeDriver: false,
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
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={{
            position: 'absolute',
            top: origin.y,
            left: origin.x,
            backgroundColor: 'rgba(0, 29, 74, .85)',
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

      <Animated.View
          style={{
            position: 'absolute',
            top: height / 2 - (SIZE / 4),
            left: width / 2 - (SIZE / 4),
            backgroundColor: secondaryColor,
            height: SIZE / 2,
            width: SIZE / 2,
            borderRadius: SIZE / 4,
            transform: [
              { rotate: cRotation },
              { scaleX: buttonScale },
              { scaleY: buttonScale },
            ]
          }} />

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
    backgroundColor: secondaryColor,
  },
  circle: {
    backgroundColor: 'red',
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
  },
});

export default CircleButton;
