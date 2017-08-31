var moment = require('moment');

module.exports = {
    addNotification(_DataBase, _Notification, _Callback){
        if(_Notification==null){
            console.log('error');
            _Callback('error');
            return ;
        }
        console.log(_Notification);
        _DataBase.serialize(
            function(){
                _DataBase.run("INSERT INTO NOTIFICATIONS (CAPTION, DESCRIPTION, START_DATE, EVENT_IDENT, LAST_EDITED,BY_EVENT) VALUES (?,?,?,?,?,0)", 
                    [ _Notification.CAPTION, _Notification.DESCRIPTION, _Notification.DATE, _Notification.EVENT_IDENT, moment().format("DD.MM.YYYY HH:mm") ], function(_Error){
                    
                    var HResult = "";
                    if(_Error === null){
                        HResult = 'success';
                    } else {
                        HResult = "error";
                    }
                    console.log(HResult);
                    _Callback(HResult);     
                });
            }
        );        
    },
    changeNotification(_DataBase, _Notification, _Callback){
        if(_Notification==null){
            console.log('error');
            _Callback('error');
            return ;
        }
        console.log(_Notification);
        _DataBase.serialize(
            function(){
                _DataBase.run("UPDATE NOTIFICATIONS SET CAPTION=?, DESCRIPTION=?, START_DATE=?, EVENT_IDENT=?, LAST_EDITED=? WHERE IDENT=?", 
                    [ _Notification.CAPTION, _Notification.DESCRIPTION, _Notification.DATE, _Notification.EVENT_IDENT, moment().format("DD.MM.YYYY HH:mm"), _Notification.IDENT], function(_Error){
                    
                    var HResult = "";
                    if(_Error === null){
                        HResult = 'success';
                    } else {
                        HResult = "error";
                    }
                    console.log(HResult);
                    _Callback(HResult);     
                });
            }
        );        
    },
    deleteNotification(_DataBase, _Notification, _Callback){
        if(_Notification==null){
            console.log('error');
            _Callback('error');
            return ;
        }
        console.log(_Notification);
        _DataBase.serialize(
            function(){
                _DataBase.run("DELETE FROM NOTIFICATIONS WHERE IDENT=?", [ _Notification.IDENT ], function(_Error){
                    var HResult = "";
                    if(_Error === null){
                        HResult = 'success';
                    } else {
                        HResult = "error";
                    }
                    console.log(HResult);
                    _Callback(HResult);     
                });
            }
        );        
    },
    listAllNotifications( _DataBase, _Callback ){
        _DataBase.all("SELECT * FROM NOTIFICATIONS", function(_Error, _Rows) {  
            _Callback(_Error, _Rows);
        });  
    }
}