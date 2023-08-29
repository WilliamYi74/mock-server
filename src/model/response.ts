class R<T> {
  public status: number;
  public results: T;
  public success: boolean;
  public constructor(status: number, results: T, success: boolean){
    this.status = status
    this.results = results
    this.success = success
  }
}
export default R