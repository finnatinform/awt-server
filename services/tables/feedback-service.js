module.exports = {
    addFeedback( _DataBase , _Feedback, _Callback ){
        if(_Event==null){
            _Callback('error');
            return ;
        }
        _DataBase.serialize(
            function(){
                _DataBase.run("INSERT INTO FEEDBACK (HOW_GOOD,USER_IDENT,DATE,EVENT_IDENT) VALUES (?,?,?,?)", [ _Feedback.HOW_GOOD, _Feedback.USER_IDENT, _Date.now(), _Feedback.EVENT_IDENT ], function(_Error){
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
    getFeedback( _DataBase, _User, _Event, _Callback ){
        _DataBase.all("SELECT * FROM FEEDBACK WHERE USER_IDENT = ? AND EVENT_IDENT = ?", [ _User, _Event ] , function(_Error, _Rows) {  
            _Callback(_Error, _Rows);
        });  
    }
}