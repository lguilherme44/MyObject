import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { format } from "date-fns";
import api from "../../services/api";
import Timeline from "react-native-timeline-flatlist";
import {
  SectionDescription,
  TitleDescription,
  Description,
  TextDescription,
} from "./styles";

export default function Order() {
  const [codigo, setCodigo] = useState(["OJ694488935BR"]);
  const [data, setData] = useState();

  const renderDescription = (origem, destino) => {
    const formatOrigem = String(origem).replace("Origem: ", "");
    const formatDestino = String(destino).replace("Destino: ", "");

    return (
      <Description>
        <SectionDescription>
          <TitleDescription>Origem</TitleDescription>
          <TextDescription>{formatOrigem}</TextDescription>
        </SectionDescription>

        <SectionDescription>
          <TitleDescription>Destino</TitleDescription>
          <TextDescription>{formatDestino}</TextDescription>
        </SectionDescription>
      </Description>
    );
  };

  useEffect(() => {
    async function getDetails() {
      const {
        data: { response },
      } = await api.get(`/${codigo}`);

      const history = response["0"];

      const formatedData = history.map(({ data, status, origem, destino }) => ({
        time: data.replace("Data  : ", "").split(" ", 1),
        // time: data,
        title: status,
        description: renderDescription(origem, destino),
      }));

      setData(formatedData);
    }

    getDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Timeline
        style={styles.list}
        data={data}
        descriptionStyle={styles.description}
        separator={true}
        lineColor="gray"
        timeStyle={styles.time}
        circleColor="#F45B69"
        innerCircle={"dot"}
        circleSize={18}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: "white",
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  time: {
    textAlign: "center",
    backgroundColor: "gray",
    fontSize: 12,
    color: "white",
    padding: 5,
    borderRadius: 5,
    overflow: "hidden",
  },
  description: {
    color: "gray",
  },
});
