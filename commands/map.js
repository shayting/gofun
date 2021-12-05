import { exhibitionData } from '../data.js'

// 傳送展覽位置地圖
export default (event) => {
  const title = event.message.text.replace('map ', '')
  let address = ''
  let latitude = 0
  let longitude = 0

  for (let i = 0; i < exhibitionData.length; i++) {
    if (exhibitionData[i].title === title) {
      address = exhibitionData[i].showInfo[0].location
      latitude = exhibitionData[i].showInfo[0].latitude
      longitude = exhibitionData[i].showInfo[0].longitude
      break
    }
  }
  if (latitude != null && longitude != null) {
    event.reply({
      type: 'location',
      title: title,
      address: address,
      latitude: latitude,
      longitude: longitude
    })
  } else {
    event.reply('此活動無提供定位資訊')
  }
}
