let addTitle = document.getElementById('addTitle');
let addText = document.getElementById('addText');
let addBtn = document.getElementById('addBtn');
let searchText = document.getElementById('searchText');
let showNum = document.getElementById('showNum');
let cardsBlock = document.getElementById('cardsBlock');
let srchBtn = document.getElementById('srchBtn');
let msg = document.getElementById('message');
let notesObj = [];
showNotes();

addBtn.addEventListener('click', AddNotes);
searchText.addEventListener('keyup', SearchNotes);
srchBtn.addEventListener('click', SearchNotes);

function AddNotes() {
	if (addTitle.value.trim() == '' && addText.value.trim() == '') {
		clearFields();
		return displayMessage('danger', 'Cannot add an empty note!');
	} else {
		displayMessage('success', 'Your note has been added successfully!');
	}

	let myObj = {
		title: addTitle.value,
		text: addText.value,
		currDate: new Date().toLocaleDateString(),
		currTime: new Date().toLocaleTimeString(),
	};

	notesObj.push(myObj);
	localStorage.setItem('notes', JSON.stringify(notesObj));
	clearFields();
	showNotes();
}

function clearFields() {
	addText.value = '';
	addTitle.value = '';
	searchText.value = '';
}

function displayMessage(type, message) {
	msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message: </strong> ${message} 
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
					</div>`;
	setTimeout(() => {
		msg.innerHTML = '';
	}, 3000);
}

function showNotes() {
	let lsNotes = localStorage.getItem('notes');
	if (lsNotes === null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(lsNotes);
	}
	let html = '';
	notesObj.forEach((element, index) => {
		if (element.title == '') {
			element.title = element.text;
		}
		html += `
			<div class="cardnotes card col-md-5 shadow-sm p-0 my-2 mx-2 overflow-auto" 
				style="width:14rem">
				<div class="card-body p-3">
					<small class="badge badge-danger float-right" title="Delete" 
					id="${index}" onclick="deleteNotes(this.id)">X</small>
					<h6 class="card-title mt-2">${element.title}</h6>
					<p style="font-size:0.9rem" class="card-text">${element.text}</p>
				</div>
				<small class="text-muted text-center mb-2">${element.currDate} ${element.currTime}</small>
			</div>`;
	});

	showNum.innerHTML = `Your Notes <span class="text-muted">(${notesObj.length})</span>`;
	if (notesObj.length == 0) {
		cardsBlock.innerHTML = `Use <b>"Add Note"</b> section above to add notes`;
	} else {
		cardsBlock.innerHTML = html;
	}
}

function deleteNotes(index) {
	notesObj.splice(index, 1);
	localStorage.setItem('notes', JSON.stringify(notesObj));
	showNotes();
}

function SearchNotes(e) {
	let inputval = searchText.value.toLowerCase();
	console.log('searchNotes', inputval);
	let filterNotes = document.getElementsByClassName('cardnotes');
	Array.from(filterNotes).forEach((element) => {
		let filterTitle = element.getElementsByTagName('h6')[0];
		let filterText = element.getElementsByTagName('p')[0];
		let filterContent =
			(filterTitle.innerText || filterTitle.textContent) +
			(filterText.innerText || filterText.textContent);
		console.log('filterContent', filterContent.value);
		if (filterContent.toLowerCase().includes(inputval)) {
			element.style.display = '';
		} else {
			element.style.display = 'none';
		}
	});
	e.preventDefault();
}
