import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack from './home-stack';

const Drawer = createDrawerNavigator();

function RootNavigator() {
  return (
    <Drawer.Navigator initialRouteName="HomeStack">
      <Drawer.Screen name="HomeStack" component={HomeStack} />
    </Drawer.Navigator>
  );
}

export default RootNavigator;
