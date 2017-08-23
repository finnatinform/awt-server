module.exports = {
    addNotification(_DataBase, _Notification, _Callback){
        if(_Notification==null){
            _Callback('error');
            return ;
        }
        console.log(_Notification);
        _DataBase.serialize(
            function(){
                _DataBase.run("INSERT INTO NOTIFICATIONS (CAPTION, DESCRIPTION, START_DATE, EVENT_IDENT, LAST_EDITED) VALUES (?,?,?,?,?)", 
                    [ _Notification.CAPTION, _Notification.DESCRIPTION, _Notification.DATE, _Notification.EVENT_IDENT, Date.now() ], function(_Error){
                    
                    var HResult = "";
                    if(_Error === null){
                        HResult = 'success';
                    } else {
                        console.log('addNotificationError: '+JSON.stringify(_Error));
                        HResult = "error";
                    }
                    _Callback(HResult);     
                });
            }
        );        
    },
    changeNotification(_DataBase, _Notification, _Callback){
        if(_Notification==null){
            _Callback('error');
            return ;
        }
        console.log(_Notification);
        _DataBase.serialize(
            function(){
                _DataBase.run("UPDATE NOTIFICATIONS SET CAPTION=?, DESCRIPTION=?, DATE=?, EVENT_IDENT=?, LAST_EDITED=? WHERE IDENT=?", 
                    [ _Notification.CAPTION, _Notification.DESCRIPTION, _Notification.DATE, _Notification.EVENT_IDENT, Date.now(), _Notification.IDENT], function(_Error){
                    
                    var HResult = "";
                    if(_Error === null){
                        HResult = 'success';
                    } else {
                        HResult = "error";
                        console.log(JSON.stringify(_Error));
                    }
                    _Callback(HResult);     
                });
            }
        );        
    },
    deleteNotification(_DataBase, _Notification, _Callback){
        if(_Notification==null){
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
                        console.log(JSON.stringify(_Error));
                    }
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

// SELECT N.* FROM NOTIFICATIONS as N JOIN EVENTS as E JOIN USERS_EVENTS_LINK as L
// ON (( N.EVENT_IDENT = -1 ) OR (
// ( N.EVENT_IDENT != -1 ) AND ( ( E.CAN_BE_RESERVED = 0 ) OR (  ) )))