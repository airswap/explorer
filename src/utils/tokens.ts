import { TokenMetadata } from '../types/Tokens';

export function findTokens(searchString: string, tokens: TokenMetadata[]) {
  if (!searchString || searchString.length === 0) return tokens;

  // Searching address
  if (searchString.indexOf('0x') === 0 && searchString.length > 2) {
    return tokens.filter(token => token.address.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  // Search name and symbol
  return tokens.filter(
    token =>
      token.symbol.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
      token.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1,
  );
}
