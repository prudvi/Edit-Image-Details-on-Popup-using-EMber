var firstHelperGlobalVariable = 0;
var secondHelperGlobalVariable = 0;


Ember.Handlebars.registerHelper('firstVal', function( result, options){
   
    if (firstHelperGlobalVariable%4 == result) {
      firstHelperGlobalVariable++;
        return options.fn(this);
    } else {
        firstHelperGlobalVariable++;
        return options.inverse(this);
    }

});

Ember.Handlebars.registerHelper('secondVal', function( result, options){
    
    if (secondHelperGlobalVariable%4 == result) {
        secondHelperGlobalVariable++;
        return options.fn(this);
    } else {
        secondHelperGlobalVariable++;
        return options.inverse(this);
    }

});


App.MyRadioButtonComponent = Ember.Component.extend({
  tagName: 'input',
  type: 'radio',
  attributeBindings: ['myName:name', 'type', 'myValue:value'],
  willInsertElement: function(){
    this.setProperties({
      myName: 'shippinOptions',
      myValue: this.get('content.value')
    });
  },
  change: function(){
    path = serverPath + '/' +this.get('content.value');
    
     }

});
