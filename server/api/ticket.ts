import {
  asNexusMethod,
  extendType,
  idArg,
  inputObjectType,
  enumType,
  nonNull,
  objectType,
} from "nexus";
import { PrismaClient } from "@prisma/client";
import { GraphQLDate} from "graphql-iso-date";
const prisma = new PrismaClient();

export const gqlDate = asNexusMethod(GraphQLDate, "date");

export const ticketting = objectType({
  name: "TicketInfo",
  definition(t) {
    t.string("id");
    t.string("email"),
      t.string("ticketID"),
      t.string("message"),
      t.date("createDate");
  },
});

export const ticket = inputObjectType({
  name: "Ticket",
  definition(t) {
    t.string("email"),
      t.string("ticketID"),
      t.string("message"),
      t.date("createDate");
  },
});

export const ticketQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("TicketQuery", {
      type: "TicketInfo",
      resolve: async (): Promise<any> => {
        return await prisma.ticket.findMany({});
      },
    });
  },
});

export const ticketMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createTicket", {
      type: "TicketInfo",
      args: {
        ticketMe: nonNull(ticket),
      },
      resolve: async (
        _,
        { ticketMe: { email, message, ticketID } }: any
      ): Promise<any> => {
        return await prisma.ticket.create({
          data: {
            email,
            message,
            ticketID,
            createDate: new Date(),
          },
        });
      },
    });
    t.field("deleteTicket", {
      type: "TicketInfo",
      args: {
        id: nonNull(idArg()),
      },
      resolve: async (_, { id }): Promise<any> => {
        return await prisma.ticket.delete({ where: { id } });
      },
    });
  },
});
