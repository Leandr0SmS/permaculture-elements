const divide = (weigth) => {
    let divider = 1;
    let operation = weigth;
    while (operation > 9) {
        operation = weigth / divider;
        divider ++;
    }
    return {"rounds": divider, "weight": parseFloat(operation.toFixed(2))};
}

console.log(divide(20));
