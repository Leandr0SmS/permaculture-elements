const divide = (weigth) => {
    let divider = 1;
    if (weigth / divider < 9) {
        return {"rounds": divider, "weight": weigth};
    } else {
        let operation = weigth;
        while (operation > 9) {
            divider ++;
            operation = weigth / divider;
            console.log(divider)
            console.log(operation)
        }
        return {"rounds": divider, "weight": parseFloat(operation.toFixed(2))};
    }
}

export { divide };