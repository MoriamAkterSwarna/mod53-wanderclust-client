import Image from "next/image";
import Banner from "./components/Banner";
import Featured from "./components/Featured";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <Featured />
    </div>
  );
}
