var request = require('superagent')

// DATE format: YYMM, eg: 1510
function url (date) {
  return 'https://raw.githubusercontent.com/wxt2005/bangumi-list/master/json/bangumi-${DATE}.json'
    .replace('${DATE}', date)
}

function formatByDay (data) {
  var days = new Array(7)
  var animes = []
  for(var d in data) {
    animes.push(data[d])
  }
  for (var i = 0; i < days.length; i++) {
    days[i] = {
      weekday: i,
      animes: animes.filter(function (anime) {
        return anime.weekDayCN == i
      })
    }
  }
  return days
}

function fetch () {
  // class function
}

fetch.prototype = {
  constructor: fetch,
  get (date, format) {
    return new Promise(function (resolve, reject) {
      request
        .get(url(date))
        .end(function (err, res) {
          if (err) {
            reject(new Error(res.status))
          }
          else {
            if (res.status != 200) {
              return reject(new Error(res.status))
            }
            var result = JSON.parse(res.text)
            if (format) {
              result = formatByDay(result)
            }
            resolve(result)
          }
        })
    })
  }
}

module.exports = new fetch()
