import React, { Component } from 'react';
import Timer from 'react-timer-mixin';
import Orientation from 'react-native-orientation'
import * as Actions from '../../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

import {
  Button,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
} from 'native-base';
import { Images, Fonts, Constants } from '@commons';
// import Image from 'react-native-image-progress';
import UUIDGenerator from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';
import Layouts from '../../../common/Layoutsd';

class BrokerOneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  componentDidMount() { }

  componentWillUnmount() { }
  componentDidUpdate(prevProps, prevState) { }
  gobackdashboard = () => {
    this.props.navigation.goBack();
  };
  locationbtn = () => {
    Constants.bestsellingfeatures.push('Location');
    this.props.navigation.navigate('brokerTwoScreen');
  };
  taxesbtn = () => {
    Constants.bestsellingfeatures.push('Listing Price and Taxes');
    this.props.navigation.navigate('brokerTwoScreen');
  };
  districtbtn = () => {
    Constants.bestsellingfeatures.push('School District');
    this.props.navigation.navigate('brokerTwoScreen');
  };
  valuebtn = () => {
    Constants.bestsellingfeatures.push('Overall Appeal and Value');
    this.props.navigation.navigate('brokerTwoScreen');
  };
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  render() {
    if (Constants.device_Pad) {
      return (
        <ImageBackground
          source={Images.siginbackgroundimage}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          resizeMode="cover"
        >
          <View style={{
            position: 'absolute',
            top: 10,
            left: 20,
          }}>
            <TouchableOpacity
              style={styles.lockbtnview}
              onPress={this.gobackdashboard}>
              <Text style={{
                fontFamily: Fonts.bodonitalic,
                fontSize: Layouts.TEXT_FONT_SIZE_NORMAL,
              }}>Back</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 6, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '95%', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: Layouts.MARGIN_LARGE, marginBottom: Layouts.MARGIN_LARGE }}>
                <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_BIG, fontWeight: 'bold', textAlign: 'center' }}>
                  What Is The Best Selling Features
              </Text>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: Layouts.MARGIN_LARGE, flexWrap: 'wrap' }}>
                <View style={[styles.imgcontainer, { width: '45%' }]}>
                  <Button style={[styles.btn, { height: Layouts.BIG_BUTTON_HEIGHT, justifyContent: 'center' }]} onPress={() => this.locationbtn()}>
                    <Text style={[{ color: 'white', fontSize: Layouts.TEXT_FONT_SIZE_BIG }]}>Location</Text>
                  </Button>
                </View>
                <View style={[styles.imgcontainer, { width: '45%' }]}>
                  <Button style={[styles.btn, { height: Layouts.BIG_BUTTON_HEIGHT, justifyContent: 'center' }]} onPress={() => this.taxesbtn()}>
                    <Text style={[{ color: 'white', fontSize: Layouts.TEXT_FONT_SIZE_BIG }]}>Listing Price and Taxes</Text>
                  </Button>
                </View>
                <View style={[styles.imgcontainer, { width: '45%' }]}>
                  <Button style={[styles.btn, { height: Layouts.BIG_BUTTON_HEIGHT, justifyContent: 'center' }]} onPress={() => this.districtbtn()}>
                    <Text style={[{ color: 'white', fontSize: Layouts.TEXT_FONT_SIZE_BIG }]}>Scholl District</Text>
                  </Button>
                </View>
                <View style={[styles.imgcontainer, { width: '45%' }]}>
                  <Button style={[styles.btn, { height: Layouts.BIG_BUTTON_HEIGHT, justifyContent: 'center' }]} onPress={() => this.valuebtn()}>
                    <Text style={[{ color: 'white', fontSize: Layouts.TEXT_FONT_SIZE_BIG }]}>Overall Appleal and Value</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ flex: 2, width: '100%' }}>
            <View style={{
              position: 'absolute',
              bottom: Layouts.PROFILE_PART_BOTTOM,
              right: 0,
              width: Layouts.PROFIEL_PART_WIDTH,
              height: Layouts.PROFILE_PART_HEIGHT,
              backgroundColor: '#8c8c8c',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={{
                width: Layouts.PROFILE_PART_HEIGHT,
                height: Layouts.PROFILE_PART_HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <View style={{
                  width: Layouts.PROFIEL_PART_AVARTA_SIZE,
                  height: Layouts.PROFIEL_PART_AVARTA_SIZE,
                  borderRadius: Layouts.PROFIEL_PART_AVARTA_SIZE / 2,
                  // resizeMode:'contain'
                  backgroundColor: 'green'
                }}>
                  <Image
                    source={{ uri: this.props.login.account.agent_photo_url }}
                    style={{
                      width: Layouts.PROFIEL_PART_AVARTA_SIZE,
                      height: Layouts.PROFIEL_PART_AVARTA_SIZE,
                      borderRadius: Layouts.PROFIEL_PART_AVARTA_SIZE / 2,
                      // resizeMode:'contain'
                    }}
                  />
                </View>
              </View>
              <View style={[styles.textdetail, { marginLeft: 50 }]}>
                <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_SMALL, color: 'white' }}>
                  {this.props.login.account.agent_first_name}{' '}
                  {this.props.login.account.agent_last_name}
                </Text>
                <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_SMALL, color: 'white' }}>
                  {this.props.login.account.agent_title}
                </Text>
                <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_SMALL, color: 'white' }}>
                  {this.props.login.account.agent_office_name}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          source={Images.siginbackgroundimage}
          style={styles.container}
          resizeMode="cover"
          onLayout={this._onLayout}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.lockbtnview}
              onPress={this.gobackdashboard}>
              <Text style={styles.backtxt}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formviewcontainer}>
            <View style={styles.imgcontainer1}>
              <Text style={{ fontSize: 16, marginTop: 10, fontWeight: 'bold' }}>
                What Is The Best Selling Features
            </Text>
            </View>
            <View style={styles.imgcontainer1}>
              <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: 'bold' }}>Of This Property?</Text>
            </View>
            <View style={styles.imgcontainer}>
              <Button block style={styles.btn} onPress={() => this.locationbtn()}>
                <Text style={styles.btntxt}>Location</Text>
              </Button>
            </View>
            <View style={styles.imgcontainer}>
              <Button block style={styles.btn} onPress={() => this.taxesbtn()}>
                <Text style={styles.btntxt}>Listing Price and Taxes</Text>
              </Button>
            </View>
            <View style={styles.imgcontainer}>
              <Button block style={styles.btn} onPress={() => this.districtbtn()}>
                <Text style={styles.btntxt}>Scholl District</Text>
              </Button>
            </View>
            <View style={styles.imgcontainer}>
              <Button block style={styles.btn} onPress={() => this.valuebtn()}>
                <Text style={styles.btntxt}>Overall Appleal and Value</Text>
              </Button>
            </View>
          </View>

          <View style={styles.profileview}>
            <View style={styles.profilelogview}>
              <Image
                source={{ uri: this.props.login.account.agent_photo_url }}
                style={styles.lockimg1}
              />
            </View>
            <View style={styles.textdetail}>
              <Text style={styles.textitem}>
                {this.props.login.account.agent_first_name}{' '}
                {this.props.login.account.agent_last_name}
              </Text>
              <Text style={styles.textitem}>
                {this.props.login.account.agent_title}
              </Text>
              <Text style={styles.textitem}>
                {this.props.login.account.agent_office_name}
              </Text>
            </View>
          </View>
        </ImageBackground>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  lockbtnview: {
    width: 70,
    height: 50,
    marginTop: 35,
    marginRight: 10,
  },
  lockimg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  lockimg1: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // resizeMode:'contain'
  },
  formviewcontainer: {
    width: '100%',
    height: 350,
    position: 'absolute',
    top: 160,
    // alignSelf:'center',
    // justifyContent:'center',
  },
  officelog: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  imgcontainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imgcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#38a2c2',
    width: '90%',
    height: 90,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 21,
  },
  txtitem: {
    width: '90%',
    fontSize: 7,
    textAlign: 'center',
  },
  profileview: {
    position: 'absolute',
    height: 60,
    width: '70%',
    bottom: 30,
    right: 0,
    backgroundColor: '#8c8c8c',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilelogview: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'white',
    marginLeft: 10,
  },
  textdetail: {
    flexDirection: 'column',
    // alignItems:'center',
    marginLeft: 10,
  },
  textitem: {
    fontSize: 10,
    color: 'white',
  },
  backtxt: {
    fontFamily: Fonts.bodonitalic,
    marginTop: 15,
    fontSize: 18,
    //
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ login, dashboard }) {
  return {
    login: login,
    dashboard: dashboard,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BrokerOneScreen);
