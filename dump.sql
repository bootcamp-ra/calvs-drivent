--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: TicketStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TicketStatus" AS ENUM (
    'RESERVED',
    'PAID'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Activity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Activity" (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    place character varying(200) NOT NULL,
    "startDate" timestamp without time zone NOT NULL,
    "endDate" timestamp without time zone NOT NULL,
    "ticketTypeId" integer,
    capacity integer NOT NULL
);


--
-- Name: Activity_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Activity_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Activity_id_seq" OWNED BY public."Activity".id;


--
-- Name: Address; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Address" (
    id integer NOT NULL,
    cep character varying(255) NOT NULL,
    street character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    state character varying(255) NOT NULL,
    number character varying(255) NOT NULL,
    neighborhood character varying(255) NOT NULL,
    "addressDetail" character varying(255),
    "enrollmentId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Address_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Address_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Address_id_seq" OWNED BY public."Address".id;


--
-- Name: Booking; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Booking" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "roomId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Booking_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Booking_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Booking_id_seq" OWNED BY public."Booking".id;


--
-- Name: Enrollment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Enrollment" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    cpf character varying(255) NOT NULL,
    birthday timestamp(3) without time zone NOT NULL,
    phone character varying(255) NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Enrollment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Enrollment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Enrollment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Enrollment_id_seq" OWNED BY public."Enrollment".id;


--
-- Name: Event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Event" (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    "backgroundImageUrl" character varying(255) NOT NULL,
    "logoImageUrl" character varying(255) NOT NULL,
    "startsAt" timestamp(3) without time zone NOT NULL,
    "endsAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Event_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Event_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Event_id_seq" OWNED BY public."Event".id;


--
-- Name: Hotel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Hotel" (
    id integer NOT NULL,
    name text NOT NULL,
    image text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Hotel_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Hotel_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Hotel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Hotel_id_seq" OWNED BY public."Hotel".id;


--
-- Name: Payment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Payment" (
    id integer NOT NULL,
    "ticketId" integer NOT NULL,
    value integer NOT NULL,
    "cardIssuer" text NOT NULL,
    "cardLastDigits" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Payment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Payment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Payment_id_seq" OWNED BY public."Payment".id;


--
-- Name: Room; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Room" (
    id integer NOT NULL,
    name text NOT NULL,
    capacity integer NOT NULL,
    "hotelId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Room_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Room_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Room_id_seq" OWNED BY public."Room".id;


--
-- Name: Session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Session" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Session_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Session_id_seq" OWNED BY public."Session".id;


--
-- Name: Ticket; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Ticket" (
    id integer NOT NULL,
    "ticketTypeId" integer NOT NULL,
    "enrollmentId" integer NOT NULL,
    status public."TicketStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: TicketActivity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TicketActivity" (
    id integer NOT NULL,
    "ticketId" integer,
    "activityId" integer
);


--
-- Name: TicketActivity_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."TicketActivity_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: TicketActivity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."TicketActivity_id_seq" OWNED BY public."TicketActivity".id;


--
-- Name: TicketType; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TicketType" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price integer NOT NULL,
    "isRemote" boolean NOT NULL,
    "includesHotel" boolean NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: TicketType_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."TicketType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: TicketType_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."TicketType_id_seq" OWNED BY public."TicketType".id;


--
-- Name: Ticket_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Ticket_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Ticket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Ticket_id_seq" OWNED BY public."Ticket".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: Activity id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Activity" ALTER COLUMN id SET DEFAULT nextval('public."Activity_id_seq"'::regclass);


--
-- Name: Address id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Address" ALTER COLUMN id SET DEFAULT nextval('public."Address_id_seq"'::regclass);


--
-- Name: Booking id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking" ALTER COLUMN id SET DEFAULT nextval('public."Booking_id_seq"'::regclass);


--
-- Name: Enrollment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Enrollment" ALTER COLUMN id SET DEFAULT nextval('public."Enrollment_id_seq"'::regclass);


--
-- Name: Event id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Event" ALTER COLUMN id SET DEFAULT nextval('public."Event_id_seq"'::regclass);


--
-- Name: Hotel id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Hotel" ALTER COLUMN id SET DEFAULT nextval('public."Hotel_id_seq"'::regclass);


