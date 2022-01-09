export const EDITORS = {
  sublime: 'subl://open?url=file://{path}&line={line}&column={column}',
  textmate: 'txmt://open?url=file://{path}&line={line}&column={column}',
  emacs: 'emacs://open?url=file://{path}&line={line}&column={column}',
  macvim: 'mvim://open/?url=file://{path}&line={line}&column={column}',
  phpstorm: 'phpstorm://open?file={path}&line={line}&column={column}',
  webstorm: 'webstorm://open?file={path}&line={line}&column={column}',
  idea: 'idea://open?file={path}&line={line}&column={column}',
  vscode: 'vscode://file/{path}:{line}:{column}',
  'vscode-insiders': 'vscode-insiders://file/{path}:{line}:{column}',
  atom: 'atom://core/open/file?filename={path}&line={line}&column={column}',
};

const openGithub = `https://github.com/wen-haoming/visual-dev/blob/master/demo{path}#L{line}`;

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
  console.log(EDITORS[editor]);
  return (window.isDemo ? openGithub : EDITORS[editor]).replace(
    /{(.*?)}/g,
    (_$: any, $1: any): string => {
      if ($1 === 'path') {
        return srcPath;
      }
      if ($1 === 'line') {
        return String(line);
      }
      return String(column);
    },
  );
}
