//-------------------------------------------------------
//demo input
//--------------------------------------------------------
let input = {
        steps: [
            {
                link: "www.google.de",
                text: "1",
                status: "selected", // ["link", "selected", "silent"]
                title: "Title1"
            },
            {
                link: "www.google.de",
                text: "2",
                status:  "silent", // ["link", "selected", "silent"]
                title: "Title2"
            },
            {
                link: "www.google.de",
                text: "3",
                status: "silent", // ["link", "selected", "silent"]
                title: "Title3"
            },
            {
                link: "www.google.de",
                text: "4",
                status: "silent", // ["link", "selected", "silent"]
                title: "Title4"
            }
        ]  
}
let input2 = {
    steps: [
        {
            link: "www.google.de",
            text: "1",
            status: "link", // ["link", "selected", "silent"]
            title: "Title1"
        },
        {
            link: "www.google.de",
            text: "2",
            status:  "selected", // ["link", "selected", "silent"]
            title: "Title2"
        },
        {
            link: "www.google.de",
            text: "3",
            status: "silent", // ["link", "selected", "silent"]
            title: "Title3"
        },
        {
            link: "www.google.de",
            text: "4",
            status: "silent", // ["link", "selected", "silent"]
            title: "Title4"
        }
    ]  
}
let input3 = {
    steps: [
        {
            link: "www.google.de",
            text: "1",
            status: "link", // ["link", "selected", "silent"]
            title: "Title1"
        },
        {
            link: "www.google.de",
            text: "2",
            status:  "link", // ["link", "selected", "silent"]
            title: "Title2"
        },
        {
            link: "www.google.de",
            text: "3",
            status: "selected", // ["link", "selected", "silent"]
            title: "Title3"
        },
        {
            link: "www.google.de",
            text: "4",
            status: "silent", // ["link", "selected", "silent"]
            title: "Title4"
        }
    ]  
}
let input4 = {
    steps: [
        {
            link: "www.google.de",
            text: "1",
            status: "link", // ["link", "selected", "silent"]
            title: "Title1"
        },
        {
            link: "www.google.de",
            text: "2",
            status:  "link", // ["link", "selected", "silent"]
            title: "Title2"
        },
        {
            link: "www.google.de",
            text: "3",
            status: "link", // ["link", "selected", "silent"]
            title: "Title3"
        },
        {
            link: "www.google.de",
            text: "4",
            status: "selected", // ["link", "selected", "silent"]
            title: "Title4"
        }
    ]  
}
//-------------------------------------------------------------
//set properties
let properties = {
    width: window.innerWidth,
    height: 120,
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

properties.boundedWidth = properties.width - properties.margin.left - properties.margin.right
properties.boundedHeight = properties.height - properties.margin.top - properties.margin.left
properties.stepSize = properties.boundedWidth / (input.steps.length - 1)

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


//container for circles
const circleGroup = bounds.append("g")
    .attr("id", "circles")

//append circle with links
const links = circleGroup.selectAll("a")
    .data(input.steps)
    .enter()
    .append("a")
        .attr("id", (d,i) => `link${i+1}`)
        .append("circle")
        .attr("id", (d,i) => `step${i+1}`)
        .attr("cx",(d,i) => properties.stepSize * i)
        .attr("cy", properties.bar.height / 2 )
        .attr("r", properties.circle.r)
        .attr("fill", properties.color.white)
        .attr("stroke", properties.color.brightGrey)
        .attr("stroke-width", properties.circle.strokeWidth)



//container for texts
const textGroup = bounds.append("g")
    .attr("id", "texts")

// add text to each step
const texts = textGroup.selectAll("text")
    .data(input.steps)
    .enter()
    .append("text")
        .attr("id", (d) => `text${d.text}`)
        .attr("x", (d,i) => properties.stepSize * i)
        .attr("y", properties.bar.height)
        .attr("text-anchor", "middle")
        .attr("fill", properties.color.brightGrey)
        .text(d => d.text)



//set current step function
function setCurrentStep(input) {
    //find current step
    let currentStep = 0
    input.steps.forEach(element => {
        if(element.status == "selected")
        currentStep = element.text
    });
    //update progress bar 
    progressBar.attr("width", properties.stepSize * (currentStep - 1))
    //update links, circles, text
    input.steps.forEach(element =>{
        //select current elements
        let currentLink = d3.select(`#link${element.text}`)
        let currentCircle = d3.select(`#step${element.text}`)
        let currentText = d3.select(`#text${element.text}`)
        //set color, links for current elements
        if(element.status == "link"){ // link
            currentLink.attr("xlink:href", element.link) // set link to step
            currentCircle.attr("fill", properties.color.black) // set color for circle
                .attr("stroke", properties.color.black)
            currentText.attr("fill", properties.color.white)
        } else if(element.status == "selected"){ //selected
            currentLink.attr("xlink:href", element.link) // set link to step
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

//-----------------------------------------------------------------------------------------------
//old update function with demo button
//-----------------------------------------------------------------------------------------------

//update function 
//steps start at 1
function updateStepProgressBar(step){
    if(0 < step && step <= input.steps.length){
        //update bar
        progressBar.attr("width", properties.stepSize * (step - 1))
        //update links, dots and text
        for(let i = 1; i <= input.steps.length; i++){
            let currentLink = d3.select(`#link${i}`)
            let currentCircle = d3.select(`#step${i}`)
            let currentText = d3.select(`#text${i}`)
            if(i <= step){
                currentLink.attr("xlink:href", "https://www.google.de")
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
//updateStepProgressBar(1)

//test call
setCurrentStep(input2)

//demo button
// const stepButton = d3.select("body")
//     .append("button")
//         .text("Next step")

// let currentStep = 1
// stepButton.on("click", function(){
//     currentStep = (currentStep + 1) % (input.steps.length + 1) 
//     if(currentStep == 0){
//         currentStep++
//     }
//     updateStepProgressBar(currentStep)
// })








