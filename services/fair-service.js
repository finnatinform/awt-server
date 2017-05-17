module.exports = {
    addFair(_DataBase, _Fair, _Callback){
        if(_Fair.IDENT==="" || _Fair.CAPTION==="" || _Fair.START_DATE==="" || _Fair.END_DATE===""){
            _Callback('error: incomplete data');
            return ;
        }
        _DataBase.serialize(
            function(){
                _DataBase.run("INSERT INTO FAIRS (IDENT,CAPTION,START_DATE,END_DATE) VALUES (?,?,?,?)", [ _Fair.IDENT, _Fair.CAPTION, _Fair.START_DATE, _Fair.END_DATE ], function(_Error){
                    var HResult = "";
                    if(_Error === null){
                        HResult = 'success';
                    } else {
                        HResult = JSON.stringify(_Error);
                    }
                    _Callback(HResult);      
                });
            }
        );        
    }
}