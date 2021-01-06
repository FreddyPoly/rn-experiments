import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Image } from 'react-native';

const { height, width } = Dimensions.get('window');

const CircleButton = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, { transform: [{ rotate: "45deg" }] }]}>
        <View style={{ backgroundColor: 'yellow', width: 20, height: 20, borderRadius: 10, top: 35, left: 35 }} />
      </View>
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
