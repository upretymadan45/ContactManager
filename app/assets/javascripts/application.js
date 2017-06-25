// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require jquery-ui/jquery-ui.js
//= require EasyAutocomplete/dist/jquery.easy-autocomplete.js
//= require bootstrap/dist/js/bootstrap.js
//= require toastr/toastr.js
//= require bootbox.js/bootbox.js
//= require gmaps
//= require_tree .

$(function(){
    $('.askConfirmation').on('click', function(){
        var value = $(this).attr('value');
        var tableRow = $(this).closest('tr');
        bootbox.confirm({
            size: 'small',
            message: 'Are you sure?',
            callback: function(result){
                if(result==true){
                    $.ajax({
                        url: 'contact_infos/'+value,
                        method: 'delete',
                        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
                        success: function(result){
                            tableRow.find('td').fadeOut('fast',function(){
                                tableRow.remove();
                            });
                            toastr.options ={
                                "positionClass":"toast-bottom-right"
                            }
                            toastr.info('Successfully Deleted.');
                            console.log('deleted');
                        },
                        error: function(error){
                            console.log('failed to delete!');
                        }
                    });
                }
                return;
            }
        });
    })

    //auto-complete features for contact from easyAutocomplete plugin
    var options = {

  url: function(phrase) {
    return "contact_infos/searchContacts";
  },

  getValue: function(element) {
    return element.name;
  },

  list: {
    onSelectItemEvent : function(){
            
        },
    onClickEvent : function(){
        var id = $("#square").getSelectedItemData().id;
        $(location).attr('href','/contact_infos/'+id);
    }
},

  ajaxSettings: {
    dataType: "json",
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    method: "POST",
    data: {
      dataType: "json"
    }
  },

  preparePostData: function(data) {
    data.phrase = $("#square").val();
    return data;
  },

  requestDelay: 400
};

$("#square").easyAutocomplete(options);



});