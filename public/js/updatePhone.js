// В дальнейшем, код перенесется сюда


// function deleteContact(name) {
//     if (confirm(`Удалить контакт?`)) {
//         fetch("/Delete", {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify({name: name})
//         }).then(() => {
//             window.location.href = '/';
//         });
//     }
// }

// function blockDelete() {
//     const nameInp = document.querySelector('.name').value;
//     const phoneInp = document.querySelector('.phone').value;
//     const deleteBtn = document.querySelector('.btn-del');
    
//     if (nameInp == `{{name}}` && phoneInp == `{{phone}}`) {
//         deleteBtn.disabled = false;
//     } else {
//         deleteBtn.disabled = true;
//     }
// }