# Arch

## 15

* Reconciler - 同步方式(stack)
* Renderer - Reconciler 后紧跟 Renderer，为线性同步执行，因其不可中断，变更过多时，会导致页面卡顿

`
Reconciler和Renderer是交替工作的，当第一个li在页面上已经变化后，第二个li再进入Reconciler
`

## 16

* Scheduler - requestIdleCallback polyfill，划定任务优先级
* Reconciler - 可以中断的循环过程
* Renderer - Reconciler 完毕后，统一交给 Renderer，Renderer 不可中断，故可保证页面变更不会片断化

![16的过程](./process16.png)
