import { exhibitionData } from '../data.js'
import { distance } from '../distance.js'
import { checkDate } from '../time.js'
import template from '../template/eventFlex.js'

export default async (event) => {
  const exhibitionFlex = JSON.parse(JSON.stringify(template))
  const myLat = event.message.latitude
  const myLon = event.message.longitude
  // 進行中的展覽
  const onTimeData = []
  // 距離最近的五個進行中展覽
  const minDistanceData = []
  try {
    // 篩選正在進行中的展覽
    for (const exhibition of exhibitionData) {
      if (checkDate(exhibition.startDate) <= 0 && checkDate(exhibition.endDate) >= 0) {
        onTimeData.push(exhibition)
      }
    }
    // 篩選最近五個
    for (let i = 0; i < onTimeData.length; i++) {
      const lat = onTimeData[i].showInfo[0].latitude
      const lon = onTimeData[i].showInfo[0].longitude
      if (i < 5) {
        minDistanceData.push(
          {
            Title: onTimeData[i].title,
            Start: onTimeData[i].startDate,
            End: onTimeData[i].endDate,
            Location: onTimeData[i].showInfo[0].locationName,
            Address: onTimeData[i].showInfo[0].location,
            Distance: distance(myLat, myLon, lat, lon, 'K')
          }
        )
        minDistanceData.sort((a, b) => a.Distance - b.Distance)
      } else {
        if (distance(myLat, myLon, lat, lon, 'K') < minDistanceData[4].Distance) {
          minDistanceData.pop()
          minDistanceData.push(
            {
              Title: onTimeData[i].title,
              Start: onTimeData[i].startDate,
              End: onTimeData[i].endDate,
              Website: onTimeData[i].webSale,
              Location: onTimeData[i].showInfo[0].locationName,
              Address: onTimeData[i].showInfo[0].location,
              Distance: distance(myLat, myLon, lat, lon, 'K')
            }
          )
          minDistanceData.sort((a, b) => a.Distance - b.Distance)
        }
      }
    }

    for (let i = 0; i < minDistanceData.length; i++) {
      exhibitionFlex.contents.contents.push(
        {
          type: 'bubble',
          size: 'mega',
          direction: 'ltr',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: minDistanceData[i].Title,
                weight: 'bold',
                wrap: true,
                size: 'lg'
              },
              {
                type: 'separator',
                color: '#09ED8A',
                margin: 'sm'
              },
              {
                type: 'box',
                layout: 'vertical',
                margin: 'lg',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'baseline',
                    contents: [
                      {
                        type: 'text',
                        text: `${minDistanceData[i].Start} - ${minDistanceData[i].End}`,
                        margin: 'none'
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: '地點：',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 2
                      },
                      {
                        type: 'text',
                        text: minDistanceData[i].Location,
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 8
                      }
                    ],
                    margin: 'md'
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: '地址：',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 2
                      },
                      {
                        type: 'text',
                        text: minDistanceData[i].Address,
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 8
                      }
                    ]
                  }
                ]
              }
            ]
          },
          footer: {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: `距離約${Math.round(minDistanceData[i].Distance)}公里`,
                size: 'sm',
                margin: 'sm',
                color: '#ffffff',
                style: 'normal'
              }
            ],
            backgroundColor: '#09ED8A'
          },
          action: {
            type: 'message',
            label: 'action',
            text: `map ${minDistanceData[i].Title}`
          }
        }
      )
    }
    event.reply(exhibitionFlex)
  } catch (error) {
    event.reply('找不到資料')
  }
}
