import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Easing } from 'react-native';

const Dot2 = ({ active }) => {
  const dotSize = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.timing(dotSize, {
      toValue: active ? 0 : 1,
      duration: 250,
      Easing: Easing.bezier(.32,-0.16,.41,.17),
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Animated.View style={[styles.dot, { transform: [{ scaleX: dotSize }, { scaleY: dotSize }] }]} />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 16,
    width: 16,
    borderRadius: 13,
    backgroundColor: '#bfbfbf',
  },
});

export default Dot2;
