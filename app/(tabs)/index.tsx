import React, { useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";

const { width, height } = Dimensions.get("window");

const ModernDashboard = () => {
  // Animation values
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const rotation = useSharedValue(0);
  const cardScale = useSharedValue(1);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    // Entry animations
    scale.value = withSpring(1, { damping: 15 });
    opacity.value = withTiming(1, { duration: 800 });
    translateY.value = withSpring(0, { damping: 12 });

    // Continuous pulse animation for progress circle
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );

    // Subtle rotation for decorative elements
    rotation.value = withRepeat(
      withTiming(360, { duration: 20000 }),
      -1,
      false
    );
  }, []);

  // Animated styles
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  const pulseAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value }],
    };
  });

  const rotationAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const cardPressStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cardScale.value }],
    };
  });

  const handleCardPress = () => {
    cardScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { damping: 15 })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient
              id="backgroundGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor="#667eea" />
              <Stop offset="50%" stopColor="#764ba2" />
              <Stop offset="100%" stopColor="#f093fb" />
            </LinearGradient>

            <RadialGradient id="cardGradient" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
              <Stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </RadialGradient>

            <LinearGradient
              id="accentGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <Stop offset="0%" stopColor="#ff6b6b" />
              <Stop offset="100%" stopColor="#feca57" />
            </LinearGradient>
          </Defs>

          {/* Background */}
          <Rect width={width} height={height} fill="url(#backgroundGradient)" />

          {/* Decorative circles */}
          <Circle
            cx={width * 0.8}
            cy={height * 0.1}
            r="80"
            fill="rgba(255,255,255,0.1)"
          />
          <Circle
            cx={width * 0.2}
            cy={height * 0.9}
            r="40"
            fill="rgba(255,255,255,0.08)"
          />
          <Circle
            cx={width * 1.1}
            cy={height * 0.3}
            r="80"
            fill="rgba(255,255,255,0.05)"
          />
        </Svg>
      </View>

      <Animated.View style={[styles.content, containerAnimatedStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.nameText}>John Doe</Text>
          </View>

          {/* Main Stats Card */}
          <Animated.View style={[styles.mainCard, cardPressStyle]}>
            <TouchableOpacity onPress={handleCardPress} activeOpacity={0.9}>
              <Svg width="100%" height="200" style={styles.cardBackground}>
                <Defs>
                  <LinearGradient
                    id="mainCardGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <Stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                    <Stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                  </LinearGradient>
                </Defs>
                <Rect
                  width="100%"
                  height="200"
                  rx="20"
                  fill="url(#mainCardGradient)"
                  stroke="rgba(134, 20, 20, 0.2)"
                  strokeWidth="1"
                />
              </Svg>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Total Balance</Text>
                <Text style={styles.cardAmount}>$12,450.00</Text>

                {/* Progress Circle */}
                <Animated.View
                  style={[styles.progressContainer, pulseAnimatedStyle]}
                >
                  <Svg width="120" height="120">
                    <Circle
                      cx="80"
                      cy="100"
                      r="20"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="15"
                      fill="transparent"
                    />
                    <Circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="url(#accentGradient)"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="220"
                      strokeDashoffset="80"
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                    <Circle cx="60" cy="60" r="5" fill="#ff6b6b" />
                  </Svg>
                  <View style={styles.progressText}>
                    <Text style={styles.progressPercent}>72%</Text>
                    <Text style={styles.progressLabel}>Goal</Text>
                  </View>
                </Animated.View>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            {/* Income Card */}
            <TouchableOpacity style={styles.statCard}>
              <Svg width="100%" height="100" style={StyleSheet.absoluteFill}>
                <Rect
                  width="100%"
                  height="100"
                  rx="15"
                  fill="rgba(255,255,255,0.15)"
                />
                <Circle cx="80" cy="40" r="25" fill="rgba(76, 175, 80, 0.3)" />
              </Svg>
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>Income</Text>
                <Text style={styles.statValue}>$8,240</Text>
                <Text style={styles.statChange}>+12%</Text>
              </View>
            </TouchableOpacity>

            {/* Expenses Card */}
            <TouchableOpacity style={styles.statCard}>
              <Svg width="100%" height="100" style={StyleSheet.absoluteFill}>
                <Rect
                  width="100%"
                  height="100"
                  rx="15"
                  fill="rgba(255,255,255,0.15)"
                />
                <Circle cx="30" cy="80" r="15" fill="rgba(244, 67, 54, 0.3)" />
              </Svg>
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>Expenses</Text>
                <Text style={styles.statValue}>$3,420</Text>
                <Text style={styles.statChange}>-5%</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Activity Chart */}
          <View style={styles.chartCard}>
            <Svg width="100%" height="160">
              <Defs>
                <LinearGradient
                  id="chartGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                  <Stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                </LinearGradient>
              </Defs>

              <Rect
                width="100%"
                height="160"
                rx="20"
                fill="url(#chartGradient)"
              />

              {/* Chart lines */}
              <Path
                d="M20,120 Q70,40 140,100 T260,90 T320,70"
                stroke="#ff6b6b"
                strokeWidth="3"
                fill="transparent"
                strokeLinecap="round"
              />

              {/* Data points */}
              <Circle cx="50" cy="20" r="8" fill="#ff6b6b" />
              <Circle cx="140" cy="100" r="4" fill="#ff6b6b" />
              <Circle cx="260" cy="90" r="4" fill="#ff6b6b" />
              <Circle cx="320" cy="70" r="4" fill="#ff6b6b" />
            </Svg>

            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Activity Overview</Text>
              <Text style={styles.chartSubtitle}>This week</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton}>
              <Svg width="60" height="60">
                <Circle
                  cx="30"
                  cy="30"
                  r="30"
                  fill="url(#ccc0aaedntGradient)"
                />
                <Path
                  d="M20,30 L30,20 L40,30 M30,20 L30,40"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Svg>
              <Text style={styles.actionText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Svg width="60" height="60">
                <Circle cx="30" cy="30" r="30" fill="rgba(255,255,255,0.2)" />
                <Path
                  d="M30,20 L30,40 M20,30 L30,20 L40,30"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Svg>
              <Text style={styles.actionText}>Receive</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Svg width="60" height="60">
                <Circle cx="30" cy="30" r="70" fill="rgba(255,255,255,0.2)" />
                <Rect
                  x="12"
                  y="12"
                  width="26"
                  height="26"
                  rx="5"
                  stroke="green"
                  strokeWidth="2"
                  fill="transparent"
                />
              </Svg>
              <Text style={styles.actionText}>More</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 50 }} />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default ModernDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#667eea",
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
  welcomeText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 5,
  },
  nameText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  mainCard: {
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
    position: "relative",
  },
  cardBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 20,
  },
  cardContent: {
    padding: 20,
    height: "100%",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 16,
    color: "rgba(124, 24, 24, 0.8)",
    marginBottom: 5,
  },
  cardAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "red",
  },
  progressContainer: {
    alignItems: "center",
    position: "absolute",
    right: 20,
    top: 50,
  },
  progressText: {
    position: "absolute",
    top: "50%",
    alignItems: "center",
    transform: [{ translateY: -15 }],
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  progressLabel: {
    fontSize: 12,
    color: "rgba(145, 22, 22, 0.7)",
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    height: 100,
    borderRadius: 15,
    position: "relative",
  },
  statContent: {
    padding: 15,
    height: "100%",
    justifyContent: "space-between",
  },
  statLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  statChange: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
  },
  chartCard: {
    height: 160,
    marginBottom: 30,
    borderRadius: 20,
    position: "relative",
  },
  chartHeader: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  chartSubtitle: {
    fontSize: 14,
    color: "rgba(173, 40, 40, 0.7)",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    marginTop: 10,
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
