import * as shape from 'd3-shape';

export const getTabShape = (
  width: number,
  height: number,
  tabWidth: number,
  tabHeight: number,
) => {
  const left = shape
    .line()
    .x((d: { x: number; y: number }) => d.x)
    .y((d: { x: number; y: number }) => d.y)([
    { x: 0, y: 0 },
    { x: width + tabWidth, y: 0 },
  ]);

  const right = shape
    .line()
    .x((d: { x: number; y: number }) => d.x)
    .y((d: { x: number; y: number }) => d.y)([
    { x: width + tabWidth, y: 0 },
    { x: width * 2.1, y: 0 },
    { x: width * 2.1, y: height },
    { x: 0, y: height + 0 },
    { x: 0, y: 0 },
  ]);

  const tab = shape
    .line()
    .x((d: { x: number; y: number }) => d.x)
    .y((d: { x: number; y: number }) => d.y)
    .curve(shape.curveBasis)([
    {
      x: width,
      y: 0,
    },
    { x: width + 18, y: 6 },
    { x: width + 25, y: tabHeight - 12 },
    { x: width + tabWidth - 25, y: tabHeight - 12 },
    { x: width + tabWidth - 18, y: 6 },
    { x: width + tabWidth, y: 0 },
  ]);

  const d = `${left} ${tab} ${right}`;

  return d;
};
