export type WSPayload = LaunchEditorPayload;

export interface LaunchEditorPayload {
  type: 'launch-editor-payload';
  path: string;
}
