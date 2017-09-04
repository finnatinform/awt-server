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
                _DataBase.run("INSERT INTO NOTIFICATIONS (CAPTION, DESCRIPTION, START_DATE, EVENT_IDENT, LAST_EDITED,BY_EVENT,EVENT_DATE) VALUES (?,?,?,?,?,0,'')", 
                    [ _Notification.CAPTION, _Notification.DESCRIPTION, _Notification.START_DATE, _Notification.EVENT_IDENT, moment().format("DD.MM.YYYY HH:mm") ], function(_Error){
                    
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
                    [ _Notification.CAPTION, _Notification.DESCRIPTION, _Notification.START_DATE, _Notification.EVENT_IDENT, moment().format("DD.MM.YYYY HH:mm"), _Notification.IDENT], function(_Error){
                    
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
    },
    listAllNotificationsForUser( _DataBase, _UserObject, _Callback ){
        _DataBase.all("SELECT N.* FROM NOTIFICATIONS as N WHERE N.EVENT_IDENT=-1 AND LAST_EDITED BETWEEN ? AND ? UNION ALL SELECT N.* FROM NOTIFICATIONS AS N LEFT JOIN EVENTS AS E ON E.IDENT=N.EVENT_IDENT WHERE E.CAN_BE_RESERVED=0 AND LAST_EDITED BETWEEN ? AND ? UNION ALL SELECT N.* FROM NOTIFICATIONS as N LEFT JOIN USERS_EVENTS_LINK AS L ON L.EVENT_IDENT=N.EVENT_IDENT WHERE L.USER_IDENT=? AND LAST_EDITED BETWEEN ? AND ?",[ moment(_UserObject.LAST_EDITED, "DD.MM.YYYY HH:mm").format("DD.MM.YYYY HH:mm") , moment().format("DD.MM.YYYY HH:mm"),moment(_UserObject.LAST_EDITED, "DD.MM.YYYY HH:mm").format("DD.MM.YYYY HH:mm") , moment().format("DD.MM.YYYY HH:mm"),_UserObject.IDENT,moment(_UserObject.LAST_EDITED, "DD.MM.YYYY HH:mm").format("DD.MM.YYYY HH:mm") , moment().format("DD.MM.YYYY HH:mm") ], function(_Error, _Rows) {  
            _Callback(_Error, _Rows);
        });  
    },

}