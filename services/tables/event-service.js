var NotificationService = require('./notification-service');

module.exports = {
    addEvent(_DataBase, _Event, _Callback) {
        if (_Event == null) {
            _Callback('error: _Event is null');
            return;
        }
        _DataBase.serialize(
            function () {
                _DataBase.run("INSERT INTO EVENTS (CAPTION, DESCRIPTION, PLACE, START_DATE, DURATION, REFERENT_IDENT, HAS_FEEDBACK, CAN_BE_RESERVED, ICON) VALUES (?,?,?,?,?,?,?,?,?)", [_Event.CAPTION, _Event.DESCRIPTION, _Event.PLACE, _Event.START_DATE, _Event.DURATION, _Event.REFERENT_IDENT, _Event.HAS_FEEDBACK, _Event.CAN_BE_RESERVED, _Event.ICON], function (_Error) {
                    if (_Error === null) {
                        console.log(this.lastID);
                        if (_Event.CAN_BE_RESERVED) {
                            var HNotification = {
                                CAPTION: _Event.CAPTION + " geht gleich los!",
                                DESCRIPTION: "Klicken Sie für weitere Details",
                                DATE: _Event.START_DATE, // TODO -10 minuten
                                EVENT_IDENT: this.lastID
                            };
                            NotificationService.addNotification(_DataBase, HNotification, function (_Success) {
                                console.log('addNotification '+_Success);
                                _Callback(_Success);
                            });
                        } else {
                            _Callback('success');
                        }
                    } else {
                        console.log(JSON.stringify(_Error));
                        _Callback("error");
                    }
                });
            }
        );
    },
    changeEvent(_DataBase, _Event, _Callback) {
        if (_Event == null) {
            _Callback('error: _Event is null');
            return;
        }
        console.log('changeEvent');
        _DataBase.serialize(
            function () {
                _DataBase.run("UPDATE EVENTS SET CAPTION=?, DESCRIPTION=?, PLACE=?, START_DATE=?, DURATION=?, REFERENT_IDENT=?, HAS_FEEDBACK=?, CAN_BE_RESERVED=?, ICON=? WHERE IDENT=?", [_Event.CAPTION, _Event.DESCRIPTION, _Event.PLACE, _Event.START_DATE, _Event.DURATION, _Event.REFERENT_IDENT, _Event.HAS_FEEDBACK, _Event.CAN_BE_RESERVED, _Event.ICON, _Event.IDENT], function (_Error) {
                    var HResult = "";
                    if (_Error === null) {
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
    deleteEvent(_DataBase, _Event, _Callback) {
        if (_Event == null) {
            _Callback('error: _Event is null');
            return;
        }
        console.log('deleteEvent');
        _DataBase.serialize(
            function () {
                _DataBase.run("DELETE FROM EVENTS WHERE IDENT=?", [_Event.IDENT], function (_Error) {
                    var HResult = "";
                    if (_Error === null) {
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
    listEvents(_DataBase, _Callback) {
        _DataBase.all("SELECT E.*, R.FORE_NAME,R.SURE_NAME FROM EVENTS as E LEFT JOIN REFERENTS as R ON E.REFERENT_IDENT = R.IDENT", [], function (_Error, _EventRows) {
            _Callback(_Error, _EventRows);
        });
    },
    listEventsForUser(_DataBase, _UserObject, _Callback) {
        _DataBase.all("SELECT * FROM USERS_EVENTS_LINK as L LEFT JOIN EVENTS as E ON L.EVENT_IDENT = E.IDENT AND L.USER_IDENT=? OR E.CAN_BE_RESERVED = 0", [_UserObject.IDENT], function (_Error, _EventRows) {
            _Callback(_Error, _EventRows);
        });
    },
    reserveEvent(_DataBase, _ReserveObject, _Callback) {
        console.log("reserveEvent");
        _DataBase.serialize(
            function () {
                _DataBase.run("INSERT INTO USERS_EVENTS_LINK (USER_IDENT,EVENT_IDENT,RESERVED_ON) VALUES (?,?,?)", [_ReserveObject.USER_IDENT, _ReserveObject.EVENT_IDENT, Date.now()], function (_Error) {
                    var HResult = "";
                    if (_Error === null) {
                        HResult = 'success';
                    } else {
                        HResult = "error";
                        console.log(JSON.stringify(_Error));
                    }
                    _Callback(HResult);
                });
            }
        );
    }
}