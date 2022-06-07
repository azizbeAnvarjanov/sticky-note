






let add_box = document.querySelector('.add-box');
let add_btn = document.querySelector('.add-box .icon');
let popup_box = document.querySelector('.popup-box');
let close_btn = document.querySelector('.content header i');
let popup_title = document.querySelector('.content header p');
let button = document.querySelector('form button');
let title_tag = document.querySelector('.title input');
let desc_tag = document.querySelector('.description textarea');
let form = document.querySelector('form');



const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];


let notes = JSON.parse(localStorage.getItem('notes')) || [];



function add_new_note(note, id) {
    let date = new Date();

    let month = months[date.getMonth()];
    let day = date.getDay();
    let year = date.getFullYear();

    let html = `
            <li class="note" id="${id}">
                <div class="details">
                    <p>${note.title}</p>
                    <span>${note.desc}</span>
                </div>
                <div class="bottom-content">
                <span>${month} ${day} ${year}</span>
                <div class="settings">
                    <i class="uil uil-ellipsis-h trash_btn" onclick="deleted(this)"></i>
                    <ul class="menu">
                        <li class="delete_btn" ><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                    </div>
                </div>
            </li>
        `;

        localStorage.setItem('notes', JSON.stringify(notes));
        add_box.insertAdjacentHTML('afterend', html);
}





function started() {
    if(title_tag.value === '') return;
    let note_info = {
        title: title_tag.value,
        desc: desc_tag.value
    }
    notes.push(note_info);
    add_new_note(note_info);
}

notes.forEach((el, i) => {
    add_new_note(el,i);
});




add_box.addEventListener('click', () => {
    popup_title.innerHTML = 'Add the new Note';
    button.innerHTML = 'Add';
    popup_box.classList.add('show')
});


button.addEventListener('click', () => {
    started();
    popup_box.classList.remove('show');
    title_tag.value = desc_tag.value = '';
});


close_btn.addEventListener('click', () => {
    popup_box.classList.remove('show');
});




let trash_btn = document.querySelectorAll('.trash_btn');


function deleted(el) {
    
    let setting = el.parentElement; 
    let delete_note = setting.parentElement.parentElement.id;
    setting.classList.add('show');
    
    
    setting.querySelector('.delete_btn').addEventListener('click', () => {
        notes.splice(delete_note,1);
        localStorage.setItem('notes', JSON.stringify(notes));
        setting.parentElement.parentElement.remove();
    });
   
}
