import { pgTable, serial, text, varchar, integer, references, timestamp } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 300000 }).notNull(),
    description: text('description', { length: 300000 }),
    difficulty: varchar('difficulty', { length: 300000 }).notNull(),
    scenario: text('scenario', { length: 300000 }).notNull(),
    customerQuery: text('customerQuery', { length: 300000 }).notNull(),
    expectedResponse: text('expectedResponse', { length: 300000 }).notNull(),
    language: varchar('language', { length: 300000 }).notNull(),
    industry: varchar('industry', { length: 300000 }).notNull(),
    role: varchar('role', { length: 300000 }).notNull(),
    createdBy: varchar('createdBy', { length: 300000 }).notNull(),
    createdAt: varchar('createdAt', { length: 300000 }),
    mockID: varchar('mockID', { length: 300000 }).notNull(),
    userEmail: varchar('userEmail', { length: 300000 }).notNull(),
})

export const InterviewFeedback = pgTable('interviewFeedback', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId', { length: 300000 }).notNull(),
    userEmail: varchar('userEmail', { length: 300000 }).notNull(),
    createdAt: varchar('createdAt', { length: 300000 }).notNull(),

    duration: varchar('duration', { length: 300000 }).notNull(),
    totalMessages: varchar('totalMessages', { length: 300000 }).notNull(),
    averageScore: varchar('averageScore', { length: 300000 }).notNull(),

    conversation: text('conversation', { length: 300000 }).notNull(),
    strengths: text('strengths', { length: 300000 }).notNull(),
    weaknesses: text('weaknesses', { length: 300000 }).notNull(),
    detailedFeedback: text('detailedFeedback', { length: 300000 }).notNull(),

    messageAnalysis: text('messageAnalysis', { length: 300000 }).notNull()
})

export const User = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: varchar('fullName', { length: 300000 }).default(null),
    username: varchar('username', { length: 300000 }).notNull(),
    email: varchar('email', { length: 300000 }).notNull(),
    password: varchar('password', { length: 300000 }).default(null),
    package: varchar('package', { length: 300000 }).default(null),
    cvUrls: text("cvUrls").array().default([]),
})

export const Booking = pgTable("bookings", {
    id: serial("id").primaryKey(),
    candidateId: integer("candidateId").notNull(),
    hrEmail: varchar("hrEmail", { length: 255 }).notNull(),
    interviewDate: timestamp("interviewDate", { withTimezone: true }).notNull(),
    interviewTime: varchar("interviewTime").notNull(),
    cvUrl: text("cvUrl").notNull(),
    note: text("note"),
    candidateName: varchar("candidateName", { length: 255 }).notNull(),
    candidateEmail: varchar("candidateEmail", { length: 255 }).notNull(),
    status: varchar("status", { length: 50 })
        .notNull()
        .default("pending"), // pending / confirmed / cancelled
    createdAt: timestamp("createdAt").defaultNow(),
});

export const Application = pgTable("applications", {
    id: serial("id").primaryKey(),
    candidateId: integer("candidateId").notNull(),
    jobId: integer("jobId").notNull(),
    cv: varchar("cv").notNull(),
    candidateName: varchar("candidateName").notNull(),
    candidateEmail: varchar("candidateEmail").notNull(),
    letter: text("letter"),
});
