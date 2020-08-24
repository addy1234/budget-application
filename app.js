var budgetController = (function(){


})();

var UIController = (function(){


})();


var controller = (function(budgetCtrl, UICtrl){

    document.querySelector('.add__btn').addEventListener('click', function(){

    });

    document.addEventListener('keypress', function(event){

        // old browsers use 'which' instead of 'KeyCode' property.
        if (event.keyCode === 13 || event.which === 13) {
            console.log("Enter Key");
        } else {
            console.log("Another Key");
        }
        console.log(event);
    });

})(budgetController, UIController);