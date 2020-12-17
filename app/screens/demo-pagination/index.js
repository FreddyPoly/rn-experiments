import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Pagination1 from './components/pagination-1';

const DemoPagination = () => {
  const [activePage, setActivePage] = useState(2);
  const pages = Array.from(Array(5).keys());

  const nextPage = () => {
    if (activePage >= pages.length - 1) return;

    setActivePage((previous) => previous + 1);
  }

  const previousPage = () => {
    if (activePage <= 0) return;

    setActivePage((previous) => previous - 1);
  }

  return (
    <View style={styles.container}>
      <Text>Page {activePage + 1}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, activePage <= 0 && styles.disabledButton]}
          onPress={previousPage}
          disabled={activePage <= 0}>
          <Text style={styles.buttonLabel}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activePage >= pages.length - 1 && styles.disabledButton]}
          onPress={nextPage}
          disabled={activePage >= pages.length - 1}>
          <Text style={styles.buttonLabel}>Next</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.paginationsContainer}>
        <Pagination1 activePage={activePage} pages={pages} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#de7200',
  },
  disabledButton: {
    backgroundColor: '#bfbfbf',
  },
  buttonLabel: {
    color: 'white',
  },
  paginationsContainer: {
    paddingTop: '10%',
  },
});

export default DemoPagination;
