export const MAX_LENGTH = 255
export const MAX_LENGTH_PHONE_NUMBER = 10
export const MAX_LENGTH_BUILDING = 100
export const MAX_LENGTH_LICENSE_MID = 2
export const MAX_LENGTH_LICENSE_LAST = 6
export const TYPE_TOKEN_FORGOT_LOGIN = 2
export const TYPE_TOKEN_REGISTER_EMAIL = 1
export const TYPE_BANNER_HOME = 1
export const TYPE_BANNER_SEARCH = 2
export const MAX_SIZE_IMAGE = 20000000
export const MAX_SIZE_IMAGE_MB = 20
export const FILE_IMAGE_TYPE = ['image/jpeg', 'image/jpg', 'image/png', 'image/PNG', 'image/JPG']
export const MAX_FILE = 10
export const UN_PERMISSION = 2
export const BUSINESS_TYPE_STATUS_UN_REQUIRED = 2
export const MAX_LENGTH_CONTENT = 1000
export const RECEPTION_SETTING = [
  {
    id: 1,
    name: '受け取る'
  },
  {
    id: 2,
    name: '受け取らない'
  }
]

export const BUSINESS_TYPE = [
  {
    id: 1,
    name: '法人'
  },
  {
    id: 2,
    name: '個人'
  }
]

export const ADV_DETAIL = [
  {
    id: 1,
    name: '利用中'
  },
  {
    id: 2,
    name: '利用しない'
  }
]

export const TEXT_NOTE_ADVERTISING = [
  {
    id: 1,
    text: '物件検索時の表示最上部に注目のオークションとして表示します。'
  },
  {
    id: 2,
    text: 'ホームトップの検索窓下部にファーストビューとして<br>注目のオークションとして表示します。'
  },
  {
    id: 3,
    text: 'ホームトップの検索窓下部のスライダー内部に<br>注目のオークションとして表示します。'
  },
  {
    id: 4,
    text: '物件検索結果の中段(6件目)に<br>注目のオークションとして表示します。'
  },
  {
    id: 5,
    text: '物件検索結果の中段(6件目)のスライダー内部に<br>注目のオークションとして表示します。'
  }
]

export const TYPE_PRICE_HOURLY = 2
export const MONTHLY_PLAN_ID_TOP = 1
export const PAGE_SIZE = 20
export const STATUS_ADVERTISING = [{ name: '空き<br>利用可' }, { name: '利用不可' }]

export const STATUS_BIDDING_SELLER = {
  AWAIT_WON_BIDDER: 1,
  AWAIT_WON_BIDDER_HAVE_FORWARD: 2,
  WON_BIDDER_ACCEPT: 3,
  WON_BIDDER_DELETE_SELLER: 4,
  AWAIT_FORWARDER: 5,
  AWAIT_FORWARDER_HAVE_FORWARD: 6,
  AWAIT_FORWARDER_ACCEPT: 7,
  FORWARDER_REJECT: 8,
  FORWARDER_DELETE_SELLER: 9,
  WON_BIDDER_DELETE_SYSTEM: 10
}

export const STATUS_FORWARDER_WHEN_SELLER_BAN = '繰り上げ取り消し'

export const STATUS_WON_SELLER = {
  [STATUS_BIDDING_SELLER.AWAIT_WON_BIDDER]: '落札承諾待ち',
  [STATUS_BIDDING_SELLER.AWAIT_WON_BIDDER_HAVE_FORWARD]: '落札承諾待ち(繰り上げ可)',
  [STATUS_BIDDING_SELLER.WON_BIDDER_ACCEPT]: '落札承諾済み',
  [STATUS_BIDDING_SELLER.WON_BIDDER_DELETE_SELLER]: '終了',
  [STATUS_BIDDING_SELLER.AWAIT_FORWARDER]: '繰り上げ承諾待ち',
  [STATUS_BIDDING_SELLER.AWAIT_FORWARDER_HAVE_FORWARD]: '繰り上げ承諾待ち(繰り上げ可)',
  [STATUS_BIDDING_SELLER.AWAIT_FORWARDER_ACCEPT]: '繰り上げ承諾済み',
  [STATUS_BIDDING_SELLER.FORWARDER_REJECT]: '終了',
  [STATUS_BIDDING_SELLER.FORWARDER_DELETE_SELLER]: '終了',
  [STATUS_BIDDING_SELLER.WON_BIDDER_DELETE_SYSTEM]: '終了'
}

export const STATUS_WON_BIDDER = {
  [STATUS_BIDDING_SELLER.AWAIT_WON_BIDDER]: '承諾が必要',
  [STATUS_BIDDING_SELLER.AWAIT_WON_BIDDER_HAVE_FORWARD]: '承諾が必要(繰り上げの可能性あり)',
  [STATUS_BIDDING_SELLER.WON_BIDDER_ACCEPT]: '承諾済み',
  [STATUS_BIDDING_SELLER.WON_BIDDER_DELETE_SELLER]: '落札取り消し',
  [STATUS_BIDDING_SELLER.AWAIT_FORWARDER]: '回答が必要',
  [STATUS_BIDDING_SELLER.AWAIT_FORWARDER_HAVE_FORWARD]: '回答が必要(繰り上げの可能性あり)',
  [STATUS_BIDDING_SELLER.AWAIT_FORWARDER_ACCEPT]: '繰り上げ承諾済み',
  [STATUS_BIDDING_SELLER.FORWARDER_REJECT]: '繰り上げ辞退済み',
  [STATUS_BIDDING_SELLER.FORWARDER_DELETE_SELLER]: '繰り上げ取り消し',
  [STATUS_BIDDING_SELLER.WON_BIDDER_DELETE_SYSTEM]: '落札取り消し'
}

export const MESSAGE_CASE = {
  AWAIT_WON_BIDDER: 1,
  SELLER_AWAIT_WON_BIDDER: 2,
  SELLER_HAVE_FORWARDER: 3,
  AWAIT_FORWARDER: 4,
  CHAT_GOOD: 5,
  CHAT_BAD: 6,
  BIDDER_SELLER_CARRY_FORWARD: 7,
  SELLER_NO_WON_BID: 8,
  FORWARDER_REJECT: 9,
  FORWARDER_SELLER_CARRY_FORWARD: 10,
  WON_BIDDER_DELETE_SYSTEM: 11
}

export const LIKE_STATUS = {
  UN_LIKE: 0,
  DISLIKE_LIKE: 2,
  LIKE: 1
}

export const LIKE_TEXT = {
  [LIKE_STATUS.UN_LIKE]: '未設定',
  [LIKE_STATUS.DISLIKE_LIKE]: '何らかの理由で未成立',
  [LIKE_STATUS.LIKE]: 'もう1度取引を望む'
}
