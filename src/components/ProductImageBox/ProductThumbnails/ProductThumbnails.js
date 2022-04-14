import '../ProductImageBox.scss';
import { useRef } from 'react';
import { SCROLL_OFFSET } from "../../../constants/common-constants";

function ProductThumbnails({thumbnails, onSelectedImg}) {
    const thumbnailsRef = useRef(null);

    const scrollToTop = (direction) => {
        direction === 'left'
            ? thumbnailsRef.current.scrollLeft -= SCROLL_OFFSET
            : thumbnailsRef.current.scrollLeft += SCROLL_OFFSET;
    };

    const thumbnailImages = thumbnails.map((item, index) =>
        <img key={index} src={item.src} className={item.isSelected ? 'selected' : ''} width="100" onClick={() => onSelectedImg(index)}/>)

    return (
        <div className='product-thumbnails'>
            <div onClick={() => scrollToTop('left')} className='arrows'><span>{'<'}</span></div>
            <div className='thumbnails' ref={thumbnailsRef}>
                { thumbnailImages }
            </div>
            <div onClick={() => scrollToTop('right')} className='arrows'><span>{'>'}</span></div>
        </div>
    );
}

export default ProductThumbnails;
