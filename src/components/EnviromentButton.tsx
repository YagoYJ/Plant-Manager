import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps extends RectButtonProps {
  text: string;
  active?: boolean;
}

export default function EnviromentButton({
  text,
  active = false,
  ...rest
}: ButtonProps) {
  return (
    <RectButton
      style={[styles.button, active && styles.buttonActive]}
      {...rest}
    >
      <Text style={[styles.textButton, active && styles.textButtonActive]}>
        {text}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: colors.shape,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginHorizontal: 5,
  },
  buttonActive: {
    backgroundColor: colors.green_light,
  },
  textButton: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  textButtonActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
});
