import axios from 'axios';
import { Constants } from '@commons';
import DeviceInfo from 'react-native-device-info';

let deviceid = DeviceInfo.getDeviceId();

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


class DashboardService {
  doSomething = () => {
    console.log('============================== DashboardService doSomething =================================');

    return new Promise((resolve, reject) => {

    })
  }

  // okay
  getproperties = accountnum => {
    console.log('============================== DashboardService get_properties =================================');

    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.GET_BASE_API_URL}?accountnum=${accountnum}&table=${"properties"}&deviceid=${deviceid}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
            console.log("Sucesss", res.data);
          } else if (res.status !== 200) {
            console.log("Error");
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  // updated
  getevent = accountnum => {
    console.log('============================== DashboardService list_events =================================');
    console.log('getevent list_events', accountnum);

    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.GET_BASE_API_URL}?accountnum=${accountnum}&table=${"events"}&deviceid=${deviceid}`,
        )
        .then(res => {
          console.log(res);
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

  // okay in select Mortgage Partner
  getMortgage = (accountnum) => {
    console.log('============================== DashboardService mortgage =================================');
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.GET_BASE_API_URL}?accountnum=${accountnum}&table=${"mortgage"}&deviceid=${deviceid}`,
        )
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

  // okay used in linked MLS Accounts
  getmyboard = accountnum => {
    console.log('============================== DashboardService getmyboard & linkedmls =================================');

    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.GET_BASE_API_URL}?accountnum=${accountnum}&table=${"linkedmls"}&deviceid=${deviceid}`,
          // `${Constants.BASE_API_URL}/agent_linked_mls.php?accountnum=${accountnum}`,

        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
            console.log("Items for linked mls page****", res.data);
          } else if (res.status !== 200) {
            console.log("Items for linked mls page", "Errorrrrrrrrrr");

            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  // used not given, in lead management
  getelead = accountnum => {
    console.log('============================== DashboardService get_oh_attendees =================================');
    console.log('getelead get_oh_attendees', accountnum);

    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/get_oh_attendees.php?accountnum=${accountnum}`,
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

  unlinkaccount = (item, accountnum) => {
    //alert(accountnum);
    console.log("unlinkaccount", item);
    console.log('unlinkaccount accountnum', accountnum);

    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', accountnum);
    bodyFormData.append('agentid', item.agentid);
    bodyFormData.append('mlsorganizationid', item.mls_organization_id);
    bodyFormData.append('table', 'unlinkaccountfrommls');
    bodyFormData.append('deviceid', deviceid);


    console.log('============================== DashboardService unlinkaccount =================================');
    console.log("bodyFormData********************", bodyFormData);
    return new Promise((resolve, reject) => {
      axios_instance1
        .post(`${Constants.POST_BASE_API_URL}`, bodyFormData
        )
        .then(res => {
          if (res.status === 200) {
            var data = res.data[0];
            // alert(data);
            resolve({ data: res.data, IsSuccess: true });
            console.log("Unlink Result********************", res.data);

          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };



  searchLMSaccount = (item, accountnum, agent_id) => {
    console.log('============================== DashboardService searchLMSaccount & agentsearch=================================');

    return new Promise((resolve, reject) => {
      axios_instance1
        .get(
          `${Constants.GET_BASE_API_URL}?accountnum=${accountnum}&table=${"agentsearch"}&mlsorganizationid=${item.mls_organization_id}&agentid=${agent_id}&deviceid=${deviceid}`,
          )
        .then(res => {
          if (res.status === 200) {
            var data = res.data[0];
            // alert(data);
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

  LinkLMSaccount = (item, accountnum, mls_organization_id) => {
    console.log('============================== DashboardService get_agent_information_from_mls & LinkLMSaccount=================================');

    var password = '';
    return new Promise((resolve, reject) => {
      axios_instance1
        .get(
          `${Constants.BASE_API_URL}/get_agent_information_from_mls.php?accountnum=${accountnum}&mlsorganizationid=${mls_organization_id}&passsword=${password}&agentid=${item.agentid}`,
        )
        .then(res => {
          if (res.status === 200) {
            var data = res.data[0];
            // alert(data);
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

  // used not given in lead management
  getbroker = accountnum => {
    console.log('============================== DashboardService get_broker_oh_attendees & getbroker=================================');

    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/get_broker_oh_attendees.php?accountnum=${accountnum}`,
          // `${Constants.GET_BASE_API_URL}?accountnum=${accountnum}&table=${"eventsattendees"}&deviceid=${deviceid}`,

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
  update_partner = (accountnum, id) => {
    console.log('============================== DashboardService update_partner =================================');
    // console.log('getbroker accountnum', accountnum);
    // console.log('getbroker accountnum', id);

    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', accountnum);
    bodyFormData.append('advertisingid', id);
    bodyFormData.append('table', 'updatemortgagepartner');
    bodyFormData.append('deviceid', deviceid);

    return new Promise((resolve, reject) => {
      axios_instance
        .post(`${Constants.POST_BASE_API_URL}`, bodyFormData
        )
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

  createProperty = (
    accountnum,
    propertytype,
    propertyid,
    propertyaddress,
    propertycity,
    propertystate,
    propertyzipcode,
    propertyprice,
    propertytaxes,
  ) => {
    console.log('============================== DashboardService createProperty =================================');

    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', accountnum);
    bodyFormData.append('propertytype', propertytype);
    bodyFormData.append('propertyid', propertyid);
    bodyFormData.append('propertyaddress', propertyaddress);
    bodyFormData.append('propertycity', propertycity);
    bodyFormData.append('propertystate', propertystate);
    bodyFormData.append('propertyzipcode', propertyzipcode);
    bodyFormData.append('propertyprice', propertyprice);
    bodyFormData.append('propertytaxes', propertytaxes);
    bodyFormData.append('deviceid', deviceid);
    bodyFormData.append('table', "newproperty");
    bodyFormData.append('propertymlsid', "1");


    console.log('19101411#############');
    console.log(bodyFormData);
    return new Promise((resolve, reject) => {
      axios_instance1
      .post(`${Constants.POST_BASE_API_URL}`, bodyFormData)
      // .post(`${Constants.BASE_API_URL}/create_property.php`, bodyFormData)
        .then(res => {
          if (res.status === 200) {

            console.log(res.data);
            console.log('19101411#############')
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

  createevent = (data) => {
    console.log('============================== DashboardService createevent =================================');

    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', data.accountnum);
    bodyFormData.append('eventdate', data.eventdate);
    bodyFormData.append('eventname', data.eventname);
    bodyFormData.append('eventuniqueid', data.uniqueid);
    bodyFormData.append('table', "createnewevent");
    bodyFormData.append('advertisingid', data.advertisingid);
    bodyFormData.append('deviceid', deviceid);

console.log(data, bodyFormData);

    return new Promise((resolve, reject) => {
      axios_instance1
        // .post(`${Constants.BASE_API_URL}/create_event.php`, bodyFormData)
        .post(`${Constants.POST_BASE_API_URL}`, bodyFormData)
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
  
  // attendeefirstname: attendeefirstname,
  //       attendeelastname: attendeelastname,
  //       attendeeemail: attendeeemail,
  //       attendeetelephone: attendeetelephone,
  //       attendeebrokername: attendeebrokername,
  //       advertisingid: this.props.login.account.advertising_id,
  //       uniqueid: this.state.eventdata.event_uniqueid,
  //       eventid: this.state.eventdata.event_id,

  createnewattendeeevent = data => {
    console.log('============================== DashboardService createnewattendeeevent =================================');

    let bodyFormData = new FormData();
    bodyFormData.append('eventid', data.eventid);
    bodyFormData.append('table', "posteventattendee");
    bodyFormData.append('deviceid', deviceid);

    bodyFormData.append('accountnum', data.accountnum);
    bodyFormData.append('eventattendeefirstname', data.attendeefirstname);
    bodyFormData.append('eventattendeelastname', data.attendeelastname);
    bodyFormData.append('eventattendeeemail', data.attendeeemail);
    bodyFormData.append('eventattendeetelephone', data.attendeetelephone);
    bodyFormData.append('advertisingid', data.advertisingid);
    bodyFormData.append('eventattendeeuniqueid', data.uniqueid);

    return new Promise((resolve, reject) => {
      axios_instance1
      .post(`${Constants.POST_BASE_API_URL}`, bodyFormData)
      // .post(`${Constants.BASE_API_URL}/post_event_attendee.php`, bodyFormData)
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

  createnewattendeeagent = data => {
    console.log('============================== DashboardService createnewattendeeagent =================================');

    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', data.accountnum);
    bodyFormData.append('propertyrecordnum', data.propertyrecordnum);
    bodyFormData.append('attendeeagentfullname', data.attendeeagentfullname);
    bodyFormData.append('attendeeagenttelephone', data.attendeeagenttelephone);
    bodyFormData.append(
      'attendeeagentcompanyname',
      data.attendeeagentcompanyname,
    );
    bodyFormData.append('attendeefirstname', data.attendeefirstname);
    bodyFormData.append('attendeelastname', data.attendeelastname);
    bodyFormData.append('attendeeemail', data.attendeeemail);
    bodyFormData.append('attendeetelephone', data.attendeetelephone);
    bodyFormData.append(
      'attendeeworkingwithagentyesorno',
      data.attendeeworkingwithagentyesorno,
    );
    bodyFormData.append('advertisingid', data.advertisingid);
    bodyFormData.append('uniqueid', data.uniqueid);
    bodyFormData.append('attendeetype', data.attendeetype);
    return new Promise((resolve, reject) => {
      axios_instance1
        .post(
          `${Constants.BASE_API_URL}/post_public_oh_attendee_working_with_agent.php`,
          bodyFormData,
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
  updateprofile = (
    accountnum,
    firstname,
    lastname,
    cellphone,
    officename,
    title,
  ) => {
    console.log('============================== DashboardService updateaccount =================================');

    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', accountnum);
    bodyFormData.append('firstname', firstname);
    bodyFormData.append('lastname', lastname);
    bodyFormData.append('cellphone', cellphone);
    bodyFormData.append('officename', officename);
    bodyFormData.append('title', title);
    bodyFormData.append('table', 'updateaccount');
    bodyFormData.append('deviceid', deviceid);

    return new Promise((resolve, reject) => {
      axios_instance1
        .post(`${Constants.POST_BASE_API_URL}`, bodyFormData)
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


  PostBroker = data => {
    console.log('============================== DashboardService PostBroker& post_broker_oh_attendee =================================');

    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', data.accountnum);
    bodyFormData.append('propertyrecordnum', data.propertyrecordnum);
    bodyFormData.append('agentfullname', data.agentfullname);
    bodyFormData.append('agenttelephone', data.agenttelephone);
    bodyFormData.append('agentbrokername', data.agentbrokername);
    bodyFormData.append('agentemail', data.agentemail);
    bodyFormData.append('bestsellingfeatures', data.bestsellingfeatures);
    bodyFormData.append(
      'whatdoyouthinkaboutthelistingprice',
      data.whatdoyouthinkaboutthelistingprice,
    );
    bodyFormData.append('anysuggestions', data.anysuggestions);
    bodyFormData.append('willreferproperty', data.willreferproperty);
    bodyFormData.append('keepinform', data.keepinform);
    bodyFormData.append('uniqueid', data.uniqueid);

    return new Promise((resolve, reject) => {
      axios_instance1
        .post(
          `${Constants.BASE_API_URL}/post_broker_oh_attendee.php`,
          bodyFormData,
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

  PostPublicBroker = data => {
    console.log('============================== DashboardService PostPublicBroker & post_public_oh_attendee_agent =================================');

    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', data.accountnum);
    bodyFormData.append('propertyrecordnum', data.propertyrecordnum);
    bodyFormData.append(
      'attendeeisanagentfullname',
      data.firstname + ' ' + data.lastname,
    );
    bodyFormData.append('attendeeisanagenttelephone', data.telephone);
    bodyFormData.append('attendeeisanagentbrokername', data.brokername);
    bodyFormData.append('attendeeisanagentemail', data.agentemail);
    bodyFormData.append('attendeeisanagenttelephone', data.telephone);
    bodyFormData.append('advertisingid', data.advertisingid);
    bodyFormData.append('attendeetype', data.attendeetype);
    bodyFormData.append('uniqueid', data.uniqueid);

    return new Promise((resolve, reject) => {
      axios_instance1
        .post(
          `${Constants.BASE_API_URL}/post_public_oh_attendee_agent.php`,
          bodyFormData,
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



  PostData = data => {
    console.log('============================== DashboardService PostData & post_oh_attendee =================================');

    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', data.accountnum);
    bodyFormData.append('propertyrecordnum', data.propertyrecordnum);
    bodyFormData.append('uniqueid', data.uniqueid);
    bodyFormData.append('attendeetype', 'B');
    bodyFormData.append('attendeeworkingwithagentyesorno', '0');
    bodyFormData.append('advertisingid', data.advertisingid);
    bodyFormData.append('attendeefirstname', Constants.attendeefirstname);
    bodyFormData.append('attendeelastname', Constants.attendeelastname);
    bodyFormData.append('attendeeemail', Constants.attendeeemail);
    bodyFormData.append('attendeetelephone', Constants.attendeetelephone);

    bodyFormData.append(
      'attendeepropertylistedyesorno',
      Constants.attendeepropertylistedyesorno,
    );
    bodyFormData.append('attendeeownorrent', Constants.attendeeownorrent);
    bodyFormData.append(
      'attendeeneedtosellyesorno',
      Constants.attendeeneedtosellyesorno,
    );
    bodyFormData.append('attendeereceivecma', Constants.attendeereceivecma);
    bodyFormData.append(
      'attendeeprospectmatch',
      Constants.attendeeprospectmatch,
    );

    bodyFormData.append('attendeeaddress', Constants.attendeeaddress);
    bodyFormData.append('attendeecity', Constants.attendeecity);
    bodyFormData.append('attendeestate', Constants.attendeestate);
    bodyFormData.append('attendeezipcode', Constants.attendeezipcode);

    bodyFormData.append(
      'attendeehowsoonlookingtobuyorrent',
      Constants.attendeehowsoonlookingtobuyorrent,
    );
    bodyFormData.append(
      'attendeehearaboutlisting',
      Constants.attendeehearaboutlisting,
    );
    bodyFormData.append(
      'attendeehowhearaboutlistinganswer',
      Constants.attendeehowhearaboutlistinganswer,
    );
    bodyFormData.append(
      'attendeeareyouprequalified',
      Constants.attendeeareyouprequalified,
    );

    bodyFormData.append(
      'attendeeprequalifiedbankname',
      Constants.attendeeprequalifiedbankname,
    );
    bodyFormData.append(
      'attendeehowgoodisyourcredit',
      Constants.attendeehowgoodisyourcredit,
    );
    bodyFormData.append(
      'attendeehaverealestateattorney',
      Constants.attendeehaverealestateattorney,
    );
    bodyFormData.append('attendeefollowupvia', Constants.attendeefollowupvia);

    return new Promise((resolve, reject) => {
      axios_instance1
        .post(`${Constants.BASE_API_URL}/post_oh_attendee.php`, bodyFormData)
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
}
const instance = new DashboardService();
export default instance;
