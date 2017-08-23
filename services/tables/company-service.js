module.exports = {
    addCompany(_DataBase, _Company, _Callback) {
        if (_Company.SHORT_NAME === "" || _Company.CAPTION === "") {
            _Callback('error');
            return;
        }
        _DataBase.serialize(
            function () {
                _DataBase.run("INSERT INTO COMPANIES (SHORT_NAME,CAPTION) VALUES (?,?)", [_Company.SHORT_NAME, _Company.CAPTION], function (_Error) {
                    var HResult = "";
                    if (_Error === null) {
                        HResult = 'success';
                    } else {
                        HResult = "error";
                    }
                    _Callback(HResult);
                });
            }
        );

    },
    changeCompany(_DataBase, _Company, _Callback) {
        if (_Company.SHORT_NAME === "" || _Company.CAPTION === "") {
            _Callback('error');
            return;
        }
        console.log('changeCompany');
        _DataBase.serialize(
            function () {
                _DataBase.run("UPDATE COMPANIES SET SHORT_NAME=?,CAPTION=? WHERE SHORT_NAME=?", [_Company.SHORT_NAME, _Company.CAPTION, _Company.SHORT_NAME], function (_Error) {
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
    deleteCompany(_DataBase, _Company, _Callback) {
        if (_Company.SHORT_NAME === "" || _Company.CAPTION === "") {
            _Callback('error');
            return;
        }
        console.log('deleteCompany');
        _DataBase.serialize(
            function () {
                _DataBase.run("DELETE FROM COMPANIES WHERE SHORT_NAME=?", [_Company.SHORT_NAME], function (_Error) {
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
    listCompanies(_DataBase, _Callback) {
        _DataBase.all("SELECT * FROM COMPANIES", [], function (_Error, _Rows) {
            _Callback(_Error, _Rows);
        });
    },
    checkCompany(_DataBase, _KeyObject, _Callback) {
        if (_KeyObject.UNLOCK_KEY === "") {
            _Callback('error');
            return;
        }
        _DataBase.all("SELECT count(*) FROM COMPANIES WHERE SHORT_NAME=?", [_KeyObject.UNLOCK_KEY], function (_Error, _Rows) {
            var HResult = "";
            if (_Error === null) {
                if (_Rows.length == 0) {
                    HResult = "false"
                } else {
                    HResult = _KeyObject.UNLOCK_KEY;
                }
            } else {
                HResult = "error";
            }
            _Callback(HResult);
        });
    },
}