require('dotenv').config()
const fs = require('fs')
const AgileCRMManager = require("./agilecrm.js")
const obj = new AgileCRMManager(process.env.DOMAIN, process.env.API_KEY, process.env.EMAIL)

let arr = []

const success = (data) => {
  arr.push(data)
}

const error = (data) => {
  fs.writeFileSync('error.json', JSON.stringify(data, null, 2))
}

obj.contactAPI.getContactsByPropertyFilter('type', 'SYSTEM', success, error)

fs.writeFileSync('contacts.json', JSON.stringify(arr, null, 2))