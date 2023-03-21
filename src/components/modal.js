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