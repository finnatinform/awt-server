var moment = require('moment');

module.exports = {
    addFeedback( _DataBase , _Feedback, _Callback ){
        if(_Feedback==null){
            console.log('error');
            _Callback('error');
            return ;
        }
        _DataBase.serialize(
            function(){
                _DataBase.run("INSERT INTO FEEDBACKS (RATING,USER_IDENT,EVENT_IDENT,FEEDBACK_DATE) VALUES (?,?,?,?)", [ _Feedback.RATING, _Feedback.USER_IDENT, _Feedback.EVENT_IDENT, moment().format("DD.MM.YYYY HH:mm") ], function(_Error){
                    var HResult = "";
                    if(_Error === null){
                        HResult = 'success';
                    } else {
                        HResult = "error";
                        console.log(JSON.stringify(_Error));
                    }
                    console.log(HResult);
                    _Callback(HResult);     
                });
            }
        );      
    }
}