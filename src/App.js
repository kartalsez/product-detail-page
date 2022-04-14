import './App.scss';
import ProductImageBox from "./components/ProductImageBox/ProductImageBox";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { useEffect, useState } from "react";
import { getProduct } from "./services/products.service";

function App() {
    const [productObj, setProductObj] = useState(null);
    const [selectedAttributes, setSelectedAttributes] = useState(null);

    const onSelectionChangeAttributes = (attributes) => {
        setSelectedAttributes(attributes);
    };

    useEffect(() => {
        getProduct().then(response => response && setProductObj(response));
    }, []);

    return (
        <div className='main-layout'>
            <main>
                <ProductImageBox productVariants={productObj?.productVariants} selectedAttributes={selectedAttributes}/>
            </main>
            <aside>
                { productObj && <ProductDetail productObj={productObj} onSelectionChangeAttributes={onSelectionChangeAttributes}/> }
            </aside>
        </div>
    );
}

export default App;
