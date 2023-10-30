### 创建context:
```js
import { createContext } from "react";
export const ImageSizeContext = createContext("100");
```
### 使用context:
在任何一层组件中
```js
const imageSize = useContext(imageSizeContext);
```
### 提供context:
在某个层级提供，它以下的所有组件都能收到，深层层级可以覆盖，就像css的某个样式覆盖
```html
<ImageSizeContext.Provider value={imageSize}>
    <List />
</ImageSizeContext.Provider>
```

```js

```
