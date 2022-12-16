import React, { useEffect, useState } from 'react';
import { Dimensions, StyleProp, StyleSheet, View } from 'react-native';
import RNReanimated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Path, Svg } from 'react-native-svg';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';
import { style, TAB_BAR_HEIGHT } from '../styles/bottom.tab.styles';
import FabBarButton, { BarButton } from './tab.bar.button';
import { getTabShape } from './tab.shape';
import { getSquareTabShape } from './tab.square.shape';

const ReanimatedSvg = RNReanimated.createAnimatedComponent(Svg);

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
  springConfig?: Omit<WithSpringConfig, 'toValue'>;
  /**
   * Custom style for bar
   */
  bottomBarContainerStyle?: StyleProp<any>;
  /**
   * Adding additional style for the focused tab button, such as a shadow.
   */
  focusedButtonStyle?: StyleProp<any>;
  /**
   * Enable right to left
   */
  isRtl?: boolean;
};

export const FabTabBar: React.FC<BottomTabBarProps & CustomProps> = ({
  state,
  descriptors,
  navigation,
  springConfig,
  bottomBarContainerStyle,
  focusedButtonStyle,
  mode = 'default',
  isRtl = false,
}) => {
  const currentDescriptor = descriptors[state.routes[state.index].key];

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

  const initialPosition = isRtl
    ? -width + tabsWidthValue * (state.routes.length - 1 - state.index)
    : -width + tabsWidthValue * state.index;

  const animatedValueLength = useSharedValue(initialPosition);

  const offset =
    tabsRealWidth < tabWidth
      ? tabWidth - tabsRealWidth
      : (tabsRealWidth - tabWidth) * -1;

  useEffect(() => {
    animatedValueLength.value = initialPosition;
  }, [isRtl]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animatedValueLength.value }],
    };
  });
  useEffect(() => {
    animatedValueLength.value = withSpring(
      initialPosition - offset / 2,
      springConfig || defaultSpringConfig
    );
  }, [
    width,
    height,
    state,
    tabsWidthValue,
    offset,
    animatedValueLength,
    springConfig,
    initialPosition,
  ]);

  const animationValueThreshold = useSharedValue(0);

  useEffect(() => {
    animationValueThreshold.value = withSpring(
      state.index,
      springConfig || defaultSpringConfig
    );
    /*Animated.spring(animationValueThreshold, {
      toValue: state.index,
      ...(springConfig || defaultSpringConfig),
      useNativeDriver: false,
    }).start();*/
  }, [animationValueThreshold, state.index, springConfig]);

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
        currentDescriptor.options.tabBarStyle,
      ]}
    >
      {bottom > 0 && (
        <View
          style={[
            {
              height: bottom,
              backgroundColor:
                Object.values(descriptors)[state.index].options
                  .tabBarActiveBackgroundColor,
              bottom: bottom * -1,
            },
            style.bottomFill,
          ]}
        />
      )}
      <View
        style={[
          style.fabButtonsContainer,
          { flexDirection: isRtl ? 'row-reverse' : 'row' },
        ]}
      >
        {state.routes.map((route: Route<any>, index: number) => {
          const { options } = descriptors[route.key];
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
              focusedButtonStyle={focusedButtonStyle}
              index={index}
              isFocused={isFocused}
              activeTintColor={options.tabBarActiveTintColor}
              inactiveTintColor={options.tabBarInactiveTintColor}
            />
          );
        })}
      </View>
      <View style={[StyleSheet.absoluteFill, style.barShapeWrapper]}>
        <ReanimatedSvg
          width={width * 2.5}
          height={height + bottom}
          style={[
            {
              width: '100%',
              backgroundColor: 'transparent',
            },
            animatedStyles,
          ]}
        >
          <Path
            d={d}
            fill={
              Object.values(descriptors)[state.index].options
                .tabBarActiveBackgroundColor || '#FF5252'
            }
          />
        </ReanimatedSvg>
      </View>
      {state.routes.map((route: Route<any>, index: number) => {
        const { options } = descriptors[route.key];
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
