import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { loadPlants, PlantProps, removePlant } from "../libs/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";

import Header from "../components/Header";
import PlantCardSecondary from "../components/PlantCardSecondary";

import waterDrop from "../assets/waterdrop.png";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import Load from "../components/Load";

export default function MyPlants() {
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlants();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} às ${nextTime}`
      );

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  if (loading) {
    return <Load />;
  }

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: async () => {
          await removePlant(plant.id);

          try {
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Não foi possível remover");
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image
          source={waterDrop}
          resizeMode="contain"
          style={styles.spotlightImage}
        />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        {myPlants.length === 0 ? (
          <Text style={styles.noPlants}>
            Não há plantas salvas.{"\n"}Cadastre uma
          </Text>
        ) : (
          <FlatList
            data={myPlants}
            keyExtractor={(item: PlantProps) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardSecondary
                data={item}
                handleRemove={() => handleRemove(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
  noPlants: {
    flex: 1,
    width: "100%",
    textAlign: "center",
    marginTop: 50,
    fontSize: 20,
    color: colors.red,
  },
});
