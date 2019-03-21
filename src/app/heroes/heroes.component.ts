// MVC 的Control 层
import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero'; // 引入 hero 类
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',  // 声明组件名
  templateUrl: './heroes.component.html', // 组件模板那页面
  styleUrls: ['./heroes.component.css']   // 组件样式
})
export class HeroesComponent implements OnInit {


  // hero: Hero = {
  //   id: 1,  // 写入id
  //   name: 'Windstorm', // 写入name
  // };


  // heroes = HEROES; // hero实例集
  heroes: Hero[];  // 声明一个空的  Hero实例集合

  selectedHero: Hero; // 用来存储选中的 hero 实例

  // 构造传入从 HeroService 实例，作为单利类存储数据的类
  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    // 初始化 获取数据
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  // 从Model 层 获取数据
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }
  getHeroes(): void {
    // this.heroService.getHeroes()
    //   .subscribe(heroes => this.heroes = heroes);
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}



