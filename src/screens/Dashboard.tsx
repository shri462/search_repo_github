import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../constants/colors';
import {Text, Searchbar, ActivityIndicator, Snackbar} from 'react-native-paper';
import Loader from '../components/Loader';
import Results from '../components/Results';

type Repository = {
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

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Repository[]>([]);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number | undefined>(
    undefined,
  );
  const [visible, setVisible] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('');

  const onDismissSnackBar = () => setVisible(false);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  const searchRepositories = async () => {
    try {
      setIsloading(true);
      setSearchResults([]);
      setTotalResults(undefined);
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchQuery}${
          sortBy ? `&sort=${sortBy}` : ''
        }`,
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.items);
        setTotalResults(data.total_count);
      } else {
        setVisible(true);
        setErrMsg('Error fetching data from GitHub API');
      }
    } catch (error) {
      setVisible(true);
      setErrMsg(String(error));
    } finally {
      setIsloading(false);
    }
  };

  const clearSearchResults = () => {
    setSearchQuery('');
    setTotalResults(undefined);
    setSearchResults([]);
  };

  useEffect(() => {
    sortBy && searchRepositories();
  }, [sortBy]);

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 24, paddingTop: 12}}>
        <Text variant="headlineMedium" style={{color: colors.primary}}>
          Search Public Repo
        </Text>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{
            marginTop: 12,
          }}
          onSubmitEditing={searchRepositories}
          onClearIconPress={clearSearchResults}
        />
      </View>
      {isloading && <Loader />}
      {searchResults.length > 0 && (
        <Results
          totalResults={totalResults}
          searchResults={searchResults}
          showSortModal={showSortModal}
          setShowSortModal={setShowSortModal}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}
      {totalResults === 0 && (
        <Text variant="bodyMedium" style={{textAlign: 'center', marginTop: 24}}>
          No repositories found, try different keywords.
        </Text>
      )}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Dismiss',
        }}>
        {errMsg}
      </Snackbar>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});
