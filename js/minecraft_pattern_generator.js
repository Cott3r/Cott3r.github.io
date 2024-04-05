// random shufflers
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function shuffleItems(list) {
    for (var i = list.children.length; i >= 0; i--) {
        list.appendChild(list.children[Math.random() * i | 0]);
    }
}

// reset grid
function resetGrid(oldTiles, list) {
    const ul = list;
    for (var i = 0; i <= ul.children.length - 1; i++) {
        const item = oldTiles[i];
        item.classList.remove('empty');
        ul.appendChild(item);
    }
}

// set open tile
function setOpenTile(tiles) {
    const rand = Math.floor(Math.random() * tiles.length);
    tiles[rand].classList.add('empty');
}

function show_lines_of_symmetry(){
    const checkBox = document.getElementById("show_lines_of_symmetry");
    if(checkBox.checked){
        const line_width = 5;
        
        //For the selection
        const base_triangle_tile_0_0 = document.getElementById('base_triangle_tile_canvas_0_0');
        const ctx = base_triangle_tile_0_0.getContext("2d");

        // Draw one Line
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(base_triangle_tile_0_0.width, 0);
        ctx.lineTo(0, base_triangle_tile_0_0.height);
        ctx.lineTo(0, 0);
        ctx.lineWidth = line_width;
        ctx.strokeStyle = "red";
        ctx.stroke();
        
        
        
        //For each tile in the preview
        const currentTiles = [...document.querySelectorAll('.preview-tile-canvas')];

        currentTiles.forEach(tile => {
            const ctx = tile.getContext("2d");
            
            // Draw one Line
            ctx.beginPath();
            //Around the tile
            ctx.moveTo(0, 0);
            ctx.lineTo(tile.width, 0);
            ctx.lineTo(tile.width, tile.height);
            ctx.lineTo(0, tile.height);
            ctx.lineTo(0, 0);
            //The diagonal
            ctx.moveTo(tile.width, 0);
            ctx.lineTo(0, tile.height);
            
            ctx.lineWidth = line_width;
            ctx.strokeStyle = "red";
            ctx.stroke();
        });
    }
    else {
        //For the selection
        const base_triangle_tile_0_0 = document.getElementById('base_triangle_tile_canvas_0_0');
        const ctx = base_triangle_tile_0_0.getContext("2d");
        ctx.clearRect(0, 0, base_triangle_tile_0_0.width, base_triangle_tile_0_0.height);

        //For each tile in the preview
        const currentTiles = [...document.querySelectorAll('.preview-tile-canvas')];
        currentTiles.forEach(tile => {            
            const ctx = tile.getContext("2d");
            ctx.clearRect(0, 0, tile.width, tile.height);
        });
    }
}

function createPatternPreview(){

    const tile_count_width = document.getElementById("preview_tile_column_count");
    const tile_count_height = document.getElementById("preview_tile_row_count");

    //Add the tiles to the tileContainer
    for (var y = 0; y < tile_count_height.value; y++) {
        for (var x = 0; x < tile_count_width.value; x++) {
            const tile = document.getElementById(`tile_div_${x}_${y}`);
            if(x % 2 === 1){
                if(y % 2 === 1)
                    tile.style = 'transform: scaleX(-1) scaleY(-1);'
                else
                    tile.style = 'transform: scaleX(-1)';
            }
            else{
                if(y % 2 === 1)
                    tile.style = 'transform: scaleY(-1)';
            }
        }
    }
}

function rotateTilesInPreviewPattern(base_triangle_tile, new_rotation){

    //TODO make different selector based on base_triangle_tile
    const tiles = [...document.querySelectorAll('.preview-tile')];    
    
    
    tiles.forEach(tile => {
        tile.classList.remove("rotated_0");
        tile.classList.remove("rotated_90");
        tile.classList.remove("rotated_180");
        tile.classList.remove("rotated_270");
        tile.classList.add(new_rotation); 
    });
}

// Create Tiles
function createTiles(){
    console.log("createTiles");
    
    const tileContainer = document.getElementById("preview_tile_container");
    const tile_count_width = document.getElementById("preview_tile_column_count");
    const tile_count_height = document.getElementById("preview_tile_row_count");

    //Change the CSS for the tileContainer
    const document_style = document.documentElement.style;
    document_style.setProperty("--tile-container-grid-template-columns", tile_count_width.value);
    document_style.setProperty("--tile-container-grid-template-rows", tile_count_height.value);
    
    //Add the tiles to the tileContainer
    for (var y = 0; y < tile_count_height.value; y++) {
        for (var x = 0; x < tile_count_width.value; x++) {




            const tile_div = document.createElement("div");
            tile_div.id = `tile_div_${x}_${y}`;
            tile_div.className = "preview-tile rotated_0 yellow_glazed_terracotta";
            tileContainer.appendChild(tile_div);



            const tile_canvas = document.createElement("canvas");
            tile_canvas.id = `tile_canvas_${x}_${y}`;
            tile_canvas.className = "preview-tile-canvas";
            tile_canvas.width = "100";
            tile_canvas.height = "100";
            tile_div.appendChild(tile_canvas);
        }
    }

    createPatternPreview();
}

function removeAllTiles(){
    console.log("removeAllTiles");
    const currentTiles = [...document.querySelectorAll('.tile')];

    currentTiles.forEach(tile => {
        tile.remove();
    });
}

