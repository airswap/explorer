export enum TokenKind {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
}

export interface TokenMetadata {
  address: string
  airswapUI: 'yes' | 'no'
  airswap_img_url: string
  banned: boolean
  cmc_id: string
  cmc_img_url: string
  cmc_url: string
  colors: string[]
  decimals: string
  name: string
  kind?: TokenKind
  security: boolean
  symbol: string
}
