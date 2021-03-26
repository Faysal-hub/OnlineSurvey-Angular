export class OrderLine {
  constructor(
    public title: string,
    public imageUrl: string,
    public volume: number,
    public quantity: number,
    public totalVolume: number
  ) {}
}