--
-- Name: Payment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment" ALTER COLUMN id SET DEFAULT nextval('public."Payment_id_seq"'::regclass);


--
-- Name: Room id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Room" ALTER COLUMN id SET DEFAULT nextval('public."Room_id_seq"'::regclass);


--
-- Name: Session id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session" ALTER COLUMN id SET DEFAULT nextval('public."Session_id_seq"'::regclass);


--
-- Name: Ticket id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ticket" ALTER COLUMN id SET DEFAULT nextval('public."Ticket_id_seq"'::regclass);


--
-- Name: TicketActivity id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TicketActivity" ALTER COLUMN id SET DEFAULT nextval('public."TicketActivity_id_seq"'::regclass);


--
-- Name: TicketType id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TicketType" ALTER COLUMN id SET DEFAULT nextval('public."TicketType_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Activity; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Activity" VALUES (1, 'Palestra', 'Auditório', '2022-01-03 08:00:00', '2022-01-03 10:00:00', 3, 10);
INSERT INTO public."Activity" VALUES (2, 'Jogo', 'Mineirao', '2022-01-03 09:00:00', '2022-01-03 11:00:00', 3, 100);
INSERT INTO public."Activity" VALUES (3, 'Show', 'Mineirao', '2022-01-03 11:00:00', '2022-01-03 16:00:00', 3, 100);
INSERT INTO public."Activity" VALUES (4, 'Show', 'Mineirao', '2022-01-04 11:00:00', '2022-01-04 16:00:00', 3, 100);
INSERT INTO public."Activity" VALUES (5, 'Corrida', 'Lagoa', '2022-01-04 09:00:00', '2022-01-04 12:00:00', 3, 1000);
INSERT INTO public."Activity" VALUES (6, 'Lanche', 'Hotel', '2022-01-04 09:00:00', '2022-01-04 11:00:00', 3, 20);


--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Address" VALUES (1, '30720-410', 'Rua Humaitá', 'Belo Horizonte', 'MG', '405', 'Padre Eustáquio', '201', 1, '2022-12-16 18:46:32.846', '2022-12-23 19:50:19.752');
INSERT INTO public."Address" VALUES (2, '30720-410', 'Rua Humaitá', 'Belo Horizonte', 'MG', '202', 'Padre Eustáquio', '404', 2, '2022-12-23 20:14:46.131', '2022-12-23 20:14:46.132');
INSERT INTO public."Address" VALUES (3, '30720-410', 'Rua Humaitá', 'Belo Horizonte', 'MG', '26', 'Padre Eustáquio', '404', 3, '2022-12-23 20:47:18.963', '2022-12-23 20:47:58.574');
INSERT INTO public."Address" VALUES (4, '30720-410', 'Rua Humaitá', 'Belo Horizonte', 'MG', '26', 'Padre Eustáquio', '', 4, '2023-01-09 22:32:17.74', '2023-01-09 22:32:17.741');
INSERT INTO public."Address" VALUES (5, '30720-410', 'Rua Humaitá', 'Belo Horizonte', 'MG', '26', 'Padre Eustáquio', '404', 5, '2023-01-12 15:09:39.269', '2023-01-12 15:09:39.27');


--
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Booking" VALUES (1, 1, 2, '2022-12-23 12:32:36.134', '2022-12-23 12:32:36.135');
INSERT INTO public."Booking" VALUES (2, 1, 2, '2022-12-23 12:33:02.003', '2022-12-23 12:33:02.003');
INSERT INTO public."Booking" VALUES (3, 1, 1, '2022-12-23 13:07:19.008', '2022-12-23 13:07:19.008');
INSERT INTO public."Booking" VALUES (4, 1, 3, '2022-12-23 13:09:19.859', '2022-12-23 13:09:19.859');
INSERT INTO public."Booking" VALUES (5, 1, 4, '2022-12-23 13:27:02.894', '2022-12-23 13:27:02.895');
INSERT INTO public."Booking" VALUES (6, 1, 1, '2022-12-23 19:51:57.331', '2022-12-23 19:51:57.331');
INSERT INTO public."Booking" VALUES (7, 2, 1, '2022-12-23 20:17:19.362', '2022-12-23 20:17:19.363');
INSERT INTO public."Booking" VALUES (8, 3, 4, '2022-12-23 20:50:36.617', '2022-12-23 20:50:36.618');
INSERT INTO public."Booking" VALUES (9, 4, 6, '2023-01-09 22:32:48.889', '2023-01-09 22:32:48.889');
INSERT INTO public."Booking" VALUES (10, 5, 10, '2023-01-12 15:10:11.351', '2023-01-12 15:10:11.351');


