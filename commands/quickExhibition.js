export default (event) => {
  event.reply({
    type: 'text',
    text: '點擊下方按鈕',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'location',
            label: '傳送位置'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '人氣展覽',
            text: '人氣展覽'
          }
        }
      ]
    }
  })
}
