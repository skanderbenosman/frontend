import { Component, OnInit, AfterViewInit } from "@angular/core";
import Chart from "chart.js";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-card-line-chart",
  templateUrl: "./card-line-chart.component.html",
})
export class CardLineChartComponent implements OnInit {
  public loginuser: any = {};
  constructor(private userservice :UserService) {
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
    
  }
aa:number[]=[];
aa2:number[]=[];
  ngOnInit() {
   
   
    
  }
  ngAfterViewInit() {
    this.userservice.getStatUsers(this.loginuser.token).subscribe((response) => {this.aa=response
      this.userservice.getStatUsers2(this.loginuser.token).subscribe((response) => {this.aa2=response
      var config = {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: [this.aa[0], this.aa[1], this.aa[2], this.aa[3], this.aa[4], this.aa[5],this.aa[6],this.aa[7],this.aa[8],this.aa[9],this.aa[10],this.aa[11]],
              fill: false,
            },
            {
              label: new Date().getFullYear() - 1,
              fill: false,
              backgroundColor: "#fff",
              borderColor: "#fff",
              data: [this.aa2[0], this.aa2[1], this.aa2[2], this.aa2[3], this.aa2[4], this.aa2[5],this.aa2[6],this.aa2[7],this.aa2[8],this.aa2[9],this.aa2[10],this.aa2[11]],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Users Charts",
            fontColor: "white",
          },
          legend: {
            labels: {
              fontColor: "white",
            },
            align: "end",
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Month",
                  fontColor: "white",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(0, 0, 0, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                  fontColor: "white",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "rgba(255, 255, 255, 0.15)",
                  zeroLineColor: "rgba(33, 37, 41, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };
      let ctx: any = document.getElementById("line-chart") as HTMLCanvasElement;
      ctx = ctx.getContext("2d");
      new Chart(ctx, config);
    
    
    
    
    
    })});}
     
    
  
    
}
