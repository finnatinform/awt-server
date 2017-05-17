module.exports = {
    addReferent(_DataBase, _Referent, _Callback){
        if(_Referent.FORE_NAME==="" || _Referent.SURE_NAME===""){
            _Callback('error');
            return ;
        }
        _DataBase.serialize(
            function(){
                _DataBase.run("INSERT INTO REFERENTS (FORE_NAME,SURE_NAME) VALUES (?,?)", [ _Referent.FORE_NAME, _Referent.SURE_NAME ], function(_Error){
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