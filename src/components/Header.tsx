import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import avatar from "../assets/avatar.png";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Header() {
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem("@plantmanager:user");

      setUsername(user || "");
    }

    loadStorageUserName();
  }, [username]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{username}</Text>
      </View>

      <Image source={avatar} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: getStatusBarHeight(),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 40,
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 90,
  },
});
