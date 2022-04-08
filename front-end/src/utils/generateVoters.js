import faker from 'faker'
import { generateAddress } from './generateAddress'

export const generateVoters = (nbrVoters = 10) => {
  const voters = []
  let voter = null

  for (let i = 0; i < nbrVoters; i++) {
    voter = {
      address: generateAddress(),
      age: faker.datatype.number({ min: 18, max: 100 }),
      state: faker.datatype.number({ min: 0, max: 23 }),
    }

    voters.push(voter)
  }

  return voters
}
