export class ArgumentsList {
  page: number = 1;
  limit: number = 10;
  q: string;

  constructor(page: number = 1, limit: number = 10, q: string = null) {
    this.page = page;
    this.limit = limit;

    if (q) {
      this.q = q;
    }
  }
}
