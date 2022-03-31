import { galleryItems } from './gallery-items.js';
// Change code below this line

const refs = {
	gallery: document.querySelector('.gallery'),
};

generateGalleryCards(galleryItems);

const lightbox = new SimpleLightbox('.gallery a', {
	overlayOpacity: 0.8,
	fadeSpeed: 200,
	maxZoom: 2,
	scrollZoomFactor: 0.2,
	captionsData: 'alt',
	captionDelay: 250,
});

//===============================functions===============================================//
function generateGalleryCards(objWithImages) {
	const galleryCardsMarkup = makeGalleryCardsMarkup(objWithImages);

	refs.gallery.insertAdjacentHTML('beforeend', galleryCardsMarkup);
}

function makeGalleryCardsMarkup(images) {
	return images.map(({ description, original, preview }) => {
		return `
                <li>
                    <a class="gallery__item" href="${original}">
                        <img class="gallery__image" src="${preview}" alt="${description}" />
                    </a>
                </li>
                    `;
	}).join``;
}
