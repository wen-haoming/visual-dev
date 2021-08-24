export const parseLaunchPath = (launchPath: string) => {
  const [path, column, row] = launchPath.split(':')

  return {
    path,
    column: Number(column),
    row: Number(row)
  }
}
