import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DemoPagination from './index';

const Stack = createStackNavigator();

export default function DemoPaginationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DemoPagination" component={DemoPagination} />
    </Stack.Navigator>
  );
}
