import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let ticketType = await prisma.ticketType.findMany();
  if (!ticketType) {
    await prisma.ticketType.createMany({
      data: [
        {
          name: "Online",
          price: 10000,
          isRemote: true,
          includesHotel: false
        },
        {
          name: "Com hotel",
          price: 60000,
          isRemote: false,
          includesHotel: true
        },
        {
          name: "Sem hotel",
          price: 25000,
          isRemote: false,
          includesHotel: false
        },
      ]
    });
  }

  let activitiesDate = await prisma.activitiesDate.findMany();
  if (!activitiesDate) {
    await prisma.activitiesDate.createMany({
      data: [
        {
          date: dayjs().add(2, "days").toDate(),
          weekday: "Sabado",
        },
        {
          date: dayjs().add(3, "days").toDate(),
          weekday: "Domingo",
        },
      ]
    })
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
