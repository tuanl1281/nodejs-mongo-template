class ServiceError extends Error {
  constructor(code, message, details) {
    super();

    this.code = code;
    this.message = message;
    this.details = details;
  }
}

export default ServiceError;
