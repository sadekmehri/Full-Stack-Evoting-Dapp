import _ from 'lodash'

export const paginate = (items = [], currentPage = 1, pageSize = 6) => {
  const startIndex = (currentPage - 1) * pageSize

  return _(items)
    .orderBy('voteCount', ['desc'])
    .slice(startIndex)
    .take(pageSize)
    .value()
}
