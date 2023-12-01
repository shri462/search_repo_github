import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {IconButton, RadioButton, Text} from 'react-native-paper';
import ResultCard from './ResultCard';
import {colors} from '../constants/colors';
import BottomSheet from './modals/BottomSheet';

type Props = {
  totalResults: number | undefined;
  searchResults: {
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
  }[];
  showSortModal: boolean;
  setShowSortModal: React.Dispatch<React.SetStateAction<boolean>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
};

const sortByValues = [
  {
    id: 1,
    label: 'Stars',
    value: 'stars',
  },
  {
    id: 2,
    label: 'Watchers',
    value: 'watchers_count',
  },
  {
    id: 3,
    label: 'Score',
    value: 'score',
  },
  {
    id: 4,
    label: 'Name',
    value: 'name',
  },
  {
    id: 5,
    label: 'Created At',
    value: 'created_at',
  },
  {
    id: 6,
    label: 'Updated At',
    value: 'updated_at',
  },
];

const Results = ({
  searchResults,
  totalResults,
  showSortModal,
  setShowSortModal,
  sortBy,
  setSortBy,
}: Props) => {
  const _renderItem = useCallback(({item}) => <ResultCard data={item} />, []);

  const onCheckRadio = (newValue: string) => {
    setSortBy(newValue);
    setShowSortModal(false);
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: 12,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text variant="bodySmall">
          <Text variant="labelMedium">Total repo found:</Text> {totalResults}
        </Text>
        <IconButton
          icon="sort"
          iconColor={colors.tertiary}
          size={20}
          onPress={() => setShowSortModal(true)}
        />
      </View>
      <FlatList
        contentContainerStyle={{padding: 12}}
        keyExtractor={item => String(item.id)}
        data={searchResults}
        renderItem={_renderItem}
      />
      <BottomSheet
        show={showSortModal}
        close={() => {
          setShowSortModal(false);
        }}>
        <RadioButton.Group onValueChange={onCheckRadio} value={sortBy}>
          {sortByValues.map(item => (
            <View
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Text variant="labelLarge">{item.label}</Text>
              <RadioButton value={item.value} />
            </View>
          ))}
        </RadioButton.Group>
      </BottomSheet>
    </>
  );
};

export default Results;

const styles = StyleSheet.create({});
