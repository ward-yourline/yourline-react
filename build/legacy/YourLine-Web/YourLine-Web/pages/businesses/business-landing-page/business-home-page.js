function init() {

    // let mockData = []
    // for (i = 0; i < 20; i++) {
    //     let data = new TimeLine( `id${i}`, "2001", "Some random content Some random content Some random content Some random content Some random content")
    //     mockData.push(data)
    // }

    // initialiseTimeLine(mockData, callback)
    getTimeLineItems()
}

function callback(data) {
    console.log("callback called", data)
    openTimeLine(data)
}

function openTimeLine(timeline) {
    let url = `timeline-details.html`
    window.location.href = url;
}

function getTimeLineItems() {
    let userID = localStorage.getItem("user_id")
    console.log("userID found", userID)
    fetchTimeLineItems(userID)
    .then(data => {
        let items = data.map( item => {
          return new TimeLine(item.id, item.content, item.year, item.month, item.day, item.time)
        })
        initialiseTimeLine(data, callback)
    })
}