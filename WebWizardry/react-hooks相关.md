**组件重新渲染**：
- state发生变化
- 从父组件接收的props发生变化

当一个组件重新渲染时，React 会递归地重新渲染它的所有子组件。

## useState
**哪些是state?**
- 随着时间推移 保持不变？如此，便不是 state。
- 通过 props 从父组件传递？如此，便不是 state。
- 是否可以基于已存在于组件中的 state 或者 props 进行计算？如此，它肯定不是state！

## useMemo
- 每次重新渲染的时候能够缓存计算的结果
- React 将会在首次渲染时调用该函数；在之后的渲染中，如果 dependencies 没有发生变化，React 将直接返回相同值。否则，将会再次调用 calculateValue 并返回最新结果，然后缓存该结果以便下次重复使用。
- calculateValue：要缓存计算值的函数。它应该是一个没有任何参数的纯函数，并且可以返回任意类型。
- dependencies：所有在 calculateValue 函数中使用的响应式变量组成的数组。响应式变量包括 props、state 和所有你直接在组件中定义的变量和函数。

## useRef
- 你可以在重新渲染之间 存储信息（不像是普通对象，每次渲染都会重置）
- 改变它 不会触发重新渲染（不像是 state 变量，会触发重新渲染）
- 对于你的组件的每个副本来说，这些信息都是本地的（不像是外面的变量，是共享的）

## useCallback
- 多次渲染中缓存函数
- dependencies：有关是否更新 fn 的所有响应式值的一个列表


## useEffect
- 依赖：响应式值被**读取**、而不是被设置时
- 清理函数：每次重新执行 Effect 之前，React 都会调用清理函数；组件被卸载时，也会调用清理函数。
- 避免循环：
  在 React 的 `useEffect` 中读取和设置状态时，如果不小心处理不当，可能会引发循环更新的问题，导致无限渲染。为了避免这种情况，你可以采取以下方法：

  1. **使用函数式更新：**

     在 `useState` 中使用函数式更新，以确保状态更新不依赖于当前状态。这样可以避免在 `useEffect` 中更新状态导致无限渲染的问题。

     ```jsx
     const [count, setCount] = useState(0);

     useEffect(() => {
       setCount(prevCount => prevCount + 1);
     }, []);
     ```

  2. **使用条件判断：**

     在 `useEffect` 中使用条件判断，只在特定条件下更新状态。

     ```jsx
     const [data, setData] = useState(null);

     useEffect(() => {
       if (!data) {
         fetchData().then(result => {
           setData(result);
         });
       }
     }, [data]);
     ```

  3. **使用依赖数组为空：**

     将 `useEffect` 的依赖数组设置为空，这会使 `useEffect` 仅在组件挂载和卸载时运行一次，不会对状态的变化敏感。

     ```jsx
     const [value, setValue] = useState('');

     useEffect(() => {
       console.log('Component mounted');
       return () => {
         console.log('Component unmounted');
       };
     }, []);
     ```

  4. **限制条件：**

     在条件允许的情况下，只在必要时更新状态。避免在每次渲染中都更新状态，只有在确实需要时更新。

     ```jsx
     const [visible, setVisible] = useState(false);

     useEffect(() => {
       if (visible) {
         // 执行操作
       }
     }, [visible]);
     ```

  5. **使用额外的状态：**

     如果你发现需要在 `useEffect` 中更新状态，但又不想导致循环更新，可以考虑使用额外的状态来进行标记，从而避免重复更新。

     ```jsx
     const [loading, setLoading] = useState(true);
     const [data, setData] = useState(null);

     useEffect(() => {
       if (loading) {
         fetchData().then(result => {
           setData(result);
           setLoading(false);
         });
       }
     }, [loading]);
     ```
