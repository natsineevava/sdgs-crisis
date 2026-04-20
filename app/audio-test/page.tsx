const podcasts = [
  {
    title: "กายคตาสติ - หลวงปู่ปราโมทย์",
    src: "/audio/กายคตาสติ - หลวงปู่ปราโมทย์.mp3",
  },
  {
    title: "บทสวดตอนเช้า",
    src: "/audio/บทสวดตอนเช้า.mp3",
  },
  {
    title: "อานาปานสติ - หลวงพ่อชา",
    src: "/audio/อานาปานสติ - หลวงพ่อชา.mp3",
  },
  {
    title: "เจริญเมตตาภาวนา - พระไพศาล",
    src: "/audio/เจริญเมตตาภาวนา - พระไพศาล.mp3",
  },
];

export default function AudioTestPage() {
  return (
    <main className="min-h-screen p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Audio Test</h1>
        <p className="text-sm text-gray-600">
          หน้านี้ใช้สำหรับทดสอบว่าไฟล์ MP3 ใน public/audio เล่นได้ไหม
        </p>
      </div>

      <div className="space-y-4">
        {podcasts.map((podcast) => (
          <div
            key={podcast.src}
            className="rounded-xl border border-gray-200 p-4 shadow-sm space-y-3"
          >
            <h2 className="font-medium">{podcast.title}</h2>

            <audio controls className="w-full">
              <source src={podcast.src} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            <p className="text-xs text-gray-500 break-all">{podcast.src}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
