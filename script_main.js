// json
let parameters = {
    columns: [
        {
            title: 'datetime',
            html: function (row) { return row.datetime; }
        },

        {
            title: 'city',
            html: function (row) { return row.city; }
        },

        {
            title: 'state',
            html: function (row) { return row.state; }
        },

        {
            title: 'country',
            html: function (row) { return row.country; }
        },

        {
            title: 'shape',
            html: function (row) { return row.shape; }
        },

        {
            title: 'comments',
            html: function (row) { return row.comments; }
        },
    ],
    data: null,
    filtered_data: null
};

let tableTest = d3.select('#ufo-list');
let louisTest = d3.select('#dateInput');

function handleSubmitClick() {
    let selectValue = d3.select('#dateInput')
        .property('value');
    // console.log(selectValue);
    parameters.filtered_data = [];
    for (let row of ufoData) {
        if (selectValue === row.datetime) {
            parameters.filtered_data.push(row);
        }
    }
    //console.log(parameters.filtered_data);
    createTables();
}


let submitBtn = document.querySelector('#search-ufo');

submitBtn.addEventListener('click', handleSubmitClick);

// function handleSubmitClick() {
//     // The default behavior of a button clicked inside of a form is to try to submit the form somewhere (which we don't want)
//     // event.preventDefault();
//     console.log(document.getElementById('dateInput').value)
// }



// function loadDropDown() {
//     let dropDownOptions = new Set();
//     dropDownOptions.add('All');
//     dropDownOptions.add('35000');
//     dropDownOptions.add('60000');
//     dropDownOptions.add('80000');
//     dropDownOptions.add('100000');

//     incomeDropDown.on('change', onchange);

//     let options = incomeDropDown
//         .selectAll('option')
//         .data([...dropDownOptions])
//         .enter()
//         .append('option')
//         .attr('value', function (d) { return d; })
//         .text(function (d) { return d; });

// }

function onchange() {
    // clean filtered data
    parameters.filtered_data = [];

    // run through my data
    // if my data.shape == whatever shape is in input
    // add my data to filtered_data


    // grab whatever stuff they enter..
    // append to parameters.data 


    // let selectValue = d3.select('#income')
    //     .property('value');
    // // console.log(selectValue);
    // 
    // for (let row of parameters.data) {
    //     if (selectValue === 'All') {
    //         parameters.filtered_data.push(row);
    //     }
    //     else if (parseFloat(row['Household Income']) >= parseFloat(selectValue)) {
    //         parameters.filtered_data.push(row);
    //     }
    // }
    //console.log(parameters.filtered_data);
    createTables();
}

function init(ufoData) {
    console.log(ufoData);
    parameters.data = ufoData;
    parameters.filtered_data = ufoData;
    createTables();
    // loadDropDown();
}

let ufoList = d3.select('#ufo-list');
init(ufoData);

function createTables() {
    ufoList.html('');
    let table = d3.select('#ufo-list').append('table').attr('class', 'table');

    table.append('thead').append('tr')
        .selectAll('th')
        .data(parameters['columns'])
        .enter()
        .append('th')
        .text(function (data) { return data.title; });

    table.append('tbody')
        .selectAll('tr') // create row for each row of data
        .data(parameters.filtered_data)
        .enter()
        .append('tr')
        .selectAll('td')
        .data(function (row) {
            // evaluate column objects against the current row
            return parameters.columns.map(function (column) {
                var cell = {};
                d3.keys(column).forEach(function (k) {
                    if (typeof (column[k]) === 'function') {
                        cell[k] = column[k](row)
                    }
                });
                return cell;
            });
        }).enter()
        .append('td')
        .text(function (data) { return data.html; });

}





// 

//     table.append('thead').append('tr')
//         .selectAll('th')
//         .data(parameters['columns'])
//         .enter()
//         .append('th')
//         .text(function (data) { return data.title; });

//     table.append('tbody')
//         .selectAll('tr') // create row for each row of data
//         .data(ufoData)
//         .enter()
//         .append('tr')
//         .selectAll('td')
//         .data(function (row, i) {
//             // evaluate column objects against the current row
//             return parameters.columns.map(function (column) {
//                 var cell = {};
//                 d3.keys(column).forEach(function (k) {
//                     if (typeof (column[k]) === 'function') {
//                         cell[k] = column[k](row, i)
//                     }
//                 });
//                 return cell;
//             });
//         }).enter()
//         .append('td')
//         .text(function (data) { return data.html; });

// });


//borrowed codes

