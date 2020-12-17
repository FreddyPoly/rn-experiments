import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

const Dot1 = ({ active }) => {
  const dotSize = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.timing(dotSize, {
      toValue: active ? 2 : 1,
      duration: 150,
      Easing: Easing.in,
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Animated.View style={[styles.dot, active && styles.activeDot, { transform: [{ scaleX: dotSize }, { scaleY: dotSize }] }]} />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 16,
    width: 16,
    borderRadius: 13,
    backgroundColor: '#bfbfbf',
  },
  activeDot: {
    backgroundColor: '#de7200',
  },
});

export default Dot1;
