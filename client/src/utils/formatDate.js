import timeago from 'timeago.js'

function locale(number, index) {
  return [
    ['방금', '곧'],
    ['%s초 전', '%s초 후'],
    ['1분 전', '1분 후'],
    ['%s분 전', '%s분 후'],
    ['1시간 전', '1시간 후'],
    ['%s시간 전', '%s시간 후'],
    ['하루 전', '1일 후'],
    ['%s일 전', '%s일 후'],
    ['1주일 전', '1주일 후'],
    ['%s주일 전', '%s주일 후'],
    ['1개월 전', '1개월 후'],
    ['%s개월 전', '%s개월 후'],
    ['1년 전', '1년 후'],
    ['%s년 전', '%s년 후'],
  ][index]
}

timeago.register('ko', locale)

const timeagoInstance = timeago()
export default date =>
  // timeago는 2018.01.04 형식이 아닌
  // 2018-01-04 형태만 바르게 인식
  timeagoInstance.format(date.replace(/[.]/g, '-'), 'ko')
