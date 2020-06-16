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