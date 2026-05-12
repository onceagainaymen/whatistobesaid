"use client"
import { useSearchParams } from "next/navigation"
import Image from "next/image";
import Index from "../components/Index"
import HomePage from "../components/home_page"
import PostCard from "../components/post_card"

export default function Home() {
  const searchParams = useSearchParams()
  return (
    <div>
    {(searchParams.get("index") === "false" || !searchParams.get("index")) && <HomePage/>}
    {searchParams.get("index") === "true" && <Index/>}
    </div>
  );
}
