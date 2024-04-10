
let rotate_modus_selected = true;

// Load everything
window.addEventListener('load', () => {
    refreshBaseTriangleTiles();
    refreshPreviewTiles();



    // button click listeners
    // rotate_button
    rotate_button.addEventListener('click', e => {
        if (!rotate_button.hasAttribute('disabled')) {
            rotate_button.setAttribute('disabled', true);
        }
        if (change_texture_button.hasAttribute('disabled')) {
            change_texture_button.removeAttribute('disabled');
        }
        rotate_modus_selected = true;
    });

    // rotate_button
    change_texture_button.addEventListener('click', e => {
        if (!change_texture_button.hasAttribute('disabled')) {
            change_texture_button.setAttribute('disabled', true);
        }
        if (rotate_button.hasAttribute('disabled')) {
            rotate_button.removeAttribute('disabled');
        }
        rotate_modus_selected = false;
    });
}, false);

/*window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Sure?';
    }

    // For Safari
    return 'Sure?';
};*/

function base_triangle_draw_one_tile_of_symmetry(ctx, tile) {

    const line_width = 5;

    // Draw one Line
    ctx.beginPath();

    const baseTriangle_size = parseInt(document.getElementById("base_triangle_number").value);

    if (baseTriangle_size === 1) {
        //The triangle
        ctx.moveTo(0, 0);
        ctx.lineTo(0, tile.height);
        ctx.lineTo(tile.width, 0);
        ctx.lineTo(0, 0);
    } else if (baseTriangle_size > 1) {
        //Horizontal line on top
        if (tile.dataset.y === "0") {
            ctx.moveTo(0, 0);
            ctx.lineTo(tile.width, 0);
        }
        //Vertical line on the left
        if (tile.dataset.x === "0") {
            ctx.moveTo(0, 0);
            ctx.lineTo(0, tile.height);
        }
        //Diagonal Line
        if (parseInt(tile.dataset.x) + parseInt(tile.dataset.y) === (baseTriangle_size - 1)) {
            ctx.moveTo(tile.width, 0);
            ctx.lineTo(0, tile.height);
        }
    }


    //The diagonal
    ctx.moveTo(tile.width, 0);
    ctx.lineWidth = line_width;
    ctx.strokeStyle = "red";
    ctx.stroke();
}

function preview_draw_one_tile_of_symmetry(ctx, tile) {

    const line_width = 5;

    // Draw one Line
    ctx.beginPath();

    const baseTriangle_size = parseInt(document.getElementById("base_triangle_number").value);

    if (baseTriangle_size === 1) {
        //Around the tile
        ctx.moveTo(0, 0);
        ctx.lineTo(tile.width, 0);
        ctx.lineTo(tile.width, tile.height);
        ctx.lineTo(0, tile.height);
        ctx.lineTo(0, 0);
        //The diagonal
        ctx.moveTo(tile.width, 0);
        ctx.lineTo(0, tile.height);
    } else if (baseTriangle_size > 1) {

        const y_mod_base_triangle = Math.floor(tile.dataset.y % baseTriangle_size);
        const x_mod_base_triangle = Math.floor(tile.dataset.x % baseTriangle_size);

        //Horizontal line on top
        if (y_mod_base_triangle === 0) {
            ctx.moveTo(0, 0);
            ctx.lineTo(tile.width, 0);
        }
        //Vertical line on the left
        if (x_mod_base_triangle === 0) {
            ctx.moveTo(0, 0);
            ctx.lineTo(0, tile.height);
        }
        //Horizontal line on bottom
        if (y_mod_base_triangle === (baseTriangle_size - 1)) {
            ctx.moveTo(0, tile.height);
            ctx.lineTo(tile.width, tile.height);
        }
        //Vertical line on the right
        if (x_mod_base_triangle === (baseTriangle_size - 1)) {
            ctx.moveTo(tile.width, 0);
            ctx.lineTo(tile.width, tile.height);
        }
        //Diagonal Line
        if (x_mod_base_triangle + y_mod_base_triangle === (baseTriangle_size - 1)) {
            ctx.moveTo(tile.width, 0);
            ctx.lineTo(0, tile.height);
        }
    }


    ctx.lineWidth = line_width;
    ctx.strokeStyle = "red";
    ctx.stroke();
}

