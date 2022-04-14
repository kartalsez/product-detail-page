import './ProductImageBox.scss';
import ProductThumbnails from "./ProductThumbnails/ProductThumbnails";
import { useEffect, useState } from "react";

function ProductImageBox({productVariants, selectedAttributes}) {
    const [selectedImgIndex, setSelectedImgIndex] = useState(0);
    const [thumbnails, setThumbnails] = useState([]);

    useEffect(() => {
        if (productVariants) {
            const showedThumbnails = [];

            if (selectedAttributes) {
                productVariants.forEach(variant => {
                    const isNoMatched = variant.attributes.some(attr =>
                        selectedAttributes[attr.name] && attr.value !== selectedAttributes[attr.name]);

                    isNoMatched || variant.images.forEach(img => showedThumbnails.push(img));
                });
            } else {
                productVariants.forEach(variant => variant.images.forEach(img => showedThumbnails.push(img)));
            }

            const imgIndex = selectedImgIndex >= showedThumbnails.length ? 0 : selectedImgIndex;
            setSelectedImgIndex(imgIndex);
            setThumbnails(showedThumbnails.map((src, i)=> {
                return { src, isSelected: i === imgIndex }
            }))
        }
    }, [productVariants, selectedAttributes]);

    const onSelectedImg = index => {
        const updatedThumbnails = thumbnails.map((item, i) => {
            return { ...item, isSelected: index === i };
        })

        setThumbnails(updatedThumbnails);
        setSelectedImgIndex(index);
    }

    return (
        <>
            <img src={thumbnails[selectedImgIndex]?.src} alt="test" />
            <ProductThumbnails thumbnails={thumbnails} onSelectedImg = { (index) => onSelectedImg(index) }/>
        </>
    );
}

export default ProductImageBox;
