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
  await prisma.activitiesSpace.deleteMany();

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

  const activitiesDate1 = await prisma.activitiesDate.create({
    data:{
      date: dayjs().add(2, "days").toDate(),
      weekday: "Sabado",
    },
  });

  const activitiesDate2 = await prisma.activitiesDate.create({
    data:{
      date: dayjs().add(3, "days").toDate(),
      weekday: "Domingo",
    },
  });

  const activitiesSpace1 = await prisma.activitiesSpace.create({
    data:{
      name: "Auditório Principal",
    },
  });

  const activitiesSpace2 = await prisma.activitiesSpace.create({
    data:{
      name: "Auditório Lateral",
    },
  });

  const activitiesSpace3 = await prisma.activitiesSpace.create({
    data:{
      name: "Sala de Workshop",
    },
  });

  const activities = await prisma.activities.createMany({
    data:[
      {
        name: "Palestra A",
        capacity: 25,
        dateId: activitiesDate1.id,
        spaceId: activitiesSpace1.id,
        duration: 2,
        start: 9,
      },
      {
        name: "Palestra B",
        capacity: 25,
        dateId: activitiesDate1.id,
        spaceId: activitiesSpace1.id,
        duration: 2,
        start: 11,
      },
      {
        name: "Palestra C",
        capacity: 25,
        dateId: activitiesDate1.id,
        spaceId: activitiesSpace2.id,
        duration: 1,
        start: 9,
      },
      {
        name: "Palestra D",
        capacity: 25,
        dateId: activitiesDate1.id,
        spaceId: activitiesSpace2.id,
        duration: 1,
        start: 10,
      },
      {
        name: "Palestra E",
        capacity: 25,
        dateId: activitiesDate1.id,
        spaceId: activitiesSpace3.id,
        duration: 1,
        start: 9,
      },
      {
        name: "Palestra F",
        capacity: 25,
        dateId: activitiesDate1.id,
        spaceId: activitiesSpace3.id,
        duration: 2,
        start: 10,
      },
      {
        name: "Palestra G",
        capacity: 25,
        dateId: activitiesDate2.id,
        spaceId: activitiesSpace1.id,
        duration: 2,
        start: 9,
      },
      {
        name: "Palestra H",
        capacity: 25,
        dateId: activitiesDate2.id,
        spaceId: activitiesSpace2.id,
        duration: 1,
        start: 9,
      },
      {
        name: "Palestra I",
        capacity: 25,
        dateId: activitiesDate2.id,
        spaceId: activitiesSpace3.id,
        duration: 1,
        start: 9,
      },
    ]
  });

  console.log(event);
  console.log(newtypes);
  console.log(hotel1);
  console.log(hotel2);
  console.log(rooms1);
  console.log(rooms2);
  console.log(activitiesDate1);
  console.log(activitiesDate2);
  console.log(activitiesSpace1);
  console.log(activitiesSpace2);
  console.log(activitiesSpace3);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
