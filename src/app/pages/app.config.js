/**
 * Created by Yido on 4/5/2017.
 */


var SETTINGS = {
    base_api_url: {
        Online: 'Not_Set_Yet',
        Offline: 'http://localhost:8002/'
    },
    app_key: 'anwani_eth',
    app_title: 'anwani',
    app_salt: 'anwani_eth_salt',
    api_url: 'http://localhost:8002/',
    app_token_url: 'http://localhost:8002/'
  };


//~ Web API Methods ~//
var API = {
    Users: {
        POST: {
            Login: 'users/login',
            SignOut: 'users/logout',
            SignUp : 'users/signup',
            ChangePassword: 'users/changePassword'
        },
        GET: {
            Users: 'users/all',
            GetUserPhoto: 'users/getUserPhoto'
        }
    },
    Address:{
        POST: { },
        GET: {
            GetAddressForUser:'address/byUser',
            SearchForUser:'users/search',
            GetSharedAddressForUser:'address/acquired',
            addAddressForUser : 'address/add',
            editAddressForUser : 'address/edit',
            shareAddressForUser : 'address/share',
            removeSharedAddressForUser:'address/removeShared'
        }
    },
    Profile:{
        POST: { },
        GET: { }
    },
    Dashboard:{
        POST: { },
        GET: { }
    }
};