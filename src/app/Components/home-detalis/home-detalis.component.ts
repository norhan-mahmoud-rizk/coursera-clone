import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { HomeCard } from '../../Models/home-card';

@Component({
  selector: 'app-home-detalis',
  imports: [RouterModule],
  templateUrl: './home-detalis.component.html',
  styleUrl: './home-detalis.component.scss'
})
export class HomeDetalisComponent implements OnInit {
  productID!: number;
  getID!: HomeCard | undefined;
  constructor(
    private route: ActivatedRoute,
    private active: ActivatedRoute,
    private api: ApiService,) {}

  ngOnInit(): void {
    // Day4
    // this.productID=Number(this.active.snapshot.paramMap.get('id'))||0;

    this.active.paramMap.subscribe(par => {
      this.productID = Number(par.get('id')) || 0;
      //DAY6
      this.api.getByID(String(this.productID)).subscribe(data => this.getID = data)
    })

}}
