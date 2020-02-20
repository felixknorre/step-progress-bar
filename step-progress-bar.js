//set steps 
let steps = [1, 2, 3, 4, 5, 6]
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

progressBar.transition().duration(1000)


//container for circles
const circleGroup = bounds.append("g")
    .attr("id", "dots")

//plot dots
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


//container for texts
const textGroup = bounds.append("g")
    .attr("id", "texts")

// add text to each step
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

//update function 
//steps start at 1
function updateStepProgressBar(step){
    if(0 < step && step <= steps.length){
        //update bar
        progressBar.transition().duration(1000)
            .attr("fill", properties.color.black)
            .attr("width", properties.stepSize * (step - 1))
        //update dots and text
        for(let i = 1; i <= steps.length; i++){
            let currentCircle = d3.select(`#step${i}`)
            let currentText = d3.select(`#text${i}`)
            if(i <= step){
                currentCircle.attr("fill", properties.color.black)
                    .attr("stroke", properties.color.black)
                currentText.attr("fill", properties.color.white)
            } else {
                currentCircle.attr("fill", properties.color.white)
                    .attr("stroke", properties.color.brightGrey)
                currentText.attr("fill", properties.color.brightGrey)
            }
        }
    } else {
        throw "There aren't that many steps"
    }
}
//default start
updateStepProgressBar(1)

//demo button
const stepButton = d3.select("body")
    .append("button")
        .text("Next step")

let currentStep = 1
stepButton.on("click", function(){
    currentStep = (currentStep + 1) % (steps.length + 1) 
    if(currentStep == 0){
        currentStep++
    }
    updateStepProgressBar(currentStep)
})








