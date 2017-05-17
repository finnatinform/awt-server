module.exports = {
    addFair(_DataBase, _Fair, _Callback){
        if(_Fair.IDENT==="" || _Fair.CAPTION==="" || _Fair.START_DATE==="" || _Fair.END_DATE===""){
            _Callback('error');
            return ;
        }
        _DataBase.serialize(
            function(){
                _DataBase.run("INSERT INTO REFERENTS (IDENT,CAPTION,START_DATE,END_DATE) VALUES (?,?)", [ _Fair.IDENT, _Fair.CAPTION, _Fair.START_DATE, _Fair.END_DATE ], function(_Error){
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