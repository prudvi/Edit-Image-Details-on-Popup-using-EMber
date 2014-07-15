
App.IndexController = Ember.Controller.extend({
  actions: {
    getFoldersFromServer: function() {
      serverPath = this.get('serverPath');
      
      if(serverPath == undefined || serverPath == '' || serverPath.length == 0){
        alert('server path location canot be empty  ');
        return false;
      }
      var _self = this;
      var dfd = Ember.Deferred.create();
      var addedFolders = [];
      $.ajax({
        url: '/' + serverPath,
      }).then(function(data) {
        console.log('Response For Folders:::' + data);
        $(data).find("a:contains('/')").each(function() {

          var filename = this.href.replace(window.location.host, "").replace("http:///", "");
          addedFolders.addObject({
            'value': filename
          });
        });

        dfd.resolve(addedFolders);
        console.log('addedFolders::::;' + addedFolders);
        foldersList = addedFolders;
        _self.transitionTo('folders');
      }, function(data) {
        console.log(data);
        _self.transitionTo('error');
      });

    }
  
  }
})

App.FoldersController = Ember.Controller.extend({
  title: 'Fetch Images From Folder Path',
  folder: null,
  images: ['images', 'imagesList', 'imagesFolder', 'myFolder'],
  actions: {
    submitFolderPath: function() {
      var _self = this;
      var dfd = Ember.Deferred.create();
      var addedImages = [];
      $.ajax({
        url: '/' + path,
      }).then(function(data) {
        console.log('Response :::' + data);
        for (var i = 0; i < validExtensions.length; i++) {
          $(data).find("a:contains(" + validExtensions[i] + ")").each(function() {
            imageId++;
            var filename = this.href.replace(window.location.host, "").replace("http:///", "");
            addedImages.addObject({
              'imageId': imageId,
              'imageUrl': '/' + path + '/' + filename,
              'title': 'myImage /' + path + '/' + filename,
              'comment': 'I like the Location',
              'description': 'Excited to Visit ' + ' /' + path + '/' + filename + ' Tourist Place'
            });
          });
        }
        dfd.resolve(addedImages);
        imageList = addedImages;
        if(imageList.length>0)
          _self.transitionTo('imageList');
        else
          _self.transitionTo('error');
      }, function(data) {
        console.log(data);
        _self.transitionTo('error');
      });
    }
  }

})

App.ModalController = Ember.ObjectController.extend({
  title: null,
  description: null,
  id: 0,
  comment: null,
  imageUrl: null,
  actions: {
    close: function() {
      return this.send('closeModal');
    },
    update: function(id) {
      var check = false;
      var title = this.get('title');

      var description = this.get('description');
      var comment = this.get('comment');
      if ( title == undefined || title == ''){
          alert('Title cannot be empty');
          return false;
        }
      if (description == undefined || description == '' ){
          alert('description cannot be empty');
          return false;
        }
      if (comment == undefined || comment == ''){
         alert('comment cannot be empty');
         return false;
         }
      self.imageList.forEach(function(item, index, enumerable) {
        if (id == Ember.get(item, "imageId")) {
          Ember.set(item, "title", title);
          Ember.set(item, "description", description);
          Ember.set(item, "comment", comment);
          check = true;
          return;
        }
      });

      if (check == true) {
          return this.send('updateEachPreview');
      }
    }
   }
});

App.ModalDialogComponent = Ember.Component.extend({
  actions: {
    close: function() {
      return this.sendAction();
    }
  }
});
