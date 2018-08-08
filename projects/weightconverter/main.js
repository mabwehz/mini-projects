// hide output display
setOutputVisibility('hidden');

const weightsData = [{
    name: 'pound',
    units: {
        pound: 1,
        kilogram: 0.453592,
        gram: 453.5920000001679,
        ounce: 15.999986948640000151,
    },
    symbol: 'lb'
}, {
    name: 'kilogram',
    units: {
        pound: 2.2046208235160569266,
        kilogram: 1,
        gram: 999.99918429000001652,
        ounce: 35.273933176256910826,
    },
    symbol: 'kg'
}, {
    name: 'gram',
    units: {
        pound: 0.0022046208235160570134,
        kilogram: 0.00099999918429000004064,
        gram: 1,
        ounce: 0.035273933176256912214,
    },
    symbol: 'g'
}, {
    name: 'ounce',
    units: {
        pound: 1,
        kilogram: 0.028349500000010494777,
        gram: 28.34950000001049375,
        ounce: 0.062499949018125000588,
    },
    symbol: 'oz'
}];


// set default weight conversion
let selectedWeight = getWeightProperties(weightsData[0].name);

// add a click event listner to each weight selector
var weights = document.getElementById('weightSelector').children;
Array.from(weights).forEach((weight) => {
    weight.addEventListener('click', getSelectedWeight);
});

// update DOM for selected weight
updateDomOnSelectWeight(selectedWeight.name);

// get selected weight as well as input value
function getSelectedWeight(e) {
    // only show in proper opacity the selected weight
    Array.from(weights).forEach((weightItem) => weightItem.style.opacity = 0.5);
    e.target.style.opacity = 1;

    selectedWeight = getWeightProperties(e.target.dataset.weightName);

    updateDomOnSelectWeight(selectedWeight.name);

    const currentInputValue = document.getElementById('lbsInput').value;
    if (currentInputValue) {
        calculateWeight(currentInputValue)
    }

}

// change placeholder, highlight selected weight
function updateDomOnSelectWeight(selectedWeight) {
    // change input placeholder
    document.getElementById('lbsInput').placeholder = `Enter ${selectedWeight}s..`;

    // highlight selected weight
    Array.from(weights).forEach((weightItem) => {
        if (weightItem.dataset.weightName === selectedWeight) {
            weightItem.style.opacity = 1;
        }
    });
}

// fetch specific weight properties from weight data
function getWeightProperties(possibleWeight) {
    return weightsData.filter((weight) => weight.name === possibleWeight)[0];
}

// show or hide weights ouput's
function setOutputVisibility(option) {
    document.getElementById('output').style.visibility = option;
}

// apply conversion formular base on selected weight
function calculateWeight(weightInputValue) {
    var weightOutputs = document.querySelectorAll('#output .card .card-body div');

    Array.from(weightOutputs).forEach((weightOuput) => {
        const foundWeight = getWeightProperties(selectedWeight.name);
        weightOuput.innerHTML = weightInputValue * foundWeight.units[weightOuput.id];
    });
}

// get value from input field, adjust output visibility accordingly
document.getElementById('lbsInput').addEventListener('input', (e) => {
    let weightInputValue = e.target.value;

    weightInputValue ? setOutputVisibility('visible') : setOutputVisibility('hidden');

    calculateWeight(weightInputValue);
});