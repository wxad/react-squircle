import React, { forwardRef, useLayoutEffect, useRef } from 'react';

import { distributeAndNormalize } from './distribute';
import { getPathParamsForCorner, getSVGPathFromPathParams } from './draw';

export interface FigmaSquircleParams {
  radius?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomRightRadius?: number;
  bottomLeftRadius?: number;
  cornerSmoothing: number;
  width: number;
  height: number;
  preserveSmoothing?: boolean;
}

export function getSvgPath({
  radius = 0,
  topLeftRadius,
  topRightRadius,
  bottomRightRadius,
  bottomLeftRadius,
  cornerSmoothing,
  width,
  height,
  preserveSmoothing = false,
}: FigmaSquircleParams) {
  topLeftRadius = topLeftRadius ?? radius;
  topRightRadius = topRightRadius ?? radius;
  bottomLeftRadius = bottomLeftRadius ?? radius;
  bottomRightRadius = bottomRightRadius ?? radius;

  if (
    topLeftRadius === topRightRadius &&
    topRightRadius === bottomRightRadius &&
    bottomRightRadius === bottomLeftRadius &&
    bottomLeftRadius === topLeftRadius
  ) {
    const roundingAndSmoothingBudget = Math.min(width, height) / 2;
    const radius = Math.min(topLeftRadius, roundingAndSmoothingBudget);

    const pathParams = getPathParamsForCorner({
      radius,
      cornerSmoothing,
      preserveSmoothing,
      roundingAndSmoothingBudget,
    });

    return getSVGPathFromPathParams({
      width,
      height,
      topLeftPathParams: pathParams,
      topRightPathParams: pathParams,
      bottomLeftPathParams: pathParams,
      bottomRightPathParams: pathParams,
    });
  }

  const { topLeft, topRight, bottomLeft, bottomRight } = distributeAndNormalize(
    {
      topLeftRadius,
      topRightRadius,
      bottomRightRadius,
      bottomLeftRadius,
      width,
      height,
    }
  );

  return getSVGPathFromPathParams({
    width,
    height,
    topLeftPathParams: getPathParamsForCorner({
      cornerSmoothing,
      preserveSmoothing,
      radius: topLeft.radius,
      roundingAndSmoothingBudget: topLeft.roundingAndSmoothingBudget,
    }),
    topRightPathParams: getPathParamsForCorner({
      cornerSmoothing,
      preserveSmoothing,
      radius: topRight.radius,
      roundingAndSmoothingBudget: topRight.roundingAndSmoothingBudget,
    }),
    bottomRightPathParams: getPathParamsForCorner({
      cornerSmoothing,
      preserveSmoothing,
      radius: bottomRight.radius,
      roundingAndSmoothingBudget: bottomRight.roundingAndSmoothingBudget,
    }),
    bottomLeftPathParams: getPathParamsForCorner({
      cornerSmoothing,
      preserveSmoothing,
      radius: bottomLeft.radius,
      roundingAndSmoothingBudget: bottomLeft.roundingAndSmoothingBudget,
    }),
  });
}

export interface ISquircleProps {
  [key: string]: any;
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
  // 圆角平滑度，取值范围 0-1，默认为 0.8
  cornerSmoothing?: number;
  // preserveSmoothing 为 true 时，圆角平滑度不会随着圆角半径的增大而增大
  preserveSmoothing?: boolean;
}

const Squircle: React.ForwardRefExoticComponent<ISquircleProps &
  React.RefAttributes<HTMLElement>> = forwardRef(
  (
    {
      as = 'div',
      radius,
      topLeftRadius,
      topRightRadius,
      bottomRightRadius,
      bottomLeftRadius,
      cornerSmoothing = 0.8,
      preserveSmoothing = true,
      ...otherProps
    },
    ref
  ) => {
    const innerRef = useRef<HTMLElement>(null);
    const finalRef = ref || innerRef;
    const ratioRef = useRef({
      width: 0,
      height: 0,
    });
    const Component = as;

    const applyStyle = () => {
      if (!finalRef || !('current' in finalRef) || !finalRef.current) return;

      const key = `${ratioRef.current.width}-${ratioRef.current.height}-${radius}-${cornerSmoothing}`;

      if (!(window as any).squircle) {
        (window as any).squircle = {};
      }

      let path = '';

      if ((window as any).squircle[key]) {
        path = (window as any).squircle[key];
      } else {
        path = getSvgPath({
          width: ratioRef.current.width,
          height: ratioRef.current.height,
          radius,
          topLeftRadius,
          topRightRadius,
          bottomRightRadius,
          bottomLeftRadius,
          cornerSmoothing,
          preserveSmoothing,
        });
        (window as any).squircle[key] = path;
      }

      finalRef.current.style.clipPath = `path('${path}')`;
      finalRef.current.style.borderRadius = `${radius}px`;
    };

    useLayoutEffect(() => {
      const element = (finalRef as React.RefObject<HTMLElement>).current;
      if (!element) return;

      // @ts-ignore
      const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          ratioRef.current = {
            width,
            height,
          };
        }

        applyStyle();
      });

      observer.observe(element);
      return () => observer.disconnect();
    }, []);

    useLayoutEffect(() => {
      applyStyle();
    }, [
      radius,
      topLeftRadius,
      topRightRadius,
      bottomRightRadius,
      bottomLeftRadius,
      cornerSmoothing,
      preserveSmoothing,
    ]);

    return <Component ref={finalRef} {...otherProps} />;
  }
);

export default Squircle;
