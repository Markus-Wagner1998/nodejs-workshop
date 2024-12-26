export class WrongPlayerException extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
