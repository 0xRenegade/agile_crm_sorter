require('dotenv').config()
const fs = require('fs')
const AgileCRMManager = require("./agilecrm.js")
const obj = new AgileCRMManager(process.env.DOMAIN, process.env.API_KEY, process.env.EMAIL)
const convert = require('json-2-csv')
let arr = []
let object = {}

const success = (dataArr) => {
  // console.log(dataArr)
  for (const data of dataArr) {

    object['First Name'] = data.properties[0]['value']
    object['Last Name'] = data.properties[1]['value']
    object['Email'] = data.properties[2]['value']
    object['Title'] = data.properties[3]['value']
    object['Phone'] = data.properties[4]['value']

    arr.push(object)
    object = {}
  }

  convert.json2csv(arr, (err, csv) => {
    if (err) {
      throw err;
    }    
    fs.writeFileSync('clicked-newsletter.csv', csv)
  })
}

const error = (data) => {
  console.error(data)
}

obj.contactAPI.getContactsByPropertyFilter('Clicked Newsletter', 'True', success, error)