function remove_lines_of_symmetry() {
    //For the selection
    const base_triangleTiles = [...document.querySelectorAll('.base-triangle-canvas')];
    base_triangleTiles.forEach(tile => {
        const ctx = tile.getContext("2d");
        ctx.clearRect(0, 0, tile.width, tile.height);
    });

    //For each tile in the preview
    const currentTiles = [...document.querySelectorAll('.preview-tile-canvas')];
    currentTiles.forEach(tile => {
        const ctx = tile.getContext("2d");
        ctx.clearRect(0, 0, tile.width, tile.height);
    });
}

function show_lines_of_symmetry() {
    const checkBox = document.getElementById("show_lines_of_symmetry");

    remove_lines_of_symmetry();

    if (checkBox.checked) {

        //For the selection
        const base_triangleTiles = [...document.querySelectorAll('.base-triangle-canvas')];
        base_triangleTiles.forEach(tile => {
            const ctx = tile.getContext("2d");
            base_triangle_draw_one_tile_of_symmetry(ctx, tile);
        });


        //For each tile in the preview
        const currentTiles = [...document.querySelectorAll('.preview-tile-canvas')];
        currentTiles.forEach(tile => {
            const ctx = tile.getContext("2d");
            preview_draw_one_tile_of_symmetry(ctx, tile);
        });
    }
}

function createPatternPreview() {

    const tile_count_width = document.getElementById("preview_tile_column_count");
    const tile_count_height = document.getElementById("preview_tile_row_count");
    const baseTriangle_size = parseInt(document.getElementById("base_triangle_number").value);

    //Add the tiles to the tileContainer
    for (var y_block = 0; y_block < Math.floor(tile_count_height.value / baseTriangle_size); y_block++) {
        for (var x_block = 0; x_block < Math.floor(tile_count_width.value / baseTriangle_size); x_block++) {
            const preview_base_triangle_container = document.getElementById(`preview_base_triangle_container_${x_block}_${y_block}`);

            if (x_block % 2 === 1) {
                if (y_block % 2 === 1) {
                    //Mirrored on x-axis and y-axis
                    preview_base_triangle_container.style = 'transform: scaleX(-1) scaleY(-1)'
                }
                else
                {
                    //Mirrored on y-axis
                    preview_base_triangle_container.style = 'transform: scaleX(-1)';
                }
            }
            else
            {
                if (y_block % 2 === 1) {
                    //Mirrored on x-axis
                    preview_base_triangle_container.style = 'transform: scaleY(-1)';
                }
            }
        }
    }
}

function get_rotation_from_tile(tile){
    var rotation = "rotated_0";
    const classList = tile.classList;

    classList.forEach(class_String => {
        if(class_String.includes("rotated_")) {
            rotation = class_String;
        }
    });
    return rotation;
}

function get_texture_from_tile(tile){
    var texture = "yellow_glazed_terracotta";
    const classList = tile.classList;

    if(!classList.contains("baseTriangleContainerTiles")) {
        console.error("get_texture_from_tile only works with baseTriangleContainerTiles. We got", tile);
    }

    classList.forEach(class_String => {
        if(!class_String.includes("baseTriangleContainerTiles") &&
            !class_String.includes("base-triangle-container-tile") &&
            !class_String.includes("rotated_")){
            texture = class_String;
        }
    });
    return texture;
}

function setTileTexture(tile, new_texture){
    tile.classList.add(new_texture);
}

