import SendEmailForm from "./components/send-email";

export default function Home() {
  return (
    <div className="flex justify-center items-center bg-warning-50 h-screen">
      <div className="w-[50%] bg-warning-200 h-full"></div>
      <div className="w-[50%]">
        <SendEmailForm />
      </div>
    </div>
  );
}
