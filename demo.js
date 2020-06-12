/// change div width for demo
d3.select("#step-progress-bar")
    .attr("width", window.innerWidth);

function changeDivWidth(){
    const width = window.innerWidth;
    d3.select("#step-progress-bar")
        .attr("width", width);
}

// change width when inner window width changes
window.addEventListener("resize", changeDivWidth);

// demo input
let input = {
    steps: [
        {

            text: "1",
            status: "visited", // ["visited", "selected", "silent"]
        },
        {

            text: "2",
            status:  "visited", // ["visited", "selected", "silent"]
        },
        {
            text: "3",
            status: "selected", // ["visited", "selected", "silent"]
        },
        {
            text: "4",
            status: "silent", // ["visited", "selected", "silent"]
        }
    ]
}

// -- set steps --
//setData(input);

// -- console log the steps --
//getData();

// -- draw bar for the first time --
drawStepProgressBar(input);

//redraw bar
//redraw();