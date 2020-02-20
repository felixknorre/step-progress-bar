//set steps 
let steps = [1,2,3,4]
//set properties
let properties = {
    width: window.innerWidth,
    height: 100,
    margin: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    },
    bar: {
        height: 10,
        rx: 5
    },
    dot: {
        r: 20,
        strokeWidth: 5 
    },
    color: {
        brightGrey: "#cccccc",
        black: "#000000",
        white: "#ffffff",
    }
}
properties.boundedWidth = properties.width - properties.margin.left - properties.margin.right
properties.boundedHeight = properties.height - properties.margin.top - properties.margin.left
properties.stepSize = properties.boundedWidth / (steps.length - 1)

//test prints
console.log(window.innerWidth)
console.log(properties.boundedWidth)

//add svg and bounds
const svg = d3.select("#step-progress-bar")
    .append("svg")
        .attr("width", properties.width)
        .attr("height", properties.height)


const bounds = svg.append("g")
    .attr("id", "bounds")
    .style("transform", `translate(${properties.margin.left}px,${properties.margin.top}px)`)
    

//plot background bar
const backgroundBar = bounds.append("rect")
    .attr("class", "background-bar")
    .attr("width", properties.boundedWidth)
    .attr("height", properties.bar.height)
    .attr("fill", properties.color.brightGrey)
    .attr("rx", `${properties.bar.rx}px`)

//plot progress bar
const progressBar = bounds.append("rect")
    .attr("class", "background-bar")
    .attr("width", 0)
    .attr("height", properties.bar.height)
    .attr("fill", properties.color.black)
    .attr("rx", `${properties.bar.rx}px`)

//plot dots
//container for circles
const circleGroup = bounds.append("g")
    .attr("id", "dots")


const circles = circleGroup.selectAll("circle")
    .data(steps)
    .enter()
    .append("circle")
        .attr("id", (d,i) => `step${i+1}`)
        .attr("cx",(d,i) => properties.stepSize * i)
        .attr("cy", properties.bar.height / 2 )
        .attr("r", properties.dot.r)
        .attr("fill", properties.color.white)
        .attr("stroke", properties.color.brightGrey)
        .attr("stroke-width", properties.dot.strokeWidth)

// add text to each step
//container for texts
const textGroup = bounds.append("g")
    .attr("id", "texts")

const texts = textGroup.selectAll("text")
    .data(steps)
    .enter()
    .append("text")
        .attr("id", (d,i) => `text${i+1}`)
        .attr("x", (d,i) => properties.stepSize * i)
        .attr("y", properties.bar.height)
        .attr("text-anchor", "middle")
        .attr("fill", properties.color.brightGrey)
        .text(d => d)





