import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const getUser: object | null = await prisma.user.findUnique({
    where: {
      id: 1,
    },
    select: {
      email: true,
      name: true,
    },
  });
  const users = await prisma.user.findMany({
    select: {
      name: true,
      posts: {
        select: {
          title: true,
        },
      },
    },
  });
  const usersFields = await prisma.user.findMany({
    // Returns all user fields
    include: {
      posts: {
        select: {
          title: true,
        },
      },
    },
  });
  console.log(getUser);
  console.log(users);
  console.log(usersFields);
  //   await prisma.user.create({
  //     data: {
  //       name: 'Alice',
  //       email: 'alice@prisma.io',
  //       posts: {
  //         create: { title: 'Hello World' },
  //       },
  //       profile: {
  //         create: { bio: 'I like turtles' },
  //       },
  //     },
  //   });
  //   const allUsers = await prisma.user.findMany({
  //     include: {
  //       posts: true,
  //       profile: true,
  //     },
  //   });
  //   console.dir(allUsers, { depth: null });
  //   const post = await prisma.post.update({
  //     where: { id: 1 },
  //     data: { published: true },
  //   });
  //   console.log(post);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
