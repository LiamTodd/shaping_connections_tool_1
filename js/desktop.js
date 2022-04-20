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
const floatOrder=["left", "right"]

const questions = [
    ["Download files or photos from the internet","Download files or photos from the internet", "Use shortcut keys on my computer and mobile devices (e.g., CTRL-C for copy, CTRL- S for save)", "Bookmark a website on my computer and mobile devices"],
    ["Find the best keywords for online searches", "Navigate websites to find what I am looking for", "Tell the difference between real and fake information online", "Find a website I visited before"],
    ["Download apps to my mobile devices (e.g., phone, tablet)", "Set up apps on a mobile device so that they work well for me", "Synchronising the use of mobile devices and other ICT", "Keep track of the costs of mobile app use"],
    ["Change who I share content with online (e.g., friends, friends of friends, public)", "Add or remove people from the contact lists", "Block people from seeing what I post online", "Purposely deciding when and which information I should and shouldn’t share online"],
    ["Design a website (e.g., setting up a personal blog on WordPress)", "Create and post video content online (e.g., on YouTube or Tik-Tok)", "Create something new from existing online images, music, or videos", "Make basic changes to the content that others have produced"],
]

// tracks which answers have been answered
var clicked = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
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
    svg = d3.select('#radar-container').append('svg') // default 'body'
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

    clicked[idNum.slice(0,1)-1][idNum.slice(1,2)-1] = true
    if (clicked[idNum.slice(0,1)-1][0] && clicked[idNum.slice(0,1)-1][1] &&clicked[idNum.slice(0,1)-1][2] && clicked[idNum.slice(0,1)-1][3]){
        window.scrollBy(0,700)
    }
    console.log(clicked)

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

    clicked[idNum.slice(0,1)-1][idNum.slice(1,2)-1] = true
    if (clicked[idNum.slice(0,1)-1][0] && clicked[idNum.slice(0,1)-1][1] &&clicked[idNum.slice(0,1)-1][2] && clicked[idNum.slice(0,1)-1][3]){
        window.scrollBy(0,700)
    }
    console.log(clicked)

    updateChart(liveScores)
}

const normaliseToFives = (values) => {
    for (i = 0; i < values.length; i++){
        values[i] -= values[i]%5
    }
}

// const capture = () => {
//     let url = ""
//     html2canvas(document.getElementById('to-capture')).then(function (canvas) {
//         url = canvas.toDataURL("image/jpeg", 1)
//         return url
//         debugBase64(url)
//     })
// }

// const debugBase64 = (base64URL) => {
//     const win = window.open();
//     win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
// }

const chartToUrl = () => {
    var url
    return html2canvas(document.getElementById('to-capture')).then(function (canvas) {
        url = canvas.toDataURL("image/jpeg", 1)
        return url
    })
}


async function downloadImage() {
    const imageSrcPromise = chartToUrl()
    imageSrcPromise.then(async function(imageSrc){
        const image = await fetch(imageSrc)
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)
      
        const link = document.createElement('a')
        link.href = imageURL
        link.download = 'My Results'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    })

  }