--
-- Data for Name: Enrollment; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Enrollment" VALUES (1, 'Rodrigo Vieira Fonseca', '06298512632', '1999-07-09 03:00:00', '(31) 98135-4845', 1, '2022-12-16 18:46:32.825', '2022-12-23 19:50:19.734');
INSERT INTO public."Enrollment" VALUES (2, 'Rodrigo Vieira', '06298512632', '2001-12-23 02:00:00', '(31) 99192-9154', 2, '2022-12-23 20:14:46.114', '2022-12-23 20:14:46.115');
INSERT INTO public."Enrollment" VALUES (3, 'Rodrigo Vieira', '06298512632', '1993-12-23 02:00:00', '(31) 99192-5884', 3, '2022-12-23 20:47:18.944', '2022-12-23 20:47:58.569');
INSERT INTO public."Enrollment" VALUES (4, 'Teste Teste', '06298512632', '1993-01-15 02:00:00', '(31) 99999-9999', 4, '2023-01-09 22:32:17.734', '2023-01-09 22:32:17.735');
INSERT INTO public."Enrollment" VALUES (5, 'RODRIGO VIEIRA FONSECA', '06298512632', '1999-01-12 02:00:00', '(31) 99192-2545', 5, '2023-01-12 15:09:39.257', '2023-01-12 15:09:39.258');


--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Event" VALUES (1, 'Driven.t', 'linear-gradient(to right, #FA4098, #FFD77F)', 'https://files.driveneducation.com.br/images/logo-rounded.png', '2022-12-16 17:06:40.717', '2024-01-06 17:06:40.717', '2022-12-16 17:06:40.719', '2022-12-16 17:06:40.72');


--
-- Data for Name: Hotel; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Hotel" VALUES (1, 'Hotel Raimundo Nonato', 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg', '2022-12-22 00:00:00', '2022-12-22 00:00:00');
INSERT INTO public."Hotel" VALUES (2, 'Hotel João da Silva', 'https://media-cdn.tripadvisor.com/media/photo-s/25/04/93/1e/blossom-hotel-houston.jpg', '2022-12-22 00:00:00', '2022-12-22 00:00:00');


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Payment" VALUES (14, 8, 22000, 'visa', '5543', '2022-12-21 17:21:05.67', '2022-12-21 17:21:05.671');
INSERT INTO public."Payment" VALUES (15, 9, 22000, 'visa', '8458', '2022-12-23 20:16:18.188', '2022-12-23 20:16:18.189');
INSERT INTO public."Payment" VALUES (16, 10, 22000, 'visa', '4884', '2022-12-23 20:49:12.463', '2022-12-23 20:49:12.463');
INSERT INTO public."Payment" VALUES (17, 11, 22000, 'visa', '4848', '2023-01-09 22:32:39.248', '2023-01-09 22:32:39.248');
INSERT INTO public."Payment" VALUES (18, 12, 22000, 'visa', '2342', '2023-01-12 15:10:03.505', '2023-01-12 15:10:03.506');


