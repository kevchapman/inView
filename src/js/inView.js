!function($){
	function NamedEventStack(){
		this.events = [];
	}
	NamedEventStack.prototype = {
		add:function(name,f){
			this.events[name] = f;
		},
		run:function(){
			var l = this.events.length;
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
		// core.resizer.add(function(){
		// 	t.setHeight();
		// 	t.checkPositions();
		// });
		this.timer = false;
		window.onload = function(){
			t.win.scroll();
		};
	}
	InviewController.prototype = {
		checkPositions:function(){
			var t = this;
			var st = this.win.scrollTop();
			this.vis = this.h+st;
			t.eventstack.run();
		},
		setHeight:function(){
			this.h = this.win.height();
		}
	};

	function Inview(ele,func){
		var t = this;
		this.ele = ele;
		this.ele.data().visible = false;
		if(!window.inviewController){ window.inviewController = new InviewController(); }
		inviewController.eventstack.add(ele.data().id,function(){
			if((ele.offset().top + ele.outerHeight()) < inviewController.vis && !ele.data().visible){
				func.call(ele);
				ele.data().visible = true;
				inviewController.eventstack.events[ele.data().id] = function(){};
			}
		});
		$(window).scroll();
	}
	$.fn.inView = function(func){
		var key = this.selector.replace(' ','');
		return this.each(function(i){
			$t = $(this);
			$t.data().id = key+i;
			$(this).data({
				inview: new Inview($(this),func)
			});
		});
	};
}(jQuery);