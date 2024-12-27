-- CreateTable
CREATE TABLE "Game" (
    "gameId" SERIAL NOT NULL,
    "playerId" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,
    "winner" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("gameId")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "stateHash" TEXT NOT NULL,
    "state" TEXT[],

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Board_stateHash_key" ON "Board"("stateHash");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
