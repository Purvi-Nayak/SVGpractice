import React, { useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Polygon,
  RadialGradient,
  Rect,
  Stop,
  Text as SVGText,
} from "react-native-svg";

const { width, height } = Dimensions.get("window");

const AnalyticsScreen = () => {
  // Animation values
  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(100);
  const chartScale = useSharedValue(0);
  const barHeights = [
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
  ];

  useEffect(() => {
    // Entry animations
    fadeIn.value = withTiming(1, { duration: 1000 });
    slideUp.value = withSpring(0, { damping: 15 });
    chartScale.value = withSpring(1, { damping: 20 });

    // Animate bars sequentially
    barHeights.forEach((bar, index) => {
      bar.value = withDelay(
        index * 150,
        withSpring([60, 80, 45, 90, 70, 55, 85][index], { damping: 25 })
      );
    });
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideUp.value }],
  }));

  const chartScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: chartScale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.backgroundContainer}>
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          <Defs>
            //vertical and horizontal gradient difference//
            <LinearGradient
              id="analyticsBackground"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor="#2D1B69" />
              <Stop offset="50%" stopColor="#11998E" />
              <Stop offset="100%" stopColor="#38EF7D" />
            </LinearGradient>
          </Defs>
          <Rect
            width={width}
            height={height}
            fill="url(#analyticsBackground)"
          />

          {/* Floating geometric shapes */}
          <Circle
            cx={width * 0.1}
            cy={height * 0.2}
            r="40"
            fill="rgba(158, 148, 148, 0.1)"
          />
          <Polygon
            points={`${width * 0.9},${height * 0.1} ${width * 0.95},${
              height * 0.15
            } ${width * 0.85},${height * 0.15}`}
            fill="rgba(255,255,255,0.08)"
          />
          <Rect
            x={width * 0.05}
            y={height * 0.8}
            width="50"
            height="80"
            rx="10"
            fill="rgba(255,255,255,0.06)"
          />
        </Svg>
      </View>

      <Animated.View style={[styles.content, containerStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Analytics</Text>
            <Text style={styles.subtitle}>Performance Overview</Text>
          </View>

          {/* Stats Cards Row */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Svg width="100%" height="80">
                <Defs>
                  <RadialGradient id="stat1" cx="50%" cy="50%" r="50%">
                    <Stop offset="0%" stopColor="rgba(255, 107, 107, 0.3)" />
                    <Stop offset="100%" stopColor="rgba(255, 107, 107, 0.1)" />
                  </RadialGradient>
                </Defs>
                <Rect width="100%" height="80" rx="15" fill="url(#stat1)" />
              </Svg>
              <View style={styles.statContent}>
                <Text style={styles.statNumber}>$24.5k</Text>
                <Text style={styles.statLabel}>Revenue</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <Svg width="100%" height="80">
                <Defs>
                  <RadialGradient id="stat2" cx="50%" cy="50%" r="50%">
                    <Stop offset="0%" stopColor="rgba(76, 175, 80, 0.3)" />
                    <Stop offset="100%" stopColor="rgba(76, 175, 80, 0.1)" />
                  </RadialGradient>
                </Defs>
                <Rect width="100%" height="80" rx="15" fill="url(#stat2)" />
              </Svg>
              <View style={styles.statContent}>
                <Text style={styles.statNumber}>1,234</Text>
                <Text style={styles.statLabel}>Orders</Text>
              </View>
            </View>
          </View>

          {/* Bar Chart */}
          <Animated.View style={[styles.chartCard, chartScaleStyle]}>
            <Svg width="100%" height="250">
              <Defs>
                <LinearGradient id="chartBg" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="rgba(198, 160, 103, 0.25)" />
                  <Stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                </LinearGradient>
                <LinearGradient
                  id="barGradient"
                  x1="100%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="#ff6b6b" />
                  <Stop offset="100%" stopColor="#feca57" />
                </LinearGradient>
              </Defs>

              <Rect width="100%" height="250" rx="10" fill="url(#chartBg)" />

              {/* Chart bars */}
              {[90, 80, 45, 90, 70, 55, 85].map((height, index) => {
                const x = 40 + index * 40;
                const animatedHeight = barHeights[index];

                return (
                  <Rect
                    key={index}
                    x={x}
                    y={200 - height}
                    width="25"
                    height={height}
                    rx="12"
                    fill="url(#barGradient)"
                  />
                );
              })}

              {/* Chart labels */}
              <SVGText
                x="20"
                y="30"
                fill="white"
                fontSize="18"
                fontWeight="bold"
              >
                Weekly Performance
              </SVGText>
              <SVGText x="20" y="50" fill="rgba(7, 7, 7, 0.7)" fontSize="14">
                Sales & Revenue Tracking
              </SVGText>
            </Svg>
          </Animated.View>

          {/* Pie Chart */}
          <View style={styles.pieContainer}>
            <Svg width="100%" height="200">
              <Defs>
                <LinearGradient id="pieBg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                  <Stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
                </LinearGradient>
              </Defs>

              <Rect width="100%" height="200" rx="20" fill="url(#pieBg)" />

              {/* Simple pie chart representation */}
              <Circle
                cx="120"
                cy="100"
                r="60"
                fill="rgba(121, 118, 118, 0.3)"
              />
              <Path
                d="M 120,100 L 120,40 A 120,60 0 0,1 155,65 Z"
                fill="#ff6b6b"
              />
              <Path
                d="M 120,100 L 155,65 A 60,60 0 0,1 170,120 Z"
                fill="#feca57"
              />
              <Path
                d="M 120,100 L 170,120 A 60,60 0 0,1 120,160 Z"
                fill="#4ecdc4"
              />

              <SVGText
                x="20"
                y="30"
                fill="black"
                fontSize="16"
                fontWeight="bold"
              >
                Category Breakdown
              </SVGText>
            </Svg>

            {/* Legend */}
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: "#ff6b6b" }]}
                />
                <Text style={styles.legendText}>Electronics 40%</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: "#feca57" }]}
                />
                <Text style={styles.legendText}>Clothing 35%</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: "#4ecdc4" }]}
                />
                <Text style={styles.legendText}>Books 25%</Text>
              </View>
            </View>
          </View>

          {/* Growth Trend */}
          <View style={styles.trendCard}>
            <Svg width="100%" height="150">
              <Defs>
                <LinearGradient
                  id="trendBg"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="rgba(56, 239, 125, 0.2)" />
                  <Stop offset="100%" stopColor="rgba(17, 153, 142, 0.1)" />
                </LinearGradient>
              </Defs>

              <Rect width="100%" height="150" rx="15" fill="url(#trendBg)" />

              {/* Trend line */}
              <Path
                d="M 20,120 Q 50,80 120,90 T 220,60 T 300,45"
                stroke="#38EF7D"
                strokeWidth="4"
                fill="transparent"
                strokeLinecap="round"
              />

              {/* Data points */}
              <Circle cx="20" cy="120" r="4" fill="#38EF7D" />
              <Circle cx="120" cy="90" r="4" fill="#38EF7D" />
              <Circle cx="220" cy="60" r="4" fill="#38EF7D" />
              <Circle cx="300" cy="45" r="4" fill="#38EF7D" />

              <SVGText
                x="20"
                y="25"
                fill="white"
                fontSize="16"
                fontWeight="bold"
              >
                Growth Trend
              </SVGText>
              <SVGText x="20" y="45" fill="rgba(255,255,255,0.7)" fontSize="12">
                +24% this month
              </SVGText>
            </Svg>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    height: 80,
    position: "relative",
    borderRadius: 15,
  },
  statContent: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  chartCard: {
    marginBottom: 25,
  },
  pieContainer: {
    marginBottom: 25,
    position: "relative",
  },
  legend: {
    position: "absolute",
    right: 20,
    top: 50,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: "black",
    fontSize: 12,
  },
  trendCard: {
    marginBottom: 25,
  },
});
