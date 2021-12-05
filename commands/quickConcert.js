export default (event) => {
  event.reply({
    type: 'text',
    text: '點擊下方按鈕',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'message',
            label: '依地區',
            text: '請輸入“＠”＋“縣市名”，例如：＠台北'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '熱門推薦',
            text: '推薦演唱會'
          }
        }
      ]
    }
  })
}
