export class FormError {

  public readonly code: string;
  public readonly PL_message: string;
  public readonly ENG_message: string;

  constructor(code: string, PL_message: string, ENG_message: string) {
    this.code = code;
    this.PL_message = PL_message;
    this.ENG_message = ENG_message;
  }

  public getMessage(lng: FormErrorLanguages) {
    switch (lng) {
      case FormErrorLanguages.PL:
        return this.PL_message;
      case FormErrorLanguages.ENG:
        return this.ENG_message;
      default:
        throw new Error(`Wrong language: ${lng}`);
    }
  }

}

export class FormErrors {

  protected readonly errors: Map<string, FormError[]> = new Map();

  protected init(field: string): FormErrors {
    this.errors.set(field, []);
    return this;
  }

  public get(field: string): FormError[] {
    return this.errors.get(field);
  }

  public has(field: string): boolean {
    return this.errors.get(field).length != 0;
  }

  public set(error?: FormError) {
    if(error == null)
      return;
    let field = error.code.split(".")[0];
    this.errors.get(field).push(error);
  }

}

export enum FormErrorLanguages {
  PL, ENG
}

