!function($){
	function NamedEventStack(){
		this.events = [];
	}
	NamedEventStack.prototype = {
		add:function(name,f){
			this.events[name] = f;
		},
		run:function(){
			for(var key in this.events){
				this.events[key]();
			}
		}
	};

	function InviewController(){
		var t = this;
		this.win = $(window);
		this.h = this.win.height();
		this.vis =this.win.height()+this.win.scrollTop();
		this.eventstack = new NamedEventStack();
		this.win.off('scroll.inview').on('scroll.inview',function(){
			t.checkPositions();
		});
		//	core.resizer.add(function(){
		//		t.setHeight();
		//		t.checkPositions();
		//	});
		this.timer = false;
		window.onload = function(){
			t.win.scroll();
		};
	}
	InviewController.prototype = {
		checkPositions:function(){
			var t = this,
				st = this.win.scrollTop();
			this.vis = this.h+st;
			t.eventstack.run();
		},
		setHeight:function(){
			this.h = this.win.height();
		}
	};

	function Inview(ele,opts){
		var t = this;
		this.ele = ele;
		this.opts = $.extend({},{
			callback: function(){},
			offset: 0,
			namespace: 'inview',
			index: 0
		}, opts);
		this.eventKey = this.opts.namespace + this.opts.index;
		ele.data.visible = false;

		if(!window.inviewController){ window.inviewController = new InviewController(); }

		window.inviewController.eventstack.add( this.eventKey, function(){
			if( (ele.offset().top + (ele.outerHeight() - t.opts.offset) ) < window.inviewController.vis && !ele.data().visible ){
				t.opts.callback.call(ele);
				ele.data().visible = true;
				// remove event after its been fired
				window.inviewController.eventstack.events[t.eventKey] = function(){};
			}
		});
		$(window).scroll();
	}
	$.fn.inView = function(opts){
		return this.each(function(i){
			opts.index = i;
			$(this).data({
				inview: new Inview($(this),opts)
			});
		});
	};
}(jQuery);