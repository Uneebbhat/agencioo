import formattedDate from "@/helper/getCurrentDay";

export default function DashboardHeader() {
  return (
    <>
      <div className="mb-2 text-sm text-muted-foreground">{formattedDate()}</div>
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        It&apos;s your day to shine.
      </h1>
      <p className="text-md md:text-lg text-muted-foreground">
        Your potential is limitless. Let&apos;s achieve something amazing today!,
      </p>
    </>
  );
}


