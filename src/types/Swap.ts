export interface SwapEvent {
  baseTokenAmount: number
  baseTokenSymbol: string
  ethAmount: number
  expiration: string
  makerAddress: string
  makerAmount: string
  makerAmountFormatted: number
  makerSymbol: string
  makerToken: string
  nonce: string
  price: number
  takerAddress: string
  takerAmount: string
  takerAmountFormatted: string
  takerSymbol: string
  takerToken: string
  timestamp: number
  tokenAddress: string
  tokenAmount: number
  tokenSymbol: string
  transactionHash: string
}

export interface TradeQuery {
  days: number
  tokens?: string[]
}

export interface TradeVolumeByDay {
  date: string
  volume: number
}

export interface TradeVolumeByToken {
  token: string
  volume: number
}
