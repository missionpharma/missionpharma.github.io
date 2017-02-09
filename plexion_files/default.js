(function(newtype, $, undefined )
{		
	var is_ie;
		
	$(document).ready(function()
	{
		is_ie = false;
		
		if($('select').length)
		{		
			$('select').dropdown();
			
			$('input, select, textarea').each(function(i)
			{
				if($(this).attr('type') != 'hidden')
				{
					$(this).attr('tabindex',i+1);
				}
				
				if($(this).hasClass('hidden'))
				{
					$(this).attr('tabindex','').attr('type','hidden');
				}
			});
		}
		
		page_jump();
		slider();
	});
	
	function page_jump()
	{
		var jump = '<div id="jump"></div>';
		
		$('#wrapper').append(jump);
		
		var e = $('#jump');
		
		$(window).scroll(function() 
		{
			if(window.scrollY >= window.innerHeight/4)
			{
				if(is_ie)
				{
					e.css('display','block');
				} else {
					e.stop().animate({opacity: 1}, 500);
				}
			} else {
				if(is_ie)
				{
					e.css('display','none');
				} else {
					e.stop().animate({opacity: 0}, 500);
				}
			}
		}).scroll();
		
		e.on('click',function()
		{
			$('html, body').animate({scrollTop:0}, 500);
		});
	}
	
	function slider()
	{
		var bar = '<div id="bar"><div id="orb"></div><ul id="orbs"><li></li><li></li><li class="last"></li></ul><div id="full"></div><div id="empty"></div></div>';
		
		$('#slider .content').append(bar);
		
		newtype.width = $('#wrapper').width();
		
		newtype.slider = Object;
		newtype.slider.space = 43;
		newtype.slider.start = -7;
		newtype.slider.current = 1;
		newtype.slider.orb = $('#orb');
		newtype.slider.full = $('#full');
		newtype.slider.slides = $('#slides');
		
		
		$('#slides li').each(function(i)
		{
			$(this).css({'position':'absolute','left':i*newtype.width,'top':0,'display':'block'});
		});
		
		$('#orbs li').on('click',newtype.jump_slide);
		
		newtype.slide_timer = setTimeout('newtype.change_slide()',7500);
		
		$(window).on('resize',newtype.fix_slide);
	}
	
	newtype.fix_slide = function()
	{
		newtype.width = $('#wrapper').width();
		
		$('#slides li').each(function(i)
		{
			$(this).css({'position':'absolute','left':i*newtype.width,'top':0,'display':'block'});
		});
		
		var sl = 0 - (newtype.slider.current-1)*newtype.width;
		
		newtype.slider.slides.stop().css('left',sl);
	}
	
	newtype.jump_slide = function()
	{
		if(newtype.slide_timer != undefined)
		{
			clearTimeout(newtype.slide_timer);
		}
		
		newtype.slider.current = $(this).index();
		
		newtype.change_slide();
	}
	
	newtype.change_slide = function()
	{
		if(newtype.slide_timer != undefined)
		{
			clearTimeout(newtype.slide_timer);
		}
		
		if(newtype.slider.current == 3)
		{
			newtype.slider.current = 0;
		}
		
		var sl = 0 - newtype.slider.current*newtype.width;
		var ol = newtype.slider.current*newtype.slider.space;
		
		newtype.slider.slides.animate({left:sl},750);
		newtype.slider.orb.animate({left:ol+ newtype.slider.start},750);
		newtype.slider.full.animate({width:ol},750);
		
		newtype.slider.current += 1;
		
		newtype.slide_timer = setTimeout('newtype.change_slide()',7500);
	}
}(window.newtype = window.newtype || {}, jQuery));