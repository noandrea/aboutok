import '../css/main.css'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const d = new Date()
document.querySelector('.month').innerHTML = month[d.getMonth()]
document.querySelector('.year').innerHTML = d.getFullYear()

document.querySelector('.years').innerHTML = (d.getFullYear() - 2006)

const storyChars = document.querySelector('.story').innerHTML.replace(/<[^>]+>/ig, '')
const charCountField = document.querySelector('.tot-count')
const charCount = storyChars.split(' ').filter((n) => { return n !== '' }).length - 1 // ignore the word "Me"
charCountField.innerHTML = charCount
