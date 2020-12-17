import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack from './home-stack';
import DemoPaginationNavigator from '../screens/demo-pagination/demo-pagination.navigator';

const Drawer = createDrawerNavigator();

function RootNavigator() {
  return (
    <Drawer.Navigator initialRouteName="DemoPaginationNavigator">
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="DemoPaginationNavigator" component={DemoPaginationNavigator} />
    </Drawer.Navigator>
  );
}

export default RootNavigator;
