export const parsePath = (
  path: string,
): { raw: string; filePath: string; column: number; line: number } => {
  // eslint-disable-next-line
  const [raw, filePath, line, column] = path.match(/(.*?)\:([\d]*?)\:([\d]*?)$/) || [];
  return {
    raw,
    filePath,
    column: Number(column),
    line: Number(line),
  };
};
