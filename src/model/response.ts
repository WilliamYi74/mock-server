class R<T> {
  public status: number;
  public result: T;
  public success: boolean;
  public message: string;
  public code: number;
  public constructor(status: number, result: T, success: boolean, message = 'success',code = 200) {
    this.status = status
    this.result = result
    this.success = success
    this.message = message
    this.code = code
  }
}
export default R