import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {getDateFormat} from '../utilities/date.utilities';

type Props = {
  data: {
    id: number;
    name: string;
    full_name: string;
    owner: {
      id: number;
      avatar_url: string;
      html_url: string;
    };
    html_url: string;
    description: string;
    created_at: string;
    updated_at: string;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    forks_count: number;
    score: number;
    watchers: number;
  };
};

const ResultCard = ({data}: Props) => {
  return (
    <Card style={{padding: 12, marginBottom: 12}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Avatar.Image size={64} source={{uri: data?.owner?.avatar_url}} />
        <Card.Content style={{flex: 1}}>
          <Text variant="titleMedium">{data?.full_name}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text variant="bodySmall">
              <Text variant="labelMedium">Stars:</Text> {data?.stargazers_count}
            </Text>
            <Text variant="bodySmall">
              <Text variant="labelMedium">Watchers:</Text>{' '}
              {data?.watchers_count}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text variant="bodySmall">
              <Text variant="labelMedium">Score:</Text> {data?.score}
            </Text>
            <Text variant="bodySmall">
              <Text variant="labelMedium">Forks:</Text> {data?.forks_count}
            </Text>
          </View>
        </Card.Content>
      </View>
      {data?.description && (
        <Text style={{marginTop: 8}} variant="bodyMedium">
          {data?.description}
        </Text>
      )}
      {data?.language && (
        <Text style={{marginTop: 8}} variant="bodySmall">
          <Text variant="labelMedium">Language:</Text> {data?.language}
        </Text>
      )}
      <Text
        style={{
          marginTop: 4,
        }}
        variant="bodySmall">
        <Text variant="labelMedium">Created At:</Text>{' '}
        {getDateFormat(data?.created_at, 'MMM DD, LT')}
      </Text>
      <Text
        style={{
          marginTop: 4,
        }}
        variant="bodySmall">
        <Text variant="labelMedium">Updated At:</Text>{' '}
        {getDateFormat(data?.updated_at, 'MMM DD, LT')}
      </Text>
    </Card>
  );
};

export default ResultCard;

const styles = StyleSheet.create({});
