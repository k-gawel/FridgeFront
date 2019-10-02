export class ErrorCode {

  public static readonly NAME = {
    LENGTH: "name.length",
    BUSY: "name.alreadyInUse",
  };


  public static readonly EMAIL = {
    LENGTH: "email.length",
    BUSY: "email.alreadyInUse",
    FORMAT: "email.wrongFormat"
  };


  public static readonly PASSWORD = {
    MATCH: "passwords.notEqual",
    LENGTH: "password.length"
  };


  public static readonly PLACE = {
    NULL: "place.null",
    ACCESS: "place.access"
  };


  public static readonly CATEGORY = {
    NULL: "category.null",
    NOT_FINAL: "category.notFinal"
  };


  public static readonly DESCRIPTION = {
    LENGTH: "description.length"
  };


  public static readonly CAPACITY = {
    FORMAT: "capacity.wrongFormat"
  };


  public static readonly USER = {
    NULL: "user.null"
  };


  public static readonly CONTAINER = {
    NULL: "container.null"
  };


  public static readonly ITEM = {
    NULL: "item.null"
  };

}
