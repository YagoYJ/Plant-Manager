import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import wateringImg from "../assets/watering.png";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Welcome() {
  const navigation = useNavigation();

  function handleNavigation() {
    navigation.navigate("UserIdentification");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie{"\n"} suas plantas de{"\n"} forma fácil
        </Text>

        <Image source={wateringImg} resizeMode="contain" style={styles.image} />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleNavigation}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 38,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },
  image: {
    maxWidth: 300,
    height: Dimensions.get("window").width * 0.7,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  button: {
    width: 56,
    height: 56,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  buttonIcon: {
    fontSize: 24,
    color: colors.white,
  },
});
