import P5 from 'p5';

export const setPosition = (
  value: string,
  axis: string,
  p5: P5,
  bounds: any,
): number => {
  let std: number = 0;
  let boxStd: number = 0;

  if (axis === 'x') {
    std = p5.windowWidth;
    boxStd = bounds.w;
  } else if (axis === 'y') {
    std = p5.windowHeight;
    boxStd = bounds.h;
  }

  if (value === 'center') {
    // Pivot 가운데
    return (std - boxStd) / 2;
  }

  if (value.slice(-1) === '%') {
    // Pivot 가운데
    const percentage = Number(value.slice(0, -1)) / 100;
    if (percentage < 0) {
      return std * (1 + percentage) - boxStd / 2;
    } else {
      return std * percentage - boxStd / 2;
    }
  }

  if (value.slice(-2) === 'px') {
    // Pivot (0, 0)
    const px = Number(value.slice(0, -2));

    if (px < 0) {
      return std + px - boxStd;
    } else {
      return px;
    }
  }

  return Number(value);
};

export const setXPosition = (value: string, p5: P5, bounds: any) =>
  setPosition(value, 'x', p5, bounds);
export const setYPosition = (value: string, p5: P5, bounds: any) =>
  setPosition(value, 'y', p5, bounds);
