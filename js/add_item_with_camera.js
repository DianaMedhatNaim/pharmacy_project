
$("#btn_stop").hide();
$("form.item_form").hide();
$("button.item").click(function(){
    $("form.user_form").hide();
    $("form.delete_user_form").hide();
    $("form.item_form").show();})
$("#videoElement").hide();
        $("#showscreenshot").hide();


        var video = document.querySelector("#videoElement");
     var canvas = document.querySelector("#showscreenshot");

        var img_as_string;
var upload_btn=document.getElementById("btn_upload");
upload_btn.onclick=function takescreenshot () {
    $("#videoElement").show();
        $("#showscreenshot").show();

        $("#btn_upload").prop('value','click to take photo');
        $("#btn_stop").show();

    

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio:false })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (error) {
          console.log("Something went wrong!");
        });
    }
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
         img_as_string=canvas.toDataURL("image/webp");

         
    };


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
    
    var username=localStorage.username;
    
 const AddItem=document.getElementById("add_item");
 AddItem.onclick =function()
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
                     html+="<td>"+results.rows.item(i)[prop] +"</td>";
                     
               }
               var name = document.getElementById("itemName").value;
               var quantity = document.getElementById("itemQuantity").value;
               var tprice = document.getElementById("totalprice").value;
               var Iprice=(((tprice)/(quantity))*(0.1))+((tprice)/(quantity));
               if(name=="" || quantity=="" || tprice=="")
               {
                 alert("please enter all data");
                 return;
               }
               var db=openDatabase('phatmacy_system','1.0','phatmacy_system',2 * 1024 * 1024);
                        var ID;
                        var LastId;
                        var len;
                        db.transaction(function(tx) {
                            tx.executeSql("SELECT id FROM INVOICES",[], function(sqlTransaction, sqlResultSet) {
                             ID = sqlResultSet.rows;
                             len = ID.length;
                            for (var i = 0; i < len; i++) {
                                 LastId = (Number(ID[i].id))+1; 
                               
                            };
                            console.log(ID)

                        });
                        
                        });
               if(results.rows.item(i).name==name )
               {
                var NQuantity=(Number(results.rows.item(i).quantity))+(Number(quantity));
                var db=openDatabase('phatmacy_system','1.0','phatmacy_system',2 * 1024 * 1024);
                db.transaction(function(tx) {
                  tx.executeSql('update ITEMS set quantity=?  where name=?', [NQuantity, name])
              });
              db.transaction(function(tx) {
                tx.executeSql('update ITEMS set ITEMprice=?   where name=?', [Iprice, name])
            });
            db.transaction(function(tx) {
              tx.executeSql('update ITEMS set  picture=?  where name=?', [img_as_string, name])
          });
                 
                 alert("this item already exist,item added successfully to items table")
                 
                 var db=openDatabase('phatmacy_system','1.0','phatmacy_system',2 * 1024 * 1024);
                 db.transaction(function (tx) { 
                    
                  tx.executeSql('INSERT INTO INVOICES (date,userName,type,itemName,quantity,totalprice,id) VALUES (?, ?,?,?,?,?,?)',[today,username,"buy",name,quantity,tprice,LastId]);
                  console.log(LastId);
                 
                  console.log(today);
                  console.log(username);
                  console.log(tprice);
                 
                  alert("item added successfully to invoice table");
                  document.getElementById("itemName").value="";
            document.getElementById("itemQuantity").value="";
            document.getElementById("totalprice").value="";
            canvas.width = 0;
        canvas.height = 0;
        img_as_string="";
        $("#btn_upload").prop('value','upload');
        $("#btn_stop").hide();

         
                  //alert(itemna+''+quan+''+totalprice);
                  
                  
               });
                 return;

                  
               }
              
               html+="</tr>";
              
            } 
            var db=openDatabase('phatmacy_system','1.0','phatmacy_system',2 * 1024 * 1024);
            db.transaction(function (tx) { 
             tx.executeSql('INSERT INTO ITEMS (name,quantity,picture,ITEMprice) VALUES (?, ?, ?,?)',[name,quantity,img_as_string,Iprice]); 
             console.log("diiiiii");
             alert("Item added successfully");
             document.getElementById("itemName").value="";
            document.getElementById("itemQuantity").value="";
            document.getElementById("totalprice").value="";
            canvas.width = 0;
        canvas.height = 0;
        img_as_string="";
        $("#btn_upload").prop('value','upload');
        $("#btn_stop").hide();
             
             
          })


          db.transaction(function (tx) { 
                    
            tx.executeSql('INSERT INTO INVOICES (date,userName,type,itemName,quantity,totalprice,id) VALUES (?, ?,?,?,?,?,?)',[today,username,"buy",name,quantity,tprice,LastId]);
           
            console.log(today);
            console.log(username);
            console.log(totalprice);
           
            alert("item added successfully to invoice table");
            //alert(itemna+''+quan+''+totalprice);
             document.getElementById("itemName").value="";
            document.getElementById("itemQuantity").value="";
            document.getElementById("totalprice").value="";
            canvas.width = 0;
        canvas.height = 0;
        img_as_string="";
        $("#btn_upload").prop('value','upload');
        $("#btn_stop").hide();
            
         });


     
            html+="</table>";
          
            
           
         }); 
        
      }); 
      
      
     

     })
 }



 const btn_stop=document.getElementById("btn_stop");
 btn_stop.onclick=function stop(e) {
      
  var stream = video.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }

    video.srcObject = null;
  }
      