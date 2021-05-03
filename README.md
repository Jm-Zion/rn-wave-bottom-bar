# rn-wave-bottom-bar [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Build Status](https://travis-ci.org/Jm-Zion/rn-wave-bottom-bar.svg?branch=master)](https://travis-ci.org/Jm-Zion/rn-wave-bottom-bar) [![Known Vulnerabilities](https://snyk.io/test/github/Jm-Zion/rn-wave-bottom-bar/badge.svg)](https://snyk.io/test/github/Jm-Zion/rn-wave-bottom-bar) [![CodeFactor](https://www.codefactor.io/repository/github/jm-zion/rn-wave-bottom-bar/badge)](https://www.codefactor.io/repository/github/jm-zion/rn-wave-bottom-bar)

## Updated rtl/ltr props from https://github.com/Jm-Zion/rn-wave-bottom-bar

![Sample](./myVideo.gif)

Custom animated bottom-tab-bar for react-native.

## 💾 Installation

```
yarn add rn-wave-bottom-bar
```

or

```
yarn install rn-wave-bottom-bar --save
```

## 📋 Requirements

- React-Navigation v5 installed : https://reactnavigation.org/

## ⚒️ Usage

```typescript
const Tab = createBottomTabNavigator();

const tabBarIcon = (name: string) => ({
  focused,
  color,
  size,
}: {
  focused: boolean;
  color: string; // Defines fab icon color
  size: number;
}) => <Icon name={name} size={28} color={focused ? 'white' : 'white'} />;

<NavigationContainer>
	<Tab.Navigator
		tabBarOptions={{
		activeTintColor: 'purple',
		}}
		tabBar={(props) => (
			<BottomFabBar
				color="purple"
				{...props}
				isRtl={false}
			/>
		)}>
		<Tab.Screen
			options={{tabBarIcon: tabBarIcon('aliwangwang-o1')}}
			name="Home"
			component={generateScreen('Home')}
		/>
		<Tab.Screen
			name="Meh"
			options={{tabBarIcon: tabBarIcon('meh')}}
			component={generateScreen('Meh')}
		/>
	</Tab.Navigator>
</NavigationContainer>;
```

## 🔧 Props

| Prop         |          Type           |                Description                 |
| :----------- | :---------------------: | :----------------------------------------: |
| color        |        `string`         |        Bottom Bar background color         |
| springConfig | `Animated.SpringConfig` |      Spring config for the animation       |
| tabBarProps  |   `BottomTabBarProps`   | TabBar props passed from the Tab Component |

## 📄 Credits

Thanks to Jm-Zion for this original component : https://github.com/Jm-Zion

Thanks to W.Candillon for the tuto : https://www.youtube.com/watch?v=6LsLgHeX500

Initial Design : https://uimovement.com/design/tab-bar-3/

## Compatibility

✅ Works well with mosts Devices and tested on iPad, IPhones, Android Devices.

✅ Support device orientation.

✅ Support i18n (rtl/ltr direction).
