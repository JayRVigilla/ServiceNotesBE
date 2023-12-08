const currentTime = () => new Date(Date.now()).toISOString()

const secToMilSec = (sec: number) => {
  return sec * 1000
}

const minutesToMilSec = (min: number) => {
  return secToMilSec(min * 60)
}

const hourToMilSec = (hour: number) => {
  return minutesToMilSec(hour * 60)
}

export {
  currentTime,
  secToMilSec,
  minutesToMilSec,
  hourToMilSec
}