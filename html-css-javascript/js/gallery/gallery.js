/**
 * 
 */
function logToConsole(message) {
	//console.log(message); 
};

$(document).ready(function(){
	
	Backbone.sync = function(method, model) {
		  logToConsole("I've been passed " + method + " with " + JSON.stringify(model));
	};
		
	Photo = Backbone.Model.extend({
	    defaults: {
	        src: 'null.gif',
	        thumb_src_attr: 'null.gif',
	        title: 'Immagine non disponibile',
	        didascalia: '',
	        id: 0
	    },
	    initialize: function(){
	    	logToConsole('Model Photo initialization ' + this.get("src"));
	        this.bind("change:src", function(){
	            var src = this.get("src"); 
	            logToConsole('Image source updated to ' + src)
	        });
	    },
	    validate: function(attribs){
	    	logToConsole(JSON.stringify(attribs));
	        if(attribs.src == "noimagevailable.jpg"){
	            return "Remember to set a source for your image!";
	        }
	    },
	    getSrc: function(){
	        this.get("src");
	    },
	    setSrc: function( source ){
	        this.set({ src: source });
	    },
	    getTitle: function(){
	        this.get("title");
	    },	    
	    setTitle: function( title ){
	        this.set({ title: title });
	    }
	});
	 
	PhotoCollection = Backbone.Collection.extend({
	    model: Photo,
	    initialize: function(){
	    	logToConsole('Collection PhotoCollection initialization');
	    	
	    	this.bind("add", function(photo) {
	  		  	logToConsole("Aggiunta foto " + photo.get("title") + ', '  + photo.get("src"));
	    	});
	    }
	});
	
	GalleryController = Backbone.Router.extend({
		initialize: function(options) {
			logToConsole("Router initialization");
			this.getPhotos(options);
		},
		
	    /* define the route and function maps for this controller */
	    routes:{
	    	 "/photos" : "getPhotos",
	    	 "/photos/:id" : "getPhoto"
	    },
	    
	    getPhotos: function(options) {
	    	logToConsole("GalleryController getPhotos nome galleria " + options.galleryName);

			var myPhotoCollection = new PhotoCollection(); // var myPhotoCollection = new PhotoCollection([myPhoto]);
			myPhotoCollection.add(options.dataSource);
			
			/*myPhotoCollection.url = '/photos.txt';
			myPhotoCollection.fetch({
										success: function (collection, response){
											alert(response);
											alert(JSON.stringify(colection));
										},
										error: function (collection, response){
											alert(response);
											alert(JSON.stringify(colection));
										}
			});
			myPhotoCollection = myPhotoCollection.sortBy(function(photo){
			    return photo.get("title").toLowerCase();
			});*/
			
			var galleryView = new GalleryView({collection: myPhotoCollection, 
											   el: $('#' + options.galleryName + '-gallery')});
			galleryView.render();
	    },
	
	    getPhoto: function(id) {
	    	logToConsole("GalleryController getPhoto");  
	    } 
	});
	
	ZoomPhotoView = Backbone.View.extend({
	
		  //tagName: 'li', // Crea un elemento DOM "li" all'interno del quale appendere il template parsato.
		  
		  el: $('#photo-zoom'),
	
		  zoomPhotoTemplate: _.template($('#gallery-item-template').html()), // Cache the template function for a single photo.
		  
		  initialize: function(options) {
			  logToConsole("ZoomPhotoView initialization");
		  },	
	
		  render: function() {
			logToConsole("ZoomPhotoView render");
			$(this.el).html(this.zoomPhotoTemplate(this.model.toJSON()));
			var model = this.model;
			var el = this.el;
			$(this.el).find('img').load(function(){ 
				var position = $('img[data-id="'+ model.get("id") + '"]').position();
				var width = $('img[data-id="'+ model.get("id") + '"]').width();
				var height = $('img[data-id="'+ model.get("id") + '"]').height();
				
				// Coordinata Y.
				var left = position.left;
				var right = position.left + $(el).width();
				if (right > $(window).width()) 
					left = left - $(el).width() - 10;
				else
					left = left + width + 10;
				
				$(el).css('left', left);
				
				// Coordinata X.
				var top = position.top;
				var bottom = top + $(el).height();
				
				//alert(model.get("title") + ' ' + model.get("id") + '  ' + $(window).height() + ' ' + $(this.el).height() + ' ' + top + ' ' + bottom);
				
				if (bottom > $(window).height())
				{
					top = (top - $(el).height()) + height;
					
				    var docViewTop = $(window).scrollTop();
				    var docViewBottom = docViewTop + $(window).height();
				    
					if (top < docViewTop) 
						top = docViewTop;
						
					if (top + $(el).height() > docViewBottom)
						top = top - height;
					

				}

				$(el).css('top', top);
				$(el).css('display', 'block');
		  	});
			return this;
		  },
		  
		  close:  function() {
			$(this.el).css('display', 'none');
			$(this.el).css('top', 0);
			$(this.el).css('left', 0);
		  }
	});
	
	GalleryView = Backbone.View.extend({
		
		//Instead of generating a new element, bind to the existing skeleton of the App already present in the HTML.
		// Altrimenti usavo una o tutte le proprietrà tagName, className e id per costruirmi il mio elemento
		// base della view. Di default se non si specifica niene "el" equivale ad un div vuoto.
	    //el: $("#gallery"),
	    
	    galleryTemplate: _.template($('#gallery-template').html()), // Cache the template function.
	    
	    initialize: function(options) {
	    	logToConsole("GalleryView initialization");
	    },
	    
	    events: {
		    "mouseover .photo": "zoomPhoto",
		    "mouseout .photo": "zoomOutPhoto"
		},
		
	    render: function() {
	    	logToConsole("GalleryView render");
	    	logToConsole(JSON.stringify(this.collection.toJSON()));
	    	// el viene impostato da fuori, dal chiamante passandolo come option di initialize.
	    	$(this.el).html(this.galleryTemplate({photos: this.collection.toJSON()}));
	    	return this;
	    },
	    
	    zoomPhoto: function(event){
	    	logToConsole("GalleryView zoomPhoto " + $(event.target).attr('data-id'));
	    	
	    	var photo = this.collection.get($(event.target).attr('data-id'));
	    	this.view = new ZoomPhotoView({model: photo, thumb: $(event.target)});
	    	this.view.render();
	    },
	    
	    zoomOutPhoto: function(event){
	    	this.view.close();
	    }
	    
	    /*addOne: function(photo) {
	    	logToConsole("GalleryView addOne " + photo.get("src"));
	        var view = new SinglePhotoView({model: photo});
	        this.$("#gallery").append(view.render().el);
	    },
	      
	    addAll: function() {
	    	logToConsole("AppView addAll");
	    	PhotoCollection.each(this.addOne);
	    }*/
	});
});