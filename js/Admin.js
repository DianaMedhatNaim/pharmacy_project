$("#show").hide();
const logout_btn=document.querySelector("#logout")
logout_btn.onclick=function ()
{
window.location.replace("../docs/login_page.html");
};
$("span.welcome").text("Welcome"+' ' +localStorage.username)
$("form.user_form").hide();
$("button.user").click(
    function(){
        $("form.item_form").hide();
        $("form.sell_form").hide();
        $("form.delete_user_form").hide();
        $("div.invoice_div").hide();
        $("form.user_form").show();

      }
)



 const btnsAdd=document.getElementById("btn_add");
 btnsAdd.onclick =function()
        {

            var db=openDatabase('phatmacy_system','1.0','phatmacy_system',2 * 1024 * 1024);
            db.transaction(function(tx)
            {
            db.transaction(function (tx) { 
                tx.executeSql('SELECT * FROM USERS', [], function (tx, results) { 
                   var html = "<table>";
                   for (var i = 0; i < results.rows.length; i++) { 
                        html += "<tr>";
                        for(var prop in results.rows.item(i)){
                            html+="<td>"+results.rows.item(i)[prop] +"</td>";
                            
                      }
                      var InputName = document.getElementById("Name").value;
                      var InputPassword = document.getElementById("Password").value;
                      if(InputName==""||InputPassword=="")
                      {
                        alert("please enter all user data");
                        return;
                      }
                      console.log(InputName);
                      console.log(InputPassword);
                      console.log(results.rows.item(i).name);
                      if(results.rows.item(i).name==InputName && results.rows.item(i).password==InputPassword )
                      {
                        
                        alert("this user already exist");
                        document.getElementById("Name").value="";
                    document.getElementById("Password").value="";
                        return;
    
                         
                      }
                     
                      html+="</tr>";
                     
                   } 
                   db.transaction(function (tx) { 
                    tx.executeSql('INSERT INTO USERS (name,password) VALUES (?, ?)',[InputName,InputPassword]); 
                    console.log("diiiiii");
                    alert("User added successfully");
                    document.getElementById("Name").value="";
                    document.getElementById("Password").value="";
                    
                    
                 })
                 
            
                   html+="</table>";
                 
                   
                  
                }); 
                
             }); 
            })
            // document.getElementById("Name").value="";
            //     document.getElementById("Password").value="";
        }
        








        $("form.delete_user_form").hide();
        $("button.delete_user").click(
            function(){
              
                $("form.item_form").hide();
                $("form.sell_form").hide();
                $("form.user_form").hide();
                $("div.invoice_div").hide();
                $("form.delete_user_form").show();}
        )
        
        
        
         const btndelete=document.getElementById("btn_delete");
         btndelete.onclick =function()
                {
        
                    var db=openDatabase('phatmacy_system','1.0','phatmacy_system',2 * 1024 * 1024);
                    db.transaction(function(tx)
                    {
                    db.transaction(function (tx) { 
                        tx.executeSql('SELECT * FROM USERS', [], function (tx, results) { 
                           var html = "<table>";
                           for (var i = 0; i < results.rows.length; i++) { 
                                html += "<tr>";
                                for(var prop in results.rows.item(i)){
                                    html+="<td>"+results.rows.item(i)[prop] +"</td>";
                                    
                              }
                              var InputName = document.getElementById("dName").value;
                              var InputPassword = document.getElementById("dPassword").value;
                              console.log(InputName);
                              console.log(InputPassword);
                              console.log(results.rows.item(i).name);
                              if(results.rows.item(i).name==InputName && results.rows.item(i).password==InputPassword )
                              {
                                db.transaction(function (tx) { 
                                  tx.executeSql('delete from USERS where name=?', [InputName]); 
                                  // console.log("diiiiii");
                                  alert("User deleted successfully");
                                  document.getElementById("dName").value="";
                        document.getElementById("dPassword").value="";
                                  
                                  
                               })
                                
                                
                                return;
            
                                 
                              }
                             
                              html+="</tr>";
                             
                           } 
                           alert("this user is not  exist");
                           document.getElementById("dName").value="";
                           document.getElementById("dPassword").value="";
                    
                           html+="</table>";
                         
                           
                          
                        }); 
                        
                     }); 
                    })
                    // document.getElementById("Name").value="";
                    //     document.getElementById("Password").value="";
                }
                






                // const btndelete=document.getElementById("btn_delete");
                // btndelete.onclick =function()
                // {}





                $("div.invoice_div").hide();
                $("button.invoice").click(
                  function(){
                    
                      $("form.item_form").hide();
                      $("form.sell_form").hide();
                      $("form.user_form").hide();
                      $("div.invoice_div").show();
                      $("form.delete_user_form").hide();

                      db.transaction(function (tx) { 
                        tx.executeSql('SELECT * FROM INVOICES', [], function (tx, results) { 
                           var html = "<table >";
                           html+="<th>"+"Date"+"</th>";
                           html+="<th>"+"User_Name"+"</th>";
                           html+="<th>"+"Type"+"</th>";
                           html+="<th>"+"Quantity"+"</th>";
                           html+="<th>"+"Price"+"</th>";
                           html+="<th>"+"Item Name"+"</th>";
      
                     for (var i = 0; i < results.rows.length; i++) { 
                      html += "<tr>";
                      
                        html+="<td>"+results.rows.item(i).date +"</td>";
                        html+="<td>"+results.rows.item(i).userName +"</td>";
                        html+="<td>"+results.rows.item(i).type +"</td>";
                        html+="<td>"+results.rows.item(i).itemName +"</td>";
                        html+="<td>"+results.rows.item(i).quantity +"</td>";
                        html+="<td>"+results.rows.item(i).totalprice +"</td>";
                      
                      html+="</tr>";
                           } 
                     html+="</table>";
                     document.getElementById("showdata").innerHTML = html;
                        }, null); 
                     }); 
                    }
              )

              const btnsearch=document.getElementById("search");
              btnsearch.onclick =function()
              {
                console.log("ee");
                var searchDate=document.getElementById("sdate").value;
                console.log(searchDate);
                db.transaction(function (tx) { 
                  tx.executeSql('SELECT * FROM INVOICES where date =?', [searchDate], function (tx, results) { 
                     var html = "<table>";
               for (var i = 0; i < results.rows.length; i++) { 
                html += "<tr>";
                for(var prop in results.rows.item(i)){
                  html+="<td>"+results.rows.item(i)[prop] +"</td>";
                }
                html+="</tr>";
                     } 
               html+="</table>";
               $("#showdata").hide();
               if(searchDate=="")
               {
                $("#showdata").show();
               }
               $("#show").show();
               document.getElementById("show").innerHTML = html;
                  }, null); 
               }); 
              }
