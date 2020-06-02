//-------------------------------------------------------
//demo input
//--------------------------------------------------------
let input = {
    steps: [
        {

            text: "1",
            status: "selected", // ["visited", "selected", "silent"]
        },
        {

            text: "2",
            status:  "silent", // ["visited", "selected", "silent"]
        },
        {
            text: "3",
            status: "silent", // ["visited", "selected", "silent"]
        },
        {
            text: "4",
            status: "silent", // ["visited", "selected", "silent"]
        }
    ]
}
let input2 = {
    steps: [
        {
            text: "1",
            status: "visited", // ["visited", "selected", "silent"]
        },
        {
            text: "2",
            status:  "selected", // ["visited", "selected", "silent"]
        },
        {
            text: "3",
            status: "silent", // ["visited", "selected", "silent"]
        },
        {
            text: "4",
            status: "silent", // ["visited", "selected", "silent"]
        }
    ]
}
let input3 = {
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
let input4 = {
    steps: [
        {
            text: "1",
            status: "visited", // ["visited", "selected", "silent"]
        },
        {
            text: "2",
            status:  "selected", // ["visited", "selected", "silent"]
        },
        {
            text: "3",
            status: "visited", // ["visited", "selected", "silent"]
        },
        {
            text: "4",
            status: "silent", // ["visited", "selected", "silent"]
        }
    ]
}
let input5 = {
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
            status: "visited", // ["visited", "selected", "silent"]
        },
        {
            text: "4",
            status: "selected", // ["visited", "selected", "silent"]
        }
    ]
}
//-------------------------------------------------------------

// get width of div 

function getDivWidth(div){
    var width = d3.select(div)
        .style('width')
        .slice(0, -2);

        return Math.round(Number(width));     
}

console.log(getDivWidth("#step-progress-bar"));

//set properties
let properties = {
    width: getDivWidth("#step-progress-bar"), //window.innerWidth
    height: 120,
    margin: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    },
    bar: {
        height: 5,
        rx: 5
    },
    circle: {
        r: 20,
        strokeWidth: 5
    },
    color: {
        black: "#000000", // link
        red: "#ff0000", // selected
        brightGrey: "#cccccc", // silent
        white: "#ffffff",
    }
}

properties.boundedWidth = properties.width - properties.margin.left - properties.margin.right;
properties.boundedHeight = properties.height - properties.margin.top - properties.margin.left;
properties.stepSize = properties.boundedWidth / (input.steps.length - 1);


// resize funct
// from: https://bl.ocks.org/mtranggit/7689a322bbc9261f22c3317291ca506f
function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type,
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}
//add svg and bounds
const svg = d3.select("#step-progress-bar")
    .append("svg")
    .attr("width", properties.width)
    .attr("height", properties.height)
    .call(responsivefy);


const bounds = svg.append("g")
    .attr("id", "bounds")
    .style("transform", `translate(${properties.margin.left}px,${properties.margin.top}px)`);


//plot background bar
const backgroundBar = bounds.append("rect")
    .attr("class", "background-bar")
    .attr("width", properties.boundedWidth)
    .attr("height", properties.bar.height)
    .attr("fill", properties.color.brightGrey)
    .attr("rx", `${properties.bar.rx}px`);

//plot progress bar
const progressBar = bounds.append("rect")
    .attr("class", "background-bar")
    .attr("width", 0)
    .attr("height", properties.bar.height)
    .attr("fill", properties.color.black)
    .attr("rx", `${properties.bar.rx}px`);


//container for circles
const circleGroup = bounds.append("g")
    .attr("id", "circles");

//append circle with links
const circle = circleGroup.selectAll("a")
    .data(input.steps)
    .enter()
    .append("circle")
    .attr("id", (d,i) => `step${i+1}`)
    .attr("cx",(d,i) => properties.stepSize * i)
    .attr("cy", properties.bar.height / 2 )
    .attr("r", properties.circle.r)
    .attr("fill", properties.color.white)
    .attr("stroke", properties.color.brightGrey)
    .attr("stroke-width", properties.circle.strokeWidth);



//container for texts
const textGroup = bounds.append("g")
    .attr("id", "texts");

// add text to each step
const texts = textGroup.selectAll("text")
    .data(input.steps)
    .enter()
    .append("text")
    .attr("id", (d) => `text${d.text}`)
    .attr("x", (d,i) => properties.stepSize * i)
    .attr("y", properties.bar.height + 2)
    .attr("text-anchor", "middle")
    .attr("font-family", "Arial Black")
    .attr("fill", properties.color.brightGrey)
    .text(d => d.text);



//set current step function
function setCurrentStep(input) {
    //find current step
    let currentStep = 0;
    input.steps.forEach(element => {
        if(element.status == "selected")
            currentStep = element.text
    });
    //find last link element
    let linkElements = [];
    input.steps.forEach(element => {
        if(element.status == "visited"){
            linkElements.push(element.text)
        }
    })
    //find last link element
    let lastLinkElement = d3.max(linkElements);
    //compare lastLinkElement and selected element
    let lastvisitedElement = d3.max([lastLinkElement, currentStep]);
    //update progress bar

    progressBar.attr("width", properties.stepSize * (lastvisitedElement - 1));

    //animation
    // if(lastLinkElement > currentStep){
    //     progressBar.attr("width", properties.stepSize * (lastvisitedElement - 1))
    // } else {
    //     progressBar.attr("width", properties.stepSize * (lastvisitedElement - 2))
    //     progressBar.transition().duration(1000)
    //         .attr("width", properties.stepSize * (currentStep - 1))
    // }

    //update links, circles, text
    input.steps.forEach(element =>{
        //select current elements
        let currentCircle = d3.select(`#step${element.text}`);
        let currentText = d3.select(`#text${element.text}`);
        //set color, links for current elements
        if(element.status == "visited"){ // link
            currentCircle.attr("fill", properties.color.black) // set color for circle
                .attr("stroke", properties.color.black)
            currentText.attr("fill", properties.color.white)
        } else if(element.status == "selected"){ //selected
            currentCircle.attr("fill", properties.color.red) // set color for circle
                .attr("stroke", properties.color.red)
            currentText.attr("fill", properties.color.white)
        } else { // status == silent
            currentCircle.attr("fill", properties.color.white)
                .attr("stroke", properties.color.brightGrey)
            currentText.attr("fill", properties.color.brightGrey)
        }
    })
}

//test call
setCurrentStep(input);

//demo button
const stepButton = d3.select("body")
    .append("button")
    .text("Next step");

let demoSteps = [input, input2, input3, input4, input3, input5];
let count = 1;

stepButton.on("click", function(){
    setCurrentStep(demoSteps[count++ % demoSteps.length ])
});
