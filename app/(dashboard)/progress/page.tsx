import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";
import { taskSchema } from "@/constants/data";

import { DataTable } from "@/components/table-progress/data-table";
import { columns } from "@/components/table-progress/columns";
import { progressSchema } from "@/components/table-progress/data";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getProgress() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/(dashboard)/progress/data/progress.json")
  );

  const progress = JSON.parse(data.toString());

  return z.array(progressSchema).parse(progress);
}

export default async function ProgressPage() {
  const progress = await getProgress();

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable data={progress} columns={columns} />
      </div>
    </>
  );
}
