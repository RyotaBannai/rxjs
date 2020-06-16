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