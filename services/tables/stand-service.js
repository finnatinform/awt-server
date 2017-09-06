module.exports = {
    addStand(_DataBase, _Stand, _Callback){
        _DataBase.serialize(
            function(){
                _DataBase.run("INSERT INTO STANDS (CAPTION,DESCRIPTION,LOGO,RANKING) VALUES (?,?,?,?)", [ _Stand.CAPTION, _Stand.DESCRIPTION, _Stand.LOGO, _Stand.RANKING ], function(_Error){
                    var HResult = "";
                    if(_Error === null){
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
    changeStand(_DataBase, _Stand, _Callback){
        _DataBase.serialize(
            function(){
                _DataBase.run("UPDATE STANDS SET CAPTION=?,SURE_NAME=?,DESCRIPTION=?,LOGO=?,RANKING=? WHERE IDENT=?", [ _Stand.CAPTION, _Stand.DESCRIPTION, _Stand.LOGO,_Stand.RANKING, _Stand.IDENT ], function(_Error){
                    var HResult = "";
                    if(_Error === null){
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
    deleteStand(_DataBase, _Stand, _Callback){
        _DataBase.serialize(
            function(){
                _DataBase.run("DELETE FROM STANDS WHERE IDENT=?", [ _Stand.IDENT ], function(_Error){
                    var HResult = "";
                    if(_Error === null){
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
    listAllStands( _DataBase, _Callback ){
        _DataBase.all("SELECT * FROM STANDS ORDER BY RANKING", function(_Error, _Rows) {  
            _Callback(_Error, _Rows);
        });  
    }
}