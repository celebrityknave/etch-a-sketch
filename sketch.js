sketchpad = document.querySelector("#sketchpad");
let canvasSize = 16;
let selectedColour = "blue";

function getSelectedColor()
{
    return selectedColour;
}

function setSelectedColour(e)
{
    console.log(e.target);
    selectedColour = e.target.style.backgroundColor;
}

function drawCell(e) {
    console.log(e.target);
    e.target.style.backgroundColor = getSelectedColor();

}

function populateRow(columns)
{
    let row = document.createElement('div');
    row.className = ".row";
    for(let j=0; j < columns; j++) {
        let cell = document.createElement('div');
        cell.className = "pixel";
        cell.addEventListener("mouseover", drawCell);
        row.appendChild(cell);
    }

    return row;
}

function generateCanvas(rows) {
    for(let i=0; i < rows; i++) {
        row = populateRow(canvasSize);
        sketchpad.appendChild(row);
    }
}

function createPaletteColour(colour)
{
    let colourSelection = document.createElement('div');
    colourSelection.style.backgroundColor = colour;
    colourSelection.className = "colourSelection";
    colourSelection.addEventListener("mousedown", setSelectedColour);
    
    return colourSelection;
}

function populatePalette()
{
    let colourPalette = document.createElement('div');

    let colourRed = createPaletteColour("red");
    let colourBlue = createPaletteColour("blue");
    let colourGreen = createPaletteColour("green");
    let colourYellow = createPaletteColour("yellow");
    let colourWhite = createPaletteColour("white");
    let colourBlack = createPaletteColour("black");

    colourPalette.appendChild(colourRed);
    colourPalette.appendChild(colourBlue);
    colourPalette.appendChild(colourGreen);
    colourPalette.appendChild(colourYellow);
    colourPalette.appendChild(colourWhite);
    colourPalette.appendChild(colourBlack);

    return colourPalette;
}

function generateControls() {
    let controlDash = document.createElement('div');
    controlDash.id = "controlDash";
    let refreshBtn = document.createElement('button');
    colourPalette = populatePalette();

    refreshBtn.textContent = "Refresh";

    controlDash.appendChild(refreshBtn);
    controlDash.appendChild(colourPalette);
    sketchpad.appendChild(controlDash);
}

generateCanvas(canvasSize);
generateControls();