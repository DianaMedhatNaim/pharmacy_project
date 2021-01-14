
var db=openDatabase('phatmacy_system','1.0','phatmacy_system',2 * 1024 * 1024);

            function adduser(){
                var name = document.getElementById("inputName").value;
                var password = document.getElementById("inputPassword3").value;
                db.transaction(function (tx) { 
                tx.executeSql('INSERT INTO USERS (name,password) VALUES (?, ?)',[name,password]); 
                
                
             })
            }
        
                const login_btn=document.querySelector("#btn_log")
                login_btn.onclick=function ()
               {
                   //console.log("enter");
                   db.transaction(function (tx) { 
                       tx.executeSql('SELECT * FROM USERS', [], function (tx, results) { 
                          var html = "<table>";
                          for (var i = 0; i < results.rows.length; i++) { 
                               html += "<tr>";
                               for(var prop in results.rows.item(i)){
                                   html+="<td>"+results.rows.item(i)[prop] +"</td>";
                                   
                             }
                             var name = document.getElementById("inputName").value;
                             var password = document.getElementById("inputPassword3").value;
                             console.log(name);
                             if(results.rows.item(i).name==name &&results.rows.item(i).password==password )
                             {
                                 
                                 if(name=="Admin" && password==1234 )
                                 {
                                    admin();
                                    
                                 }
                                 else
                             {
                                user();
                                
                                
                             }
                             if(localStorage.username)
                             {
                                localStorage.username=name;
                             }
                             else
                             {
                                localStorage.username=name; 
                             }
                             console.log("out");
           
                              return;
                              

                             }
                             
                           //   else
                           //   {
                               
                           //       alert("You Are Not User");
                           //   }
                            
                             html+="</tr>";
                          } 
                          html+="</table>";
                          alert("You Are Not User");
                          document.getElementById("inputName").value="";
                         document.getElementById("inputPassword3").value="";
                         // document.getElementById("showdata").innerHTML = html;
                         
                       }); 
                    }); 
               }
        
    
            
    
           
               function user(){
               //  window.open("../docs/user_page.html", '_blank');
               //  document.location.href = "";
               window.location.replace("../docs/user_page.html");
             }
    
    
            function admin(){
               //  window.open("../docs/Admin_page.html", '_blank');
               //  document.location.href = "";
               window.location.replace("../docs/Admin_page.html");
             }