import React from 'react';
import { Text, View } from 'react-native';
import * as renderer from 'react-test-renderer';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  withReanimatedTimer,
  advanceAnimationByTime,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from 'react-native-reanimated/lib/reanimated2/jestUtils';

import { FabTabBar } from '../components/bottom.tab';

const tabBarIcon = (props: any) => <View {...props} />;
const Tab = createBottomTabNavigator();

describe('FabTabBar', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  it('Should render', () => {
    withReanimatedTimer(() => {
      const tree = renderer.create(
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: 'purple',
              tabBarInactiveTintColor: 'white',
            }}
            tabBar={(props) => <FabTabBar mode="default" {...props} />}
          >
            <Tab.Screen
              options={{ tabBarIcon, tabBarLabel: 'Home' }}
              name="Home"
              component={() => (
                <View>
                  <Text>Home</Text>
                </View>
              )}
            />
            <Tab.Screen
              options={{ tabBarIcon, tabBarLabel: 'Settings' }}
              name="Home"
              component={() => (
                <View>
                  <Text>Settings</Text>
                </View>
              )}
            />
          </Tab.Navigator>
        </NavigationContainer>
      );
      advanceAnimationByTime(500);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
  it('Should render', () => {
    withReanimatedTimer(() => {
      const tree = renderer.create(
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: 'purple',
              tabBarInactiveTintColor: 'white',
            }}
            tabBar={(props) => <FabTabBar mode="square" {...props} />}
          >
            <Tab.Screen
              options={{ tabBarIcon, tabBarLabel: 'Home' }}
              name="Home"
              component={() => (
                <View>
                  <Text>Home</Text>
                </View>
              )}
            />
            <Tab.Screen
              options={{ tabBarIcon, tabBarLabel: 'Settings' }}
              name="Home"
              component={() => (
                <View>
                  <Text>Settings</Text>
                </View>
              )}
            />
          </Tab.Navigator>
        </NavigationContainer>
      );
      advanceAnimationByTime(500);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
