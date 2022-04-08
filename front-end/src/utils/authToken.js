function getToken() {
  const token = localStorage.getItem('token')
  return JSON.parse(token)
}

function setToken(token = {}) {
  localStorage.setItem('token', JSON.stringify(token))
}

function clearToken() {
  localStorage.clear()
}

const authToken = {
  getToken,
  setToken,
  clearToken,
}

export default authToken
