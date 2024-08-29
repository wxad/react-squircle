# React Squircle - 曲率连续圆角组件

## 安装使用

```
pnpm install react-squircle-component

import Squircle from 'react-squircle-component';
```

## 使用示例

```tsx
<Squircle
  as="img"
  radius={35}
  cornerSmoothing={0.8}
  className="w-[120px] aspect-square"
  src="https://wxa.wxs.qq.com/wxad-design/yijie/wechat-460x0w.webp"
  alt="wechat"
/>
```

## 参数类型

```tsx
export interface ISquircleProps {
  // 默认为 div
  as?: React.ElementType;
  // 当不指定其他四个角的圆角半径时，使用这个值
  radius?: number;
  // 左上角圆角半径
  topLeftRadius?: number;
  // 右上角圆角半径
  topRightRadius?: number;
  // 右下角圆角半径
  bottomRightRadius?: number;
  // 左下角圆角半径
  bottomLeftRadius?: number;
  // 圆角平滑度，取值范围 0-1，默认为 0.6
  cornerSmoothing?: number;
  // preserveSmoothing 为 true 时，圆角平滑度不会随着圆角半径的增大而增大
  preserveSmoothing?: boolean;
}
```
