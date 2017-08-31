var moment = require('moment');

module.exports = {
    addUser: function (_DataBase, _User, _Callback) {
        if (_User.IDENT === "") {
            console.log('error');
            _Callback('error');
            return;
        }
        console.log(JSON.stringify(_User));

        _DataBase.all("SELECT * FROM USERS WHERE IDENT=?", [_User.IDENT], function (_Error, _Rows) {
            if (_Rows.length == 0) {
                _DataBase.serialize(
                    function () {
                        _DataBase.run("INSERT INTO USERS (IDENT, COMPANY_IDENT, VERSION, REGISTERED_ON, MODEL, PLATFORM ) VALUES (?,?,?,?,?,?)", [_User.IDENT, _User.COMPANY, _User.VERSION, moment().format("DD.MM.YYYY HH:mm"), _User.MODEL, _User.PLATFORM], function (_Error) {
                            console.log(_Error);
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
            } else {
                console.log('success');
                _Callback("success");
            }
        });
    }
}