const initialSetUp = () => {
    console.log('here')
    document.getElementById('everything').innerHTML += 
    `
    <div style="padding: 40px;height:350px;">
    <div class="left" style="width:40%;padding-top:50px">
      <button class="btn back-button" onClick="window.location.href='https://www.shapingconnections.org/'">BACK</button>
      <h1 class="font1">How confident are you around tehcnology in general?</h1>
      <p class="font1">Answer <u><b>yes/no</b></u> as to whether you could confidently perform the following tasks.</p>
      <button class="btn get-started" onclick="window.scrollBy(0,450)"; >GET STARTED</button>
    </div>
    <div class="right" style="width:50%;padding-top:0px">
      <img class='top-img' src="img/Dawn_edited.png">
    </div>
  </div>


  <div id="questions"></div>

  <div style="background-color:#fffbee;width:100%;height:700px">
    <div class='left' style='width:50%;content-align:left;padding-left:50px'>
        <h2 style='font-size:50px' class='font1 header'>You have now completed our confidence in internet skills assessment tool.</h2>
        <br><br><br><br>
        <p style='font-size:10px'>
        The questions in our assessment tool were based on: Alexander J.A.M.
        </p>
        <p style='font-size:10px'>
        van Deursen, Ellen J. Helsper & Rebecca Eynon (2016) Development and
        </p>
        <p style='font-size:10px'>
        validation of the Internet Skills Scale (ISS), Information, Communication &
        </p>
        <p style='font-size:10px'>
        Society, 19:6, 804-823, DOI: 10.1080/1369118X.2015.1078834
        </p>
    </div>
        <div class='right' style='padding:40px'>
            <img class='category_images' src='img/Friend_my_age.png' alt='image'>
        </div>
    </div>

    <div style="background-color:#dcddde;width:100%;height:700px">
    <div class='left' style='width:50%;content-align:left;padding-left:50px'>
        <p class='font1 header'>Internet skills form a crucial part of digital inclusion to assist you with:</p>
        <p class='font1'>
        1. Everyday living: Using a search engine for research, emailing, banking, paying bills, reading news, accessing services (e.g. MyGov), making Zoom or other video calls.
        </p>
        <p class='font1'>
        2. Shopping and entertainment: Various forms of online shopping, consuming books/magazines/movies/TV online.
        </p>
        <p class='font1'>
        3. Social networking: Chatting on messenger apps, uploading content for friends and family.
        </p>
        <p class='font1'>
        4. Gaming: Playing standalone or connected/networked games online.
        </p>
        
    </div>
        <div class='right' style='padding:40px'>
            <img class='category_images' src='img/tanned_santa.png' alt='image'>
        </div>
        <div style='padding:400px'>
            <button class="btn see-result" onclick="window.scrollBy(0,700)">SEE MY RESULTS</button>
        </div>
    </div>


    <div class='left' style="width:60%; padding-left: 40px" id='to-capture'>
        <h1 class="font1" >Based on our assessment tool, your level of internet skills confidence looks like this:</h1>
        <div id='radar-container'>
        </div>
    </div>
    <div class='right' style="padding-top: 40px; padding-right: 100px">
        <img class='bottom-img' src="img/tool 1.png">
        <br><br>
        <div style='padding-left:50px'>
            <button onclick='downloadImage()' class='btn see-result'>DOWNLOAD MY RESULTS</button>
            <br><br>
            <button class="btn take-back" onClick="window.location.href='https://www.shapingconnections.org/'">LEARN MORE</button>
        </div>
    </div>

    `
}


const setUp = () => {

    initialSetUp()

    RadarChart.defaultConfig.color = function() {
        return "rgb(150, 183, 142)"
    };
    const initial_score = [5, 5, 5, 5, 5]
    updateChart(initial_score)


    // style questions
    for (i = 0; i < 5; i++){
        document.getElementById("questions").innerHTML +=
        `<div style="background-color:${backgroundColours[i]};width:100%;height:700px">

            <div class='${floatOrder[i%2]}' id='questions${i+1}' style='width:50%;content-align:${floatOrder[i%2]};padding-left:50px'>

             <h3 class='font1 header'>${data[0]['axes'][i]['axis']}</h3>

            </div>
            <div class='${floatOrder[(i+1)%2]}' style='padding:40px'>

                <img class='category_images' src='img/${imgSources[i]}' alt='image'>

            </div>
            
        </div>`

        for (j=0; j < 4; j++){
            document.getElementById(`questions${i+1}`).innerHTML +=
            `
            <span class='font1' style='display:inline-block;width:70%;height: 80px'>
                <b>${j+1}. ${questions[i][j]}<b>
                <p></p>
                <button class='btn B${i}' id='yes-button${i+1}${j+1}' onclick="onClickYes('${i+1}${j+1}')">YES</button>
                <button class='btn B${i}' id='no-button${i+1}${j+1}'onclick="onClickNo('${i+1}${j+1}')">NO</button> 
            </span>
            <br><br>
            `
            
        }

    }
}


window.onload = setUp()