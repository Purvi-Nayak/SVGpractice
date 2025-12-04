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
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";

const { width, height } = Dimensions.get("window");

export default function WalletScreen() {
  // Animation values
  const fadeIn = useSharedValue(0);
  const cardSlide = useSharedValue(-width);
  const balanceScale = useSharedValue(0);
  const buttonPress = useSharedValue(1);
  const waveAnimation = useSharedValue(0);

  useEffect(() => {
    // Entry animations
    fadeIn.value = withTiming(1, { duration: 800 });
    cardSlide.value = withSpring(0, { damping: 15 });
    balanceScale.value = withDelay(300, withSpring(1, { damping: 20 }));

    // Continuous wave animation
    waveAnimation.value = withRepeat(
      withTiming(1, { duration: 3000 }),
      -1,
      true
    );
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: cardSlide.value }],
  }));

  const balanceStyle = useAnimatedStyle(() => ({
    transform: [{ scale: balanceScale.value }],
  }));

  const waveStyle = useAnimatedStyle(() => {
    const translateY = interpolate(waveAnimation.value, [0, 1], [0, -10]);
    return {
      transform: [{ translateY }],
    };
  });

  const handleButtonPress = () => {
    buttonPress.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { damping: 15 })
    );
  };

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.backgroundContainer}>
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient
              id="walletBackground"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor="#667eea" />
              <Stop offset="50%" stopColor="#764ba2" />
              <Stop offset="100%" stopColor="#f093fb" />
            </LinearGradient>
            <RadialGradient id="floatingCircle" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <Stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </RadialGradient>
          </Defs>
          <Rect width={width} height={height} fill="url(#walletBackground)" />

          {/* Animated floating elements */}
          <Animated.View style={waveStyle}>
            <Circle
              cx={width * 0.15}
              cy={height * 0.3}
              r="40"
              fill="url(#floatingCircle)"
            />
            <Circle
              cx={width * 0.85}
              cy={height * 0.7}
              r="30"
              fill="url(#floatingCircle)"
            />
            <Ellipse
              cx={width * 0.9}
              cy={height * 0.2}
              rx="35"
              ry="50"
              fill="rgba(255,255,255,0.08)"
            />
          </Animated.View>
        </Svg>
      </View>

      <Animated.View style={[styles.content, containerStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>My Wallet</Text>
            <Text style={styles.subtitle}>Manage your finances</Text>
          </View>

          {/* Main Card */}
          <Animated.View style={[styles.mainCard, cardStyle]}>
            <Svg width="100%" height="220" style={StyleSheet.absoluteFill}>
              <Defs>
                <LinearGradient
                  id="cardGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="#ff6b6b" />
                  <Stop offset="50%" stopColor="#feca57" />
                  <Stop offset="100%" stopColor="#48dbfb" />
                </LinearGradient>
                <RadialGradient id="cardOverlay" cx="80%" cy="20%" r="60%">
                  <Stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                  <Stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </RadialGradient>
              </Defs>

              <Rect
                width="100%"
                height="220"
                rx="25"
                fill="url(#cardGradient)"
              />
              <Rect
                width="100%"
                height="220"
                rx="25"
                fill="url(#cardOverlay)"
              />

              {/* Card decorative elements */}
              <Circle cx="300" cy="50" r="80" fill="rgba(255,255,255,0.1)" />
              <Circle cx="320" cy="180" r="60" fill="rgba(255,255,255,0.08)" />

              {/* Card chip */}
              <Rect
                x="30"
                y="70"
                width="45"
                height="35"
                rx="8"
                fill="rgba(255,255,255,0.3)"
              />
              <Rect
                x="35"
                y="75"
                width="35"
                height="25"
                rx="4"
                fill="rgba(255,255,255,0.2)"
              />
            </Svg>

            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardType}>PREMIUM CARD</Text>
                <Text style={styles.cardNumber}>•••• •••• •••• 1234</Text>
              </View>

              <Animated.View style={[styles.balanceContainer, balanceStyle]}>
                <Text style={styles.balanceLabel}>Current Balance</Text>
                <Text style={styles.balanceAmount}>$15,248.90</Text>
              </Animated.View>

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.holderLabel}>CARD HOLDER</Text>
                  <Text style={styles.holderName}>JOHN DOE</Text>
                </View>
                <View>
                  <Text style={styles.expiryLabel}>EXPIRES</Text>
                  <Text style={styles.expiryDate}>12/25</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleButtonPress}
            >
              <Svg width="100%" height="100">
                <Defs>
                  <LinearGradient
                    id="sendGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <Stop offset="100%" stopColor="#ff6b6b" />
                    <Stop offset="0%" stopColor="#feca57" />
                  </LinearGradient>
                </Defs>
                <Rect
                  width="100%"
                  height="100"
                  rx="20"
                  fill="url(#sendGradient)"
                />
                {/* Send icon */}
                <Path
                  d="M30,50 L50,30 L70,50 M50,30 L50,70"
                  stroke="white"
                  strokeWidth="10"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
              <Text style={styles.actionText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleButtonPress}
            >
              <Svg width="100%" height="100">
                <Defs>
                  <LinearGradient
                    id="receiveGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <Stop offset="0%" stopColor="#4ecdc4" />
                    <Stop offset="100%" stopColor="#44a08d" />
                  </LinearGradient>
                </Defs>
                <Rect
                  width="100%"
                  height="100"
                  rx="20"
                  fill="url(#receiveGradient)"
                />
                {/* Receive icon */}
                <Path
                  d="M30,30 L50,50 L70,30 M50,50 L50,20"
                  stroke="white"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
              <Text style={styles.actionText}>Receive</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleButtonPress}
            >
              <Svg width="100%" height="100">
                <Defs>
                  <LinearGradient
                    id="payGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <Stop offset="100%" stopColor="#a855f7" />
                    <Stop offset="0%" stopColor="#60f63b" />
                  </LinearGradient>
                </Defs>
                <Rect
                  width="100%"
                  height="100"
                  rx="50"
                  fill="url(#payGradient)"
                />
                {/* Pay icon */}
                <Rect
                  x="30"
                  y="35"
                  width="30"
                  height="20"
                  rx="3"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <Circle cx="45" cy="45" r="5" fill="white" />
              </Svg>
              <Text style={styles.actionText}>Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleButtonPress}
            >
              <Svg width="100%" height="100">
                <Defs>
                  <LinearGradient
                    id="topupGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <Stop offset="0%" stopColor="#ff9a9e" />
                    <Stop offset="100%" stopColor="#fecfef" />
                  </LinearGradient>
                </Defs>
                <Rect
                  width="100%"
                  height="100"
                  rx="20"
                  fill="url(#topupGradient)"
                />
                {/* Top-up icon */}
                <Path
                  d="M50,30 L50,70 M35,45 L50,30 L65,45"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
              <Text style={styles.actionText}>Top Up</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Transactions */}
          <View style={styles.transactionsCard}>
            <Svg width="100%" height="300">
              <Defs>
                <LinearGradient
                  id="transactionsBg"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                  <Stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                </LinearGradient>
              </Defs>
              <Rect
                width="100%"
                height="300"
                rx="20"
                fill="url(#transactionsBg)"
              />
            </Svg>

            <View style={styles.transactionsContent}>
              <Text style={styles.transactionsTitle}>Recent Transactions</Text>

              {[
                {
                  type: "send",
                  name: "Coffee Shop",
                  amount: "-$4.50",
                  time: "2 min ago",
                },
                {
                  type: "receive",
                  name: "John Smith",
                  amount: "+$125.00",
                  time: "1 hour ago",
                },
                {
                  type: "send",
                  name: "Uber Ride",
                  amount: "-$12.30",
                  time: "3 hours ago",
                },
                {
                  type: "receive",
                  name: "Salary",
                  amount: "+$2,500.00",
                  time: "Yesterday",
                },
              ].map((transaction, index) => (
                <View key={index} style={styles.transactionItem}>
                  <View style={styles.transactionIcon}>
                    <Svg width="40" height="40">
                      <Circle
                        cx="20"
                        cy="20"
                        r="20"
                        fill={
                          transaction.type === "send" ? "#ff6b6b" : "#4ecdc4"
                        }
                      />
                      <Path
                        d={
                          transaction.type === "send"
                            ? "M12,20 L20,12 L28,20 M20,12 L20,28"
                            : "M12,12 L20,20 L28,12 M20,20 L20,8"
                        }
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </Svg>
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionName}>
                      {transaction.name}
                    </Text>
                    <Text style={styles.transactionTime}>
                      {transaction.time}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.transactionAmount,
                      {
                        color:
                          transaction.type === "send" ? "#ff6b6b" : "#4ecdc4",
                      },
                    ]}
                  >
                    {transaction.amount}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </Animated.View>
    </View>
  );
}

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
  mainCard: {
    height: 220,
    marginBottom: 30,
    borderRadius: 25,
  },
  cardContent: {
    padding: 25,
    height: "100%",
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardType: {
    fontSize: 12,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.9)",
    letterSpacing: 1,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    letterSpacing: 2,
  },
  balanceContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  balanceLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  holderLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 2,
  },
  holderName: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  expiryLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 2,
  },
  expiryDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  actionButton: {
    width: (width - 60) / 4,
    height: 100,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },
  transactionsCard: {
    height: 300,
    borderRadius: 20,
    position: "relative",
  },
  transactionsContent: {
    padding: 20,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  transactionIcon: {
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
