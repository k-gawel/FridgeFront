import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import Quagga from 'quagga';


@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css']
})
export class BarcodeScannerComponent implements OnInit {

  constructor() { }

  @Output() barcode = new EventEmitter<number>();
  @Output() close   = new EventEmitter<void>();

  quaggaConfig = {
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
    },
    decoder : {
      readers : ["ean_reader"]
    }
  };

  ngOnInit() {
    let that = this;

    Quagga.init({
      locate: true,
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#barcodeScannerContainers'),
        contraints: {
          width: 600,
          height: 200,
        }
      },
      decoder : {
        readers : ["ean_reader"]
      },
      locator: {

      }
    }, function(err) {
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();

      Quagga.onDetected((res) => {
        that.barcode.emit(res.codeResult.code);
        Quagga.stop();
      });

    });


  }




}
