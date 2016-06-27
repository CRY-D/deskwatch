
function getTimeDate() {
    "use strict";
    var d = new Date(),
        date = d.toTimeString(),
        day = d.toString().substring(0, 3);
    return (day + " " + date.substring(0, 5));
}

function getmnth() {
    "use strict";
    var smlMonths = ["Jan", "Feb", "Mar", "Apr",
                     "May", "Jun", "Jul", "Aug",
                     "Sep", "Oct", "Nov", "Dec"
                    ],
        i = 0,
        months = ["January", "February", "Mars", "April",
                  "May", "June", "July", "August",
                  "September", "October", "November", "December"
                 ],
        d = new Date(),
        day = d.getDate(),
        days = d.toDateString().substr(4, 3);
    for (i; i <= months.length - 1; i = i + 1) {
        if (months[i].substr(0, 3) === days.toString()) {
            return (months[i]);
        }
    }
}