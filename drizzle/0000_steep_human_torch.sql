CREATE TABLE "interviewFeedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockId" varchar NOT NULL,
	"userEmail" varchar NOT NULL,
	"createdAt" varchar NOT NULL,
	"duration" varchar NOT NULL,
	"totalMessages" varchar NOT NULL,
	"averageScore" varchar NOT NULL,
	"conversation" text NOT NULL,
	"strengths" text NOT NULL,
	"weaknesses" text NOT NULL,
	"detailedFeedback" text NOT NULL,
	"messageAnalysis" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mockInterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"difficulty" varchar NOT NULL,
	"scenario" text NOT NULL,
	"customerQuery" text NOT NULL,
	"expectedResponse" text NOT NULL,
	"language" varchar NOT NULL,
	"industry" varchar NOT NULL,
	"role" varchar NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" varchar,
	"mockID" varchar NOT NULL,
	"userEmail" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullName" varchar DEFAULT null,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar DEFAULT null,
	"package" varchar DEFAULT null
);
