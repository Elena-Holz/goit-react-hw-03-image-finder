import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem.jsx';
import css from 'components/ImageGallery/ImageGallery.module.css';

function ImageGallery({ items, children }) {
      
  
    return (
        <>
          <ul className={css.ImageGallery}>
              <ImageGalleryItem items={items} />
          {children}  
            </ul>
        </>
        )

    }



export default ImageGallery;


ImageGallery.defaultProps = {
    items: []
}
