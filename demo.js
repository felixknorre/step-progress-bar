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
let dataInput = {
    steps: [
        {

            text: "1",
            status: "visited", // ["visited", "selected", "silent"],
            url: "www.google.de"
        },
        {

            text: "2",
            status:  "visited", // ["visited", "selected", "silent"],
            url: "www.google.de"
        },
        {
            text: "3",
            status: "selected", // ["visited", "selected", "silent"]
            url: "www.google.de"
        },
        {
            text: "4",
            status: "silent", // ["visited", "selected", "silent"]
            url: "www.google.de"
        }
    ]
}

dimensionsInput = {
    width: 300,
    height: 100,
    margin: {
        top: 50,
        right: 25,
        bottom: 50,
        left: 25
    },
    bar: {
        height: 5,
        rx: 5
    },
    circle: {
        r: 20,
        strokeWidth: 5
    }
}

colorInput = {
    link: "#000000", // link
    selected: "green", // selected
    silent: "#cccccc", // silent
    white: "#ffffff",

}

styleInput = {
    fontFamily: "Arial Black",
    fontSize: 15
}

// -- set steps --
//setData(input);

// -- console log the steps --
//getData();

// -- draw bar for the first time --
drawStepProgressBar(dataInput, dimensions, colorInput, styleInput);

//drawStepProgressBar(null, null, colorInput, null);

//redraw bar
//redraw();