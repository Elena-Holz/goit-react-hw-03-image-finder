// import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem.jsx';
import css from 'components/ImageGallery/ImageGallery.module.css';

function ImageGallery({ items, loadMore, openModal }) {
    const elements = items.map(({ id, largeImageURL, webformatURL }) => {
        return <li className={css.ImageGalleryItem} key={id} onClick={openModal} >
                     <a href={largeImageURL} >
                         <img className={css.ImageGalleryItem_image} src={webformatURL} alt='this' />
                     </a>
                 </li>
    })
 
    return (
        <>
        <ul className={css.ImageGallery}>{elements}</ul>
        </>
            )
        }

export default ImageGallery;


ImageGallery.defaultProps = {
    items: []
}

// onClick={() => openModal({largeImageURL})} 