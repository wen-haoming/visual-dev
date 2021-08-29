export const inspectComponent = (e: HTMLElementEventMap['mousemove']) => {
  const targetDom = e.target as HTMLElement | null
  targetDom?.getAttribute('__p')
  if (targetDom) {
    targetDom.classList.add('__layer-dev-tool')
    previosDom = targetDom
  }
}
