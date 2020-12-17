import React from 'react';
import { View, StyleSheet } from 'react-native';

import Dot1 from './dot-1';

const Pagination1 = ({ activePage, pages }) => {
  return (
    <View style={styles.container}>
      {pages.map((_, index) => (
        <Dot1 key={index} active={index === activePage} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: '10%',
  },
});

export default Pagination1;
