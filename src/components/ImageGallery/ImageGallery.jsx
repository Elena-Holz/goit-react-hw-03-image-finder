import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem.jsx';
import css from 'components/ImageGallery/ImageGallery.module.css';

export default function ImageGallery({ items, children }) {
  
         <ul className={css.ImageGallery}>
             {items.map((item, id) => {
               
                <ImageGalleryItem key={id} {...item} />
             })}
             {children}
         </ul>
    
    return console.log(items)
    }



// export default ImageGallery;


ImageGallery.defaultProps = {
    items: []
}
