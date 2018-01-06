export default (html, rightPath) => {
  // 간혹 src가 절대경로가 아니라 상대경로로 되어있는 경우가 있음
  // 이 경우 절대경로로 수정해줌
  // 또 lazyload 기능을 사용하기 때문에 src를 data-original에 있는 경로로
  // 바꾸어줘야 제대로 파일을 저장할 수 있음
  const fixedLazyLoadSrc = html.replace(
    /(src=")(\/addons\/lazyload\/img\/transparent.gif)"\s(data-original=")([http:|https:|.]{1,}[\w/.]{0,})"/g,
    '$1$4" $3$2"',
  )

  const haveRelativeSrc = fixedLazyLoadSrc.match(/(src="[.])/g)

  if (haveRelativeSrc) {
    return fixedLazyLoadSrc.replace(/(src="[.])/g, `src="${rightPath}`)
  }
  return fixedLazyLoadSrc
}
