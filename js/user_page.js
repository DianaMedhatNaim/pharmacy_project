const logot_btn=document.querySelector("#logout")
logot_btn.onclick=function ()
{
window.location.replace("../docs/login_page.html");
};
$("span.welcome").text("Welcome"+' ' +localStorage.username)
$("form.sell_form").hide();
$("button.sell").click(
    function(){
        $("form.user_form").hide();
        $("form.item_form").hide();
        $("form.delete_user_form").hide();
        $("div.invoice_div").hide();
        $("form.sell_form").show();}
)

$("form.item_form").hide();
$("button.item").click(function(){
    $("form.sell_form").hide();
    $("form.delete_user_form").hide();
    $("div.invoice_div").hide();
    $("form.item_form").show();})
// $("#videoElement").hide();
//         $("#showscreenshot").hide();



var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

////////////////////////////////////////////////////////////
 const btnsell=document.querySelector("#btn_sell");
 btnsell.onclick =function()
        {

            var db=openDatabase('phatmacy_system','1.0','phatmacy_system',2 * 1024 * 1024);
            db.transaction(function(tx)
            {
            db.transaction(function (tx) { 
                tx.executeSql('SELECT * FROM ITEMS', [], function (tx, results) { 
                   var html = "<table>";
                   for (var i = 0; i < results.rows.length; i++) { 
                        html += "<tr>";
                        for(var prop in results.rows.item(i)){
                            html+="<td>"+results.rows.item(i).name +"</td>";
                            html+="<td>"+results.rows.item(i).quantity +"</td>";
                            html+="<td><img src="+results.rows.item(i).picture+"></td>";
                            
                      }
                      var itemna = document.getElementById("itemN").value;
                      var quan = document.getElementById("itemQ").value;
                      if(itemna=="" ||quan=="" )
                      {
                        alert("please enter all data");
                        return;
                      }
                      console.log(itemna);
                      console.log(quan);
                      if(results.rows.item(i).name==itemna &&results.rows.item(i).quantity>=quan )
                      {
                        
                        
                          var NewQuantity=(results.rows.item(i).quantity)-(quan);
                          console.log(results.rows.item(i).quantity);
                          console.log(NewQuantity);
                          var db=openDatabase('phatmacy_system','1.0','phatmacy_system',2 * 1024 * 1024);
                        db.transaction(function(tx) {
                            tx.executeSql('update ITEMS set quantity=? where name=?', [NewQuantity, itemna])
                        });
                        // var photo=" <img src="+results.rows.item(i).picture+">";
                       
                        var totalprice=(quan)*(results.rows.item(i).ITEMprice);
                        var username=localStorage.username;
                        var db=openDatabase('phatmacy_system','1.0','phatmacy_system',2 * 1024 * 1024);
                        var ID;
                        var LastId;
                        var len;
                        db.transaction(function(tx) {
                            tx.executeSql("SELECT id FROM INVOICES",[], function(sqlTransaction, sqlResultSet) {
                             ID = sqlResultSet.rows;
                             len = ID.length;
                            for (var i = 0; i < len; i++) {
                                 LastId = (Number(ID[i].id))+1; // or u can use the item methid ---> var cur_item = rows.item(i);
                               
                            };
                            console.log(ID)

                        });
                        
                        });
                        
                
                        // for(var i=0;i<=ID.length;i++)
                        // {
                        // LastId=ID[i]+1;
                        // }
                        

                        db.transaction(function (tx) { 
                    
                            tx.executeSql('INSERT INTO INVOICES (date,userName,type,itemName,quantity,totalprice,id) VALUES (?, ?,?,?,?,?,?)',[today,username,"sell",itemna,quan,totalprice,LastId]);
                           
                            console.log(today);
                            console.log(username);
                            console.log(totalprice);
                           
                            alert("item added successfully");
                            alert("item Name: "+itemna+' '+"Quantity: "+quan+' '+"Total Price: "+totalprice+' ');
                            document.getElementById("itemN").value="";
                            document.getElementById("itemQ").value="";
                            
                         });
                        
                        //  document.getElementById("showdata").innerHTML = html;
                        html+="</tr>";
                        html+="</table>";
                       
        
                        return;
    
                         
                      }
                     
                      html+="</tr>";
                     
                   } 
                   alert("this item is not exist or sold");
                   
                   document.getElementById("itemN").value="";
                   document.getElementById("itemQ").value="";
            
                   html+="</table>";
                //    document.getElementById("showdata").innerHTML = html;
                 
                   
                  
                }); 
                
                
             }); 
             
            })
            
        }
        
///////////////////////////////////////////////////////////////////////////////////////////////////



// const btnsell=document.querySelector("#btn_sell");
//   btnsell.onclick=function ()
//                {
//                    //console.log("enter");
//                    db.transaction(function (tx) { 
//                        tx.executeSql('SELECT * FROM USERS', [], function (tx, results) { 
//                           var html = "<table>";
//                           for (var i = 0; i < results.rows.length; i++) { 
//                                html += "<tr>";
//                                for(var prop in results.rows.item(i)){
//                                    html+="<td>"+results.rows.item(i)[prop] +"</td>";
                                   
//                              }
//                              var itemname = document.getElementById("Name").value;
//                       var quantity = document.getElementById("Quantity").value;
//                              console.log(itemname);
//                              if(results.rows.item(i).name=="rivo" && results.rows.item(i).quantity>=quantity)
//                              {
                                 
//                                 console.log(results.rows.item(i).quantity);
//                                 console.log(document.getElementById("Quantity").value);
//                                   var NewQuantity=(results.rows.item(i).quantity)-Number(quantity);
//                                   console.log(NewQuantity);
//                                 db.transaction(function(tx) {
//                                     tx.executeSql('update ITEMS set quantity=? where name=?', [NewQuantity, "ttt"])
//                                 });
//                                 var totalprice=(quantity)*(results.rows.item(i).ITEMprice);
//                                 var username=localStorage.username;
        
//                                 db.transaction(function (tx) { 
//                                     tx.executeSql('INSERT INTO INVOICES (date,userName,type,itemName,quantity,totalprice) VALUES (?, ?,?,?,?,?)',[today,username,"sell","ttt",quantity,totalprice]); 
//                                     console.log("diiiiii");
//                                     alert("item added successfully");
                                    
                                    
//                                  })
                                
                                
//                                 return;
                              

//                              }
                             
//                              else
//                              {
                               
//                                 alert("this item is not exist or sold");
//                              }
                            
//                              html+="</tr>";
//                           } 
//                           html+="</table>";
//                          // document.getElementById("showdata").innerHTML = html;
                         
//                        }); 
//                     }); 
//                }
        