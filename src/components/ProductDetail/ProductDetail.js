import './ProductDetail.scss';
import { useEffect, useState } from 'react';
import { ATTRIBUTE_TYPES } from "../../constants/common-constants";
import BaremList from "./BaremList";

function ProductDetail({productObj, onSelectionChangeAttributes}) {
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [colorOptions, setColorOptions] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);
    const [selectedQuantity, setSelectedQuantity] = useState(null);

    const onSelectChange = (attrName, selectedVal) => {
        const targetValue = selectedVal.target.value;

        if (targetValue === '0') {
            const attributes = {...selectedAttributes};
            attributes[attrName] && delete attributes[attrName];
            setAndEmitSelectedAttributes(attributes);
            return;
        }

        if (attrName === ATTRIBUTE_TYPES.RENK) {
            const selectableSizeAttributes = [];

            productObj.productVariants.forEach(variant => {
                const isExist = variant.attributes.findIndex(attr => attr.name === ATTRIBUTE_TYPES.RENK && attr.value === targetValue) !== -1;
                if (isExist) {
                    selectableSizeAttributes.push(variant.attributes.find(attr => attr.name === ATTRIBUTE_TYPES.BEDEN)?.value);
                }
            });

            const mappedSizeOptions = sizeOptions.map(val => {
                return { value: val.value, isDisabled: selectableSizeAttributes.findIndex(item => item === val.value) === -1 }
            });

            setSizeOptions(mappedSizeOptions);
        }

        const attributes = {...selectedAttributes, ...{[attrName]: targetValue}};
        setAndEmitSelectedAttributes(attributes);
    };

    function setAndEmitSelectedAttributes(attributes) {
        setSelectedAttributes(attributes);
        onSelectionChangeAttributes(attributes);
    }

    function checkBtnDisabled() {
        return !selectedAttributes[ATTRIBUTE_TYPES.RENK] || !selectedAttributes[ATTRIBUTE_TYPES.BEDEN] || !selectedQuantity;
    }

    const onClickAdd = () => {
        const matchedVariant = productObj.productVariants
            .find(variant => !!variant.attributes.every(attr => selectedAttributes[attr.name] === attr.value));

        const matchedBarem = productObj.baremList
            .find(barem => barem.minimumQuantity <= selectedQuantity && selectedQuantity <= barem.maximumQuantity);

        console.log(`selected Variant's id: ${matchedVariant?.id}`);
        console.log(`selected Quantity: ${selectedQuantity}`);
        console.log('selected Barem: ', matchedBarem || 'Seçili quantity yi içeren barem aralığı bulunamadı!');
    };

    useEffect(() => {
        if (productObj) {
            setColorOptions(productObj.selectableAttributes.find(item => item.name === ATTRIBUTE_TYPES.RENK)?.values);
            const mappedSizeOptions = productObj.selectableAttributes
                .find(item => item.name === ATTRIBUTE_TYPES.BEDEN)?.values?.map(item => {
                    return { value: item, isDisabled: false }
            });
            setSizeOptions(mappedSizeOptions);
        }
    }, [productObj]);

    return (
        <>
            <section className = "product-title">
                <h1>İş Tulumu Bahçıvan Tip Askılı</h1>
            </section>
            <section className = "product-variant">
                <div className = "field color">
                    <label>Renk</label>
                    <select onChange={(event) => onSelectChange(ATTRIBUTE_TYPES.RENK, event)}>
                        <option value="0">{'Seçiniz'}</option>
                        { colorOptions?.map((value, i) => <option key={i} value={value}>{value}</option>) }
                    </select>
                </div>
                <div className = "field size">
                    <label>Beden</label>
                    <select onChange={(event) => onSelectChange(ATTRIBUTE_TYPES.BEDEN, event)}>
                        <option value="0">{'Seçiniz'}</option>
                        { sizeOptions?.map((item, i) => <option key={i} disabled={item.isDisabled} value={item.value}>{item.value}</option>) }
                    </select>
                </div>

                <BaremList baremListData={productObj.baremList} changeQuantity={setSelectedQuantity} />
            </section>
            <button disabled={checkBtnDisabled()} onClick={onClickAdd}>Sepete Ekle</button>
        </>
    );
}

export default ProductDetail;
