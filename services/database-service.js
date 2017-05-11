module.exports = {
    BuildDatabase : function(_Database){
        var HResult = "Datenbank wurde erfolgreicht aufgebaut.";
        _Database.serialize(function() {            
            // Create USERS Table
            _Database.run("CREATE TABLE if not exists USERS (IDENT INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, COMPANY_IDENT INTEGER, FOREIGN KEY(COMPANY_IDENT) REFERENCES COMPANIES(IDENT))");
            // Create FAIRS Table
            _Database.run("CREATE TABLE if not exists FAIRS (IDENT TEXT PRIMARY KEY NOT NULL UNIQUE, CAPTION TEXT)");

            // Create REFERENTS Table
            _Database.run("CREATE TABLE if not exists FAIRS (IDENT INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, FORE_NAME TEXT, SURE_NAME TEXT)");

            // Create COMPANIES Table
            _Database.run("CREATE TABLE if not exists COMPANIES (IDENT INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, SHORT_NAME TEXT UNIQUE, CAPTION TEXT)");


        });
        return HResult ;
    }
}
