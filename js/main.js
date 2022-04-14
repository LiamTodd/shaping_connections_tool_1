var data = [
    {
      className: 'className', // optional can be used for styling
      axes: [
        {axis: "Technical skills", value: 0}, 
        {axis: "Information and search skills", value: 0}, 
        {axis: "Mobile device use skills", value: 0},  
        {axis: "Social and sharing skills", value: 0},  
        {axis: "Content and creative skills", value: 0}
      ]
    },
  ];

const questions = [
    ["Download files or photos from the internet","Download files or photos from the internet", "Use shortcut keys on my computer and mobile devices (e.g., CTRL-C for copy, CTRL- S for save)", "Bookmark a website on my computer and mobile devices"],
    ["Find the best keywords for online searches", "Navigate websites to find what I am looking for", "Tell the difference between real and fake information online", "Find a website I visited before"],
    ["Download apps to my mobile devices (e.g., phone, tablet)", "Set up apps on a mobile device so that they work well for me", "Synchronising the use of mobile devices and other ICT", "Keep track of the costs of mobile app use"],
    ["Change who I share content with online (e.g., friends, friends of friends, public)", "Add or remove people from the contact lists", "Block people from seeing what I post online", "Purposely deciding when and which information I should and shouldn’t share online"],
    ["Design a website (e.g., setting up a personal blog on WordPress)", "Create and post video content online (e.g., on YouTube or Tik-Tok)", "Create something new from existing online images, music, or videos", "Make basic changes to the content that others have produced"],
]

const pink = "rgb(180, 153, 194)"
const purple = "rgb(137, 131, 186)"
const darker_blue = "rgb(171, 192, 231)"
const light_blue = "#aee1e8";
const light_green = "rgb(170, 191, 172)"
const button_colours = [pink, purple, darker_blue, light_blue, light_green]
var chart;
var cfg;
var svg;

const updateChart = (values) => {

    for (i = 0; i < values.length; i++){
        data[0]['axes'][i]['value'] = values[i]
    }
    if (document.getElementById('radar-chart')!= null){
        document.getElementById('radar-chart').remove()
    }

    chart = RadarChart.chart();
    cfg = chart.config(); // retrieve default config
    svg = d3.select('body').append('svg')
    .attr('width', cfg.w + cfg.w + 50)
    .attr('height', cfg.h + cfg.h / 4)
    .attr('id', 'radar-chart');
    svg.append('g').classed('single', 1).datum(data).call(chart);

    console.log(values)

}


var liveScores = [5, 5, 5, 5, 5]
const onClickYes = (idNum) =>{
    const yesId = `yes-button${idNum}`
    const noId = `no-button${idNum}`
    // update data
    const categoryIndex = idNum.slice(0,1)
    liveScores[parseInt(categoryIndex)-1] += 5
    // update colours
    document.getElementById(yesId).style.backgroundColor = button_colours[idNum.slice(0,1)-1]
    document.getElementById(yesId).disabled = true
    document.getElementById(noId).style.backgroundColor = 'white'
    document.getElementById(noId).disabled = false

    updateChart(liveScores)
}

const onClickNo = (idNum) =>{
    const yesId = `yes-button${idNum}`
    const noId = `no-button${idNum}`
    // update data: subtract 5 if button was previously green
    if (document.getElementById(yesId).disabled){
        const categoryIndex = idNum.slice(0,1)
        liveScores[parseInt(categoryIndex)-1] -= 5
    }
    // update colours
    document.getElementById(noId).style.backgroundColor = button_colours[idNum.slice(0,1)-1]
    document.getElementById(noId).disabled = true
    document.getElementById(yesId).style.backgroundColor = 'white'
    document.getElementById(yesId).disabled = false

    updateChart(liveScores)
}

const normaliseToFives = (values) => {
    for (i = 0; i < values.length; i++){
        values[i] -= values[i]%5
    }
}

const setUp = () => {
    RadarChart.defaultConfig.color = function() {
        return "rgb(150, 183, 142)"
    };
    const initial_score = [5, 5, 5, 5, 5]
    updateChart(initial_score)
    for (i = 0; i < 5; i++){
        document.getElementById("questions").innerHTML +=
        `<div id='questions${i+1}' 
        style="background-color:white;padding:10px">

            <h3>${data[0]['axes'][i]['axis']}</h3>
        </div>`

        for (j=0; j < 4; j++){
            document.getElementById(`questions${i+1}`).innerHTML +=
            `<span>
                <span style='display:inline-block;width:70%'>
                    question ${j+1}: ${questions[i][j]}
                </span>
                <button class='btn B${i}' id='yes-button${i+1}${j+1}' onclick="onClickYes('${i+1}${j+1}')">YES</button>
                <button class='btn B${i}' id='no-button${i+1}${j+1}'onclick="onClickNo('${i+1}${j+1}')">NO</button> 
            </span><br>`
        }

    }
}


window.onload = setUp()