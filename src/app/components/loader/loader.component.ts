import { Component, HostBinding, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @HostBinding('attr.role') role = 'div';
  isLoader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private _loaderService: LoaderService) { }
  ngOnInit(): void {
    this.isLoader$ = this._loaderService.isLoader$
  }
}
