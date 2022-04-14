import { useEffect, useState } from "react";

function BaremList({baremListData, changeQuantity}) {
    const [baremList, setBaremList] = useState([]);

    const renderBaremItems = () => {
        return baremList?.map((baremItem, index) => {
            return (
                <div key={index} className={baremItem.selected ? 'selected' : ''}>
                    <span>{`${baremItem.minimumQuantity} - ${baremItem.maximumQuantity}`}</span>
                    <span>{`${baremItem.price} TL`}</span>
                </div>
            )
        })
    };

    const onChangeQuantity = val => {
        const quantity = parseInt(val.target.value);
        const mappedBaremList = baremList.map(baremItem => {
            const { minimumQuantity, maximumQuantity } = baremItem;
            return {
                ...baremItem,
                selected: minimumQuantity <= quantity && quantity <= maximumQuantity
            }
        });

        setBaremList(mappedBaremList);
        changeQuantity(quantity);
    };

    useEffect(() => {
        if (baremListData) {
            const mappedBaremList = baremListData.map(item => {
                return { ...item, selected: false }
            });
            setBaremList(mappedBaremList);
        }
    }, [baremListData])

    return (<div className="barem-area">
        <div className = "field barem-list">
            <label>ToptanFiyat:</label>
            <div className="barem-list-items">
                { renderBaremItems() }
            </div>
        </div>

        <div className = "field">
            <label>Adet</label>
            <input type="number" id="quantity" min="1" onChange={onChangeQuantity} />
        </div>
    </div>)
}

export default BaremList;
