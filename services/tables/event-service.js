var NotificationService = require('./notification-service');
var moment = require('moment');

module.exports = {
    addEvent(_DataBase, _Event, _Callback) {
        if (_Event == null) {
            console.log('error');
            _Callback('error');
            return;
        }
        _DataBase.serialize(
            function () {
                _DataBase.run("INSERT INTO EVENTS (CAPTION, DESCRIPTION, PLACE, START_DATE, DURATION, REFERENT_IDENT, HAS_FEEDBACK, CAN_BE_RESERVED, ICON, HAS_START_NOTIFICATION) VALUES (?,?,?,?,?,?,?,?,?,?)", [_Event.CAPTION, _Event.DESCRIPTION, _Event.PLACE, _Event.START_DATE, _Event.DURATION, _Event.REFERENT_IDENT, _Event.HAS_FEEDBACK, _Event.CAN_BE_RESERVED, _Event.ICON, _Event.HAS_START_NOTIFICATION], function (_Error) {
                    if (_Error === null) {
                        var HLastEventIdent = this.lastID;
                        if (_Event.CAN_BE_RESERVED == 1) {
                            _DataBase.run("INSERT INTO NOTIFICATIONS (CAPTION, DESCRIPTION, START_DATE, EVENT_IDENT, LAST_EDITED,BY_EVENT) SELECT ?,?,?,-1,?,0 WHERE NOT EXISTS ( SELECT 1 FROM NOTIFICATIONS WHERE START_DATE = ? )", ["Feedback", "Klicken Sie hier zum Bewerten", moment(_Event.START_DATE, "DD.MM.YYYY HH:mm").add((parseInt(_Event.DURATION) + 5), 'minutes').format("DD.MM.YYYY HH:mm"), moment().format("DD.MM.YYYY HH:mm"), _Event.START_DATE], function (_Error) {
                                if (_Error === null) {
                                    if (_Event.HAS_START_NOTIFICATION == 1) {
                                        _DataBase.run("INSERT INTO NOTIFICATIONS (CAPTION, DESCRIPTION, START_DATE, EVENT_IDENT, LAST_EDITED,BY_EVENT) SELECT ?,?,?,?,?,1", ["Veranstaltung beginnt in Kürze", _Event.CAPTION, moment(_Event.START_DATE, "DD.MM.YYYY HH:mm").subtract(10, 'minutes').format("DD.MM.YYYY HH:mm"), HLastEventIdent, moment().format("DD.MM.YYYY HH:mm")], function (_Error) {
                                            if (_Error === null) {
                                                console.log('success');
                                                _Callback('success');
                                            } else {
                                                console.log('error');
                                                _Callback("error");
                                            }
                                        });
                                    } else {
                                        console.log('success');
                                        _Callback('success');
                                    }
                                } else {
                                    console.log('error');
                                    _Callback("error");
                                }
                            });
                        } else {
                            console.log('success');
                            _Callback('success');
                        }
                    } else {
                        console.log('error');
                        _Callback("error");
                    }
                });
            }
        );
    },
    changeEvent(_DataBase, _Event, _Callback) {
        if (_Event == null) {
            console.log('error');
            _Callback('error');
            return;
        }
        console.log('changeEvent');
        _DataBase.serialize(
            function () {
                _DataBase.run("UPDATE EVENTS SET CAPTION=?, DESCRIPTION=?, PLACE=?, START_DATE=?, DURATION=?, REFERENT_IDENT=?, HAS_FEEDBACK=?, CAN_BE_RESERVED=?, ICON=?, HAS_START_NOTIFICATION=? WHERE IDENT=?", [_Event.CAPTION, _Event.DESCRIPTION, _Event.PLACE, _Event.START_DATE, _Event.DURATION, _Event.REFERENT_IDENT, _Event.HAS_FEEDBACK, _Event.CAN_BE_RESERVED, _Event.ICON, _Event.HAS_START_NOTIFICATION, _Event.IDENT], function (_Error) {
                    var HResult = "";
                    if (_Error === null) {
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
    deleteEvent(_DataBase, _Event, _Callback) {
        if (_Event == null) {
            console.log('error');
            _Callback('error');
            return;
        }
        console.log('deleteEvent');
        _DataBase.serialize(
            function () {
                _DataBase.run("DELETE FROM EVENTS WHERE IDENT=?", [_Event.IDENT], function (_Error) {
                    if (_Error === null) {
                        _DataBase.run("DELETE FROM NOTIFICATIONS WHERE EVENT_IDENT=?", [_Event.IDENT], function (_Error) {
                            var HResult = "";
                            if (_Error === null) {
                                HResult = 'success';
                            } else {
                                HResult = "error";
                            }
                            console.log(HResult);
                            _Callback(HResult);
                        });
                    } else {
                        console.log('error');
                        _Callback('error');
                    }
                });
            }
        );

    },
    listEvents(_DataBase, _UserObject, _Callback) {
        _DataBase.all("SELECT E.*, R.FORE_NAME,R.SURE_NAME, (case when L.USER_IDENT ISNULL then 0 else 1 end) as USER_HAS_RESERVED, COALESCE(F.RATING,-1) as RATING FROM EVENTS as E LEFT JOIN REFERENTS as R ON E.REFERENT_IDENT = R.IDENT LEFT JOIN USERS_EVENTS_LINK as L ON ( E.IDENT=L.EVENT_IDENT AND L.USER_IDENT=? ) LEFT JOIN FEEDBACKS as F ON ( F.EVENT_IDENT=E.IDENT AND F.USER_IDENT=? )", [_UserObject.IDENT, _UserObject.IDENT], function (_Error, _EventRows) {
            _Callback(_Error, _EventRows);
        });
    },
    listEventsForAdmin(_DataBase, _Callback) {
        _DataBase.all("SELECT * FROM EVENTS AS E", [], function (_Error, _EventRows) {
            _Callback(_Error, _EventRows);
        });
    },
    listEventsForUser(_DataBase, _UserObject, _Callback) {
        _DataBase.all("SELECT e.*,R.FORE_NAME,R.SURE_NAME,0 as USER_HAS_RESERVED, COALESCE(F.RATING,-1) as RATING FROM EVENTS as E LEFT JOIN REFERENTS as R ON E.REFERENT_IDENT = R.IDENT LEFT JOIN FEEDBACKS AS F ON ( E.IDENT=F.EVENT_IDENT AND F.USER_IDENT=?) WHERE E.CAN_BE_RESERVED=0 UNION ALL SELECT e.*,R.FORE_NAME,R.SURE_NAME,(case when L.USER_IDENT ISNULL then 0 else 1 end) as USER_HAS_RESERVED, COALESCE(F.RATING,-1) as RATING FROM USERS_EVENTS_LINK as L LEFT JOIN EVENTS as E ON L.EVENT_IDENT=E.IDENT LEFT JOIN REFERENTS as R ON E.REFERENT_IDENT=R.IDENT LEFT JOIN FEEDBACKS AS F ON ( E.IDENT=F.EVENT_IDENT AND F.USER_IDENT=?) WHERE L.USER_IDENT=?", [_UserObject.IDENT, _UserObject.IDENT, _UserObject.IDENT], function (_Error, _EventRows) {
            _Callback(_Error, _EventRows);
        });
    },
    reserveEvent(_DataBase, _ReserveObject, _Callback) {
        console.log("reserveEvent");
        _DataBase.serialize(
            function () {
                _DataBase.run("INSERT INTO USERS_EVENTS_LINK (USER_IDENT,EVENT_IDENT,RESERVED_ON) VALUES (?,?,?)", [_ReserveObject.USER_IDENT, _ReserveObject.EVENT_IDENT, moment().format("DD.MM.YYYY HH:mm")], function (_Error) {
                    if (_Error === null) {
                        HResult = 'success';
                    } else {
                        HResult = "error";
                    }
                    console.log(HResult);
                    _Callback(HResult);
                });
            }
        );
    }
}