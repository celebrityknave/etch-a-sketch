sketchpad = document.querySelector("#sketchpad");
let canvasSize = 16;
let selectedColour = "blue";
const paletteColours = ["red", "blue", "green", "yellow", "white", "black"];

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
    e.target.style.backgroundColor = getSelectedColor();

}

function refreshCanvas(e)
{
    console.log(e.target);
    generateCanvas(canvasSize);
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

    for(let i = 0; i < paletteColours.length; i++)
    {
        colourPalette.appendChild(createPaletteColour(paletteColours[i]));
    }

    return colourPalette;
}

function generateControls() {
    let controlDash = document.createElement('div');
    controlDash.id = "controlDash";

    colourPalette = populatePalette();

    let refreshBtn = document.createElement('button');
    refreshBtn.textContent = "Refresh";
    refreshBtn.addEventListener("mouseDown", refreshCanvas);

    controlDash.appendChild(refreshBtn);
    controlDash.appendChild(colourPalette);
    sketchpad.appendChild(controlDash);
}

generateCanvas(canvasSize);
generateControls();