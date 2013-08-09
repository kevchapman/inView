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
			var t = this;
			this.vis = this.h + this.win.scrollTop();
			t.eventstack.run();
		},
		setHeight:function(){
			this.h = this.win.height();
		}
	};

	function Inview(ele,func){
		this.ele = ele;
		this.ele.data().visible = false;
		if(!window.inviewController){ window.inviewController = new InviewController(); }
		window.inviewController.eventstack.add(ele.data().id,function(){
			var isInView = (ele.offset().top + ele.outerHeight()) < window.inviewController.vis;
			console.log(ele[0],isInView);
			if( isInView && !ele.data().visible ){
				func.call(ele);
				ele.data().visible = true;
				//window.inviewController.eventstack.events[ele.data().id] = function(){};
			}
		});
		$(window).scroll();
	}
	$.fn.inView = function(func){
		var key = this.selector.replace(' ','');
		return this.each(function(i){
			var $t = $(this);
			$t.data().id = key+i;
			$(this).data({
				inview: new Inview($(this),func)
			});
		});
	};
}(jQuery);