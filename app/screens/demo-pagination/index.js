import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';

import Pagination1 from './pagination-1/pagination-1';
import Pagination2 from './pagination-2/pagination-2';
import Pagination3 from './pagination-3/pagination-3';
import Pagination4 from './pagination-4/pagination-4';
import Pagination5 from './pagination-5/pagination-5';

import { variables } from './variables';

const { width, height } = Dimensions.get('window');

const DemoPagination = () => {
  const offset = useRef(new Animated.Value(0)).current;
  const [activePage, setActivePage] = useState(0);
  const pages = Array.from(Array(5).keys());

  const nextPage = () => {
    if (activePage >= pages.length - 1) return;

    Animated.timing(offset, {
      toValue: -(activePage + 1) * width,
      duration: variables.ANIMATION_TIME,
      useNativeDriver: true,
    }).start();

    setActivePage((previous) => previous + 1);
  }

  const previousPage = () => {
    if (activePage <= 0) return;

    Animated.timing(offset, {
      toValue: -(activePage - 1) * width,
      duration: variables.ANIMATION_TIME,
      useNativeDriver: true,
    }).start();

    setActivePage((previous) => previous - 1);
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, { transform: [{ translateX: offset }] }]}>
        <View style={{ width: width, height: height, backgroundColor: '#012638' }} />

        <View style={{ width: width, height: height, backgroundColor: '#012b3f' }} />

        <View style={{ width: width, height: height, backgroundColor: '#023047' }} />

        <View style={{ width: width, height: height, backgroundColor: '#1b4459' }} />

        <View style={{ width: width, height: height, backgroundColor: '#34596b' }} />
      </Animated.View>

      <TouchableOpacity
        style={{ position: 'absolute', top: 5, left: 5 }}
        onPress={previousPage}
        disabled={activePage <= 0}>
        <Text style={styles.buttonLabel}>Previous</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ position: 'absolute', top: 5, right: 5 }}
        onPress={nextPage}
        disabled={activePage >= pages.length - 1}>
        <Text style={styles.buttonLabel}>Next</Text>
      </TouchableOpacity>

      <View style={styles.paginationsContainer}>
        <Pagination1 activePage={activePage} pages={pages} />
      </View>

      <View style={styles.paginationsContainer}>
        <Pagination2 activePage={activePage} pages={pages} />
      </View>

      <View style={styles.paginationsContainer}>
        <Pagination3 activePage={activePage} pages={pages} />
      </View>

      <View style={styles.paginationsContainer}>
        <Pagination4 activePage={activePage} pages={pages} />
      </View>

      <View style={styles.paginationsContainer}>
        <Pagination5 activePage={activePage} pages={pages} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: '5%',
    paddingVertical: '10%',
  },
  button: {
    position: 'absolute',
    paddingHorizontal: 20,
    backgroundColor: '#de7200',
  },
  buttonLabel: {
    color: 'white',
  },
  paginationsContainer: {
    paddingHorizontal: '10%',
  },
  background: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export default DemoPagination;
