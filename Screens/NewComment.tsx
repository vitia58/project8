import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {FieldComponent} from '../Components/Field';
import {OpacityView} from '../Components/OpacityView';
export function CommentWidget({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [fio, setFio] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isFioCorrect, setFioCorrect] = useState(false);
  const [isEmailCorrect, setEmailCorrect] = useState(false);
  const [isCommentCorrect, setCommentCorrect] = useState(false);
  const [isSending, setSending] = useState(false);
  const {article} = route.params;
  const onGoBack = route.params.onGoBack;

  useEffect(() => {
    const sp = fio.split(' ');
    if (
      fio.length > 5 &&
      fio.length < 50 &&
      sp.length > 2 &&
      sp[0].length > 2 &&
      sp[1].length > 2 &&
      sp[2].length > 2
    ) {
      setFioCorrect(true);
    } else {
      setFioCorrect(false);
    }
  }, [fio]);
  useEffect(() => {
    const sp = email.split('@');
    if (
      email.length > 5 &&
      email.length < 50 &&
      sp.length === 2 &&
      sp[0].length > 3 &&
      sp[1].length > 3
    ) {
      setEmailCorrect(true);
    } else {
      setEmailCorrect(false);
    }
  }, [email]);
  useEffect(() => {
    if (comment.length > 4 && comment.length < 150) {
      setCommentCorrect(true);
    } else {
      setCommentCorrect(false);
    }
  }, [comment]);
  return (
    <View style={styles.mainView}>
      <View style={styles.cardLine}>
        <FieldComponent
          name={'Фио'}
          onChange={setFio}
          isCorrect={isFioCorrect}
          maxLength={50}
          multiline={false}
        />
        <FieldComponent
          name={'Email'}
          onChange={setEmail}
          isCorrect={isEmailCorrect}
          maxLength={50}
          multiline={false}
        />
        <FieldComponent
          name={'Comment'}
          onChange={setComment}
          isCorrect={isCommentCorrect}
          maxLength={150}
          multiline={true}
        />
      </View>
      <OpacityView
        style={styles.sendDiv}
        visible={
          isFioCorrect && isEmailCorrect && isCommentCorrect && !isSending
        }>
        <View
          style={styles.send}
          onTouchStart={() => {
            if (isFioCorrect && isEmailCorrect && isCommentCorrect) {
              setSending(true);
              addComment({
                article: article,
                fio: fio,
                comment: comment,
                email: email,
              }).then(() => {
                onGoBack();
                navigation.goBack();
              });
            }
          }}>
          <Image
            style={styles.sendImage}
            source={require('../icons/send.png')}
          />
        </View>
      </OpacityView>
    </View>
  );
}
async function addComment({
  article,
  fio,
  comment,
  email,
}: {
  article: any;
  fio: any;
  comment: any;
  email: any;
}) {
  const init = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: article,
      fio: fio,
      email: email,
      comment: comment,
    }),
  };
  //fetch('http://93.79.41.156:3000/comment', init);
  return await fetch('http://93.79.41.156:3200/comment', init);
}
const styles = StyleSheet.create({
  sendDiv: {
    alignItems: 'flex-end',
    margin: 20,
  },
  send: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#08F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendImage: {
    width: 40,
    height: 40,
  },
  cardLine: {
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: '#08F',
    borderWidth: 1,
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
  mainView: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
  },
});
