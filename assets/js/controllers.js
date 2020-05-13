var Controller = {
    getController: function () {
        if ($('body').attr('data-controller')) {
            eval('Controller.' + $('body').attr('data-controller') + '();');
        }
    },
    global: function () {
        Util._cnpj('.cnpj');
        Util._stickyNav('header');
    },   
    home: function () {
      
    }      
};

$(document).ready(function (){
    Controller.getController(); 
    Controller.global();    
});
      
      