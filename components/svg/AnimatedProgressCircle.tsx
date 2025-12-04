import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

interface AnimatedProgressCircleProps {
  size?: number;
  strokeWidth?: number;
  progress?: number; // 0-100
  colors?: string[];
  animate?: boolean;
  duration?: number;
}

export default function AnimatedProgressCircle({
  size = 120,
  strokeWidth = 8,
  progress = 70,
  colors = ["#ff6b6b", "#feca57"],
  animate = true,
  duration = 2000,
}: AnimatedProgressCircleProps) {
  const animatedProgress = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (circumference * progress) / 100;

  useEffect(() => {
    if (animate) {
      animatedProgress.value = withTiming(progress, { duration });

      // Pulse animation
      pulseScale.value = withRepeat(
        withTiming(1.1, { duration: 1500 }),
        -1,
        true
      );
    } else {
      animatedProgress.value = progress;
    }
  }, [progress, animate, duration]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const gradientId = `progress-gradient-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  return (
    <Animated.View
      style={[styles.container, pulseStyle, { width: size, height: size }]}
    >
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {colors.map((color, index) => (
              <Stop
                key={index}
                offset={`${(index / (colors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </LinearGradient>
        </Defs>

        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        {/* Center dot */}
        <Circle cx={size / 2} cy={size / 2} r={4} fill={colors[0]} />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
