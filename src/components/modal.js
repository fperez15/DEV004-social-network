export function modalDelete() {
    const modalForDelete = document.createElement('div');
    modalForDelete.className = 'modalForDelete';
    modalForDelete.id = 'modalForDelete';
    const innerModalDelete = document.createElement('div');
    innerModalDelete.className = 'containerModalDelete';
    const titleModal = document.createElement('p');
    titleModal.textContent = 'Do you want to delete this post?';
    titleModal.className = 'titleModal';
    const btnAgree = document.createElement('button');
    btnAgree.textContent = 'AGREE';
    btnAgree.className = 'btnAgree';
    btnAgree.id = 'btnAgree';
    const btnCancel = document.createElement('button');
    btnCancel.textContent = 'CANCEL';
    btnCancel.className = 'btnCancel';
    btnCancel.id = 'btnCancel';
    innerModalDelete.append(titleModal, btnAgree, btnCancel);
    modalForDelete.append(innerModalDelete);
    modalForDelete.style.display = 'none';
    return modalForDelete;
  }

  export function modalEditPost() {
  const articlePostEdit = document.createElement('article');
  articlePostEdit.className = 'articlePostEdit';
  const userImgEdit = document.createElement('img');
  userImgEdit.className = 'userImgEdit';
  const nameUserEdit = document.createElement('h5');
  nameUserEdit.className = 'nameUserEdit';
  const textAreaEdit = document.createElement('textarea');
  textAreaEdit.name = 'textAreaEdit';
  textAreaEdit.rows = '10';
  textAreaEdit.cols = '50';
  textAreaEdit.className = 'textAreaEdit';
  const btnCancelEdit = document.createElement('button');
  btnCancelEdit.className = 'btnCancelEdit';
  btnCancelEdit.textContent = 'CANCEL';
  const editPostConfirm = document.createElement('button');
  editPostConfirm.className = 'editPostConfirm';
  editPostConfirm.textContent = 'CONFIRM';
  articlePostEdit.appendChild(userImgEdit);
  articlePostEdit.appendChild(nameUserEdit);
  articlePostEdit.appendChild(textAreaEdit);
  articlePostEdit.appendChild(btnCancelEdit);
  articlePostEdit.appendChild(editPostConfirm);
 
 
  return articlePostEdit

}