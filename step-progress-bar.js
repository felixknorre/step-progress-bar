// Author: Felix Knorre

//-------------------------------------------
// -- Select div
//-------------------------------------------
// container div
const container = d3.select("#step-progress-bar");


//-------------------------------------------
// -- set input data
//-------------------------------------------

// steps object
var data;
var dimensions;
var color;
var style;

//set steps
function setData(dataInput, dimensionsInput, colorInput, styleInput){
    data = dataInput.steps;
    dimensions = dimensionsInput;
    color = colorInput;
    style = styleInput;
}

// console log steps for debugging
function getData(){
    console.log(data);
}


//-------------------------------------------
// -- get width of div
//-------------------------------------------

// get width of container div
function getDivWidth(div){
    var width = div
        .style('width')
        .slice(0, -2);

    return Math.round(Number(width));
}

//-------------------------------------------
// -- draw bar
//-------------------------------------------


// draw step progress bar for the first time
function drawStepProgressBar(dataInput, dimensionsInput, colorInput, styleInput){
    setData(dataInput, dimensionsInput, colorInput, styleInput);
    redraw();
}


// update step progress bar when dimensions of container div change
function redraw(){
    console.log("--redraw--");
    const divWidth = getDivWidth(container);

    // overwrite width with width of div
    dimensions.width = divWidth;

    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    const stepSize = dimensions.boundedWidth / (data.length - 1); // -1 because you need n - 1 gaps

    //remove oll svg
    d3.selectAll("svg").remove();
    // render new svg container
    const svg = container.append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);


    // remove old g tag
    d3.selectAll("g").remove();
    // render ne g tag
    const bounds = svg.append("g")
        .attr("id", "bounds")
        .style("transform", `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`);

    //plot background bar
    const backgroundBar = bounds.append("rect")
        .attr("class", "background-bar")
        .attr("width", dimensions.boundedWidth)
        .attr("height", dimensions.bar.height)
        .attr("fill", color.silent)
        .attr("rx", `${dimensions.bar.rx}px`);

    //plot progress bar
    const progressBar = bounds.append("rect")
        .attr("class", "progress-bar")
        .attr("width", 0)
        .attr("height", dimensions.bar.height)
        .attr("fill", color.link)
        .attr("rx", `${dimensions.bar.rx}px`);

    const circleGroup = bounds.append("g")
        .attr("id", "circles");

    //append circle with links
    const circle = circleGroup.selectAll("a")
        .data(input.steps)
        .enter()
        .append("circle")
        .attr("id", (d,i) => `step${i+1}`)
        .attr("cx",(d,i) => stepSize * i)
        .attr("cy", dimensions.bar.height / 2 )
        .attr("r", dimensions.circle.r)
        .attr("fill", color.white)
        .attr("stroke", color.silent)
        .attr("stroke-width", dimensions.circle.strokeWidth);

    //container for texts
    const textGroup = bounds.append("g")
        .attr("id", "texts");

    // add text to each step
    const texts = textGroup.selectAll("text")
        .data(input.steps)
        .enter()
        .append("text")
        .attr("id", (d) => `text${d.text}`)
        .attr("x", (d,i) => stepSize * i)
        .attr("y", dimensions.bar.height + 2)
        .attr("text-anchor", "middle")
        .attr("font-family", style.fontFamily)
        .attr("font-size", style.fontSize)
        .attr("fill", color.silent)
        .text(d => d.text);

    //find current step
    //console.log(data);
    let currentStep = 0;
    data.forEach(element => {
        if(element.status == "selected")
            currentStep = element.text
    });
    //find last link element
    let linkElements = [];
    data.forEach(element => {
        if(element.status == "visited"){
            linkElements.push(element.text)
        }
    })
    //find last link element
    let lastLinkElement = d3.max(linkElements);
    //compare lastLinkElement and selected element
    let lastvisitedElement = d3.max([lastLinkElement, currentStep]);
    //update progress bar

    progressBar.attr("width", stepSize * (lastvisitedElement - 1));

    //update links, circles, text
    data.forEach(element =>{
        //select current elements
        let currentCircle = d3.select(`#step${element.text}`);
        let currentText = d3.select(`#text${element.text}`);
        //set color, links for current elements
        if(element.status == "visited"){ // link
            currentCircle.attr("fill", color.link) // set color for circle
                .attr("stroke", color.link)
            currentText.attr("fill", color.white)
        } else if(element.status == "selected"){ //selected
            currentCircle.attr("fill", color.selected) // set color for circle
                .attr("stroke", color.selected)
            currentText.attr("fill", color.white)
        } else { // status == silent
            currentCircle.attr("fill", color.white)
                .attr("stroke", color.silent)
            currentText.attr("fill", color.silent)
        }
    })




}


// redraw bar when div width changes
window.addEventListener("resize", redraw);