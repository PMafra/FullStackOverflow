CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"question" TEXT NOT NULL,
	"student" varchar(255) NOT NULL,
	"group" varchar(255) NOT NULL,
	"tags" TEXT NOT NULL,
	"answered" BOOLEAN DEFAULT 'false',
	"submitAt" timestamp with time zone DEFAULT NOW(),
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"group" varchar(255) NOT NULL,
	"token" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "answered_questions" (
	"id" serial NOT NULL,
	"question_id" integer NOT NULL,
	"answeredBy" integer NOT NULL,
	"answer" TEXT NOT NULL,
	CONSTRAINT "answered_questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "answered_questions" ADD CONSTRAINT "answered_questions_fk0" FOREIGN KEY ("question_id") REFERENCES "questions"("id");
ALTER TABLE "answered_questions" ADD CONSTRAINT "answered_questions_fk1" FOREIGN KEY ("answeredBy") REFERENCES "users"("id");