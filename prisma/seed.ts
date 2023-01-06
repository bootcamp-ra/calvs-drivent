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

  await prisma.activitiesBooking.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.ticketType.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.activitiesDate.deleteMany();

  const newtypes = await prisma.ticketType.createMany({
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
      }
    ]
  });
  
  const hotel1 = await prisma.hotel.create({
    data: {
      name: "Grand Driven",
      image: "https://thumbs.dreamstime.com/b/hotel-13341433.jpg"
    }
  });

  const hotel2 = await prisma.hotel.create({
    data: {
      name: "Driven Palace",
      image: "https://thumbs.dreamstime.com/b/hotel-13341433.jpg"
    }
  });

  const rooms1 = await prisma.room.createMany({ 
    data:[
      {
        name: "101",
        capacity: 3,
        hotelId: hotel1.id
      },
      {
        name: "102",
        capacity: 3,
        hotelId: hotel1.id
      },
      {
        name: "103",
        capacity: 3,
        hotelId: hotel1.id
      },
      {
        name: "104",
        capacity: 3,
        hotelId: hotel1.id
      },
    ]
  });

  const rooms2 = await prisma.room.createMany({ 
    data:[
      {
        name: "101",
        capacity: 1,
        hotelId: hotel2.id
      },
      {
        name: "102",
        capacity: 1,
        hotelId: hotel2.id
      },
      {
        name: "103",
        capacity: 2,
        hotelId: hotel2.id
      },
      {
        name: "104",
        capacity: 2,
        hotelId: hotel2.id
      },
      {
        name: "105",
        capacity: 3,
        hotelId: hotel2.id
      },
      {
        name: "106",
        capacity: 3,
        hotelId: hotel2.id
      },
    ]
  });

  const activitiesDate = await prisma.activitiesDate.createMany({
    data:[
      {
        date: dayjs().add(2, "days").toDate(),
        weekday: "Sabado",
      },
      {
        date: dayjs().add(3, "days").toDate(),
        weekday: "Domingo",
      },
    ]
  });

  console.log(event);
  console.log(newtypes);
  console.log(hotel1);
  console.log(hotel2);
  console.log(rooms1);
  console.log(rooms2);
  console.log(activitiesDate);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
