
var db=openDatabase('phatmacy_system','1.0','phatmacy_system',2 * 1024 * 1024);
            db.transaction(function(tx)
            {
                tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (name unique,password)');
                tx.executeSql('INSERT INTO USERS (name,password) VALUES ("Admin",1234)'); 
                
            
               

            }
            )
            var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

db.transaction(function(tx)
{
tx.executeSql('CREATE TABLE IF NOT EXISTS ITEMS (name unique,quantity,picture,ITEMprice)');
tx.executeSql('INSERT INTO ITEMS (name,quantity,picture,ITEMprice) VALUES ("panadol",100,"aaaaa",1.8)'); 
});


           
            
db.transaction(function(tx)
{
tx.executeSql('CREATE TABLE IF NOT EXISTS INVOICES (date ,userName,type,itemName ,quantity,totalprice,id  AUTO_INCREMENT  unique)');
tx.executeSql('INSERT INTO INVOICES (date,userName,type,itemName,quantity,totalprice,id) VALUES (?,"diana","buy","panadol",12,20,1)',[today]); 
}); 


// db.transaction(function(tx)
// {
// tx.executeSql('drop table INVOICES ');

// });   