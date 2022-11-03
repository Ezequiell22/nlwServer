import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  const user = await prisma.user.create({
    data: {
      name: 'Ezequiel',
      email: 'fulano@gmail.com',
      avatarUrl : 'https://github.com/ezequiell22.png'
    }
  })

  //bolão
  const pool = await prisma.pool.create({
    data : {
      title :'exemplo',
      code : 'BOL123',
      ownerId : user.id,

      //cria registro na participants com ligação
      participants : {
        create : {
          userId : user.id
        }
      }
    }
  })

  await prisma.game.create({
    data : {
      date : '2022-11-02T12:00:00.602Z',
      firstTeamCountryCode : 'DE',
      secondTeamCountryCode : 'BR'
    }
  })

  await prisma.game.create({
    data : {
      date : '2022-11-03T12:00:00.602Z',
      firstTeamCountryCode : 'BR',
      secondTeamCountryCode : 'AR',

      guessess : {
        create : {
          firstTeamPoints : 2,
          secondTeamPoints : 1,
          participant : {
            connect : {
              userId_poolId : {
                userId : user.id,
                poolId : pool.id
              }
            }
          }
        }
      }
    }
  })
  
}

main()