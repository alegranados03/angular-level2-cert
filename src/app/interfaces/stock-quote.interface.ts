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

export interface IStockCard {
  name: string;
  symbol: string;
  currentPrice: number;
  highPriceOfDay: number;
  lowPriceOfDay: number;
  openPriceOfDay: number;
  previousClosePrice: number;
}

export interface ISentiment {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number;
}
