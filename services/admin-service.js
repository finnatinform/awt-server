module.exports = {
    BuildDatabase : function(_Database){
        var HResult = "Datenbank wurde erfolgreicht aufgebaut.";
        _Database.run("CREATE TABLE if not exists USERS (IDENT INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL)");
        return HResult ;
    }
}