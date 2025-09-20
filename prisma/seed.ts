import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Fill the database with 3 people.
// Run this manually using tsx.
// (Or ts-node if you like that)

async function main() {
	await prisma.user.createMany({
		data: [
			{ username: "Alice", age: 25 },
			{ username: "Bob", age: 30 },
			{ username: "Charlie", age: 22 },
		],
	});
	console.log("Seeded users.");
}

main()
	.catch((e) => console.error(e))
	.finally(() => prisma.$disconnect());