var spanPrev = document.getElementById("#prev");
var spanNext = document.getElementById("#next");
var spanFirst = document.getElementById("#first");
var spanLast = document.getElementById("#last");

// Pagination vars
var curr_row = 0; //page number
var rowsperpage = 50;
var pan_pos = 1;
var len = 0;

// Single
var addUFOBtn = document.getElementById("#add-ufo");
var UFOInput = document.getElementById("#ufo-input");

// Multi vars
var addUFOMultiBtn = document.getElementById("#add-ufo2");
var UFOInput1 = document.getElementById("#ufo-input1");
var UFOInput2 = document.getElementById("#ufo-input2");
var UFOInput3 = document.getElementById("#ufo-input3");
var UFOInput4 = document.getElementById("#ufo-input4");
var UFOInput5 = document.getElementById("#ufo-input5");

var ddtime = "";
var city = "";
var state = "";
var country = "";
var shape = "";

// Table tag
var UFOList = document.querySelector("#ufo-list");

var SearchData = []

function showTable() {

    // Extract value for Html Header
    if ((SearchData.length / rowsperpage) > parseInt(SearchData.length / rowsperpage)) {
        len = parseInt(SearchData.length / rowsperpage) + 1;
    }
    else {
        len = parseInt(SearchData.length / rowsperpage);
    }

    UFOList.innerHTML = "";
    var col = [];
    for (var i = 0; i < SearchData.length; i++) {
        for (var key in SearchData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED

    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        UFOList.appendChild(th);
    }

    var inpage_row = 0;

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = curr_row; i < SearchData.length; i++)

        tr = table.insertRow(-1);
    UFOList.appendChild(tr);

    if (inpage_row < rowsperpage) {
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = SearchData[i][col[j]];
            UFOList.appendChild(tabCell);
        }
        inpage_row = inpage_row + 1;
    }
    else {
        curr_row = i;
        break
    }
};

// function createUFOtb1() {

//     curr_row = 0;

//     pan_pos = 1;
//     SearchData = [];
//     for (var i = 0; i < UFOdata.length; i++) {
//         SearchData.push(UFOdata[i]);
//     }

//     showTable();
// }

// addUFOBtn.addEventListener("click", function (event) {

//     curr_row = 0;
//     pan_pos = 1;
//     dttime = UFOInput.value;
//     SearchData = [];
//     for (var i = 0; i < UFOdata.length; i++) {
//         if (UFOdata[i]["datetime"] == dttime || dttime == "") {
//             SearchData.push(UFOdata[i]);
//         }

//     }

//     UFOInput.value = "";
//     showTable();

// });

// addUFOMultiBtn.addEventListener("click", function (event) {

//     curr_row = 0;
//     pan_pos = 1;
//     dttime = UFOInput1.value;
//     city = UFOInput2.value;
//     state = UFOInput3.value;
//     country = UFOInput4.value;
//     shape = UFOInput5.value;

//     SearchData = [];
//     for (var i = 0; i < UFOdata.length; i++) {
//         if ((UFOdata[i]["datetime"] == dttime || dttime) &&
//             (UFOdata[i]["city"].toUpperCase() == city.toUpperCase() || city == "") &&
//             (UFOdata[i]["state"].toUpperCase() == state.toUpperCase() || state == "") &&
//             (UFOdata[i]["country"].toUpperCase() == country.toUpperCase() || country== "") &&
//     (UFOdata[i]["shape"].toUpperCase() == shape.toUpperCase() || shape == "")
//             )
// {
//     SearchData.push(UFOdata[i]);
// }
//   }
// UFOInput1.value = "";
// UFOInput2.value = "";
// UFOInput3.value = "";
// UFOInput4.value = "";
// UFOInput5.value = "";
// showtable();
// });

// spanPrev.addEventListener("click", function (event) {
//     if (pan_pos > 1) {
//         pan_pos -= 1;
//     }
//     curr_row = (pan_pos * rowsperpage) - rowsperpage;
//     showtable()
// });

// spanNext.addEventListener("click", function (event) {
//     if (pan_pos >= len) {
//         pan_pos = len;
//     }
//     else {
//         pan_pos += 1;
//     }
//     curr_row = (pan_pos * rowsperpage) - rowsperpage;
//     showtable()
// });

// spanFirst.addEventListener("click", function (event) {
//     pan_pos = 1;
//     curr_row = (pan_pos * rowsperpage) - rowsperpage;
//     showtable()
// });

// spanLast.addEventListener("click", function (event) {
//     pan_pos = len;
//     curr_row = (pan_pos * rowsperpage) - rowsperpage;
//     showtable()
// });

// createUFOtb1();