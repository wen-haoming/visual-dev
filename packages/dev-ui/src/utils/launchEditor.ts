const EDITORS = {
  sublime: 'subl://open?url=file://{path}&line={line}&column={column}',
  textmate: 'txmt://open?url=file://{path}&line={line}&column={column}',
  emacs: 'emacs://open?url=file://{path}&line={line}&column={column}',
  macvim: 'mvim://open/?url=file://{path}&line={line}&column={column}',
  phpstorm: 'phpstorm://open?file={path}&line={line}&column={column}',
  webstorm: 'phpstorm://open?file={path}&line={line}&column={column}',
  idea: 'idea://open?file={path}&line={line}&column={column}',
  vscode: 'vscode://file/{path}:{line}:{column}',
  'vscode-insiders': 'vscode-insiders://file/{path}:{line}:{column}',
  atom: 'atom://core/open/file?filename={path}&line={line}&column={column}',
};

export type Editor = keyof typeof EDITORS;

export function launchEditor({
  editor,
  srcPath,
  line,
  column,
}: {
  editor: Editor;
  srcPath: string;
  line?: number | string;
  column?: number | string;
}): string {
  return EDITORS[editor].replace(/{(.*?)}/g, (_$, $1) => {
    if ($1 === 'path') {
      return srcPath;
    }
    if ($1 === 'line') {
      return line;
    }
    return column;
  });
}
