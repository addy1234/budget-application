var budgetController = (function(){


})();

var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputSubmitButton: '.add__btn'
    };

    return {
        getinput: function() {
            return {
                // Will be either inc or dec.
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }

})();


var controller = (function(budgetCtrl, UICtrl){

    var DOM = UICtrl.getDOMstrings();
    console.log(DOM);
    var ctrlAddItem = function() {
        // Get the input field.
        var input = UICtrl.getinput();
        console.log(input);
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){

        // old browsers use 'which' instead of 'KeyCode' property.
        if (event.keyCode === 13 || event.which === 13) {
            //console.log("Enter Key");
            ctrlAddItem();
        } 
        //console.log(event);
    });

})(budgetController, UIController);