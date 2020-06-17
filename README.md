### Obsrevable
- 初めに `new Observable` で observable を作成して、それから fire したい時に`observable.subscribe`みたいにして call する。
- `Pull` and `Push` are two different protocols that describe how a data Producer can communicate with a data Consumer.
- In Pull systems, the `Consumer(Function and Iterator)` determines when it receives data from the data Producer. 
- Contrary to popular claims, `Observables` are not like `EventEmitters` `nor are they like Promises for multiple values`. Observables may act like EventEmitters in some cases, namely when they are multicasted using RxJS Subjects, but usually they don't act like EventEmitters.
> Observables are like functions with zero arguments, but generalize those to allow multiple values.

> Subscribing to an Observable is analogous to calling a Function.
- Both functions and Observables are `lazy computations`. `If you don't call the function, the console.log('Hello') won't happen.` **As opposed to** `EventEmitters` which **share the side effects** and **have eager execution regardless of the existence of subscribers**, Observables have no shared execution and are lazy.
- `EventEmitter`: Nodejs に実装されている Event Loop で Event を発火するために使うもの。（require a highly functional knowledge of OS related concepts such as `threading` and `blocking/non-blocking` logic. これはJavascript Engineは大体そう。V8 とか SpiderMonkey など）普段使う Dom に対するイベントとハンドラは、JS Engine がうまくやってくれているためコンスーマーは何も意識しなくても、Observer Pattern を使っているようにイベントを使うことができる。
- `Observer Pattern`: Instead of using Event Loop, uses the system of `subscribers` subscribing to an `observable subject`.　In Web API, Dom is the `subject` in this Observer Pattern context. Any time the `observable subject` has an **update**, the `subscribers receive the the information` and handle the information.
- [reference - Node.js Event Emitters & Observer Pattern](https://medium.com/@brianjleeofcl/what-they-probably-didnt-teach-you-pt-1-node-js-event-emitters-observer-pattern-7dd02b67c061)
- Some people claim that `Observables` are asynchronous. **That is not true**.
> Observables are able to deliver values either synchronously or asynchronously.
- If you want to return value asynchronously, do something lke this:
```javascript
const foo = new Observable(subscriber => {
    setTimeout(() => {
        subscriber.next(300); // happens asynchronously
      }, 1000);
});
```
#### What is the difference between an Observable and a function? 
- => Observables can `"return" multiple values over time`, something which functions cannot.
#### Conclusion
- `func.call()` means `"give me one value synchronously"`
- `observable.subscribe()` means `"give me any amount of values, either synchronously or asynchronously"`
###
Observables are created using new Observable or a creation operator, are subscribed to with an Observer, execute to deliver `next / error / complete notifications` to `the Observer`, and their execution may be disposed. These four aspects are all encoded in an Observable instance, but some of these aspects are related to other types, like Observer and Subscription.
`Core Observable concerns`:
- Creating Observables
- Subscribing to Observables
- Executing the Observable
- Disposing Observables
> Observables can be created with new Observable. Most commonly, observables are created using creation functions, like of, from, interval, etc.

> Subscribing to an Observable is like calling a function, providing callbacks where the data will be delivered to.
- This is drastically different to event handler APIs like `addEventListener / removeEventListener`. With observable.subscribe, the given Observer is not registered as a listener in the Observable. `The Observable does not even maintain a list of attached Observers`.
- `A subscribe call is simply a way to start an "Observable execution" and deliver values or events to an Observer of that execution.`
- It is a good idea to wrap any code in subscribe with `try/catch block` that will deliver an `Error` notification if it catches an exception:
```javascript
import { Observable } from 'rxjs';
const observable = new Observable(function subscribe(subscriber) {
  try {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
  } catch (err) {
    subscriber.error(err); // delivers an error if it caught one
  }
});
```
- An `Observer` is `a consumer` of values delivered by an `Observable`. Observers are simply a set of callbacks, `one for each type of notification delivered by the Observable`: next, error, and complete.
> Observers are just objects with three callbacks, one for each type of notification that an Observable may deliver.
- how to right observers:
```javascript
const observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
}
```
- Internally in observable.subscribe, it will create an Observer object using `the first callback argument as the next handler`. All three types of callbacks may be provided as arguments:
```javascript
observable.subscribe(
  x => console.log('Observer got a next value: ' + x),
  err => console.error('Observer got an error: ' + err),
  () => console.log('Observer got a complete notification')
);
```
> `A Pipeable Operator` is a function that takes an Observable as its input and returns another Observable. It is a pure operation: the previous Observable stays unmodified.
- These include, `filter(...)`, and `mergeMap(...)`
- A `Pipeable Operator` is essentially a pure function which `takes one Observable as input` and `generates another Observable as output`. `Subscribing to the output Observable will also subscribe to the input Observable`.
### Categories of operators
- creation
- transformation
- filtering 
- joining
- multicasting 
- error handling 
- utility
- etc.
- [full details](https://rxjs-dev.firebaseapp.com/api)
### Subject, Subscription
- `Subscriptions` can also be put together, so that a call to an unsubscribe() of one Subscription may unsubscribe multiple Subscriptions. You can do this by "`adding`" one subscription into another.
- `Every Subject is an Observable`. Given a Subject, you can subscribe to it, providing an Observer, which will start receiving values normally. From the perspective of the Observer, it cannot tell whether the Observable execution is coming from `a plain unicast Observable` or `a Subject`.
- Subscribe の execution は先に subject を作成してからでもできるし、後から subject を作成することを想定して `const subject = new Subject<number>();` でsubjectを用意して、それに対して subject.subscribe({...}) で subscribe して `observable.subscribe(subject);` な感じで発火することもできる。
- `Subject variants`: There are officially three variants of RxJS subjects. They are:
    - `Behavior subject`
    - `Replay subject`
    - `Async subject`
- `Behavior subject`: temporarily stores the current data value of any observer declared before it.
- `Replay subject`: buffers more than the current value.
- `Async subject`: only execute after a complete method is called. this particular variation `emits the very current value` only when it sees the complete method call. (This behavior is similar the `last()` operator, )
- `Multicasted Observables`: A "`multicasted Observable`" passes notifications through a Subject which `may have many subscribers`, whereas a plain "`unicast Observable`" only sends notifications to `a single Observer`. Send a value to all observers at each time.
- The `connect()` method is important `to determine exactly when the shared Observable execution will start`. Because `connect()` does source.subscribe(subject) under the hood, connect() returns a `Subscription`, which you can `unsubscribe` from in order to cancel the shared Observable execution.
> `refCount` makes the multicasted Observable `automatically start executing when the first subscriber arrives`, and `stop executing when the last subscriber leaves`. 
- `source.pipe(multicast(subject), refCount());`のように第二引数に `refCount()` を渡すことで observer が到来した時点で自動的に `connect()` を初めて、全ての observer が unsubscribe した時点で自動的に multicast 自体を `unsubscribe()` する。
### Scheduler
- controls when `a subscription starts` and when `notifications are delivered`. It consists of three components:
    - A Scheduler is a `data structure`. It knows how to store and queue tasks based on priority or other criteria.
    - A Scheduler is an `execution context`. It denotes where and when the task is executed (e.g. immediately, or in another callback mechanism such as setTimeout or process.nextTick, or the animation frame).
    - A Scheduler `has a (virtual) clock`. It provides a notion of "time" by a getter method `now()` on the scheduler. Tasks being scheduled on a particular scheduler will adhere only to the time denoted by that clock.
- `subscribeOn`(asyncScheduler): observableの実行順序を操作する。
- `observeOn`: observer にデータを渡す条件をコントロールする。
### React's hooks and rxjs
- [Go find good tuto](https://www.youtube.com/watch?v=Urv82SGIu_0)