--
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Room" VALUES (1, '101', 3, 1, '2022-12-22 00:00:00', '2022-12-22 00:00:00');
INSERT INTO public."Room" VALUES (2, '102', 2, 1, '2022-12-22 00:00:00', '2022-12-22 00:00:00');
INSERT INTO public."Room" VALUES (3, '103', 1, 1, '2022-12-22 00:00:00', '2022-12-22 00:00:00');
INSERT INTO public."Room" VALUES (4, '105', 2, 1, '2022-12-22 00:00:00', '2022-12-22 00:00:00');
INSERT INTO public."Room" VALUES (5, '101', 3, 2, '2022-12-22 00:00:00', '2022-12-22 00:00:00');
INSERT INTO public."Room" VALUES (6, '102', 1, 2, '2022-12-22 00:00:00', '2022-12-22 00:00:00');
INSERT INTO public."Room" VALUES (7, '103', 2, 2, '2022-12-22 00:00:00', '2022-12-22 00:00:00');
INSERT INTO public."Room" VALUES (8, '201', 2, 2, '2022-12-22 00:00:00', '2022-12-22 00:00:00');
INSERT INTO public."Room" VALUES (9, '202', 2, 2, '2022-12-22 00:00:00', '2022-12-22 00:00:00');
INSERT INTO public."Room" VALUES (10, '203', 2, 2, '2022-12-22 00:00:00', '2022-12-22 00:00:00');
INSERT INTO public."Room" VALUES (11, '204', 2, 2, '2022-12-22 00:00:00', '2022-12-22 00:00:00');


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Session" VALUES (1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTIxMjM4Nn0.Zj48-68lNdL-SG1gmwhsXc0Ej5axWpk6h1PFZiA7SEw', '2022-12-16 17:39:46.488', '2022-12-16 17:39:46.489');
INSERT INTO public."Session" VALUES (2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTIxOTkzMn0.PNe_dkcsqyedzogFexkVVnvbUgdCZNldUxzeE5JqsIg', '2022-12-16 19:45:32.628', '2022-12-16 19:45:32.629');
INSERT INTO public."Session" VALUES (3, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTIyMzIyNX0.NSC-HDcpma5eOaY2Ea47fby1a8SLyqo8JYDmxVS0smw', '2022-12-16 20:40:25.085', '2022-12-16 20:40:25.087');
INSERT INTO public."Session" VALUES (4, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTQ0OTMwOX0.xLzyfjCn0-Hw-j76BrKxH56RSFh-P7uqlsfHgD0Kz8s', '2022-12-19 11:28:29.205', '2022-12-19 11:28:29.206');
INSERT INTO public."Session" VALUES (5, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTQ1MDU0MH0.a3HwecKgVBnE2HOPMIgAl9SHVanRunGooHbYDlWQi0Y', '2022-12-19 11:49:00.735', '2022-12-19 11:49:00.736');
INSERT INTO public."Session" VALUES (6, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTQ2MDkwNH0.La_0DAWdQEzY708x89UJz9gzrcK7Bqx16RZLZybIVgM', '2022-12-19 14:41:44.14', '2022-12-19 14:41:44.141');
INSERT INTO public."Session" VALUES (7, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTQ3MjQ4OX0.u1_vUHzPMZv6EbYG_TxANmJZfj1SJ3ClX76jmemVYHY', '2022-12-19 17:54:49.509', '2022-12-19 17:54:49.509');
INSERT INTO public."Session" VALUES (8, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTQ4MDE2Mn0.jKiZHwCSkQTKbsyxUF6PsbDe-y1d_JCL4456Uy0Pyrc', '2022-12-19 20:02:42.619', '2022-12-19 20:02:42.62');
INSERT INTO public."Session" VALUES (9, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTQ4MjczOH0.e_jhgL2jKrVsJ-HnIkszcK7Ne_WpiF50kar3lm3skbI', '2022-12-19 20:45:38.856', '2022-12-19 20:45:38.856');
INSERT INTO public."Session" VALUES (10, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTU0MTgyOH0.6_QaGTnElOP1I-YLqQ8MlGgADjqLMwTNWcJn9q8xsug', '2022-12-20 13:10:28.691', '2022-12-20 13:10:28.691');
INSERT INTO public."Session" VALUES (11, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTU0NDAzMH0._5nMzJ2N9pKc_vUkerl9tJouIO2Prbx1evk-n6W6mQE', '2022-12-20 13:47:10.904', '2022-12-20 13:47:10.905');
INSERT INTO public."Session" VALUES (12, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTU0NTA3OH0.QUeKtAT911_1s5IVOxWntqBuKY9QnrfSX2RiwatVtq4', '2022-12-20 14:04:38.791', '2022-12-20 14:04:38.792');
INSERT INTO public."Session" VALUES (13, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTYyOTUyN30.BsCHJG0N-YKWBouPFzz9KWuRwbi_2GAMuyvOZqZb3xc', '2022-12-21 13:32:07.642', '2022-12-21 13:32:07.642');
INSERT INTO public."Session" VALUES (14, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTYzMzUxOH0.R_CeXn8UzMGI1M1lQ1cnrTchDl2C2oRVKZX3-NkNUpE', '2022-12-21 14:38:38.99', '2022-12-21 14:38:38.994');
INSERT INTO public."Session" VALUES (15, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTcxOTU1OX0._-sjxGUotgU7AhdFKu1g-GHgYU6rpYgVta_tER5A4Nc', '2022-12-22 14:32:39.8', '2022-12-22 14:32:39.801');
INSERT INTO public."Session" VALUES (16, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTczNzYzOH0.jF7vE2Al_0NH1y-mbq_fFFhcL8-UVAmLLkj-2QC41f8', '2022-12-22 19:33:58.703', '2022-12-22 19:33:58.704');
INSERT INTO public."Session" VALUES (17, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTc5ODI0Mn0.KXCtIiATePcxUvHX7-rCaaMyCRABvfZaJWUYNcYKaSM', '2022-12-23 12:24:02.993', '2022-12-23 12:24:02.993');
INSERT INTO public."Session" VALUES (18, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTgyNTAwM30.BEEhIQkcseS1vgkA_FHAKpj9bv2jmCDjrpTUnXDmvtM', '2022-12-23 19:50:03.413', '2022-12-23 19:50:03.414');
INSERT INTO public."Session" VALUES (19, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTgyNjM1NH0.qX1fnoZC7eXPc2pgc4_ZLSGIrIO9KxGg6i6DERjB8Yo', '2022-12-23 20:12:34.367', '2022-12-23 20:12:34.367');
INSERT INTO public."Session" VALUES (20, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTgyNjM1NH0.qX1fnoZC7eXPc2pgc4_ZLSGIrIO9KxGg6i6DERjB8Yo', '2022-12-23 20:12:34.427', '2022-12-23 20:12:34.428');
INSERT INTO public."Session" VALUES (21, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY3MTgyNjQ1MH0.bsISYmSytrEXHUumIMc80LCkqK1nn_EASvaoIZWpR5M', '2022-12-23 20:14:10.561', '2022-12-23 20:14:10.562');
INSERT INTO public."Session" VALUES (22, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY3MTgyODQwNX0.dYY5v1UvxwxpOI4-frTb5A9sAlZ9Hds5HUiv3oH04Ug', '2022-12-23 20:46:45.177', '2022-12-23 20:46:45.178');
INSERT INTO public."Session" VALUES (23, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3Mjc0OTkwNH0.SQ1gjOSYBsP-9k-usQMgZxS4rfIuCi5FSjddPfUdJX8', '2023-01-03 12:45:04.915', '2023-01-03 12:45:04.915');
INSERT INTO public."Session" VALUES (24, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY3Mjc3OTQ0NH0.VZcxYUPABb0cW254qt9IB9Unhw94Ey-ANY9lZYTclZc', '2023-01-03 20:57:24.83', '2023-01-03 20:57:24.833');
INSERT INTO public."Session" VALUES (25, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY3Mjc3OTQ4N30.YWBDEryu-EXaJWBY1fhrDW7n-24shL-wVbf7byC5bNs', '2023-01-03 20:58:07.459', '2023-01-03 20:58:07.46');
INSERT INTO public."Session" VALUES (26, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MzI3MjkxM30.evZGuy8kyQO7zk80RhdBO-2V_0iSKtWyfmbNTG2XJng', '2023-01-09 14:01:53.64', '2023-01-09 14:01:53.641');
INSERT INTO public."Session" VALUES (27, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MzI3MzkyMX0.NQeveNW9v_jncRTuCYDL842lDEDUjfubyfQzLr2Q28k', '2023-01-09 14:18:41.118', '2023-01-09 14:18:41.119');
INSERT INTO public."Session" VALUES (28, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MzI3NTYwMH0.Rw06XE02wOUEv8a-Sn8TKjfxwA7Enc7ujhfWHy5URt4', '2023-01-09 14:46:40.712', '2023-01-09 14:46:40.713');
INSERT INTO public."Session" VALUES (29, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MzI5Nzk1N30.Z6atKpauk8fk_cElMpYYWND8jwvCV1zubPBEaxsEJzU', '2023-01-09 20:59:18', '2023-01-09 20:59:18');
INSERT INTO public."Session" VALUES (30, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY3MzMwMzQzMH0.VncHZ-lWLUg9nHJZZzC8v_WjlKqe0pkB0cmBtlcRB_I', '2023-01-09 22:30:30.325', '2023-01-09 22:30:30.326');
INSERT INTO public."Session" VALUES (31, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY3MzMwMzQ4MX0.o250csHoi3Ri99MPUALwoVoUbLu1VpmuPRUL0_cQ388', '2023-01-09 22:31:21.945', '2023-01-09 22:31:21.946');
INSERT INTO public."Session" VALUES (32, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MzUzNTI3OH0.69mnWYz-qVjyIXEurLCYJhBJXpax1srsA_SI73Cgifo', '2023-01-12 14:54:38.282', '2023-01-12 14:54:38.282');
INSERT INTO public."Session" VALUES (33, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY3MzUzNjAzNn0.hjXQOZzRb-oldPQPO9KuIJHrXnJ0_by0GE5WqaI18Ic', '2023-01-12 15:07:16.597', '2023-01-12 15:07:16.598');
INSERT INTO public."Session" VALUES (34, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY3MzUzNjEzOH0.RxkbFaOZ4fRXkRSt58PglxS8Q8ENLZu117DQ0WZxVtU', '2023-01-12 15:08:58.445', '2023-01-12 15:08:58.445');
INSERT INTO public."Session" VALUES (35, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY3MzUzNzAyOH0.6S3ayrHhgMm-zeFt_DrDMTRy30jOTw6bvIWrEizLzfE', '2023-01-12 15:23:48.443', '2023-01-12 15:23:48.444');


--
-- Data for Name: Ticket; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Ticket" VALUES (8, 3, 1, 'PAID', '2022-12-21 17:17:46.401', '2022-12-21 17:21:05.674');
INSERT INTO public."Ticket" VALUES (9, 3, 2, 'PAID', '2022-12-23 20:15:49.545', '2022-12-23 20:16:18.192');
INSERT INTO public."Ticket" VALUES (10, 3, 3, 'PAID', '2022-12-23 20:48:33.468', '2022-12-23 20:49:12.48');
INSERT INTO public."Ticket" VALUES (11, 3, 4, 'PAID', '2023-01-09 22:32:25.889', '2023-01-09 22:32:39.251');
INSERT INTO public."Ticket" VALUES (12, 3, 5, 'PAID', '2023-01-12 15:09:52.96', '2023-01-12 15:10:03.51');


--
-- Data for Name: TicketActivity; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."TicketActivity" VALUES (1, 8, 1);
INSERT INTO public."TicketActivity" VALUES (3, 8, 3);
INSERT INTO public."TicketActivity" VALUES (4, 8, 4);
INSERT INTO public."TicketActivity" VALUES (5, 8, 6);
INSERT INTO public."TicketActivity" VALUES (6, 9, 1);
INSERT INTO public."TicketActivity" VALUES (7, 9, 3);
INSERT INTO public."TicketActivity" VALUES (8, 9, 6);
INSERT INTO public."TicketActivity" VALUES (9, 9, 4);
INSERT INTO public."TicketActivity" VALUES (10, 10, 1);
INSERT INTO public."TicketActivity" VALUES (11, 10, 3);
INSERT INTO public."TicketActivity" VALUES (15, 10, 6);
INSERT INTO public."TicketActivity" VALUES (16, 10, 4);
INSERT INTO public."TicketActivity" VALUES (27, 12, 1);
INSERT INTO public."TicketActivity" VALUES (28, 12, 3);
INSERT INTO public."TicketActivity" VALUES (29, 12, 6);
INSERT INTO public."TicketActivity" VALUES (30, 12, 4);


--
-- Data for Name: TicketType; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."TicketType" VALUES (3, 'show', 22000, false, true, '2022-12-19 18:15:16.573', '2022-12-19 18:15:16.573');
INSERT INTO public."TicketType" VALUES (4, 'seminario', 22000, true, false, '2022-12-19 18:16:48.045', '2022-12-19 18:16:48.045');
INSERT INTO public."TicketType" VALUES (5, 'palestra', 20000, false, false, '2022-12-19 18:17:23.257', '2022-12-19 18:17:23.257');


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."User" VALUES (1, 'rodrigovf2102@gmail.com', '$2b$12$1KApVg3mljKmCyPcwinImeEZL107SUgsBG37TJJ9ykUQh9XQpQ71S', '2022-12-16 17:39:36.997', '2022-12-16 17:39:36.998');
INSERT INTO public."User" VALUES (2, 'teste@teste.com', '$2b$12$KuZ6oSHF7lLMcCD8qtzvlevuNp/Qy2ZlvVpsAobZ76jbueRukgCqW', '2022-12-23 20:14:00.125', '2022-12-23 20:14:00.125');
INSERT INTO public."User" VALUES (3, 'teste2@teste.com', '$2b$12$dTKtVWsbDbdzh1nc0bi5z.JIC5iCatHT53sbqv8uVnnjKkBwIEhnG', '2022-12-23 20:46:33.102', '2022-12-23 20:46:33.102');
INSERT INTO public."User" VALUES (4, 'teste3@teste.com', '$2b$12$45z8VLOqdNK9ID6TPLE9wO0tHT/t2gcW/t3JS2YEuOaqrRWir4zeS', '2023-01-09 22:30:22.302', '2023-01-09 22:30:22.302');
INSERT INTO public."User" VALUES (5, 'teste3@teste3.com', '$2b$12$gXlw0OtmafQMj4/S61vA3OeZ6WbtK0/oPf0E2Dz9rW9qCzd2qkfWC', '2023-01-12 15:08:47.249', '2023-01-12 15:08:47.25');


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public._prisma_migrations VALUES ('85ff21b5-48d9-4deb-90b9-cac1c1e40916', '33aae9404e976450f09d32c6fc67583bb1a8089e4e8d3ffcec2a31ccce8585ff', '2022-12-16 14:00:46.727239-03', '20220519200857_init', NULL, NULL, '2022-12-16 14:00:46.718433-03', 1);
INSERT INTO public._prisma_migrations VALUES ('4bcba781-823e-48ff-950a-f915e6598ce5', 'ba7c8810f0df555b56962c3041e14416cd17d65de471d78bf21b8b018bb49a42', '2022-12-16 14:00:46.733832-03', '20220521144316_create_session_table', NULL, NULL, '2022-12-16 14:00:46.727955-03', 1);
INSERT INTO public._prisma_migrations VALUES ('b261db6e-7540-442e-8639-d246853181ec', 'ed1e5e8af722430f2786f7fbe89abebbad98939e43ba4c78628fbf8d076fa793', '2022-12-16 14:00:46.738324-03', '20220521144521_change_token_collumn_to_text_type_for_session_table', NULL, NULL, '2022-12-16 14:00:46.734638-03', 1);
INSERT INTO public._prisma_migrations VALUES ('4e096208-79ee-44ab-8764-fcdc3b55ad60', 'dfe62bfeddd8ab53b2e50e36708deeb340d36f5ad32cbf9d59932b82a696e3ac', '2022-12-16 14:00:46.745255-03', '20220521170313_create_settings_table', NULL, NULL, '2022-12-16 14:00:46.739081-03', 1);
INSERT INTO public._prisma_migrations VALUES ('3dc230b8-e482-41a3-ba8b-d39270925abd', 'c14ccd3fb6c78d024941ecd61b4835ba1cb21b94dbb95abc4956009a794375cf', '2022-12-16 14:00:46.753631-03', '20220521172530_create_events_table', NULL, NULL, '2022-12-16 14:00:46.745974-03', 1);
INSERT INTO public._prisma_migrations VALUES ('9768c480-f510-4989-9a14-e8d9b8025f48', '65a9f2d4602ec7b7b1fd2eaeb169ca528cfbe59b2f4d51e3b0344056c956c756', '2022-12-16 14:00:46.763803-03', '20220521191854_create_enrollment_and_adress_tables', NULL, NULL, '2022-12-16 14:00:46.754397-03', 1);
INSERT INTO public._prisma_migrations VALUES ('546e739e-de56-4c49-ba4e-0d2287a6379e', '1b637140d19eadd7ec8189e3339ec6350847ef801bd11d8d91968b9f80bd2f6a', '2022-12-16 14:00:46.772315-03', '20220521192104_rename_address_table', NULL, NULL, '2022-12-16 14:00:46.764707-03', 1);
INSERT INTO public._prisma_migrations VALUES ('77e00fb4-8792-41fb-ac18-76ea3cfed45c', '4eb3418748144d88b6ac75bcdcf91027282833c012f735f4a91edd6e6ac07ec9', '2022-12-16 14:00:46.775525-03', '20220521192311_change_address_detail_column_type_to_not_requerired_for_address_table', NULL, NULL, '2022-12-16 14:00:46.773183-03', 1);
INSERT INTO public._prisma_migrations VALUES ('191f3d0f-7029-4cca-bebf-2ac4d686520b', '3e0c34445b4f7f94fe19a01c512154b8f34472d49516ae6b02367d712acdaef6', '2022-12-16 14:00:46.839125-03', '20220522143837_change_user_id_collumn_in_enrollments_table_to_unique', NULL, NULL, '2022-12-16 14:00:46.831872-03', 1);
INSERT INTO public._prisma_migrations VALUES ('e45b64ec-6d63-49e6-b762-d976fa9750c8', '6620ae7b3d99518f4fe80a866e0a0d61c6d5187a178fe1ed11b5cbed277f9691', '2022-12-16 14:00:46.847608-03', '20220525152602_change_enrollmentid_on_address_to_unique', NULL, NULL, '2022-12-16 14:00:46.840752-03', 1);
INSERT INTO public._prisma_migrations VALUES ('d47cc7cb-1f2c-4a31-8181-79cbe5d400bf', '6bcef7c515c59372d00f9b79372c19d324dbb14e13e3b02f40d5f054ff7a1c99', '2022-12-16 14:00:46.998575-03', '20221116174837_tickets', NULL, NULL, '2022-12-16 14:00:46.849237-03', 1);
INSERT INTO public._prisma_migrations VALUES ('603842f4-49a5-45ca-9e47-bf334da2eb5d', '0c37fd5dd680bb428544370252cb1739b590659b9c5102aafeaa10ea75a5df58', '2022-12-16 14:00:47.16125-03', '20221128215237_hotel', NULL, NULL, '2022-12-16 14:00:47.000524-03', 1);


--
-- Name: Activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Activity_id_seq"', 6, true);


--
-- Name: Address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Address_id_seq"', 5, true);


--
-- Name: Booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Booking_id_seq"', 10, true);


--
-- Name: Enrollment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Enrollment_id_seq"', 5, true);


--
-- Name: Event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Event_id_seq"', 1, true);


--
-- Name: Hotel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Hotel_id_seq"', 2, true);


--
-- Name: Payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Payment_id_seq"', 18, true);


--
-- Name: Room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Room_id_seq"', 11, true);


--
-- Name: Session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Session_id_seq"', 35, true);


--
-- Name: TicketActivity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."TicketActivity_id_seq"', 30, true);


--
-- Name: TicketType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."TicketType_id_seq"', 6, true);


--
-- Name: Ticket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Ticket_id_seq"', 12, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."User_id_seq"', 5, true);


--
-- Name: Activity Activity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Activity"
    ADD CONSTRAINT "Activity_pkey" PRIMARY KEY (id);


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY (id);


--
-- Name: Enrollment Enrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_pkey" PRIMARY KEY (id);


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: Hotel Hotel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Hotel"
    ADD CONSTRAINT "Hotel_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: Room Room_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: TicketActivity TicketActivity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TicketActivity"
    ADD CONSTRAINT "TicketActivity_pkey" PRIMARY KEY (id);


--
-- Name: TicketType TicketType_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TicketType"
    ADD CONSTRAINT "TicketType_pkey" PRIMARY KEY (id);


--
-- Name: Ticket Ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Address_enrollmentId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Address_enrollmentId_key" ON public."Address" USING btree ("enrollmentId");


--
-- Name: Enrollment_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Enrollment_userId_key" ON public."Enrollment" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Activity Activity_ticketTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Activity"
    ADD CONSTRAINT "Activity_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES public."TicketType"(id);


--
-- Name: Address Address_enrollmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES public."Enrollment"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Enrollment Enrollment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Payment Payment_ticketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES public."Ticket"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Room Room_hotelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES public."Hotel"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TicketActivity TicketActivity_activityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TicketActivity"
    ADD CONSTRAINT "TicketActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES public."Activity"(id);


--
-- Name: TicketActivity TicketActivity_ticketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TicketActivity"
    ADD CONSTRAINT "TicketActivity_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES public."Ticket"(id);


--
-- Name: Ticket Ticket_enrollmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES public."Enrollment"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Ticket Ticket_ticketTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES public."TicketType"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

