$(document).ready(function(){

    $.ajax({
      url:'http://localhost:3000/api/products',
      type:'get',
      dataType:'JSON'
    })
    .done(function(response){
      let data = response.data;
      let status = response.status
      
        if (data.length > 0) { 
          createTbody(data);
      } else {
          alert(false,'Πρόβλημα στην αναζήτηση των προϊόντων ('+ data.message + ')');
      }
    });
  
    $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {
  
      let product = $("#product").val();
      let cost = $("#cost").val();
      let description = $("#description").val();
      let quantity = $("#quantity").val();
  
      const item = {
        'product': product,
        'cost': cost,
        'description': description,
        'quantity': quantity,
      }
  
      console.log($('.btnSubmit').val(), item);
      $.ajax({
        url: "http://localhost:3000/api/products",
        type: "post",
        data: item,
        dataType: "JSON",
      })
      .done( function(response) {
        
        let data = response.data;
        let status = response.status
    
        if (status) { 
            console.log(true,'Επιτυχής εισαγωγή του προϊόντος');
            alert(true,'Επιτυχής εισαγωγή του προϊόντος');
            $('#frmProduct')[0].reset();
            window.location.replace("http://localhost:3000/product/find.html")
        } else {
            console.log(false,'Πρόβλημα στην εισαγωγή του προϊόντος (' + data.message + ')' );
            alert(false,'Πρόβλημα στην εισαγωγή του προϊόντος (' + data.message + ')' );
            $('#frmProduct')[0].reset();
        }
      });
  
      return false
    });
});
  
  function createTbody(data){
  
    $("#productTable > tbody").empty();
  
    const len = data.length;
    for (let i = 0; i < len; i++){
      let product = data[i].product;
      let cost = data[i].cost;
      let description = data[i].description;
      let quantity = data[i].quantity;  
  
      let tr_str = "<tr>" +
        "<td>" + product + "</td>" +
        "<td>" + cost + "</td>" +
        "<td>" + description + "</td>" +
        "<td>" + quantity + "</td>" +    
        "<td>" +
            "<button class='btnUpdate btn btn-secondary' value=\'" + product + "\'>Τροποποίηση</button> " +
            "<button class='btnDelete btn btn-primary' value=\'" + product + "\'>Διαγραφή</button>" +
        "</td>" + 
        "</tr>";
  
      $("#productTable tbody").append(tr_str);
        }
    }
  
  $('#productTable').off('click', '.btnDelete').on('click', '.btnDelete', function() {
    let product = $(this).val()
    $.ajax({
      url: "http://localhost:3000/api/products/" + product,
      type: "delete",
      dataType: "JSON"
    })
    .done(function(response) {
      let data = response.data
      let status = response.status
    
      if(status) {
        console.log(true, 'Επιτυχής διαγραφή προϊόντος')
        alert(true, 'Επιτυχής διαγραφή προϊόντονς')
        window.location.replace("http://localhost:3000/product/find.html")
      } else {
        console.log(false, 'Πρόβλημα στη διαγραφή του προϊόντος (' + data.mesage + ')')
        alert(false, 'Πρόβλημα στη διαγραφή του προϊόντος (' + data.mesage + ')')
      }
    })
  })
  
  function alert(status, message){
    if (status){
        $('.alert').addClass('alert-success');
        $('.alert').removeClass('alert-danger');
    } else {
        $('.alert').addClass('alert-danger');
        $('.alert').removeClass('alert-success');
    }
    $('.alert').html(message);
  }