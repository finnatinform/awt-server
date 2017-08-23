module.exports = {
    addReferent(_DataBase, _Referent, _Callback){
        if(_Referent.FORE_NAME==="" || _Referent.SURE_NAME===""){
            _Callback('error');
            return ;
        }
        _DataBase.serialize(
            function(){
                _DataBase.run("INSERT INTO REFERENTS (FORE_NAME,SURE_NAME,DESCRIPTION,RANKING) VALUES (?,?,?,?)", [ _Referent.FORE_NAME, _Referent.SURE_NAME, _Referent.DESCRIPTION, _Referent.RANKING ], function(_Error){
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
    },
    changeReferent(_DataBase, _Referent, _Callback){
        if(_Referent.FORE_NAME==="" || _Referent.SURE_NAME===""){
            _Callback('error');
            return ;
        }
        _DataBase.serialize(
            function(){
                _DataBase.run("UPDATE REFERENTS SET FORE_NAME=?,SURE_NAME=?,DESCRIPTION=?,RANKING=? WHERE IDENT=?", [ _Referent.FORE_NAME, _Referent.SURE_NAME, _Referent.DESCRIPTION,_Referent.IDENT,_Referent.RANKING ], function(_Error){
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
    deleteReferent(_DataBase, _Referent, _Callback){
        if(_Referent.IDENT===""){
            _Callback('error');
            return ;
        }
        console.log('deleteReferent');
        _DataBase.serialize(
            function(){
                _DataBase.run("DELETE FROM REFERENTS WHERE IDENT=?", [ _Referent.IDENT ], function(_Error){
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
    listAllReferents( _DataBase, _Callback ){
        _DataBase.all("SELECT * FROM REFERENTS ORDER BY RANKING", function(_Error, _Rows) {  
            _Callback(_Error, _Rows);
        });  
    }
}