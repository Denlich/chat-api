export class HttpException extends Error {
  constructor(
    private readonly status: number,
    private readonly response: string
  ) {
    super();
    this.message = response;
  }

  getStatus(): number {
    return this.status;
  }

  getResponse(): string | object {
    return this.response;
  }
}
