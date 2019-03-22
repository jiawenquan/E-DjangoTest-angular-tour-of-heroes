// MVC 的 Model 层
import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {


  private heroesUrl = 'api/heroes';  // URL to web api
  const;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getHeroes(): Observable<Hero[]> {

    // this.http.get<Hero[]>(this.heroesUrl);
    // console.log(result);
    // return this.http.get<Hero[]>(this.heroesUrl).pipe(
    //   catchError(this.handleError<Hero[]>('getHeroes', []))
    // );

    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


  /**
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


}


