jQuery(document).ready(function($) {

	var milestones = mockData;

	for(var i = 0; i < milestones.length; i++) {
		add_item(milestones[i]);
	}
	//add_empty_item();

	$('#btn-add').click(function() {
		add_empty_item();
	});

	update_button_actions();
});

function update_button_actions() {
	$('.cd-edit').click(function() {
		//if(!$(this).hasClass('cd-edit')) return;
		var content = $(this).parents('.cd-timeline-content');
		$(content).find('textarea, input').prop('disabled',false);
		toggle_save(this);
	});

	$('.cd-save').click(function() {
		//if(!$(this).hasClass('cd-save')) return;
		var content = $(this).parents('.cd-timeline-content');
		$(content).find('textarea, input').prop('disabled',true);
		toggle_edit(this);
	})
}

function toggle_save(btn) {
	$(btn).text('Save');
	$(btn).addClass('cd-save');
	$(btn).removeClass('cd-edit');

	update_button_actions();
}

function toggle_edit(btn) {
	$(btn).text('Edit');
	$(btn).addClass('cd-edit');
	$(btn).removeClass('cd-save');

	update_button_actions();
}

function add_empty_item() {
	add_item({
		title: '',
		description: 'Put description here',
		date_start: Date.now(),
		type: 1
	}, true);
}

function add_item(data, edit) {
	console.log(data);
	var date = new Date(data.date_start); // Convert unix seconds to milliseconds
	var disabled = edit ? '' : 'disabled';
	var html = ''+
		'<div class="cd-timeline-block">'+
		'	<div class="cd-timeline-img cd-location">'+
		'		<img src="img/cd-icon-location.svg" alt="Picture">'+
		'	</div>'+
		'	<div class="cd-timeline-content">'+
		'		<input '+disabled+' type="text" class="cd-title" placeholder="Title" value="'+data.title+'"/><br>'+
		'		<textarea '+disabled+' class="cd-description" >'+data.description+'</textarea><br>';
		if(edit) html+=
		'		<a class="cd-read-more cd-save">Save</a>';
		else html+=
		'		<a class="cd-read-more cd-edit">Edit</a>';
		html += ''+
		'		<span class="cd-date">'+date.toLocaleString()+'</span>'+
		'	</div>'+
		'</div>';

	$('#cd-timeline').append(html);
	update_button_actions();
}