function setTileTexturesInPreviewPattern(base_triangle_tile, new_texture) {
    const x = parseInt(base_triangle_tile.dataset.x);
    const y = parseInt(base_triangle_tile.dataset.y);

    const baseTriangle_size = parseInt(document.getElementById("base_triangle_number").value);

    if (x + y <= (baseTriangle_size - 1)) {
        const querySelectorString = `.connected_base_triangle_tile_div_${x}_${y}`;
        const tiles = [...document.querySelectorAll(querySelectorString)];

        tiles.forEach(tile => {
            setTileTexture(tile, new_texture)
        });
    }

    //Mirrored Tiles
    if (x + y < (baseTriangle_size - 1)) {
        const x_mirrored = baseTriangle_size - y - 1;
        const y_mirrored = baseTriangle_size - x - 1;

        const querySelectorString = `.connected_base_triangle_tile_div_${x_mirrored}_${y_mirrored}`;
        const tiles = [...document.querySelectorAll(querySelectorString)];

        tiles.forEach(tile => {
            setTileTexture(tile, new_texture)
        });
    }
}

function changeTextureInTilesInPreviewPattern(base_triangle_tile, new_texture, old_texture) {
    const x = parseInt(base_triangle_tile.dataset.x);
    const y = parseInt(base_triangle_tile.dataset.y);

    const baseTriangle_size = parseInt(document.getElementById("base_triangle_number").value);

    if (x + y <= (baseTriangle_size - 1)) {
        const querySelectorString = `.connected_base_triangle_tile_div_${x}_${y}`;
        const tiles = [...document.querySelectorAll(querySelectorString)];

        tiles.forEach(tile => {
            tile.classList.remove(old_texture);
            tile.classList.add(new_texture);
        });
    }

    //Mirrored Tiles
    if (x + y < (baseTriangle_size - 1)) {
        const x_mirrored = baseTriangle_size - y - 1;
        const y_mirrored = baseTriangle_size - x - 1;

        const querySelectorString = `.connected_base_triangle_tile_div_${x_mirrored}_${y_mirrored}`;
        const tiles = [...document.querySelectorAll(querySelectorString)];

        tiles.forEach(tile => {
            tile.classList.remove(old_texture);
            tile.classList.add(new_texture);
        });
    }
}

function rotateTile(tile, new_rotation) {
    tile.classList.remove("rotated_0");
    tile.classList.remove("rotated_90");
    tile.classList.remove("rotated_180");
    tile.classList.remove("rotated_270");
    tile.classList.add(new_rotation);
}

function rotateTilesInPreviewPattern(base_triangle_tile, new_rotation) {
    const x = parseInt(base_triangle_tile.dataset.x);
    const y = parseInt(base_triangle_tile.dataset.y);

    const baseTriangle_size = parseInt(document.getElementById("base_triangle_number").value);

    if (x + y <= (baseTriangle_size - 1)) {
        const querySelectorString = `.connected_base_triangle_tile_div_${x}_${y}`;
        const tiles = [...document.querySelectorAll(querySelectorString)];

        tiles.forEach(tile => {
            rotateTile(tile, new_rotation)
        });
    }

    //Mirrored Tiles
    if (x + y < (baseTriangle_size - 1)) {
        const x_mirrored = baseTriangle_size - y - 1;
        const y_mirrored = baseTriangle_size - x - 1;

        const querySelectorString = `.connected_base_triangle_tile_div_${x_mirrored}_${y_mirrored}`;
        const tiles = [...document.querySelectorAll(querySelectorString)];

        tiles.forEach(tile => {
            rotateTile(tile, getMirroredRotation(new_rotation))
        });
    }
}

function refreshBaseTriangleTiles() {
    removeBaseTriangleTiles();
    createBaseTriangleTiles();

    //Set the default tiles and rotation
    const currentTiles = [...document.querySelectorAll('.baseTriangleContainerTiles')];
    currentTiles.forEach(tile => {
        setTileTexture(tile, "yellow_glazed_terracotta");
        rotateTile(tile, "rotated_90");
    });
    //setTileTexture(currentTiles.at(0), "purple_glazed_terracotta");


    show_lines_of_symmetry();
}

