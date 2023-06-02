export function SortArrayByDescVersion<T = any>(arr: T[]) {
  arr.sort((a, b) => {
    const aVersion = a as string
    const bVersion = b as string
    if (aVersion && bVersion) {
      const aVersionNum = aVersion.split('.').map((num) => parseInt(num))
      const bVersionNum = bVersion.split('.').map((num) => parseInt(num))
      if (aVersionNum[0] > bVersionNum[0]) {
        return -1
      } else if (aVersionNum[0] < bVersionNum[0]) {
        return 1
      } else {
        if (aVersionNum[1] > bVersionNum[1]) {
          return -1
        } else if (aVersionNum[1] < bVersionNum[1]) {
          return 1
        } else {
          if (aVersionNum[2] > bVersionNum[2]) {
            return -1
          } else if (aVersionNum[2] < bVersionNum[2]) {
            return 1
          } else {
            return 0
          }
        }
      }
    } else {
      return 0
    }
  })
}
