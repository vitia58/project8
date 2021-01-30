import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {getData} from './Connection';
import {Card} from '../Components/Card';
let loaded = false;
export function Articles({navigation}: {navigation: any}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getData('listarts', setData, setLoading);
    setRefreshing(false);
  }, []);
  if (!loaded) {
    loaded = true;
    onRefresh();
  }
  const [lastClick, setLastClick] = useState(0);
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          style={{height: '100%'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({
              item,
            }: {
              item: {id: string; title: string; text: string};
            }) => (
              <Card
                onTouchStart={() => setLastClick(Date.now())}
                onTouchEnd={() => {
                  if (lastClick + 450 > Date.now()) {
                    navigation.navigate('Article', {
                      article: item.id,
                      title: item.title,
                      text: item.text,
                      reloadRandom: Date.now(),
                    });
                  }
                }}>
                <View style={{flex: 1}}>
                  <Text style={styles.articleTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.articlePreload} numberOfLines={1}>
                    {item.text}
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Image
                    style={styles.cardIcon}
                    source={require('../icons/next.png')}
                  />
                </View>
              </Card>
            )}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardIcon: {
    width: 25,
    height: 25,
    //justifyContent: 'center',
  },
  articleTitle: {
    fontSize: 24,
  },
  articlePreload: {
    fontSize: 16,
    marginRight: 25,
  },
});
