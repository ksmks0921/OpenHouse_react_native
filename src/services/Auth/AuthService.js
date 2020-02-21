import axios from 'axios';
import { Constants } from '@commons';
import promiseTimeout from './../timeout'
import RNFetchBlob from 'rn-fetch-blob';
import DeviceInfo from 'react-native-device-info';

let deviceid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) ;

const axios_instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
});
const axios_instance1 = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
});


class AuthService {
  // ok
  authlogin = (email, password) => {
    console.log('==============================  login  ==============================');
    let bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    bodyFormData.append('table', 'login');
    bodyFormData.append('deviceid', deviceid);


    return new Promise((resolve, reject) => {
      axios_instance1
        .post( `${Constants.POST_BASE_API_URL}`, bodyFormData)
        .then(res => {
          if (res.status === 200) {
            resolve(res.data);
            console.log("bodyFormData", bodyFormData);
          } else if (res.status !== 200) {
            console.log("Login error!!");

            reject(res.data);
          }
        })
        .catch(error => {
          resolve(error);
        });
    })
  };

  //used, no given 
  authupdate = () => {
    console.log('============================== authupdate   & mls_organizations =================================');
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`${Constants.BASE_API_URL}/mls_organizations.php`)
        .then(res => {
          if (res.status === 200) {
            resolve(res.data);
            // alert(res.data);
            Constants.MlsData = res.data;
          } else if (res.status !== 200) {
            reject(res.data);
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  // used in Profile, no given
  profile_login = (email, password) => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/login.php?email=${email}&password=${password}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve(res.data);
          } else if (res.status !== 200) {
            reject(res.data);
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  // okay
  authdownloadstationlist = () => {
    console.log('============================== statelist =================================');
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`${Constants.GET_BASE_API_URL}?table=${"statelist"}&deviceid=${deviceid}`)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  //okay
  authdownloadmortgage = (advertisingid, accountnum) => {
    console.log('============================== AuthService mortgage =================================');
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.GET_BASE_API_URL}?accountnum=${accountnum}&table=${"mortgage"}&deviceid=${deviceid}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  // used no given
  authdownloaddisclosure = (accountnum, state) => {
    console.log('============================== AuthService authdownloaddisclosure =================================');
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/prefillpdf.php?accountnum=${accountnum}&state=${state}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  //okay
  authdownloadProperties = accountnum => {
    console.log('============================== AuthService properties =================================');
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.GET_BASE_API_URL}?accountnum=${accountnum}&table=${"properties"}&deviceid=${deviceid}`,
        )
        .then(res => {
          if (res.status === 200) {
            var imageData = res.data;
            const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir;
            imageData.map((img,index)=>{
              let pdflocation = DocumentDir  + '/' + img.uniqueid + '.jpg';
              RNFetchBlob.fs.exists(pdflocation)
              .then((exists)=>{
                if(exists){

                }else{
                  RNFetchBlob.fetch('GET', img.property_photo_url)
                  .then((res) => {
    
                    let base64Str = res.data;
                    
                    RNFetchBlob.fs.writeFile(pdflocation, base64Str, 'base64').then(() => { 
                      console.log("downloaddata" + index);  
                      if (index == imageData.length - 1){
                         
                       }

                    });
                     
                })
                }
              })
              .catch(()=>{})
             
            })
            console.log("AuthService properties", res.data);
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  // used, no given, in properties 
  authdownloadPropertyAttende = accountnum => {
    console.log('============================== AuthService authdownloadPropertyAttende & get_oh_attendees =================================');

    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/get_oh_attendees.php?accountnum=${accountnum}`,
          // `${Constants.GET_BASE_API_URL}?accountnum=${accountnum}&table=${"eventsattendees"}&deviceid=${deviceid}`,
        )
        .then(res => {
          if (res.status === 200) {
            
            resolve({ data: res.data, IsSuccess: true });

            console.log("success");
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {

          resolve(error);
        });
    });
  };

  //used, no given
  authdownloadPropertyBrokerAttende = accountnum => {
    console.log('============================== AuthService authdownloadPropertyBrokerAttende get_broker_oh_attendees=================================');
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/get_broker_oh_attendees.php?accountnum=${accountnum}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

    // okay
  authdownloadEvent = accountnum => {
    console.log('============================== AuthService & events =================================');

    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          // `${Constants.BASE_API_URL}/list_events.php?accountnum=${accountnum}`,
          `${Constants.GET_BASE_API_URL}?accountnum=${accountnum}&table=${"events"}&deviceid=${deviceid}`,
        )
        .then(res => {
          if (res.status === 200) {

            var imageData = res.data;
            const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir;
            imageData.map((img,index)=>{
              let pdflocation = DocumentDir  + '/event/' + img.event_id + '.jpg';
              RNFetchBlob.fs.exists(pdflocation)
              .then((exists)=>{
                if(exists){

                }else{
                  RNFetchBlob.fetch('GET', img.event_photo_url)
                  .then((res) => {
    
                    let base64Str = res.data;
                    
                    RNFetchBlob.fs.writeFile(pdflocation, base64Str, 'base64').then(() => { 
                      // console.log("downloaddata" + index);  
                      if (index == imageData.length - 1){
                         
                       }

                    });
                     
                })
                }
              })
              .catch(()=>{})
             
            })
            resolve({ data: res.data, IsSuccess: true });
            console.log(res.data, res.status);
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
            console.log(res.data, res.status);

          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  // okay
  authdownloadEventAttend = accountnum => {
    console.log('============================== AuthService & eventsattendees =================================');

    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.GET_BASE_API_URL}?accountnum=${accountnum}&table=${"eventsattendees"}&deviceid=${deviceid}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  //okay
  authdownloadMLSLinkAccount = accountnum => {
    console.log('============================== AuthService agent_linked_mls  =================================');
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          // `${Constants.BASE_API_URL}/agent_linked_mls.php?accountnum=${accountnum}`,
          `${Constants.GET_BASE_API_URL}?accountnum=${accountnum}&table=${"linkedmls"}&deviceid=${deviceid}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  
  // 
  authrequestpassword = email => {
    console.log('==============================AuthService & forgotpassword  =================================');

    let bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('table', 'forgotpassword');
    bodyFormData.append('deviceid', deviceid);

    return new Promise((resolve, reject) => {
      axios_instance
        .post(`${Constants.POST_BASE_API_URL}`, bodyFormData)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
            console.log(res.data);
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
//
  authgetRealtortitles = () => {
    console.log('============================== AuthService & realtortitles  =================================');
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`${Constants.GET_BASE_API_URL}?table=${"realtortitles"}&deviceid=${deviceid}`)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };


  // updated
  authgetbrokersname = () => {
    console.log('============================== AuthService & brokersname  =================================');
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`${Constants.GET_BASE_API_URL}?accountnum=${"0"}&table=${"brokersname"}`)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  authgetorganizations = () => {
    console.log('============================== AuthService & mls_organizations  =================================');
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          // `${Constants.BASE_API_URL}/mls_organizations.php`
          `${Constants.GET_BASE_API_URL}?accountnum=${accountnum}&table=${"linkedmls"}&deviceid=${deviceid}`,
          
          )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  // okay 
  authcreateaccount = (
    firstname,
    lastname,
    cellphone,
    officetelephone,
    title,
    email,
    uniqueid,
    officename,
    mlsorganizationid,
    password,
    company_logo_url,
    device,
    appid,
  ) => {
    console.log('============================== Create a new account  =================================');

    let bodyFormData = new FormData();
    bodyFormData.append('table', 'newaccount');
    bodyFormData.append('deviceid', deviceid);
    bodyFormData.append('firstname', firstname);
    bodyFormData.append('lastname', lastname);
    bodyFormData.append('cellphone', cellphone);
    bodyFormData.append('password', password);
    bodyFormData.append('officename', officename);
    bodyFormData.append('title', title);
    bodyFormData.append('email', email);
    bodyFormData.append('appid', appid);
    bodyFormData.append('device', device);
    // bodyFormData.append('mlsorganizationid', '0');
    // bodyFormData.append('company_logo_url', company_logo_url);
    // bodyFormData.append('uniqueid', uniqueid);
    // bodyFormData.append('officetelephone', '');

    console.warn('########################')
    console.warn(bodyFormData)
    console.warn('########################')
    return new Promise((resolve, reject) => {
      axios_instance1
        .post(`${Constants.POST_BASE_API_URL}`, bodyFormData)
        .then(res => {

          console.warn('########################')
          console.warn(res)
          console.warn('########################')
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
            console.log(res.status, res.data, "true")
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
            console.log(res.status, res.data, "true")

          }
        })
        .catch(error => {
          console.log( "Something is wrong")

          resolve(error);
        });
    });
  };
}


const instance = new AuthService();
export default instance;
