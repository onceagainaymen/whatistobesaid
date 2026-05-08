import Image from "next/image";
import Index from "../components/Index"
import HomePage from "../components/home_page"
import PostCard from "../components/post_card"

export default function Home() {
  return (
    <div>
    {false && <HomePage/>}
    {true && <Index/>}
    </div>
  );
}
