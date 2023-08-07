import { Button } from "ui";

export default function Home() {
  return (
    <>
      <main className="grid grid-cols-1 grid-rows-1 items-center max-w-[800px] m-auto">
        <div className="bg-gray-100 p-8 text-4xl">Tailwind Starter</div>
        <Button variant={"destructive"}>Destructive</Button>
        <Button variant={"default"}>Default</Button>
        <Button variant={"secondary"}>Secondary</Button>
        <Button variant={"outline"}>outline</Button>
      </main>
    </>
  );
}
