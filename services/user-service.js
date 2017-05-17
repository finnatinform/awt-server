module.exports = {
    addUser : function( _DataBase, _User, _Callback ){
        if(_User.uuid === "" || _User.company ===""){
            _Callback('error');
            return ;
        }
        _DataBase.serialize(
            function(){
                _DataBase.run("INSERT INTO USERS (UUID, COMPANY, MANUFACTURER, SOFTWARE_VERSION, REGISTERED_ON, MODEL, PLATFORM ) VALUES (?,?)", [ _User.uuid, _User.company, _User.manufacturer, _User.software-version, Date.now(), _User.model, _User.platform ], function(_Error){
                    var HResult = "";
                    if(_Error === null){
                        HResult = 'success';
                    } else {
                        HResult = "error";
                    }
                    _Callback(HResult);
                    
                });
            }
        );
    }
}