function refreshPreviewTiles() {
    removePreviewTiles();
    createPreviewTiles();

    const base_triangle_tiles = [...document.querySelectorAll('.baseTriangleContainerTiles')];
    base_triangle_tiles.forEach(base_triangle_tile => {
        setTileTexturesInPreviewPattern(base_triangle_tile, get_texture_from_tile(base_triangle_tile));
        rotateTilesInPreviewPattern(base_triangle_tile, get_rotation_from_tile(base_triangle_tile));
    });

    createPatternPreview();
    show_lines_of_symmetry();
}

function tileCountChanged() {
    refreshPreviewTiles()
}

function createPreviewTiles() {
    const tileContainer = document.getElementById("preview_tile_container");
    const tile_count_width = document.getElementById("preview_tile_column_count");
    const tile_count_height = document.getElementById("preview_tile_row_count");
    const baseTriangle_size = parseInt(document.getElementById("base_triangle_number").value);

    //Change the CSS for the tileContainer
    const document_style = document.documentElement.style;
    document_style.setProperty("--tile-container-grid-template-columns", Math.floor(tile_count_width.value / baseTriangle_size));
    document_style.setProperty("--tile-container-grid-template-rows", Math.floor(tile_count_height.value / baseTriangle_size));

    //Add the tiles to the tileContainer
    for (var y_block = 0; y_block < Math.floor(tile_count_height.value / baseTriangle_size); y_block++) {
        for (var x_block = 0; x_block < Math.floor(tile_count_width.value / baseTriangle_size); x_block++) {

            const preview_base_triangle_container = document.createElement("div");
            preview_base_triangle_container.id = `preview_base_triangle_container_${x_block}_${y_block}`;
            preview_base_triangle_container.className = "previewContainerTiles base-triangle-container";
            preview_base_triangle_container.dataset.x_block = x_block.toString();
            preview_base_triangle_container.dataset.y_block = y_block.toString();
            tileContainer.appendChild(preview_base_triangle_container);

            for (var y = 0; y < baseTriangle_size; y++) {
                for (var x = 0; x < baseTriangle_size; x++) {
                    //const y_base_triangle = Math.floor(y / baseTriangle_size);
                    //const x_base_triangle = Math.floor(x / baseTriangle_size);
                    const y_mod_base_triangle = Math.floor(y % baseTriangle_size);
                    const x_mod_base_triangle = Math.floor(x % baseTriangle_size);

                    const tile_div = document.createElement("div");
                    tile_div.id = `tile_div_${x_block}_${y_block}_${x}_${y}`;
                    tile_div.dataset.x = x.toString();
                    tile_div.dataset.y = y.toString();
                    tile_div.className = "preview-tile";
                    tile_div.classList.add(`connected_base_triangle_tile_div_${x_mod_base_triangle}_${y_mod_base_triangle}`);
                    preview_base_triangle_container.appendChild(tile_div);


                    const tile_canvas = document.createElement("canvas");
                    tile_canvas.id = `tile_canvas_${x}_${y}`;
                    tile_canvas.dataset.x = x.toString();
                    tile_canvas.dataset.y = y.toString();
                    tile_canvas.className = "preview-tile-canvas";
                    tile_canvas.width = "100";
                    tile_canvas.height = "100";
                    tile_div.appendChild(tile_canvas);
                }
            }
        }
    }
}

