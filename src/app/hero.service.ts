// MVC 的 Model 层
import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';

import {Hero} from './hero';
// import {HEROES} from './mock-heroes';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

// 英雄Web API需要HTTP保存请求中的特殊标头。该标题位于。中httpOptions定义的常量中HeroService。
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  // 使用服务器上heroes资源的地址定义表单:base/:collectionName的heroesUrl。
  // 这里的base是发出请求的资源，collectionName是内存数据服务.ts中的heroes数据对象。
  private heroesUrl = 'api/heroes';  // URL to web api


  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }


  // 当前的HeroService.getHeroes()使用()函数的RxJS作为一个可观察到的返回一个模拟英雄数组。
  getHeroes(): Observable<Hero[]> {

    // this.http.get<Hero[]>(this.heroesUrl);
    // console.log(result);
    // return this.http.get<Hero[]>(this.heroesUrl).pipe(
    //   catchError(this.handleError<Hero[]>('getHeroes', []))
    // );
    // 从服务器获取数据  返回一个英雄数组
    return this.http.get<Hero[]>(this.heroesUrl);

    // 现在用该.pipe()方法扩展可观察结果并给它一个catchError()运算符。
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      // 请求操作写入log 日志
      tap(_ => this.log('fetched heroes 获取 heroes')),
      // catchError()操作员拦截Observable失败的操作。它将错误传递给错误处理程序，错误处理程序可以执行错误所需的操作。
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }


  // getHero(id: number): Observable<Hero> {
  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }
  /** GET : hero by id. Will 404 if id not found */
  /** GET: 获取英雄的id。将404如果没有找到id */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`; // 拼接得到 hero 的 url
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}， 获取 hero id=${this.heroesUrl}`)),
      catchError(this.handleError<Hero>('getHero id=${id}'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** POST: add a new hero to the server */
  /** POST: 向服务器添加一个新的hero */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      // tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }


  /** DELETE: delete the hero from the server */
  /** DELETE: 从服务器中删除hero */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }


  /** PUT: update the hero on the server */
  /** PUT: 更新 服务区上的 的这个 hero 数据 */
  updateHero(hero: Hero): Observable<any> {
    // URL: 请求的地址
    // 要更新的数据（在这种情况下修改的英雄）
    // 选项
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * 以下handleError()方法报告错误，然后返回一个无害的结果，以便应用程序继续工作。
   * Handle Http operation that failed. #处理失败的Http操作
   * Let the app continue. # 让应用程序继续。
   * @param operation - name of the operation that failed 失败操作的名称
   * @param result - optional value to return as the observable result 作为可观察结果返回
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // TODO： 将错误发送到远程日志记录服务器
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // TODO：更好的展示用户错误
      this.log(`${operation} failed: ${error.message}`);

      // TODO：Let the app keep running by returning an empty result.
      // TODO：返回一个空的结果让程序继续运行
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  // 继续注入MessageService。您将频繁地调用它，以至于将它封装在私有log()方法中。
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}


