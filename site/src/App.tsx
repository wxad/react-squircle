import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Pane } from 'tweakpane';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Header from '@/components/Header';
import ArtDots from './components/ArtDots';

import Squircle from 'react-squircle-component';

const DemoImage = () => {
  const paneWrapper = useRef<HTMLDivElement>(null);
  const paneRef = useRef<Pane | null>(null);

  const [params, setParams] = useState({
    radius: 35,
    cornerSmoothing: 0.8,
  });

  useEffect(() => {
    paneRef.current = new Pane({
      container: paneWrapper.current,
    });

    paneRef.current.on('change', ev => {
      setParams(prev => ({
        ...prev,
        // @ts-ignore
        [ev.target.label]: ev.value,
      }));
    });

    paneRef.current.addBinding(params, 'radius', {
      min: 0,
      max: 50,
      step: 1,
    });
    paneRef.current.addBinding(params, 'cornerSmoothing', {
      min: 0,
      max: 1,
      step: 0.1,
    });

    return () => {
      if (paneRef.current) {
        paneRef.current.dispose();
      }
    };
  }, []);

  return (
    <>
      <div
        className="flex items-center justify-center relative bg-[length:40px_40px] border border-solid border-neutral-200 rounded-md overflow-auto pt-24 pb-10 px-10 text-center text-xs text-neutral-500 font-medium"
        style={{
          backgroundImage: 'url(grid.svg)',
        }}
      >
        <div ref={paneWrapper} className="absolute top-2 right-2" />
        <div className="mr-12">
          <img
            className="aspect-square"
            style={{
              width: 160,
              borderRadius: params.radius,
            }}
            alt="wechat"
            src="https://wxa.wxs.qq.com/wxad-design/yijie/wechat-460x0w.webp"
          />
          <div className="mt-1">
            <code className="px-1 py-[2px] bg-neutral-200 rounded-sm">
              border-radius
            </code>{' '}
            不连续
          </div>
        </div>
        <div>
          <Squircle
            as="img"
            radius={params.radius}
            className="aspect-square"
            style={{
              width: 160,
            }}
            cornerSmoothing={parseFloat(params.cornerSmoothing.toFixed(1))}
            alt="wechat"
            src="https://wxa.wxs.qq.com/wxad-design/yijie/wechat-460x0w.webp"
          />
          <div className="mt-1">
            <code className="px-1 py-[2px] bg-neutral-200 rounded-sm">
              clip-path
            </code>{' '}
            连续
          </div>
        </div>
      </div>
      <div className="mt-4 mb-9 px-4 py-3 bg-neutral-50 rounded border border-solid border-neutral-200">
        <SyntaxHighlighter
          style={atomOneLight}
          wrapLines
          customStyle={{ backgroundColor: 'transparent' }}
          className="highlight"
          language="tsx"
        >
          {`<Squircle
  as="img"
  radius={${params.radius}}
  cornerSmoothing={${parseFloat(params.cornerSmoothing.toFixed(1))}}
  className="w-[120px] aspect-square"
  src="https://wxa.wxs.qq.com/wxad-design/yijie/wechat-460x0w.webp"
  alt="wechat"
/>`}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

const DemoUI = () => {
  const x = useMotionValue(0);
  const width = useTransform(x, [0, 128], [80, 208], {
    clamp: false,
  });

  return (
    <>
      <div
        className="flex items-center justify-center relative bg-[length:40px_40px] border border-solid border-neutral-200 rounded-md overflow-auto py-16 text-center text-xs text-white font-medium"
        style={{
          backgroundImage: 'url(grid.svg)',
        }}
      >
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-400">
          拖拽改变尺寸
        </div>
        <div className="relative flex items-center w-[320px]">
          <motion.div
            style={{
              x,
            }}
            className="absolute top-0 left-20 w-8 h-full flex items-center justify-center cursor-col-resize touch-none"
            dragElastic={0.05}
            drag="x"
            dragConstraints={{ left: 0, right: 128 }}
          >
            <hr
              className="w-[1.5px] h-16 bg-neutral-300"
              style={{
                maskImage:
                  'linear-gradient(0deg, transparent, rgb(255, 255, 255) 16px, rgb(255, 255, 255) calc(100% - 16px), transparent)',
              }}
            />
          </motion.div>
          <Squircle
            radius={24}
            className="h-20 bg-neutral-400 bg-opacity-40 backdrop-blur"
          >
            <motion.div
              className="flex items-center justify-center h-full"
              style={{
                width,
              }}
            >
              <svg width="42" height="42" viewBox="0 0 53.560546875 52.421875">
                <g
                  fillRule="nonzero"
                  transform="scale(1,-1) translate(2,-52.421875)"
                >
                  <path
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.0"
                    d="
    M 3.82421875,26.2109375
    C 3.82421875,14.759765625 13.19140625,5.392578125 24.642578125,5.392578125
    C 32.35546875,5.392578125 39.1015625,9.625 42.732421875,15.919921875
    C 42.904296875,16.220703125 42.796875,16.521484375 42.560546875,16.650390625
    C 42.302734375,16.779296875 41.98046875,16.71484375 41.830078125,16.435546875
    C 38.392578125,10.462890625 31.990234375,6.4453125 24.642578125,6.4453125
    C 13.75,6.4453125 4.876953125,15.318359375 4.876953125,26.2109375
    C 4.876953125,37.125 13.75,45.998046875 24.642578125,45.998046875
    C 34.33203125,45.998046875 42.41015625,38.97265625 44.107421875,29.77734375
    L 39.66015625,29.77734375
    C 38.97265625,29.77734375 38.71484375,29.283203125 39.166015625,28.638671875
    L 43.61328125,22.279296875
    C 43.978515625,21.7421875 44.47265625,21.7421875 44.837890625,22.279296875
    L 49.28515625,28.638671875
    C 49.736328125,29.283203125 49.478515625,29.77734375 48.791015625,29.77734375
    L 45.16015625,29.77734375
    C 43.462890625,39.552734375 34.890625,47.029296875 24.642578125,47.029296875
    C 13.19140625,47.029296875 3.82421875,37.662109375 3.82421875,26.2109375
    Z
    M 18.046875,14.22265625
    L 31.1953125,14.22265625
    C 32.806640625,14.22265625 33.6015625,14.99609375 33.6015625,16.779296875
    L 33.6015625,26.962890625
    C 33.6015625,28.74609375 32.806640625,29.51953125 31.1953125,29.51953125
    L 19.142578125,29.51953125
    L 19.142578125,32.78515625
    C 19.142578125,36.39453125 21.333984375,38.822265625 24.642578125,38.822265625
    C 27.9296875,38.822265625 30.099609375,36.287109375 30.099609375,32.828125
    L 30.099609375,32.44140625
    C 30.099609375,32.076171875 30.400390625,31.904296875 30.63671875,31.904296875
    C 30.916015625,31.904296875 31.173828125,32.09765625 31.173828125,32.44140625
    L 31.173828125,32.849609375
    C 31.173828125,36.931640625 28.57421875,39.896484375 24.642578125,39.896484375
    C 20.689453125,39.896484375 18.046875,37.08203125 18.046875,32.849609375
    L 18.046875,29.51953125
    C 16.435546875,29.51953125 15.619140625,28.74609375 15.619140625,26.962890625
    L 15.619140625,16.779296875
    C 15.619140625,14.99609375 16.435546875,14.22265625 18.046875,14.22265625
    Z
"
                  />
                </g>
              </svg>
            </motion.div>
          </Squircle>
          <Squircle
            radius={24}
            className="flex-1 flex items-center justify-center ml-8 h-20 bg-neutral-400 bg-opacity-40 backdrop-blur"
          >
            <svg width="24" viewBox="0 0 32.01171875 65.849609375">
              <g
                fillRule="nonzero"
                transform="scale(1,-1) translate(0,-65.849609375)"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.0"
                  d="
    M 5.478515625,52.03515625
    L 26.533203125,52.03515625
    L 26.533203125,54.978515625
    C 26.533203125,56.93359375 25.544921875,57.75 23.76171875,57.75
    L 8.25,57.75
    C 6.466796875,57.75 5.478515625,56.93359375 5.478515625,54.978515625
    Z
    M 12.84765625,8.099609375
    L 19.1640625,8.099609375
    C 20.947265625,8.099609375 21.935546875,8.916015625 21.935546875,10.87109375
    L 21.935546875,35.857421875
    C 21.935546875,36.673828125 22.150390625,37.361328125 22.580078125,37.8984375
    L 25.65234375,41.830078125
    C 26.296875,42.66796875 26.533203125,43.419921875 26.533203125,44.666015625
    L 26.533203125,50.40234375
    L 5.478515625,50.40234375
    L 5.478515625,44.666015625
    C 5.478515625,43.419921875 5.71484375,42.66796875 6.359375,41.830078125
    L 9.431640625,37.8984375
    C 9.861328125,37.361328125 10.076171875,36.673828125 10.076171875,35.857421875
    L 10.076171875,10.87109375
    C 10.076171875,8.916015625 11.064453125,8.099609375 12.84765625,8.099609375
    Z
    M 16.02734375,23.33203125
    C 14.373046875,23.33203125 13.3203125,24.470703125 13.3203125,26.146484375
    L 13.3203125,33.47265625
    C 13.3203125,35.169921875 14.373046875,36.330078125 16.02734375,36.287109375
    C 17.638671875,36.265625 18.69140625,35.1484375 18.69140625,33.47265625
    L 18.69140625,26.146484375
    C 18.69140625,24.470703125 17.638671875,23.33203125 16.02734375,23.33203125
    Z
    M 16.02734375,24.685546875
    C 16.88671875,24.685546875 17.638671875,25.4375 17.638671875,26.33984375
    C 17.638671875,27.19921875 16.88671875,27.97265625 16.02734375,27.97265625
    C 15.125,27.97265625 14.373046875,27.19921875 14.373046875,26.33984375
    C 14.373046875,25.4375 15.125,24.685546875 16.02734375,24.685546875
    Z
"
                />
              </g>
            </svg>
          </Squircle>
        </div>
      </div>
      <div className="mt-4 mb-9 px-4 py-3 bg-neutral-50 rounded border border-solid border-neutral-200">
        <SyntaxHighlighter
          style={atomOneLight}
          wrapLines
          customStyle={{ backgroundColor: 'transparent' }}
          className="highlight"
          language="tsx"
        >
          {`<Squircle radius={24}>
  ...
</Squircle>`}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

const DemoBorder = () => {
  const paneWrapper = useRef<HTMLDivElement>(null);
  const paneRef = useRef<Pane | null>(null);

  const [params, setParams] = useState({
    radius: 35,
    cornerSmoothing: 0.8,
    border: 2,
  });

  useEffect(() => {
    paneRef.current = new Pane({
      container: paneWrapper.current,
    });

    paneRef.current.on('change', ev => {
      setParams(prev => ({
        ...prev,
        // @ts-ignore
        [ev.target.label]: ev.value,
      }));
    });

    paneRef.current.addBinding(params, 'border', {
      min: 0,
      max: 4,
      step: 1,
    });

    paneRef.current.addBinding(params, 'radius', {
      min: 0,
      max: 50,
      step: 1,
    });
    paneRef.current.addBinding(params, 'cornerSmoothing', {
      min: 0,
      max: 1,
      step: 0.1,
    });

    return () => {
      if (paneRef.current) {
        paneRef.current.dispose();
      }
    };
  }, []);

  return (
    <>
      <div
        className="flex items-center justify-center relative bg-[length:40px_40px] border border-solid border-neutral-200 rounded-md overflow-auto pt-32 py-16"
        style={{
          backgroundImage: 'url(grid.svg)',
        }}
      >
        <div ref={paneWrapper} className="absolute top-2 right-2" />
        <Squircle
          className="w-[350px] h-[300px] bg-white border-neutral-300 rounded-xl"
          radius={params.radius}
          cornerSmoothing={params.cornerSmoothing}
          border={2}
          borderColor="#d4d4d4"
        >
          <div className="p-6">
            <div className="mb-1 text-lg font-bold">曲率连续圆角组件</div>
            <div className="text-xs text-neutral-500">react-squircle</div>
            <div className="mt-44 text-xs text-neutral-500">
              crafted by Aragakey. & WeChat Ads Design.
            </div>
          </div>
        </Squircle>
      </div>
      <div className="mt-4 mb-9 px-4 py-3 bg-neutral-50 rounded border border-solid border-neutral-200">
        <SyntaxHighlighter
          style={atomOneLight}
          wrapLines
          customStyle={{ backgroundColor: 'transparent' }}
          className="highlight"
          language="tsx"
        >
          {`<Squircle radius={24}>
  ...
</Squircle>`}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

function App() {
  return (
    <div>
      <ArtDots />
      <div
        className={clsx(
          'flex flex-col min-h-screen',
          'border-x border-solid border-neutral-200'
        )}
      >
        <Header />
        <div className="relative z-1 mx-auto px-12 max-w-[1088px] w-3/4 min-w-[640px]">
          <div className="mt-8 mb-4 text-xl font-bold">安装使用</div>
          <div className="mb-2 px-4 py-3 bg-neutral-50 rounded border border-solid border-neutral-200">
            <SyntaxHighlighter
              style={atomOneLight}
              wrapLines
              customStyle={{ backgroundColor: 'transparent' }}
              className="highlight"
              language="bash"
            >
              pnpm install react-squircle-component
            </SyntaxHighlighter>
            <br />
            <SyntaxHighlighter
              style={atomOneLight}
              wrapLines
              customStyle={{ backgroundColor: 'transparent' }}
              className="highlight"
              language="tsx"
            >
              import Squircle from 'react-squircle-component';
            </SyntaxHighlighter>
          </div>
          {/* <div className="px-1 text-sm text-neutral-500">
            组件以{' '}
            <code className="px-1 py-[2px] bg-neutral-200 rounded-sm">
              clip-path
            </code>{' '}
            的方式实现。
            <p className="mt-1">1. 支持单方向圆角；</p>
            <p className="mt-1">2. 内置 `ResizeObserver` 监听组件尺寸变化。</p>
          </div> */}
          <div className="mt-8 mb-4 text-xl font-bold">对比演示</div>
          <DemoImage />
          <div className="mt-8 mb-4 text-xl font-bold">支持动态尺寸</div>
          <DemoUI />
          {/* <div className="mt-8 mb-4 text-xl font-bold">支持边框</div>
          <DemoBorder /> */}
          <div className="mt-8 mb-4 text-xl font-bold">参数类型</div>
          <div className="mb-9 px-4 py-3 bg-neutral-50 rounded border border-solid border-neutral-200">
            <SyntaxHighlighter
              style={atomOneLight}
              wrapLines
              customStyle={{ backgroundColor: 'transparent' }}
              className="highlight"
              language="tsx"
            >
              {`export interface ISquircleProps {
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
}`}
            </SyntaxHighlighter>
          </div>
        </div>
        <div className="relative z-1 mt-16 py-16 font-medium text-sm text-neutral-300 bg-white border-t border-solid border-neutral-200">
          <div className="text-center mx-auto px-48 max-w-1800">
            <div className="flex justify-center">
              <div className="relative mr-[1px] w-[30px] h-[30px] bg-neutral-300 rounded-b-full">
                <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-neutral-50 rounded-tl-full rounded-br-full" />
              </div>
              <div className="mr-[1px] relative w-[30px] h-[30px]">
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-neutral-300 rounded-tr-full rounded-bl-full" />
                <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-neutral-300 rounded-tl-full rounded-br-full" />
                <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-neutral-300 rounded-tr-full rounded-bl-full" />
                <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-neutral-300 rounded-tl-full rounded-br-full" />
              </div>
              <div className="w-[30px] h-[30px]">
                <div className="mb-[3px] h-2 bg-neutral-300" />
                <div className="mb-[3px] h-2 bg-neutral-300" />
                <div className="h-2 bg-neutral-300" />
              </div>
            </div>
            <div className="mt-2">aragakey@qq.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
