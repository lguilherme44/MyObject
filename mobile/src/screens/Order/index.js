import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import api from '../../services/api';
import {
  Container,
  SectionDescription,
  TitleDescription,
  Description,
  TextDescription,
} from './styles';
import Timeline from 'react-native-timeline-flatlist';
import logoLight from '../../assets/myobject.png';
import logoDark from '../../assets/myobject2.png';

export default function Order() {
  const [codigo, setCodigo] = useState(['OJ694488935BR']);
  const [data, setData] = useState();

  const renderDescription = (origem, destino, local) => {
    const formatOrigem = String(origem).replace('Origem: ', '');
    const formatDestino = String(destino).replace('Destino: ', '');
    const formatLocal = String(local).replace('Local: ', '');

    if (!origem && !destino) {
      return (
        <Description>
          <SectionDescription>
            <TitleDescription>Local</TitleDescription>
            <TextDescription>{formatLocal}</TextDescription>
          </SectionDescription>
        </Description>
      );
    }
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

      const history = response['0'];

      const formatedData = history.map(
        ({ data, status, origem, destino, local }) => ({
          time: data.replace('Data  : ', '').split(' ', 1),
          // time: data,
          title: status,
          description: renderDescription(origem, destino, local),
        })
      );

      setData(formatedData);
    }

    getDetails();
  }, []);

  return (
    <>
      <Container>
        <View style={styles.logo}>
          <Image source={logoLight} />
        </View>
        <Timeline
          style={styles.list}
          data={data}
          separator={true}
          lineColor='#F45B69'
          timeStyle={styles.time}
          circleColor='#F45B69'
          innerCircle={'dot'}
          circleSize={18}
          options={{ paddingTop: 5 }}
          columnFormat={'single-column-left'}
          titleStyle={styles.title}
          separatorStyle={styles.separator}
        />
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 20,
  },
  time: {
    fontSize: 12,
    color: 'rgba(244,255,255, 0.8)',
    padding: 5,
    overflow: 'hidden',
  },
  title: {
    color: 'rgba(244,255,255, 1)',
    marginBottom: 10,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    backgroundColor: 'rgba(244,91,105, 0.3)',
  },
});
