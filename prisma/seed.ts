import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.post.create({
    data: {
      title: 'Hello World',
      content: 'bob'
    }
  })
  await prisma.post.create({
    data: {
      title: 'Hello World2',
      content: 'bob2'
    }
  })
}

await main()
  .then(async () => {
    console.log('seeded')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('error')
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
