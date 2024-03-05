import { Employee } from './../grid/grid.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { TableDataService } from '../table-data.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent  {
  isScanning: boolean = false;
  qrResultString: string | null = null;
  torchEnabled: boolean = false;
  selectedDevice: MediaDeviceInfo | undefined;
  hasPermission: boolean | undefined;
  hasDevices: boolean | undefined;
  barcodeFormats=[BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13];
  showScanner: boolean = false;
  showResult:boolean=false;
  employee:any;

  openScanner(): void {
    this.showScanner = true;
  }
  constructor(private tableService:TableDataService) { }

  handleDeviceChange(device: MediaDeviceInfo | null): void {
    this.selectedDevice = device || undefined;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {

    if (devices && devices.length > 0) {
      this.selectedDevice = devices[0];
    }
  }

  onScanSuccess(result: string): void {

    console.log('Scan successful!', result);
    this.qrResultString = result;
    const id:number = +result
    this.tableService.getEmployeeById(id).subscribe(
      employee=>
      {
        console.log(employee);
        this.employee=employee;
        this.showResult=true;
      });
  }

  onScanError(error: Error): void {
    console.error('Scan error:', error);
  }

  clearResult(): void {

    this.qrResultString = null;
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  ScannerExit()
  {
    this.showScanner=false;
  }

  hideDialog()
  {
    this.showResult=false;
  }
}
