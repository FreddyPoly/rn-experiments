import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import MaskedView from '@react-native-community/masked-view';

import Dot3 from './dot-3';

const INDICATOR_SIZE = 32;

const Pagination3 = ({ activePage, pages }) => {
  const leftOffset = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    animateIndicator();
  }, [containerWidth, activePage]);

  const animateIndicator = () => {
    Animated.timing(leftOffset, {
      toValue: getOffset(),
      duration: 250,
      Easing: Easing.bezier(.32,-0.16,.41,.17),
      useNativeDriver: true,
    }).start();
  }

  const getOffset = () => {
    return ((activePage * 2 + 1) * (containerWidth / 2)) - (INDICATOR_SIZE / 2);
  }

  return (
    <View
      style={styles.container}
      onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width / pages.length)}>
      <MaskedView
        style={styles.maskedView}
        maskElement={
          <View style={styles.maskedContainer}>
            {pages.map((_, index) => (
              <Dot3 key={index} />
            ))}
          </View>
        }
      >
        <Animated.View style={[styles.indicator, { transform: [{ translateX: leftOffset }] }]} />
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  indicator: {
    position: 'absolute',
    height: INDICATOR_SIZE,
    width: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE / 2,
    backgroundColor: '#de7200',
  },
  maskedView: {
    width: '100%',
    height: INDICATOR_SIZE,
    backgroundColor: '#bfbfbf',
  },
  maskedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default Pagination3;
