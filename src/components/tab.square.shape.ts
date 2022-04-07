import * as shape from 'd3-shape';

export const getSquareTabShape = (
  width: number,
  height: number,
  tabWidth: number,
  tabHeight: number
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

  const defaultOffset = 12;
  const tab = shape
    .line()
    .x((d: { x: number; y: number }) => d.x)
    .y((d: { x: number; y: number }) => d.y)
    .curve(shape.curveBasis)([
    {
      x: width + defaultOffset,
      y: 0,
    },
    { x: width + defaultOffset - 4, y: 0 },
    { x: width + defaultOffset + 7, y: 2 },
    { x: width + defaultOffset + 2, y: tabHeight - 12 },
    { x: width + defaultOffset + 40, y: tabHeight - 14 },
    { x: width - defaultOffset + 3 + tabWidth - 22, y: tabHeight - 12 },
    { x: width - defaultOffset + 3 + tabWidth - 6, y: tabHeight - 22 },
    { x: width - defaultOffset + 3 + tabWidth - 10, y: 3 },
    { x: width - defaultOffset + 2 + tabWidth, y: 0 },
  ]);

  const d = `${left} ${tab} ${right}`;

  return d;
};
