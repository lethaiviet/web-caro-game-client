import axios, { AxiosError } from "axios";

class ErrorHandlerService<T> {
  public errorMsg: T | undefined;

  public handleErrorMessage(e: Error | AxiosError) {
    if (axios.isAxiosError(e)) {
      switch (e.response?.status) {
        case 404:
          this.handle404Error(e);
          break;
        case 500:
          this.handle500Error(e);
          break;
        default:
          this.createErrorMsgByAxioError(e);
      }
    } else {
      this.createErrorMessage(e);
    }
  }

  private handle404Error(e: AxiosError) {
    this.createErrorMsgByAxioError(e);
    window.location.href = window.location.origin.toString() + "/404";
  }

  private handle500Error(e: AxiosError) {
    this.createErrorMsgByAxioError(e);
    window.location.href = window.location.origin.toString() + "/500";
  }

  private createErrorMsgByAxioError(e: AxiosError) {
    this.errorMsg = e.response?.data as T;
    console.error("createErrorMsgByAxioError");
    console.error(this.errorMsg);
  }

  private createErrorMessage(e: Error) {
    console.error(e.message);
  }
}

export default ErrorHandlerService;
