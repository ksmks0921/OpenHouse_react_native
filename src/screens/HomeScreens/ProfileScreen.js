import React, { Component } from 'react';
import Timer from 'react-timer-mixin';
import ImageResizer from 'react-native-image-resizer';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import Orientation from 'react-native-orientation'
import connect from 'react-redux/es/connect/connect';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  TextInput,
  Alert,
  FlatList,
  Linking,
} from 'react-native';
import { Button, Icon } from 'native-base';
import { Images, Fonts, Constants } from '@commons';
import Image from 'react-native-image-progress';
// import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
import DialogInput from 'react-native-dialog-input';
import { SearchBar, Input, Avatar } from 'react-native-elements';
import { ProgressCircle, CircleSnail } from '@components';
import Modal from 'react-native-modalbox';
import { white, red } from 'ansi-colors';
import { AuthService } from '@services';
import ImagePicker from 'react-native-image-picker';

const _keyExtractor = item => item.uniqueid;

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Update Profile Information',
      headerTitleStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
      },
      headerRight: (
        <TouchableOpacity
          style={{
            marginRight: 20,
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          onPress={navigation.getParam('logout')}>
          {/* <Icon type="AntDesign" name="pluscircle" style={{color:'#2D3ABF'}}/> */}
          <Text style={{ color: '#0000ff', fontSize: 17 }}>{params.ProfileChange ? "Save" : ""}</Text>
        </TouchableOpacity>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      profile_info: {},
      flag: false,
      set_flag: false,
      key_flag: false,
      photo_url: '',
      first_name: '',
      last_name: '',
      agent_title: '',
      email_adress: '',
      cell_number: '',
      broker_name: '',
      spinner: false,
      ProfileChange: false
    };
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    this._saveprofile = this._saveprofile.bind(this);
    this.LoadProfile = this.LoadProfile.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
    console.log(this.state.photo_url);

    if (this.props.dashboard.status === 255) {
      if (Constants.updateFlag === 1) {
        this.setState({
          spinner: false,
        });

        Constants.updateFlag = 0;
      }
    }
    if (this.props.login.profileinfostatus === 200) {
    }
  }
  
  async LoadProfile() {
    var info = await AuthService.authlogin(
      Constants.user_mail,
      Constants.user_password,
    );
    var data = info[0];

    console.log("LoadProfile", data);
    if (info[0].agent_photo_url === null) {
      this.setState({ flag: true });
    }

    if (this.state.set_flag == false) {
      this.setState({
        profile_info: data,
        first_name: data.agent_first_name,
        last_name: data.agent_last_name,
        agent_title: data.agent_title,
        email_adress: data.agent_email,
        cell_number: data.agent_cellphone,
        broker_name: data.agent_office_name,
        account_num: data.account_num,

      });
      Constants.first_name = data.agent_first_name;
      Constants.last_name = data.agent_last_name;
      Constants.agent_title = data.agent_title;
      Constants.email_adress = data.agent_email;
      Constants.cell_number = data.agent_cellphone;
      Constants.broker_name = data.agent_office_name;
      Constants.account_num = data.account_num;
    }
  }


  async componentDidMount() {
    console.log("componentDidMount");

    this.LoadProfile();
    if (this.state.photo_url == null) {
      this.setState({ photo_url: Images.avataricon })
    }
    this.props.navigation.setParams({ logout: this._saveprofile });
  }

  componentWillUnmount() { }

  _saveprofile = () => {
    const {
      first_name,
      last_name,
      cell_number,
      broker_name,
      agent_title,
    } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!first_name || first_name.length < 3) {
      Alert.alert('Please Enter A Valid First Name', '');
    } else if (!last_name || last_name.length < 3) {
      Alert.alert('Please Enter A Valid Last Name', '');
    } else if (!agent_title || agent_title.length < 3) {
      Alert.alert('Please Enter A Valid Agent Title', '');
    } else if (!cell_number || cell_number.length < 10) {
      Alert.alert('Please Enter A Valid Telephone Number', '');
    } else if (!broker_name || broker_name.length < 3) {
      Alert.alert('Please Enter A Valid Broker Name', '');
    } else {
      this.setState({ set_flag: true });
      this.setState({ spinner: true });
      Constants.updateFlag = 1;
      this.props.update_profile(
        Constants.first_name,
        Constants.last_name,
        Constants.cell_number,
        Constants.broker_name,
        Constants.agent_title,
      );
    }
  };

  changePhoto = () => {
    var options = {
      title: 'Select Image',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        alert('User cancelled image picker');
      } else if (response.error) {
        alert('error1');
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
        alert('error2');
      } else {

        ImageResizer.createResizedImage(response.uri, 100, 100, 'JPEG', 100).then((res) => {
          this.setState({ spinner: true });
          console.log("ImageResizer", res);

          let source = { uri: res.uri };

          this.setState({
            filePath: source,
          });
          let filename = Constants.account_num + '.jpg';
          let body = new FormData();

          body.append('filetoupload', {
            uri:
              Platform.OS === 'android'
                ? source.uri
                : source.uri.replace('file://', ''),
            name: filename,
            type: 'image/jpg',
          });

          body.append('objectid', Constants.account_num);
          body.append('phototype', 'a');
          console.log(body);

          fetch("http://www.openhousemarketingsystem.com/application/v3/uploadimage.php", {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: body,
          }).then((response) => response.json())
            .then(res => {
              // console.log(res);
              // console.log(res[0].photourl);

              this.setState({ spinner: false });
              this.LoadProfile();
            })
            .done();
        })
      }
    });
  };
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }

  firstNameChange = (first_name) => {
    this.setState({ first_name });
    Constants.first_name = first_name;
    const { ProfileChange } = this.state
    this.props.navigation.setParams({
      ProfileChange
    })
    this.setState({ ProfileChange: true })
  }

  lastNameChange = (last_name) => {
    this.setState({ last_name });
    Constants.last_name = last_name;
    const { ProfileChange } = this.state
    this.props.navigation.setParams({
      ProfileChange
    })
    this.setState({ ProfileChange: true })
  }

  phoneNameChange = (cell_number) => {
    this.setState({ cell_number });
    Constants.cell_number = cell_number;
    const { ProfileChange } = this.state
    this.props.navigation.setParams({
      ProfileChange
    })
    this.setState({ ProfileChange: true })
  }

  brokerNameChange = (broker_name) => {
    this.setState({ broker_name });
    Constants.broker_name = broker_name;
    const { ProfileChange } = this.state
    this.props.navigation.setParams({
      ProfileChange
    })
    this.setState({ ProfileChange: true })
  }

  TitleChange = (agent_title) => {
    this.setState({ agent_title });
    Constants.agent_title = agent_title;
    const { ProfileChange } = this.state
    this.props.navigation.setParams({
      ProfileChange
    })
    this.setState({ ProfileChange: true })
  }
  render() {
    // alert(this.state.profile_info);

    return (
      <View style={{ flex: 1 }} onLayout={this._onLayout}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Updating Profile Information'}
          textStyle={styles.spinnerTextStyle}
        />

        <TouchableOpacity
          style={styles.Img_position}
          onPress={() => this.changePhoto()}>
          <Avatar
            containerStyle={{ borderColor: '#808080', borderWidth: 0.1 }}
            size={75}
            rounded
            // source={{ uri: `${item.event_photo_url}?${new Date()}` }}
            source={{ uri: `${this.state.profile_info.agent_photo_url}?${new Date()}`  }}
             />
        </TouchableOpacity>

        <Text style={styles.field_txt}>First Name</Text>
        <TextInput style={{ borderWidth: 0.2, borderColor: 'white', fontSize: 14, borderBottomColor: '#808080', height: 40, width: '95%', alignSelf: 'center' }}
          value={this.state.first_name}
          onChangeText={(first_name) => this.firstNameChange(first_name)}>
        </TextInput>

        <Text style={styles.field_txt}>Last Name</Text>
        <TextInput style={{ borderWidth: 0.2, borderColor: 'white', fontSize: 14, borderBottomColor: '#808080', height: 40, width: '95%', alignSelf: 'center' }}
          value={this.state.last_name}
          onChangeText={(last_name) => this.lastNameChange(last_name)}>
        </TextInput>

        <Text style={styles.field_txt}>Title</Text>
        <TextInput style={{ borderWidth: 0.2, borderColor: 'white', fontSize: 14, borderBottomColor: '#808080', height: 40, width: '95%', alignSelf: 'center' }}
          value={this.state.agent_title}
          onChangeText={(agent_title) => this.TitleChange(agent_title)} />
        <Text style={styles.field_txt}>Email Address</Text>
        <View style={{ borderWidth: 0.2, borderColor: 'white', fontSize: 14, borderBottomColor: '#808080', height: 40, width: '95%', alignSelf: 'center', }}>
          <Text style={{ marginTop: 10 }}>{this.state.email_adress}</Text>
        </View>

        <Text style={styles.field_txt}>Cellphone Number</Text>
        <TextInput keyboardType={'numeric'} style={{ borderWidth: 0.2, borderColor: 'white', fontSize: 14, borderBottomColor: '#808080', height: 40, width: '95%', alignSelf: 'center' }}
          value={this.state.cell_number}
          onChangeText={(cell_number) => this.phoneNameChange(cell_number)}>
        </TextInput>

        <Text style={styles.field_txt}>Office or Brokers Name</Text>
        <TextInput style={{ borderWidth: 0.2, borderColor: 'white', fontSize: 14, borderBottomColor: '#808080', height: 40, width: '95%', alignSelf: 'center' }}
          value={this.state.broker_name}
          onChangeText={(broker_name) => this.brokerNameChange(broker_name)} />
      </View>
    );
  }
}

const styles = {
  field_txt: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
    color: 'red',
  },
  Img_position: {
    marginTop: 10,
    alignContent: 'center',
    alignSelf: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: Actions.logout,
      setpropertyitem: Actions.setpropertyitem,
      sethousehandletype: Actions.sethousehandletype,
      update_profile: Actions.updateprofile,
      profile_login: Actions.profile_login,
    },
    dispatch,
  );
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
)(ProfileScreen);
