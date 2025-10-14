CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"candidateId" integer NOT NULL,
	"jobId" integer NOT NULL,
	"cv" varchar NOT NULL,
	"candidateName" varchar NOT NULL,
	"candidateEmail" varchar NOT NULL,
	"letter" text
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"candidateId" integer NOT NULL,
	"hrEmail" varchar(255) NOT NULL,
	"interviewDate" timestamp with time zone NOT NULL,
	"interviewTime" varchar NOT NULL,
	"cvUrl" text NOT NULL,
	"note" text,
	"candidateName" varchar(255) NOT NULL,
	"candidateEmail" varchar(255) NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"packageId" integer NOT NULL,
	"amount" integer DEFAULT null,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "interviewFeedback" ALTER COLUMN "mockId" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "interviewFeedback" ALTER COLUMN "userEmail" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "interviewFeedback" ALTER COLUMN "createdAt" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "interviewFeedback" ALTER COLUMN "duration" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "interviewFeedback" ALTER COLUMN "totalMessages" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "interviewFeedback" ALTER COLUMN "averageScore" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "mockInterview" ALTER COLUMN "title" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "mockInterview" ALTER COLUMN "difficulty" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "mockInterview" ALTER COLUMN "language" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "mockInterview" ALTER COLUMN "industry" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "mockInterview" ALTER COLUMN "role" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "mockInterview" ALTER COLUMN "createdBy" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "mockInterview" ALTER COLUMN "createdAt" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "mockInterview" ALTER COLUMN "mockID" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "mockInterview" ALTER COLUMN "userEmail" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "fullName" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "package" SET DATA TYPE varchar(300000);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "cvUrls" text[] DEFAULT '{}';