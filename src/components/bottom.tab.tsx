import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Path, Svg } from 'react-native-svg';

import { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';

import { style, TAB_BAR_HEIGHT } from '../styles/bottom.tab.styles';
import FabBarButton, { BarButton } from './tab.bar.button';
import { getTabShape } from './tab.shape';
import { getSquareTabShape } from './tab.square.shape';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const tabWidth = 110;

export const defaultSpringConfig = {
  damping: 30,
  mass: 0.7,
  stiffness: 250,
};

type CustomProps = {
  mode: 'default' | 'square';
  /**
   * Custom spring animation config
   */
  springConfig?: Animated.SpringAnimationConfig;
  /**
   * Custom style for bar
   */
  bottomBarContainerStyle?: StyleProp<any>;
  /**
  * Direction rtl or ltr
	*/
  isRtl?: Boolean;
  /**
   * Adding additional style for the focused tab button, such as a shadow.
   */
  focusedButtonStyle?: StyleProp<any>;

};

type CustomTabNavigationOptionsProps = {
  tabBarStyle: ViewStyle;
  tabBarActiveBackgroundColor: string;
  tabBarActiveTintColor: string;
  tabBarInactiveTintColor: string;
} & BottomTabNavigationOptions;

export const FabTabBar: React.FC<BottomTabBarProps & CustomProps> = ({
  state,
  descriptors,
  navigation,
  springConfig,
  bottomBarContainerStyle,
  isRtl = false,
  focusedButtonStyle,
  mode = 'default',
}) => {
  const currentOptions = descriptors[state.routes[state.index].key].options as CustomTabNavigationOptionsProps;

  const [{ width, height }, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });
  const { bottom } = useSafeAreaInsets();
  const d =
    mode === 'default'
      ? getTabShape(width, height, tabWidth, TAB_BAR_HEIGHT)
      : getSquareTabShape(width, height, tabWidth, TAB_BAR_HEIGHT);

  const tabsWidthValue = React.useMemo(
    () => width / state.routes.length,
    [width, state.routes]
  );
  const tabsRealWidth = width / state.routes.length;
  const routedOptions = Object.values(descriptors)[state.index].options as CustomTabNavigationOptionsProps;

  const initialPoss = isRtl ? -width + tabsWidthValue * (state.routes.length - state.index) : -width + tabsWidthValue * state.index;

  const [animatedValueLength, setAnimatedValueLength] = useState(
    new Animated.Value(initialPoss)
  );

  const offset =
    tabsRealWidth < tabWidth
      ? tabWidth - tabsRealWidth
      : (tabsRealWidth - tabWidth) * -1;

  useEffect(() => {
    setAnimatedValueLength(new Animated.Value(initialPoss))
  }, [isRtl]);

  useEffect(() => {
    const newValue = isRtl ? -width + tabsWidthValue * (state.routes.length - state.index - 1) - offset / 2 : -width + tabsWidthValue * state.index - offset / 2;

    Animated.spring(animatedValueLength, {
      toValue: newValue,
      ...(springConfig || defaultSpringConfig),
      useNativeDriver: true,
    }).start();
  }, [width, height, state, tabsWidthValue, offset, animatedValueLength]);

  const [animationValueThreshold] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(animationValueThreshold, {
      toValue: state.index,
      ...(springConfig || defaultSpringConfig),
      useNativeDriver: true,
    }).start();
  }, [animationValueThreshold, state.index]);

  return (
    <View
      onLayout={({
        nativeEvent: {
          layout: { height: lHeight, width: lWidth },
        },
      }) => {
        setDimensions({ width: lWidth, height: lHeight });
      }}
      style={[
        style.container,
        {
          marginBottom: bottom,
          height: TAB_BAR_HEIGHT,
          flexDirection: isRtl ? 'row-reverse' : 'row',
        },
        bottomBarContainerStyle,
        // apply style from descriptor
        currentOptions.tabBarStyle,
      ]}
    >
      {bottom > 0 && (
        <View
          style={[
            {
              height: bottom,
              backgroundColor:
              routedOptions.tabBarActiveBackgroundColor,
              bottom: bottom * -1,
            },
            style.bottomFill,
          ]}
        />
      )}
      <View style={[style.fabButtonsContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        {state.routes.map((route: Route<any>, index: number) => {
          const options = descriptors[route.key].options as CustomTabNavigationOptionsProps;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <FabBarButton
              mode={mode}
              key={route.key}
              options={options}
              onPress={onPress}
              onLongPress={onLongPress}
              index={index}
              isFocused={isFocused}
              activeTintColor={options.tabBarActiveTintColor}
              inactiveTintColor={options.tabBarInactiveTintColor}
            />
          );
        })}
      </View>
      <View
        style={[
          StyleSheet.absoluteFill,
          { elevation: 11, zIndex: 0, backgroundColor: 'transparent' },
        ]}
      >
        <AnimatedSvg
          width={width * 2.5}
          height={height + bottom}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            color: 'transparent',
            transform: [{ translateX: animatedValueLength }],
          }}
        >
          <Path
            d={d}
            fill={
              routedOptions.tabBarActiveBackgroundColor || '#FF5252'
            }
          />
        </AnimatedSvg>
      </View>
      {state.routes.map((route: Route<any>, index: number) => {
        const options = descriptors[route.key].options as CustomTabNavigationOptionsProps;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <BarButton
            mode={mode}
            focusedButtonStyle={focusedButtonStyle}
            key={route.key}
            options={options}
            onPress={onPress}
            onLongPress={onLongPress}
            index={index}
            isFocused={isFocused}
            activeTintColor={options.tabBarActiveTintColor}
            inactiveTintColor={options.tabBarInactiveTintColor}
          />
        );
      })}
    </View>
  );
};

export default FabTabBar;
