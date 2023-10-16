// VARIABLES

class TimeLine {
    constructor(id, content, year, month, day, time) {
        this.id = id
        this.content = content
        this.year = year
        this.month = month
        this.day = day
        this.time = time
    }
}

function initialiseTimeLine(data, callback) {
    // const elH = document.querySelectorAll(".timeline li > div");
    // setEqualHeights(elH)
    createTimeLineCells(data, callback)
}

// SET EQUAL HEIGHTS
function setEqualHeights(el) {
    let counter = 0;
    for (let i = 0; i < el.length; i++) {
        const singleHeight = el[i].offsetHeight + 50;

        if (counter < singleHeight) {
            counter = singleHeight;
        }
    }

    for (let i = 0; i < el.length; i++) {
        el[i].style.height = `${counter}px`;
    }
}

function createTimeLineCells(data, callback) {
    const timeline = document.querySelector('.timeline-list')

    data.forEach(object => {
        let list = document.createElement('li')
        list.addEventListener('click', event => {
            event.stopPropagation()
            console.log("tapped event", object.year, object.content)
            callback(object)
        })

        let limitedContent = object.content.slice(0, 100); // Limit to 500 characters

        if (object.content.length > 100) {
            limitedContent += '...'; // Add ellipsis if content exceeds 500 characters
        }


        let html = `
        <div style="box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15); height: 200px">
            <span>
                <time style="padding: 0px; margin: 0px">${object.year}</time>
                <p style="padding: 0px; margin: 0px; font-size: 12px; color: gray">${object.day} - ${object.month} - ${object.year} - ${object.time}</p>
            </span>
            <br>

            ${limitedContent}
        </div>
        `
        list.innerHTML = html

        timeline.appendChild(list)
    })

    const closingListElement = document.createElement('li')
    timeline.appendChild(closingListElement)
    timeline.scrollLeft = (timeline.scrollWidth + timeline.clientWidth + 20);
}