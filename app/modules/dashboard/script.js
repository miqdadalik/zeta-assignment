$(document).ready(function(){

	function createItem(data, elementClass) {

		var li = document.createElement('li');
		var img = document.createElement('img');
		img.src = data.user.img;
		var label = document.createElement('label');
		$(label).html(data.title);

		$(li).addClass('list-item ' + data.status);

		var row = document.createElement('div');
		$(row).addClass('row');
		var firstColumn = document.createElement('div');
		$(firstColumn).addClass('col-2');

		var secondColumn = document.createElement('div');
		$(secondColumn).addClass('col-8');
		$(secondColumn).html('<label>' + data.title + '</label>');

		var thirdColumn = document.createElement('div');
		$(thirdColumn).addClass('col-2');
		$(thirdColumn).html('<a href="#"><i class="fa fa-play"></i></span>');

		$(firstColumn).html(img);
		$(row).html(firstColumn);
		$(row).append(secondColumn);
		$(row).append(thirdColumn);

		$(li).html(row);

		$(li).hide();
		$(elementClass).append(li);
		$(li).slideDown('slow');
	}

	function loadTasks() {
		$.ajax({
			url: 'data/tasks.json',
			type: 'get',
			success: function (response) {
				$.each(response, function(index, data) {
					createItem(data, $('.ideas-list'));
				});
			}
		})
	}

	function loadInProgress() {
		$.ajax({
			url: 'data/in-progress.json',
			type: 'get',
			success: function (response) {
				$.each(response, function(index, data) {
					createItem(data, $('.inprogress-list'));
				});
			}
		})
	}

	function loadReview() {
		$.ajax({
			url: 'data/review.json',
			type: 'get',
			success: function (response) {
				$.each(response, function(index, data) {
					createItem(data, $('.review-list'));
				});
			}
		})
	}

	function loadApproved() {
		$.ajax({
			url: 'data/approved.json',
			type: 'get',
			success: function (response) {
				$.each(response, function(index, data) {
					createItem(data, $('.approved-list'));
				});
			}
		})
	}

	loadTasks();
	loadInProgress();
	loadReview();
	loadApproved();
});