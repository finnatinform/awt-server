module.exports = {
    addCompany(_DataBase, _Company, _Callback){
        if(_Company.SHORT_NAME==="" || _Company.CAPTION===""){
            _Callback('error');
            return ;
        }
        _DataBase.serialize(
            function(){
                _DataBase.run("INSERT INTO COMPANIES (SHORT_NAME,CAPTION) VALUES (?,?)", [ _Referent.SHORT_NAME, _Referent.CAPTION ], function(_Error){
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