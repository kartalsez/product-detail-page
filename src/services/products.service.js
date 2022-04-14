const headersObj = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

export const getProduct= () => {
    const reqOptions = {
        headers: headersObj
    };

    return fetch('product-data.json',reqOptions).then(resp => resp.ok ? resp.json() : null);
}
