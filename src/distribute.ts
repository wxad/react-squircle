interface RoundedRectangle {
  topLeftRadius: number;
  topRightRadius: number;
  bottomRightRadius: number;
  bottomLeftRadius: number;
  width: number;
  height: number;
}

interface NormalizedCorner {
  radius: number;
  roundingAndSmoothingBudget: number;
}

interface NormalizedCorners {
  topLeft: NormalizedCorner;
  topRight: NormalizedCorner;
  bottomLeft: NormalizedCorner;
  bottomRight: NormalizedCorner;
}

type Corner = keyof NormalizedCorners;

type Side = 'top' | 'left' | 'right' | 'bottom';

interface Adjacent {
  side: Side;
  corner: Corner;
}

export function distributeAndNormalize({
  topLeftRadius,
  topRightRadius,
  bottomRightRadius,
  bottomLeftRadius,
  width,
  height,
}: RoundedRectangle): NormalizedCorners {
  const roundingAndSmoothingBudgetMap: Record<Corner, number> = {
    topLeft: -1,
    topRight: -1,
    bottomLeft: -1,
    bottomRight: -1,
  };

  const radiusMap: Record<Corner, number> = {
    topLeft: topLeftRadius,
    topRight: topRightRadius,
    bottomLeft: bottomLeftRadius,
    bottomRight: bottomRightRadius,
  };

  Object.entries(radiusMap)
    // Let the bigger corners choose first
    .sort(([, radius1], [, radius2]) => {
      return radius2 - radius1;
    })
    .forEach(([cornerName, radius]) => {
      const corner = cornerName as Corner;
      const adjacents = adjacentsByCorner[corner];

      // Look at the 2 adjacent sides, figure out how much space we can have on both sides,
      // then take the smaller one
      const budget = Math.min(
        ...adjacents.map(adjacent => {
          const adjacentCornerRadius = radiusMap[adjacent.corner];
          if (radius === 0 && adjacentCornerRadius === 0) {
            return 0;
          }

          const adjacentCornerBudget =
            roundingAndSmoothingBudgetMap[adjacent.corner];

          const sideLength =
            adjacent.side === 'top' || adjacent.side === 'bottom'
              ? width
              : height;

          // If the adjacent corner's already been given the rounding and smoothing budget,
          // we'll just take the rest
          if (adjacentCornerBudget >= 0) {
            return sideLength - roundingAndSmoothingBudgetMap[adjacent.corner];
          } else {
            return (radius / (radius + adjacentCornerRadius)) * sideLength;
          }
        })
      );

      roundingAndSmoothingBudgetMap[corner] = budget;
      radiusMap[corner] = Math.min(radius, budget);
    });

  return {
    topLeft: {
      radius: radiusMap.topLeft,
      roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.topLeft,
    },
    topRight: {
      radius: radiusMap.topRight,
      roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.topRight,
    },
    bottomLeft: {
      radius: radiusMap.bottomLeft,
      roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.bottomLeft,
    },
    bottomRight: {
      radius: radiusMap.bottomRight,
      roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.bottomRight,
    },
  };
}

const adjacentsByCorner: Record<Corner, Array<Adjacent>> = {
  topLeft: [
    {
      corner: 'topRight',
      side: 'top',
    },
    {
      corner: 'bottomLeft',
      side: 'left',
    },
  ],
  topRight: [
    {
      corner: 'topLeft',
      side: 'top',
    },
    {
      corner: 'bottomRight',
      side: 'right',
    },
  ],
  bottomLeft: [
    {
      corner: 'bottomRight',
      side: 'bottom',
    },
    {
      corner: 'topLeft',
      side: 'left',
    },
  ],
  bottomRight: [
    {
      corner: 'bottomLeft',
      side: 'bottom',
    },
    {
      corner: 'topRight',
      side: 'right',
    },
  ],
};
