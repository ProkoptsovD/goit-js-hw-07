import { galleryItems } from './gallery-items.js';
// Change code below this line

const refs = {
	gallery: document.querySelector('.gallery'),
	body: document.querySelector('body'),
};

generateGalleryCards(galleryItems);

const modal = basicLightbox.create(
	`<div class="modal"><img src="" width="800" height="600"></div>`
);
refs.gallery.addEventListener('click', onGalleryImageClickOpenModal);

//===============================functions===============================================//
function generateGalleryCards(objWithImages) {
	const galleryCardsMarkup = makeGalleryCardsMarkup(objWithImages);

	refs.gallery.insertAdjacentHTML('beforeend', galleryCardsMarkup);
}

function onGalleryImageClickOpenModal(e) {
	e.preventDefault();

	const IMG_TAG = 'IMG';
	const isEventOnImage = e.target.nodeName === IMG_TAG;
	const currentPreviewImage = e.target;
	const modalImgRef = modal.element().querySelector('img');

	if (!isEventOnImage) return;

	setOriginalImageURL(currentPreviewImage, modalImgRef);
	modal.show();
	if (modal.visible()) setBodyScrollY('disabled');

	window.addEventListener('keydown', onEscapeKeydownCloseModal);
}

function onEscapeKeydownCloseModal(e) {
	const ESC_KEY_CODE = 'Escape';
	const isEscapeKeyPressed = e.code === ESC_KEY_CODE;

	if (!isEscapeKeyPressed) return;

	window.removeEventListener('keydown', onEscapeKeydownCloseModal);

	modal.close();
	setBodyScrollY('enabled');
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

function setOriginalImageURL(image, modal) {
	modal.src = image.dataset.source;
}

function setBodyScrollY(state) {
	refs.body.addEventListener('click', onBackdropClickCloseModal);

	switch (state) {
		case 'disabled':
			refs.body.style.overflowY = 'hidden';
			break;
		case 'enabled':
			refs.body.style.overflowY = '';
			break;
		default:
			refs.body.style.overflowY = '';
	}
}

function onBackdropClickCloseModal(e) {
	const IMG_TAG = 'IMG';
	const isBackdropClicked = e.target.nodeName !== IMG_TAG;

	if (!isBackdropClicked) return;

	setBodyScrollY('enabled');

	refs.body.removeEventListener('click', onBackdropClickCloseModal);
}
