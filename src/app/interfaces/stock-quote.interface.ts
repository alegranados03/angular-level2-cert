export interface IstockQuote {
  c: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

export interface IstockSearchResponse {
  result: IStockSearchObject[];
}

export interface IStockSearchObject {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface IStockCard{}