var budgetController = (function(){

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type == 'inc') {
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    };

})();

var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputSubmitButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
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

        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value, type);
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        getDOMstrings: function() {
            return DOMstrings;
        },

        clearFields: function() {
            var fields, fieldsArr;
            
            // querySelector returns list. List don't have support for functions as arrays have.
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            // Converting list to array. 
            // We don't need to create an object from the array and then use the `slice` function,
            // we can simply use array prototype function.
            fieldsArr = Array.prototype.slice.call(fields);
            
            // Important Remember this Order!
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            // Focussing back to the description field.
            fieldsArr[0].focus();
        },
    };

})();


var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputSubmitButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
    
            // old browsers use 'which' instead of 'KeyCode' property.
            if (event.keyCode === 13 || event.which === 13) {
                //console.log("Enter Key");
                ctrlAddItem();
            } 
            //console.log(event);
        });    
    }

    var ctrlAddItem = function() {
        // Get the input field.
        var input, newItem;

        // Get input fields.
        input = UICtrl.getinput();

        // Add the item to the budget controller.
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // Add the item to the UI controller.
        UICtrl.addListItem(newItem, input.type);

        // Clear the fields.
        UICtrl.clearFields();
        //console.log("value added");
        //console.log(input);
    }

    return {
        init: function() {
            console.log("Init called!");
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();