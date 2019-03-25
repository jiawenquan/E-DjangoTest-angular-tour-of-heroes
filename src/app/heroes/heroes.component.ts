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


  heroes: Hero[];  // 声明一个空的  Hero实例集合


  // 构造传入从 HeroService 实例，作为单利类存储数据的类
  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    // 初始化 获取数据
    this.getHeroes();
  }


  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    // 当给定名称为非空白时，处理程序Hero从名称创建一个类似对象（它只缺少它id）并将其传递给services addHero()方法。
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
    // 当addHero成功保存，该subscribe回调接收新的英雄和它推入到heroes列表中显示。
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHero(hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}



