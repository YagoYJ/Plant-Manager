import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import Emoji from "react-native-emoji";
import Button from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PageProps {
  title: string;
  subtitle: string;
  buttonText: string;
  icon: "smile" | "wink";
  nextScreen: string;
}

export default function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const props = routes.params as PageProps;

  function handleStart() {
    navigation.navigate(props.nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Emoji name={props.icon} style={styles.emoji} />

        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>

        <View style={styles.footer}>
          <Button text={props.buttonText} onPress={handleStart} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 100,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
    lineHeight: 38,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    textAlign: "center",
    paddingHorizontal: 20,
    color: colors.heading,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 20,
  },
});
