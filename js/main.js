var data = [
    {
      className: 'className', // optional can be used for styling
      axes: [
        {axis: "Technical skills", value: 0}, 
        {axis: "Information & search skills", value: 0}, 
        {axis: "Mobile device use skills", value: 0},  
        {axis: "Social & sharing skills", value: 0},  
        {axis: "Content & creative skills", value: 0}
      ]
    },
  ];

const imgSources = ["technical_skills.png", "information_and_search_skills.png", "mobile_device_use_skills.png", "social_and_sharing_skills.png", "content_and_creative_skills.png"]

const questions = [
    ["Download files or photos from the internet","Download files or photos from the internet", "Use shortcut keys on my computer and mobile devices (e.g., CTRL-C for copy, CTRL- S for save)", "Bookmark a website on my computer and mobile devices"],
    ["Find the best keywords for online searches", "Navigate websites to find what I am looking for", "Tell the difference between real and fake information online", "Find a website I visited before"],
    ["Download apps to my mobile devices (e.g., phone, tablet)", "Set up apps on a mobile device so that they work well for me", "Synchronising the use of mobile devices and other ICT", "Keep track of the costs of mobile app use"],
    ["Change who I share content with online (e.g., friends, friends of friends, public)", "Add or remove people from the contact lists", "Block people from seeing what I post online", "Purposely deciding when and which information I should and shouldn’t share online"],
    ["Design a website (e.g., setting up a personal blog on WordPress)", "Create and post video content online (e.g., on YouTube or Tik-Tok)", "Create something new from existing online images, music, or videos", "Make basic changes to the content that others have produced"],
]

const buttonPink = "rgb(180, 153, 194)"
const buttonPurple = "rgb(137, 131, 186)"
const buttonBlue = "rgb(171, 192, 231)"
const buttonLightBlue = "#aee1e8";
const buttonGreen = "rgb(170, 191, 172)"
const buttonColours = [buttonPink, buttonPurple, buttonBlue, buttonLightBlue, buttonGreen]

const backgroundPink = "rgb(244, 235, 248)";
const backgroundPurple = "rgb(239, 236, 255)";
const backgroundBlue = "rgb(230, 239, 255)";
const backgroundLightBlue = "#f1fdff";
const backgroundGreen = "rgb(237, 243, 239)";
const backgroundColours = [backgroundPink, backgroundPurple, backgroundBlue, backgroundLightBlue, backgroundGreen]

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
    document.getElementById(yesId).style.backgroundColor = buttonColours[idNum.slice(0,1)-1]
    document.getElementById(yesId).disabled = true
    document.getElementById(noId).style.backgroundColor = backgroundColours[idNum.slice(0,1)-1]
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
    document.getElementById(noId).style.backgroundColor = buttonColours[idNum.slice(0,1)-1]
    document.getElementById(noId).disabled = true
    document.getElementById(yesId).style.backgroundColor = backgroundColours[idNum.slice(0,1)-1]
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
        style="background-color:${backgroundColours[i]};padding:100px;width:100%">

            <h3 class='font1 header'>${data[0]['axes'][i]['axis']}</h3>
            <img src='img/${imgSources[i]}' alt='image'>
        </div>`

        for (j=0; j < 4; j++){
            document.getElementById(`questions${i+1}`).innerHTML +=
            `<span>
                <span class='font1' style='display:inline-block;width:70%;padding:10px;'>
                    <b>${j+1}. ${questions[i][j]}<b>
                    <p></p>
                    <button class='btn B${i}' id='yes-button${i+1}${j+1}' onclick="onClickYes('${i+1}${j+1}')">YES</button>
                    <button class='btn B${i}' id='no-button${i+1}${j+1}'onclick="onClickNo('${i+1}${j+1}')">NO</button> 
                </span>
            </span><br>`
        }

    }
}


window.onload = setUp()