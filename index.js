require('dotenv').config()
const fs = require('fs')
const AgileCRMManager = require("./agilecrm.js")
const obj = new AgileCRMManager(process.env.DOMAIN, process.env.API_KEY, process.env.EMAIL)
const convert = require('json-2-csv');
let arr = []
let status = false

obj.contactAPI.getContactsByPropertyFilter('Clicked Newsletter', 'True', success, error)

const success = (data) => {
  arr.push(data)
  status = true
}

const error = (data) => {
  console.error(data)
  status = false
}

if (!status) {
  convert.json2csv(arr, (err, csv) => {
    if (err) {
      throw err;
    }    
    fs.writeFileSync('clicked-newsletter.csv', csv)
  })
}