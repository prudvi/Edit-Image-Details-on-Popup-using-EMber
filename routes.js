App.Router.map(function() {
	this.route('folders');
  this.route('imageList');
	this.route('modal');
	this.route('error');
});
/*
App.Router.reopen( {
  location : 'none'
});
*/
App.ApplicationRoute = Ember.Route.extend({
  actions: { 
    closeModal: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
    updateEachPreview: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
     
    },
    homePage : function(){
         this.transitionTo('/',{ into: 'index' }); 
    }
  }
});

App.FoldersRoute = Ember.Route.extend({
  model : function(){
    return foldersList;
  }
});

App.ImageListRoute = Ember.Route.extend({
	model : function(){
    return imageList;
	},actions :{
      openModal: function(title,description,comment,imageUrl,id) {
        this.controllerFor('modal').set('title', title);
        this.controllerFor('modal').set('description',description);
        this.controllerFor('modal').set('comment', comment);
        this.controllerFor('modal').set('id', id);
        this.controllerFor('modal').set('imageUrl',imageUrl);
        return this.render('modal', {
          into: 'application',
          outlet: 'modal'
        });
    }
  }
});

App.ModalRoute = Ember.Route.extend({
  
})