function createBaseTriangleTiles() {
    const baseTriangle_size = document.getElementById("base_triangle_number").value;

    //Change the CSS for the tileContainer
    const document_style = document.documentElement.style;
    document_style.setProperty("--base-triangle-tile-container-grid-size", baseTriangle_size);
    document_style.setProperty("--controls-container-width", `${((baseTriangle_size * 100) + 100)}px`);
    document_style.setProperty("--base-triangle-size", `${baseTriangle_size * 100}px`);

    const baseTriangleContainer = document.getElementById("base_triangle_container");
    //Add the tiles to the tileContainer
    for (var y = 0; y < baseTriangle_size; y++) {
        for (var x = 0; x < baseTriangle_size; x++) {
            const tile_div = document.createElement("div");
            tile_div.id = `base_triangle_tile_div_${x}_${y}`;
            tile_div.dataset.x = x.toString();
            tile_div.dataset.y = y.toString();
            tile_div.className = "baseTriangleContainerTiles base-triangle-container-tile";

            if (x === 10 && y === 0)
                tile_div.classList.add("purple_glazed_terracotta")

            if (x + y >= baseTriangle_size) {
                tile_div.classList.remove("base-triangle-container-tile")
                tile_div.classList.add('empty');
            }
            baseTriangleContainer.appendChild(tile_div);


            const tile_canvas = document.createElement("canvas");
            tile_canvas.id = `base_triangle_tile_canvas_${x}_${y}`;
            tile_canvas.dataset.x = x.toString();
            tile_canvas.dataset.y = y.toString();
            tile_canvas.className = "base-triangle-canvas";
            tile_canvas.width = "100";
            tile_canvas.height = "100";
            // add tile click listener
            tile_canvas.onclick = function () {
            }
            tile_canvas.addEventListener('click', e => {
                base_triangle_tile_clicked(e.target);
            });
            if (x + y >= baseTriangle_size) {
                tile_canvas.classList.add('empty');
            }

            tile_div.appendChild(tile_canvas);
        }
    }
}

function removeBaseTriangleTiles() {
    const currentTiles = [...document.querySelectorAll('.baseTriangleContainerTiles')];

    currentTiles.forEach(tile => {
        tile.remove();
    });
}

function removePreviewTiles() {
    const currentTiles = [...document.querySelectorAll('.previewContainerTiles')];

    currentTiles.forEach(tile => {
        tile.remove();
    });
}

function base_triangle_tile_clicked(baseTriangleTile) {
    const baseTriangle_size = document.getElementById("base_triangle_number").value;
    const x = parseInt(baseTriangleTile.dataset.x);
    const y = parseInt(baseTriangleTile.dataset.y);

    if (x + y >= baseTriangle_size) {
        return;
    }

    if(rotate_modus_selected){
        const new_rotation = rotate_base_triangle_right(baseTriangleTile.parentElement);
        rotateTilesInPreviewPattern(baseTriangleTile, new_rotation);
    }
    else
    {
        const old_texture = get_texture_from_tile(baseTriangleTile.parentElement);
        const new_texture = change_base_triangle_texture(baseTriangleTile.parentElement, old_texture);
        console.log(old_texture, new_texture);
        changeTextureInTilesInPreviewPattern(baseTriangleTile, new_texture, old_texture)
    }
}

function change_base_triangle_texture(base_triangle_tile, old_texture) {

    const classList = base_triangle_tile.classList;
    var new_texture = document.getElementById("base_triangle_texture").value;


    classList.remove(old_texture);
    classList.add(new_texture);

    return new_texture;
}

function rotate_base_triangle_right(base_triangle_tile) {
    const classList = base_triangle_tile.classList;
    var new_rotation;

    if (classList.contains("rotated_0")) {
        classList.remove("rotated_0");
        new_rotation = "rotated_90";
    } else if (classList.contains("rotated_90")) {
        classList.remove("rotated_90");
        new_rotation = "rotated_180";
    } else if (classList.contains("rotated_180")) {
        classList.remove("rotated_180");
        new_rotation = "rotated_270";
    } else if (classList.contains("rotated_270")) {
        classList.remove("rotated_270");
        new_rotation = "rotated_0";
    } else
        classList.add("rotated_90");

    classList.add(new_rotation);
    return new_rotation;

}

function getMirroredRotation(rotation){

    if (rotation === "rotated_0") {
        return "rotated_180";
    } else if (rotation === "rotated_90") {
        return "rotated_90";
    } else if (rotation === "rotated_180") {
        return "rotated_0";
    } else if (rotation === "rotated_270") {
        return "rotated_270";
    }
}

function base_triangle_number_changed() {
    refreshBaseTriangleTiles();
    refreshPreviewTiles();
}

function base_triangle_type_changed() {
    refreshBaseTriangleTiles();
    refreshPreviewTiles();
}