function refreshTiles(){
    removeAllTiles();
    createTiles();
    show_lines_of_symmetry();
}

function tileCountChanged()
{
    refreshTiles()
}

// kick off functionality
window.addEventListener('load', () => {
    
    createTiles();
    createBaseTriangleTiles();
    show_lines_of_symmetry();
    /*
    const startTiles = [...document.querySelectorAll('.tile')];
    let memory = [];
    const tileContainer = document.querySelector('#preview_tile_container');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    // set background image positions
    setImagePositions(startTiles);
    // tiles loop
    startTiles.forEach(tile => {
        tile.id = guidGenerator(); // give IDs
        // add tile click listener
        tile.addEventListener('click', e => {
            if (!e.target.classList.contains('empty')) {
                const currentTiles = [...document.querySelectorAll('.tile')];
                // trigger tile moving to open space
                triggerTileMovement(e.target, currentTiles);
                // check if puzzle now complete
                setTimeout(() => {
                    if (puzzleCompleteCheck(memory) && !tileContainer.classList.contains('complete')) {
                        alert('Congratulations, you did it! 👏 🥳 🍾');
                        tileContainer.classList.add('complete');
                    }
                }, 1000);
            }
        });
    });
    // set memory
    memory = setMemory(startTiles);
    // button click listeners
    // start
    startButton.addEventListener('click', e => {
        if (!startButton.hasAttribute('disabled')) {
            shuffleItems(tileContainer);
            setOpenTile(startTiles);
            startButton.setAttribute('disabled', true);
        }
        if (resetButton.hasAttribute('disabled')) {
            resetButton.removeAttribute('disabled');
        }
        tileContainer.classList.remove('complete');
    });
    // reset
    resetButton.addEventListener('click', e => {
        const currentTiles = [...document.querySelectorAll('.tile')];
        if (!resetButton.hasAttribute('disabled')) {
            resetGrid(startTiles, tileContainer);
            resetButton.setAttribute('disabled', true);
        }
        if (startButton.hasAttribute('disabled')) {
            startButton.removeAttribute('disabled');
        }
        tileContainer.classList.add('complete');
    });*/
}, false);

// Base Triangle
function getBaseTriangleColumnSize(){
    const baseTriangleType = document.getElementById("base_triangle_type");
    
    switch (baseTriangleType.value) {
        case "1_block_diagonal": return 1;
        case "1_block_inline": return 1;
    }
    
    return 1;
}

function createBaseTriangleTiles(){
    const baseTriangle_columns = getBaseTriangleColumnSize();
    const baseTriangle_rows = baseTriangle_columns;

    //Change the CSS for the tileContainer
    const document_style = document.documentElement.style;
    document_style.setProperty("--base-triangle-tile-container-grid-columns", baseTriangle_columns);
    document_style.setProperty("--base-triangle-tile-container-grid-rows", baseTriangle_rows);
    document_style.setProperty("--controls-container-width", `${((baseTriangle_columns * 100) + 100)}px`);


    const baseTriangleContainer = document.getElementById("base_triangle_container");
    //Add the tiles to the tileContainer
    for (var y = 0; y < baseTriangle_columns; y++) {
        for (var x = 0; x < baseTriangle_rows; x++) {
            const tile_div = document.createElement("div");
            tile_div.id = `base_triangle_tile_div_${x}_${y}`;
            tile_div.className = "base-triangle-container-tile rotated_0 yellow_glazed_terracotta";
            
            if(x === 10 && y === 0)
                tile_div.classList.add("purple_glazed_terracotta")

            if (x + y >= baseTriangle_columns) {
                tile_div.classList.remove("base-triangle-container-tile")
                tile_div.classList.add('empty');
            }
            baseTriangleContainer.appendChild(tile_div);
            
            
            
            const tile_canvas = document.createElement("canvas");
            tile_canvas.id = `base_triangle_tile_canvas_${x}_${y}`;
            tile_canvas.className = "base-triangle-canvas";
            tile_canvas.width = "100";
            tile_canvas.height = "100";
            // add tile click listener
            tile_canvas.onclick = function () {
            }
            tile_canvas.addEventListener('click', e => {
                base_triangle_tile_clicked(e.target);
            });
            if (x + y >= baseTriangle_columns) {
                tile_canvas.classList.add('empty');
            }

            tile_div.appendChild(tile_canvas);
        }
    }

}

function base_triangle_tile_clicked(baseTriangleTile) {
    
    const new_rotation = rotate_right(baseTriangleTile.parentElement);
    rotateTilesInPreviewPattern(baseTriangleTile, new_rotation);
    
//    const baseTriangleType = document.getElementById("base_triangle_type");
//    console.log(baseTriangleType.value);
}

function rotate_right(base_triangle_tile){
    const classList = base_triangle_tile.classList;
    var new_rotation;
    
    if(classList.contains("rotated_0")){
        classList.remove("rotated_0");
        new_rotation = "rotated_90";
    }
    else if(classList.contains("rotated_90")){
        classList.remove("rotated_90");
        new_rotation = "rotated_180";
    }
    else if(classList.contains("rotated_180")){
        classList.remove("rotated_180");
        new_rotation = "rotated_270";
    }
    else if(classList.contains("rotated_270")){
        classList.remove("rotated_270");
        new_rotation = "rotated_0";
    }
    else
        classList.add("rotated_90");

    classList.add(new_rotation);
    return new_rotation;

}