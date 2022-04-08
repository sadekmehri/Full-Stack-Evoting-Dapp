const transformStates = (states) => {
  return new Promise((resolve) => {
    resolve(
      states.map(({ id, name }) => {
        return { id, name }
      })
    )
  })
}

module.exports = {
  transformStates,
}
