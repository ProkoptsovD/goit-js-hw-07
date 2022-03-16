import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery');
const galleryCardsMarkup = makeGalleryCardsMarkup(galleryItems);

const modal = basicLightbox.create(`
    <div class="modal">
        <img src="" width="800" height="600">
    </div>`);

galleryRef.insertAdjacentHTML('beforeend', galleryCardsMarkup);
galleryRef.addEventListener('click', onGalleryImageClick);

function onGalleryImageClick(e) {
	e.preventDefault();

	const isEventOnImage = e.target.nodeName === 'IMG';
	const previewImage = e.target;

	if (!isEventOnImage) return;

	const modalImgRef = modal.element().querySelector('img');

	setOriginalImageURL(previewImage, getOriginalImageURL, modalImgRef);

	modal.show();
	handleBodyScrollY();

	window.addEventListener('keydown', onEscapeKeydown);
}

function onEscapeKeydown(e) {
	const ESC_KEY_CODE = 'Escape';
	const isEscapeKeyPressed = e.code === ESC_KEY_CODE;

	if (!isEscapeKeyPressed) return;

	window.removeEventListener('keydown', onEscapeKeydown);

	modal.close();
	handleBodyScrollY();
	console.log('here');
}

function makeGalleryCardsMarkup(images) {
	return images.map(({ description, original, preview }) => {
		return `<div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
	    </div>`;
	}).join``;
}

function getOriginalImageURL(image) {
	return image.dataset.source;
}

function setOriginalImageURL(image, getUrl, modal) {
	modal.src = getUrl(image);
}

function handleBodyScrollY() {
	const backdrop = document.querySelector('.basicLightbox');
	const body = document.querySelector('body');

	backdrop.addEventListener('click', onBackdropClick);

	if (body.style.overflowY === '') {
		body.style.overflowY = 'hidden';
	} else {
		body.style.overflowY = '';
	}
}

function onBackdropClick(e) {
	const isBackdropClicked = e.target.nodeName === 'DIV';
	console.log(e.target);
	if (!isBackdropClicked) return;

	const body = e.target.closest('body');
	const overflowYvalue = body.style.overflowY;
	const backdrop = document.querySelector('.basicLightbox');

	if (overflowYvalue === '') {
		body.style.overflowY = 'hidden';
	} else {
		body.style.overflowY = '';
	}

	backdrop.removeEventListener('click', onBackdropClick);
}
