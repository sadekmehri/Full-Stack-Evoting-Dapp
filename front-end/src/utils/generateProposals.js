import faker from 'faker'

export const generateProposals = (nbrProposals = 10) => {
  const proposals = []
  let proposal = null

  for (let i = 0; i < nbrProposals; i++) {
    proposal = {
      fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      description: faker.lorem.sentence(),
      image: faker.image.people(128, 128, true),
    }

    proposals.push(proposal)
  }

  return proposals
}
