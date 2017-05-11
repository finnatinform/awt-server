module.exports = {
    BuildDatabase : function(_Database){
        _Database.serialize(function() {    
            
            // Create FAIRS Table
            _Database.run("CREATE TABLE if not exists FAIRS (IDENT TEXT PRIMARY KEY NOT NULL UNIQUE, CAPTION TEXT, START_DATE TEXT, END_DATE TEXT)");
            // Create REFERENTS Table
            _Database.run("CREATE TABLE if not exists FAIRS (IDENT INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, FORE_NAME TEXT, SURE_NAME TEXT)");
            // Create COMPANIES Table
            _Database.run("CREATE TABLE if not exists COMPANIES (IDENT INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, SHORT_NAME TEXT UNIQUE, CAPTION TEXT)");
            // Create USERS Table
            _Database.run("CREATE TABLE if not exists USERS (IDENT INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, COMPANY_IDENT INTEGER, CONSTRUCTOR TEXT, SOFTWARE_VERSION TEXT, REGISTERED_ON TEXT, FOREIGN KEY(COMPANY_IDENT) REFERENCES COMPANIES(IDENT))");    
            // CREATE EVENTS Table
            _Database.run("CREATE TABLE if not exists EVENTS (IDENT INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, CAPTION TEXT, PLACE TEXT, DESCRIPTION TEXT, START_DATE TEXT, END_DATE TEXT, FAIR_IDENT INTEGER, FOREIGN KEY(FAIR_IDENT) REFERENCES FAIRS(IDENT))");
            // Create FEEDBACK Table
            _Database.run("CREATE TABLE if not exists FEEDBACKS (IDENT INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, USER_IDENT INTEGER, DATE TEXT, COMMENT TEXT, EVENT_IDENT INTEGER, FOREIGN KEY(USER_IDENT) REFERENCES USERS(IDENT), FOREIGN KEY(EVENT_IDENT) REFERENCES EVENT(IDENT))");

            /* CREATE LINK TABLES */
            _Database.run("CREATE TABLE if not exists USERS_FAIRS_LINK (USER_IDENT INTEGER, FAIR_IDENT INTEGER, REGISTERED_DATE TEXT, FOREIGN KEY(USER_IDENT) REFERENCES USERS(IDENT), FOREIGN KEY(FAIR_IDENT) REFERENCES FAIRS(IDENT))");
            _Database.run("CREATE TABLE if not exists USERS_EVENTS_LINK (USER_IDENT INTEGER, EVENT_IDENT INTEGER, RESERVED INTEGER, RESERVED_ON TEXT, FOREIGN KEY(USER_IDENT) REFERENCES USERS(IDENT), FOREIGN KEY(EVENT_IDENT) REFERENCES EVENTS(IDENT))");
            _Database.run("CREATE TABLE if not exists USERS_FAIRS_LINK (EVENT_IDENT INTEGER, REFERENT_IDENT INTEGER,  FOREIGN KEY(EVENT_IDENT) REFERENCES EVENTS(IDENT), FOREIGN KEY(REFERENT_IDENT) REFERENCES REFERENTS(IDENT))");                     
        });
    }
}
