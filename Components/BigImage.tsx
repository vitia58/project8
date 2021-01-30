import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
type Img = {
  height: number;
  url: string;
  cache: {width: number; height: number};
};
type URI = {
  uri: string;
};
export class FullImage extends Component<URI, Img> {
  /*state: Readonly<Img> = {
    height: 400,
    url: this.props.uri,
    cache: {width: 0, height: 0},
  };*/
  constructor(props: URI) {
    super(props);
    this.state = {
      height: 400,
      url: this.props.uri,
      cache: {width: 0, height: 0},
    };
    Dimensions.addEventListener('change', () => {
      this.componentDidMount();
    });
  }
  componentDidMount() {
    //console.log('12345');
    const gotSize = () => {
      const srcHeight: number = this.state.cache.height;
      const srcWidth: number = this.state.cache.width;
      const ratio: number =
        (srcHeight * (Dimensions.get('window').width - 400)) / srcWidth;
      if (ratio !== this.state.height) {
        this.setState({
          height: ratio,
          cache: {width: srcWidth, height: srcHeight},
        });
      }
      /*console.log(
        Dimensions.get('window').width,
        ' ',
        ratio,
        ' ',
        srcWidth,
        ' ',
        srcWidth,
        ' ',
        this.props.source.uri,
      );*/
    };
    if (this.state.cache.height === 0 && this.state.cache.width === 0) {
      Image.getSize(
        this.props.uri,
        (srcWidth, srcHeight) => {
          this.setState({
            cache: {width: srcWidth, height: srcHeight},
          });
          gotSize();
        },
        (error) => {
          console.log('error:', error);
        },
      );
    } else {
      gotSize();
    }
  }
  /*shouldComponentUpdate({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nextProps,
    nextState,
  }: {
    nextProps: ComponentState;
    nextState: ComponentState;
  }) {
    return nextState.height !== this.state.height;
  }*/
  render() {
    //console.log(this.props.source.uri, '  12345');
    let height: number = 400;
    if (this.state != null) {
      height = this.state.height;
    }
    return (
      <Image
        //width={this.state.width}
        //height={500}
        style={[styles.tinyLogo, {height: height}]}
        source={{
          uri: this.props.uri,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  tinyLogo: {
    flex: 1,
    borderRadius: 10,
    padding: 5,
    resizeMode: 'contain',
    marginHorizontal: 200,
  },
});
