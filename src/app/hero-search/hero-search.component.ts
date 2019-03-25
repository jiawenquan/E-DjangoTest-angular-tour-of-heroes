import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
// TODO : 这里未理解
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Hero} from '../hero';
import {stringify} from 'querystring';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {
  }

  // Push a search term into the observable stream.
  // 将搜索项推入可观察流。
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // 每次按键后等待300毫秒再考虑这个术语
      debounceTime(300),
      // ignore new term if same as previous term
      // 会确保只在过滤条件变化时才发送请求。
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      // 每次术语发生变化时，切换到新的可观察到的搜索
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
