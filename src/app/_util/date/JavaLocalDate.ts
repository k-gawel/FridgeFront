export interface JavaLocalDate {
  year: number;
  month: string;
  chronology: JavaChronology;
  monthValue: number;
  dayOfMonth: number;
  dayOfWeek: string;
  era: string;
  dayOfYear: number;
  leapYear: boolean;

  toString();

}

export interface JavaChronology {
  id: string;
  calendarType: string;
}

export class Chronology implements JavaChronology {

  calendarType: string;
  id: string;

  constructor(json?: JSON) {
    if(json == undefined) {

    } else {
      this.calendarType = json['calendarType'];
      this.id = json['id'];
    }
  }

}

export class LocalDate implements JavaLocalDate {

  year: number = null;
  month: string = null;
  chronology: Chronology = null;
  monthValue: number = null;
  dayOfMonth: number = null;
  dayOfWeek: string = null;
  era: string = null;
  dayOfYear: number = null;
  leapYear: boolean = null;


  public static monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  public static dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


  constructor(json?: JSON) {
    if(json == undefined) {
      let date = new Date();

      this.year = date.getFullYear();
      this.month = LocalDate.monthNames[date.getMonth()];
      this.monthValue = date.getMonth();
      this.dayOfMonth = date.getUTCDate();
      this.dayOfWeek = LocalDate.dayNames[date.getDay()];
    } else {

      this.year = json['year'];
      this.month = json['month'];
      this.chronology = new Chronology(json['chronology']);
      this.monthValue = json['monthValue'];
      this.dayOfMonth = json['dayOfMonth'];
      this.dayOfWeek = json['dayOfWeek'];
      this.era = json['era'];
      this.dayOfYear = json['dayOfYear'];
      this.leapYear = json['leapOfYear'];

    }
  }

  toString() {
    return this.dayOfMonth.toString() + "-" + this.monthValue.toString() + "-" + this.year.toString();
  }

}
