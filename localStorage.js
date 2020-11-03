export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('mello')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('mello', serializedState)
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}
