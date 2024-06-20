sketchpad = document.querySelector("#sketchpad");
let canvasSize = 16;
const paletteColours = ["red",
                        "blue",
                        "green",
                        "yellow",
                        "white",
                        "black"];
let selectedColour = paletteColours[0];

function getCanvasSize()
{
    return canvasSize;
}

function setCanvasSize(size)
{
    canvasSize = size;
}

function adjustCanvasSize()
{
    selection = document.getElementById("sizeSelection");
    setCanvasSize(selection.options[selection.selectedIndex].value);
    refreshCanvas();
}

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

function refreshCanvas()
{
    var element = document.getElementById("canvas");
    element.parentNode.removeChild(element);
    generateCanvas(getCanvasSize());
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
    let canvas = document.createElement('div');
    canvas.id = "canvas";
    for(let i=0; i < rows; i++) {
        row = populateRow(getCanvasSize());
        canvas.appendChild(row);
    }
    sketchpad.appendChild(canvas);
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
    colourPalette.id = "colourPalette";

    for(let i = 0; i < paletteColours.length; i++)
    {
        colourPalette.appendChild(createPaletteColour(paletteColours[i]));
    }

    return colourPalette;
}

function populateSelection()
{
    canvasSizeControl = document.createElement('select');
    canvasSizeControl.id = "sizeSelection";
    for(let i = 8; i <= 64; i=i+4)
    {
        size = document.createElement('option');
        size.textContent = i.toString();
        size.id = i.toString() + "px";
        canvasSizeControl.appendChild(size);
    }

    canvasSizeControl.addEventListener("change", adjustCanvasSize);
    
    return canvasSizeControl;
}

function setDefaultSizeSelection()
{
    currentSelection = document.getElementById("sizeSelection");

    for(var i, j = 0; i = currentSelection.options[j]; j++)
    {
        if(i.value == getCanvasSize())
        {
            currentSelection.selectedIndex = j;
            break;
        }
    }
}


function generateControls() {
    let controlDash = document.createElement('div');
    controlDash.id = "controlDash";

    colourPalette = populatePalette();
    controlDash.appendChild(colourPalette);

    canvasSizeControl = populateSelection();
    refreshBtn = document.createElement('button');
    refreshBtn.textContent = "Refresh";
    refreshBtn.addEventListener("click", refreshCanvas);

    toggles = document.createElement('div');
    toggles.appendChild(canvasSizeControl);
    toggles.appendChild(refreshBtn);

    controlDash.appendChild(toggles);

    sketchpad.appendChild(controlDash);
    setDefaultSizeSelection();
}

generateControls();
generateCanvas(getCanvasSize());
