import { exhibitionData } from '../data.js'
import { checkDate } from '../time.js'
import template from '../template/eventFlex.js'

export default async (event) => {
  const exhibitionFlex = JSON.parse(JSON.stringify(template))
  const onTimeData = []
  const popularData = []
  try {
  // 篩選正在進行中的展覽
    for (const exhibition of exhibitionData) {
      if (checkDate(exhibition.startDate) <= 0 && checkDate(exhibition.endDate) >= 0) {
        onTimeData.push(exhibition)
      }
    }
    // 篩選最熱門的五筆資料
    for (let i = 0; i < onTimeData.length; i++) {
      if (i < 5) {
        popularData.push(
          {
            Title: onTimeData[i].title,
            Start: onTimeData[i].startDate,
            End: onTimeData[i].endDate,
            Location: onTimeData[i].showInfo[0].locationName,
            Address: onTimeData[i].showInfo[0].location,
            Hitrate: onTimeData[i].hitRate
          }
        )
        popularData.sort((a, b) => b.Hitrate - a.Hitrate)
      } else {
        if (onTimeData[i].hitRate > popularData[4].Hitrate) {
          popularData.pop()
          popularData.push(
            {
              Title: onTimeData[i].title,
              Start: onTimeData[i].startDate,
              End: onTimeData[i].endDate,
              Location: onTimeData[i].showInfo[0].locationName,
              Address: onTimeData[i].showInfo[0].location,
              Hitrate: onTimeData[i].hitRate
            }
          )
          popularData.sort((a, b) => b.Hitrate - a.Hitrate)
        }
      }
    }
    for (let i = 0; i < popularData.length; i++) {
      console.log(popularData[i].Hitrate)
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
                text: popularData[i].Title,
                weight: 'bold',
                size: 'lg',
                wrap: true
              },
              {
                type: 'separator',
                color: '#EA754F',
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
                        text: `${popularData[i].Start} - ${popularData[i].End}`,
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
                        text: popularData[i].Location,
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 7
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
                        text: popularData[i].Address,
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 7
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
                text: '🔥 熱門活動🔥',
                size: 'xl',
                margin: 'none',
                color: '#ffffff',
                style: 'normal',
                align: 'center',
                contents: []
              }
            ],
            backgroundColor: '#EA754F'
          },
          action: {
            type: 'message',
            label: 'action',
            text: `map ${popularData[i].Title}`
          }
        }
      )
    }
    event.reply(exhibitionFlex)
  } catch (error) {
    console.log(error)
  }
}
