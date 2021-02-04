import React, {useState} from 'react';
import {
  RefreshControl,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';
import {getData} from './Connection';
import {FullImage} from '../Components/BigImage';
import {Card} from '../Components/Card';

let articleRandom = 0;
export function Article({route, navigation}: {route: any; navigation: any}) {
  const [LoadingArticle, setLoadingArticle] = useState(true);
  const [ArticleText, setArticle] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [comments, setComment] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const {article, title, text, reloadRandom} = route.params;
  navigation.setOptions({title: title});
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getData('article' + article, setArticle, setLoadingArticle);
    getData('comments' + article, setComment, setLoadingComments);
    setRefreshing(false);
  }, [article]);
  if (reloadRandom !== articleRandom) {
    onRefresh();
    articleRandom = reloadRandom;
  }
  return (
    <View>
      {LoadingArticle || loadingComments ? (
        body(text)
      ) : (
        <FlatList
          data={ArticleText}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}: {item: {title: String; text: String}}) => {
            navigation.setOptions({
              title: item.title,
              headerTitleStyle: {alignSelf: 'center', paddingRight: 50},
            });
            return (
              <View>
                {body(item.text)}
                {getComments({
                  comments: comments,
                  navigation: navigation,
                  article: article,
                  onRefresh: onRefresh,
                })}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
function body(text: any) {
  const texts = text.split('">');
  return (
    <FlatList
      data={texts}
      keyExtractor={({id}) => id}
      renderItem={({item}) => {
        const strings = item.split('<img src="');
        if (strings.length === 2) {
          return (
            <View>
              <Text style={styles.text}>{strings[0]}</Text>
              <View>
                <FullImage uri={strings[1]} />
              </View>
            </View>
          );
        } else {
          return <Text style={styles.text}>{strings[0]}</Text>;
        }
      }}
    />
  );
}
let lastClick = 0;
function getComments({
  comments,
  navigation,
  article,
  onRefresh,
}: {
  comments: any;
  navigation: any;
  article: any;
  onRefresh: any;
}) {
  return (
    <View>
      <Text style={styles.commentsTitle}>Коментарии: </Text>
      <Card
        onTouchStart={() => {
          lastClick = Date.now();
        }}
        onTouchEnd={() => {
          if (lastClick + 200 > Date.now()) {
            navigation.navigate('Comment', {
              article: article,
              onGoBack: () => {
                if (onRefresh != null) {
                  onRefresh();
                }
              },
            });
          }
        }}>
        <View style={styles.image}>
          <Image
            style={styles.cardIcon}
            source={require('../icons/comment.png')}
          />
          <Text style={styles.newCommentText}>Оставить свой</Text>
        </View>
      </Card>
      <FlatList
        data={comments}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <View style={styles.cardLine}>
            <View style={styles.card}>
              <Text>{item.name}</Text>
              <Text>{item.time}</Text>
            </View>
            <Text>{item.comment}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    textAlign: 'justify',
    padding: 25,
  },
  newCommentText: {
    fontSize: 22,
    justifyContent: 'center',
  },
  cardLine: {
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 8,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  image: {
    flexDirection: 'row',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginRight: 30,
    //justifyContent: 'center',
  },
  commentsTitle: {
    fontSize: 26,
    textAlign: 'center',
  },
  tinyLogo: {
    flex: 1,
    borderRadius: 10,
    padding: 5,
    resizeMode: 'contain',
    marginHorizontal: 200,
  },
});
