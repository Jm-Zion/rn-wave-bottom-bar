/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Text, View, Switch } from 'react-native';
import { Provider as PaperProvider, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { BottomFabBar } from '../../src';
import { SettingsScreen } from './ListScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const generateScreen = (screen: string) => () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Text>{screen}!</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const tabBarIcon =
  (name: string) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) =>
    <Icon name={name} size={28} color={focused ? 'white' : 'white'} />;

const App = () => {
  const [showLabel, setShowLabel] = React.useState(false);
  const [enableSquare, setEnableSquare] = React.useState(false);
  const [isRtl, setIsRtl] = React.useState(false);

  const Home = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Enable TabBar labels</Text>
      <Switch
        value={showLabel}
        onValueChange={() => setShowLabel(!showLabel)}
      />
      <Text>Enable TabBar Square</Text>
      <Switch
        value={enableSquare}
        onValueChange={() => setEnableSquare(!enableSquare)}
      />
      <Text>Enable RTL</Text>
      <Switch value={isRtl} onValueChange={() => setIsRtl(!isRtl)} />
    </View>
  );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#5F0B65',
              tabBarInactiveTintColor: 'white',
              tabBarActiveBackgroundColor: '#5F0B65',
              tabBarInactiveBackgroundColor: 'red',
              tabBarLabelStyle: {
                color: 'purple',
              },
            }}
            tabBar={(props) => (
              <BottomFabBar
                mode={enableSquare ? 'square' : 'default'}
                isRtl={isRtl}
                // Add Shadow for active tab bar button
                focusedButtonStyle={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: -1,
                  },
                  shadowOpacity: 0.61,
                  shadowRadius: 8,
                  elevation: 14,
                }}
                /* eslint-disable-next-line max-len */
                // - You can add the style below to show content screen under the tab-bar
                // - It will makes the "transparent tab bar" effect.
                bottomBarContainerStyle={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
                springConfig={{
                  stiffness: 1500,
                  damping: 85,
                  mass: 4,
                }}
                {...props}
              />
            )}
          >
            <Tab.Screen
              options={{
                tabBarIcon: tabBarIcon('aliwangwang-o1'),
                tabBarLabel: showLabel ? 'Home' : undefined,
              }}
              name="Home"
              component={Home}
            />
            <Tab.Screen
              name="Meh"
              options={{
                tabBarIcon: tabBarIcon('meh'),
                tabBarLabel: showLabel ? 'Meh' : undefined,
              }}
              component={generateScreen('Meh')}
            />
            <Tab.Screen
              options={{
                tabBarIcon: tabBarIcon('rocket1'),
                tabBarActiveBackgroundColor: '#45014A',
                tabBarActiveTintColor: 'purple',
                tabBarLabel: showLabel ? 'Rocket' : undefined,
              }}
              name="Settings"
              component={SettingsScreen}
            />
            <Tab.Screen
              options={{
                tabBarStyle: {
                  display: 'none',
                },
                tabBarIcon: tabBarIcon('Trophy'),
                tabBarLabel: showLabel ? 'Trophy' : undefined,
              }}
              name="Trophy"
              component={generateScreen('Trophy')}
            />
            <Tab.Screen
              options={{
                tabBarIcon: tabBarIcon('wallet'),
                tabBarLabel: showLabel ? 'Wallet' : undefined,
              }}
              name="Wallet"
              component={generateScreen('Wallet')}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
